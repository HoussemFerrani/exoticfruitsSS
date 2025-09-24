import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { sendPasswordResetEmail } from '@/lib/email';
import {
  validateEmail,
  sanitizeInput,
  auditLogger,
  checkRateLimit,
} from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limiting (allow 3 requests per hour per IP)
    if (!checkRateLimit(`forgot_password_${clientIP}`, 3, 60 * 60 * 1000)) {
      auditLogger.log({
        action: "RATE_LIMIT_EXCEEDED",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { endpoint: "forgot-password" },
      });
      return NextResponse.json(
        { error: "Too many password reset requests, please try again later." },
        { status: 429 }
      );
    }

    await dbConnect();

    const { email } = await request.json();

    // Validate and sanitize input
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) {
      // Don't reveal if email exists or not for security
      auditLogger.log({
        action: "FORGOT_PASSWORD_ATTEMPT",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { email: sanitizedEmail, found: false },
      });
      return NextResponse.json(
        { message: "If an account with this email exists, a password reset link has been sent." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Update user with reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Send reset email
    const emailSent = await sendPasswordResetEmail(
      user.email,
      user.name,
      resetToken
    );

    if (!emailSent) {
      auditLogger.log({
        action: "FORGOT_PASSWORD_EMAIL_FAILED",
        userId: user._id.toString(),
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { email: sanitizedEmail },
      });
      return NextResponse.json(
        { error: "Failed to send password reset email" },
        { status: 500 }
      );
    }

    auditLogger.log({
      action: "FORGOT_PASSWORD_SUCCESS",
      userId: user._id.toString(),
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "",
      details: { email: sanitizedEmail },
    });

    return NextResponse.json(
      { message: "If an account with this email exists, a password reset link has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
