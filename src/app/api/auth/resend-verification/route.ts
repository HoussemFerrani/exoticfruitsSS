import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import {
  sanitizeInput,
  auditLogger,
  checkRateLimit,
} from "@/lib/security";
import {
  generateVerificationCode,
  getVerificationCodeExpiryTime,
  sendVerificationEmail,
  canRequestNewVerificationCode,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Stricter rate limiting for resend - 3 attempts per 15 minutes
    if (!checkRateLimit(`resend_verification_${clientIP}`, 3, 15 * 60 * 1000)) {
      auditLogger.log({
        action: 'RATE_LIMIT_EXCEEDED',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { endpoint: 'resend-verification' }
      });
      return NextResponse.json(
        { error: 'Too many resend attempts, please try again later.' },
        { status: 429 }
      );
    }

    await dbConnect();

    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Find user
    const user = await User.findOne({ email: sanitizedEmail })
      .select('+emailVerificationExpires');

    if (!user) {
      // Don't reveal if user exists or not for security
      auditLogger.log({
        action: 'RESEND_VERIFICATION_FAILED',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { email: sanitizedEmail, reason: 'user_not_found' }
      });
      return NextResponse.json(
        { message: "If an account with this email exists, a new verification code has been sent." },
        { status: 200 }
      );
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      );
    }

    // Check if can request new code (prevent spam)
    if (user.emailVerificationExpires && !canRequestNewVerificationCode(user.emailVerificationExpires)) {
      return NextResponse.json(
        { error: "Please wait at least 1 minute before requesting a new code" },
        { status: 400 }
      );
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const expiryTime = getVerificationCodeExpiryTime();

    // Update user with new verification code
    await User.findByIdAndUpdate(user._id, {
      $set: {
        emailVerificationCode: verificationCode,
        emailVerificationExpires: expiryTime,
        emailVerificationAttempts: 0 // Reset attempts
      }
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(
      user.email,
      user.name,
      verificationCode
    );

    if (!emailSent) {
      auditLogger.log({
        action: 'RESEND_VERIFICATION_EMAIL_FAILED',
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { email: sanitizedEmail }
      });
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again later." },
        { status: 500 }
      );
    }

    auditLogger.log({
      action: 'RESEND_VERIFICATION_SUCCESS',
      userId: user._id.toString(),
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || '',
      details: { email: sanitizedEmail }
    });

    return NextResponse.json({
      message: "A new verification code has been sent to your email"
    });

  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
