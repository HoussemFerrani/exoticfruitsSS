import { NextRequest, NextResponse } from "next/server";
import { auditLogger } from "@/lib/security";
import { tokenBlacklist } from "@/lib/token-blacklist";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);

      // Add token to blacklist
      tokenBlacklist.add(token);

      // Clean up expired tokens periodically (simple implementation)
      if (tokenBlacklist.size > 1000) {
        // In production, implement proper cleanup with timestamps
        const oldSize = tokenBlacklist.size;
        // Clear oldest 500 tokens (simplified approach)
        const tokensToRemove = Array.from(tokenBlacklist).slice(0, 500);
        tokensToRemove.forEach((token) => tokenBlacklist.delete(token));
        console.log(
          `Cleaned up ${oldSize - tokenBlacklist.size} tokens from blacklist`
        );
      }

      auditLogger.log({
        action: "LOGOUT_SUCCESS",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { tokenBlacklisted: true },
      });
    }

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
