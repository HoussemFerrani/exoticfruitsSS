import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword } from "@/lib/auth";
import {
  validateEmail,
  validatePasswordStrength,
  sanitizeInput,
  auditLogger,
  checkRateLimit,
} from "@/lib/security";
import {
  generateVerificationCode,
  getVerificationCodeExpiryTime,
  sendVerificationEmail,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limiting
    if (!checkRateLimit(`auth_signup_${clientIP}`, 3, 15 * 60 * 1000)) {
      auditLogger.log({
        action: "RATE_LIMIT_EXCEEDED",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { endpoint: "signup" },
      });
      return NextResponse.json(
        { error: "Too many signup attempts, please try again later." },
        { status: 429 }
      );
    }

    await dbConnect();

    const { name, email, password } = await request.json();

    // Validate and sanitize input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedPassword = sanitizeInput(password);

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(sanitizedPassword);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          error: `Password requirements not met: ${passwordValidation.errors.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      auditLogger.log({
        action: "SIGNUP_FAILED",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { email: sanitizedEmail, reason: "user_already_exists" },
      });
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(sanitizedPassword);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationExpiry = getVerificationCodeExpiryTime();

    // Create user with email verification fields
    const user = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
      isEmailVerified: false,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: verificationExpiry,
      emailVerificationAttempts: 0,
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(
      sanitizedEmail,
      sanitizedName,
      verificationCode
    );

    if (!emailSent) {
      // If email fails to send, we still created the user but log the failure
      auditLogger.log({
        action: "SIGNUP_EMAIL_FAILED",
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { email: sanitizedEmail, name: sanitizedName },
      });

      // You might want to delete the user or implement a retry mechanism
      // For now, we'll return success but note the email issue
      return NextResponse.json({
        message:
          "Account created successfully, but there was an issue sending the verification email. Please use the resend option.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: false,
        },
        requiresVerification: true,
      });
    }

    auditLogger.log({
      action: "SIGNUP_SUCCESS",
      userId: user._id.toString(),
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "",
      details: { email: sanitizedEmail, name: sanitizedName },
    });

    // Return success response - no JWT token until email is verified
    return NextResponse.json({
      message:
        "Account created successfully! Please check your email for a verification code.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: false,
      },
      requiresVerification: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
