import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/sanity";

export async function GET(request: NextRequest) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "This endpoint is only available in development" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get all proxy URLs for this session
    const proxyUrls = await serverClient.fetch(
      `
      *[_type == "proxyUrl" && sessionId == $sessionId] | order(createdAt desc) {
        _id,
        sessionId,
        token,
        expiresAt,
        isExpired,
        downloadCount,
        createdAt,
        updatedAt
      }
    `,
      { sessionId }
    );

    return NextResponse.json({
      sessionId,
      proxyUrls,
      totalProxyUrls: proxyUrls.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in test-proxy-url API:", error);
    return NextResponse.json(
      { error: "Failed to get proxy URL information" },
      { status: 500 }
    );
  }
}
