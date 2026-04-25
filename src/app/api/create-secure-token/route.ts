import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/sanity";
import crypto from "crypto";

// Generate a secure token for success page access
function generateSecureToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Check if order exists and is completed
    const order = await serverClient.fetch(
      `*[_type == "order" && stripeSessionId == $sessionId && status == "completed"][0]`,
      { sessionId }
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found or not completed" },
        { status: 404 }
      );
    }

    // Generate secure token
    const secureToken = generateSecureToken();

    // Create secure token record in Sanity
    const secureTokenDoc = await serverClient.create({
      _type: "secureToken",
      token: secureToken,
      sessionId,
      order: {
        _type: "reference",
        _ref: order._id,
      },
      isUsed: false,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    });

    return NextResponse.json({
      success: true,
      secureToken,
      expiresAt: secureTokenDoc.expiresAt,
    });
  } catch (error) {
    console.error("Error creating secure token:", error);
    return NextResponse.json(
      { error: "Failed to create secure token" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Get secure token from Sanity
    const secureToken = await serverClient.fetch(
      `*[_type == "secureToken" && token == $token][0]`,
      { token } as Record<string, string>
    );

    if (!secureToken) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Check if token is used or expired
    if (secureToken.isUsed) {
      return NextResponse.json(
        { error: "Token has already been used" },
        { status: 401 }
      );
    }

    const now = new Date();
    const expiresAt = new Date(secureToken.expiresAt);
    if (expiresAt <= now) {
      return NextResponse.json({ error: "Token has expired" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      sessionId: secureToken.sessionId,
      orderId: secureToken.order._ref,
    });
  } catch (error) {
    console.error("Error validating secure token:", error);
    return NextResponse.json(
      { error: "Failed to validate token" },
      { status: 500 }
    );
  }
}
