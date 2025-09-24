import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { signToken } from '@/lib/auth';
import {
  sanitizeInput,
  auditLogger,
  checkRateLimit,
} from "@/lib/security";
import {
  isVerificationCodeExpired,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limiting - allow 5 attempts per 15 minutes
    if (!checkRateLimit(`verify_email_${clientIP}`, 5, 15 * 60 * 1000)) {
      auditLogger.log({
        action: 'RATE_LIMIT_EXCEEDED',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { endpoint: 'verify-email' }
      });
      return NextResponse.json(
        { error: 'Too many verification attempts, please try again later.' },
        { status: 429 }
      );
    }

    await dbConnect();

    const { email, code } = await request.json();

    // Validate input
    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedCode = sanitizeInput(code);

    // Find user with verification fields
    const user = await User.findOne({ email: sanitizedEmail })
      .select('+emailVerificationCode +emailVerificationExpires +emailVerificationAttempts');

    if (!user) {
      auditLogger.log({
        action: 'EMAIL_VERIFICATION_FAILED',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { email: sanitizedEmail, reason: 'user_not_found' }
      });
      return NextResponse.json(
        { error: "Invalid verification request" },
        { status: 400 }
      );
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      );
    }

    // Check if verification code exists
    if (!user.emailVerificationCode || !user.emailVerificationExpires) {
      auditLogger.log({
        action: 'EMAIL_VERIFICATION_FAILED',
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { email: sanitizedEmail, reason: 'no_verification_code' }
      });
      return NextResponse.json(
        { error: "No active verification code. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if code is expired
    if (isVerificationCodeExpired(user.emailVerificationExpires)) {
      auditLogger.log({
        action: 'EMAIL_VERIFICATION_FAILED',
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { email: sanitizedEmail, reason: 'code_expired' }
      });
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Check for too many failed attempts (max 5)
    if (user.emailVerificationAttempts >= 5) {
      auditLogger.log({
        action: 'EMAIL_VERIFICATION_BLOCKED',
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { email: sanitizedEmail, reason: 'max_attempts_exceeded' }
      });
      return NextResponse.json(
        { error: "Too many failed attempts. Please request a new verification code." },
        { status: 400 }
      );
    }

    // Verify the code
    if (user.emailVerificationCode !== sanitizedCode) {
      // Increment failed attempts
      await User.findByIdAndUpdate(user._id, {
        $inc: { emailVerificationAttempts: 1 }
      });

      auditLogger.log({
        action: 'EMAIL_VERIFICATION_FAILED',
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { email: sanitizedEmail, reason: 'invalid_code', attempts: user.emailVerificationAttempts + 1 }
      });

      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Success! Mark email as verified and clean up verification fields
    await User.findByIdAndUpdate(user._id, {
      $set: { isEmailVerified: true },
      $unset: { 
        emailVerificationCode: 1,
        emailVerificationExpires: 1,
        emailVerificationAttempts: 1
      }
    });

    auditLogger.log({
      action: 'EMAIL_VERIFIED_SUCCESS',
      userId: user._id.toString(),
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || '',
      details: { email: sanitizedEmail }
    });

    // Create JWT token for automatic login
    const token = signToken({
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    return NextResponse.json({
      message: "Email verified successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: true
      },
      token
    });

  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
