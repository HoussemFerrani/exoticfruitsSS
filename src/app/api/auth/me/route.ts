import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';
import { auditLogger } from "@/lib/security";
import { tokenBlacklist } from "@/lib/token-blacklist";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    await dbConnect();

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.substring(7);

    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
      auditLogger.log({
        action: "BLACKLISTED_TOKEN_ACCESS",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { token: token.substring(0, 10) + "..." },
      });
      return NextResponse.json(
        { error: "Token has been invalidated" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      auditLogger.log({
        action: "INVALID_TOKEN_ACCESS",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { token: token.substring(0, 10) + "..." },
      });
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      auditLogger.log({
        action: "USER_NOT_FOUND",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { userId: decoded.userId },
      });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    auditLogger.log({
      action: "USER_PROFILE_ACCESS",
      userId: user._id.toString(),
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "",
      details: { email: user.email },
    });

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
