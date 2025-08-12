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

    // Test 1: Check if order exists
    const order = await serverClient.fetch(
      `*[_type == "order" && stripeSessionId == $sessionId][0]`,
      { sessionId }
    );

    // Test 2: Check if proxy URL exists
    const proxyUrl = await serverClient.fetch(
      `*[_type == "proxyUrl" && sessionId == $sessionId] | order(createdAt desc)[0]`,
      { sessionId }
    );

    // Test 3: Check download configuration
    const download = await serverClient.fetch(
      `*[_type == "download" && isActive == true] | order(createdAt desc)[0]`
    );

    return NextResponse.json({
      sessionId,
      order: order
        ? {
            id: order._id,
            status: order.status,
            customerEmail: order.customerEmail,
          }
        : null,
      proxyUrl: proxyUrl
        ? {
            id: proxyUrl._id,
            token: proxyUrl.token.substring(0, 8) + "...",
            tokenLength: proxyUrl.token.length,
            expiresAt: proxyUrl.expiresAt,
            isExpired: proxyUrl.isExpired,
            downloadCount: proxyUrl.downloadCount,
            createdAt: proxyUrl.createdAt,
          }
        : null,
      download: download
        ? {
            id: download._id,
            title: download.title,
            gitRepository: download.gitRepository,
          }
        : null,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasGitHubToken: !!process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in debug-download API:", error);
    return NextResponse.json(
      { error: "Failed to debug download" },
      { status: 500 }
    );
  }
}
