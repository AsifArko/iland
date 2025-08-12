import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/sanity";

export async function GET() {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "This endpoint is only available in development" },
        { status: 403 }
      );
    }

    const proxyUrls = await serverClient.fetch(`
      *[_type == "proxyUrl"] | order(createdAt desc) {
        sessionId,
        token,
        expiresAt,
        isExpired,
        downloadCount,
        createdAt
      }
    `);

    return NextResponse.json({
      activeTokens: proxyUrls,
      totalTokens: proxyUrls.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in test-tokens API:", error);
    return NextResponse.json(
      { error: "Failed to get token information" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "This endpoint is only available in development" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Use the proxy-url API to create a test token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/proxy-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create proxy URL");
    }

    const data = await response.json();

    return NextResponse.json({
      token: "Created via proxy-url API",
      expiresAt: data.expiresAt,
      sessionId,
      message: "Test proxy URL created successfully",
      downloadUrl: data.downloadUrl,
    });
  } catch (error) {
    console.error("Error generating test token:", error);
    return NextResponse.json(
      { error: "Failed to generate test token" },
      { status: 500 }
    );
  }
}
