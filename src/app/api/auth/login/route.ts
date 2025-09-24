import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { comparePassword, signToken } from '@/lib/auth';
import {
  validateEmail,
  sanitizeInput,
  auditLogger,
  checkRateLimit,
} from "@/lib/security";

// Store failed login attempts (in production, use Redis)
const failedAttempts = new Map<
  string,
  { count: number; lastAttempt: Date; lockoutUntil?: Date }
>();

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limiting
    if (!checkRateLimit(`auth_${clientIP}`, 5, 15 * 60 * 1000)) {
      auditLogger.log({
        action: "RATE_LIMIT_EXCEEDED",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { endpoint: "login" },
      });
      return NextResponse.json(
        { error: "Too many login attempts, please try again later." },
        { status: 429 }
      );
    }

    await dbConnect();

    const { email, password } = await request.json();

    // Validate and sanitize input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedPassword = sanitizeInput(password);

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check for account lockout
    const attempts = failedAttempts.get(sanitizedEmail);
    if (
      attempts &&
      attempts.lockoutUntil &&
      new Date() < attempts.lockoutUntil
    ) {
      const remainingTime = Math.ceil(
        (attempts.lockoutUntil.getTime() - Date.now()) / 1000 / 60
      );
      auditLogger.log({
        action: "ACCOUNT_LOCKOUT",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { email: sanitizedEmail, remainingMinutes: remainingTime },
      });
      return NextResponse.json(
        {
          error: `Account temporarily locked. Try again in ${remainingTime} minutes.`,
        },
        { status: 429 }
      );
    }

    // Find user
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) {
      // Record failed attempt
      const currentAttempts = failedAttempts.get(sanitizedEmail) || {
        count: 0,
        lastAttempt: new Date(),
      };
      const newCount = currentAttempts.count + 1;

      if (newCount >= 5) {
        // Lock account for 15 minutes after 5 failed attempts
        failedAttempts.set(sanitizedEmail, {
          count: newCount,
          lastAttempt: new Date(),
          lockoutUntil: new Date(Date.now() + 15 * 60 * 1000),
        });
      } else {
        failedAttempts.set(sanitizedEmail, {
          count: newCount,
          lastAttempt: new Date(),
        });
      }

      auditLogger.log({
        action: "LOGIN_FAILED",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: {
          email: sanitizedEmail,
          reason: "user_not_found",
          attemptCount: newCount,
        },
      });

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await comparePassword(
      sanitizedPassword,
      user.password
    );
    if (!isPasswordValid) {
      // Record failed attempt
      const currentAttempts = failedAttempts.get(sanitizedEmail) || {
        count: 0,
        lastAttempt: new Date(),
      };
      const newCount = currentAttempts.count + 1;

      if (newCount >= 5) {
        // Lock account for 15 minutes after 5 failed attempts
        failedAttempts.set(sanitizedEmail, {
          count: newCount,
          lastAttempt: new Date(),
          lockoutUntil: new Date(Date.now() + 15 * 60 * 1000),
        });
      } else {
        failedAttempts.set(sanitizedEmail, {
          count: newCount,
          lastAttempt: new Date(),
        });
      }

      auditLogger.log({
        action: "LOGIN_FAILED",
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: {
          email: sanitizedEmail,
          reason: "invalid_password",
          attemptCount: newCount,
        },
      });

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      auditLogger.log({
        action: "LOGIN_FAILED",
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: {
          email: sanitizedEmail,
          reason: "email_not_verified",
        },
      });

      return NextResponse.json(
        {
          error: "Please verify your email address before logging in",
          requiresVerification: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isEmailVerified: false,
          },
        },
        { status: 401 }
      );
    }

    // Reset failed attempts on successful login
    failedAttempts.delete(sanitizedEmail);

    // Create JWT token
    const token = signToken({
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    auditLogger.log({
      action: "LOGIN_SUCCESS",
      userId: user._id.toString(),
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "",
      details: { email: sanitizedEmail },
    });

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
