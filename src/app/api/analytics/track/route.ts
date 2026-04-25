import { NextRequest, NextResponse } from "next/server";
import { analytics, systemMonitor } from "@/lib/monitoring";

export async function POST(request: NextRequest) {
  // Get client IP
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  try {
    const body = await request.json();
    const { type, url, userAgent, ...data } = body;

    if (type === "page_view") {
      await analytics.trackPageView({
        url,
        referrer: data.referrer,
        userAgent,
        ipAddress,
        pageLoadTime: data.loadTime,
      });

      // Track performance metrics
      await analytics.trackPerformance({
        url,
        loadTime: data.loadTime,
        firstContentfulPaint: data.firstContentfulPaint,
        largestContentfulPaint: data.largestContentfulPaint,
        cumulativeLayoutShift: data.cumulativeLayoutShift,
        firstInputDelay: data.firstInputDelay,
      });
    } else if (type === "user_event") {
      await analytics.trackEvent({
        eventType:
          data.eventName === "button_click" ? "button_click" : "page_view",
        eventName: data.eventName,
        url,
        ipAddress,
        metadata: data.metadata,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track analytics event:", error);

    // Track error in system monitor
    await systemMonitor.trackError({
      errorType: "server",
      message: "Failed to track analytics event",
      stack: error instanceof Error ? error.stack : undefined,
      url: request.url,
      ipAddress: ipAddress,
      userAgent: request.headers.get("user-agent") || "unknown",
      severity: "low",
    });

    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
