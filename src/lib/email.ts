import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Email verification functions that require Node.js modules
export function generateVerificationCode(): string {
  // Generate a 6-digit numeric code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateSecureVerificationCode(): string {
  // Generate a more secure 8-character alphanumeric code using Node.js crypto
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

// Email transporter configuration
const createEmailTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  
  // Fallback to Gmail if specific SMTP not configured
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationCode: string
): Promise<boolean> {
  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: `"${process.env.APP_NAME || 'Exotic Fruits International'}" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 30px; border: 1px solid #e9ecef; }
            .code-box { 
              background-color: #f8f9fa; 
              border: 2px solid #007bff; 
              border-radius: 8px; 
              padding: 20px; 
              text-align: center; 
              margin: 20px 0; 
            }
            .code { 
              font-size: 32px; 
              font-weight: bold; 
              color: #007bff; 
              letter-spacing: 4px; 
            }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 4px;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${process.env.APP_NAME || 'Exotic Fruits International'}</h1>
            </div>
            <div class="content">
              <p>Hello ${name},</p>
              <p>Thank you for registering with us! To complete your registration, please verify your email address using the verification code below:</p>
              
              <div class="code-box">
                <div class="code">${verificationCode}</div>
              </div>
              
              <p>Enter this code on the verification page to activate your account.</p>
              <p><strong>Important:</strong></p>
              <ul>
                <li>This code will expire in 15 minutes</li>
                <li>For security reasons, do not share this code with anyone</li>
                <li>If you didn't request this verification, please ignore this email</li>
              </ul>
              
              <p>If you have any questions, feel free to contact our support team.</p>
              <p>Best regards,<br>The ${process.env.APP_NAME || 'Exotic Fruits International'} Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${name},

Thank you for registering with ${process.env.APP_NAME || 'Exotic Fruits International'}!

Your verification code is: ${verificationCode}

This code will expire in 15 minutes. Please enter it on the verification page to complete your registration.

If you didn't request this verification, please ignore this email.

Best regards,
The ${process.env.APP_NAME || 'Exotic Fruits International'} Team
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

export function isVerificationCodeExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

export function getVerificationCodeExpiryTime(): Date {
  // Code expires in 15 minutes
  return new Date(Date.now() + 15 * 60 * 1000);
}

export function canRequestNewVerificationCode(lastAttemptTime?: Date): boolean {
  if (!lastAttemptTime) return true;
  
  // Allow new code request after 1 minute
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  return lastAttemptTime < oneMinuteAgo;
}

export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetToken: string
): Promise<boolean> {
  try {
    const transporter = createEmailTransporter();
    const resetUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"${process.env.APP_NAME || "Exotic Fruits International"}" <${
        process.env.SMTP_USER || process.env.EMAIL_USER
      }>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 30px; border: 1px solid #e9ecef; }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 4px;
              margin: 20px 0;
            }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hello ${name},</p>
              <p>You have requested to reset your password for your ${
                process.env.APP_NAME || "Exotic Fruits International"
              } account.</p>
              <p>Please click the button below to reset your password:</p>
              
              <a href="${resetUrl}" class="button">Reset Password</a>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p><a href="${resetUrl}">${resetUrl}</a></p>
              
              <p><strong>Important:</strong></p>
              <ul>
                <li>This link will expire in 1 hour</li>
                <li>For security reasons, do not share this link with anyone</li>
                <li>If you didn't request this password reset, please ignore this email</li>
              </ul>
              
              <p>If you have any questions, feel free to contact our support team.</p>
              <p>Best regards,<br>The ${
                process.env.APP_NAME || "Exotic Fruits International"
              } Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${name},

You have requested to reset your password for your ${
        process.env.APP_NAME || "Exotic Fruits International"
      } account.

Please visit the following link to reset your password:
${resetUrl}

This link will expire in 1 hour.

If you didn't request this password reset, please ignore this email.

Best regards,
The ${process.env.APP_NAME || "Exotic Fruits International"} Team
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
}
