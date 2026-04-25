import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { systemMonitor, analytics } from "@/lib/monitoring";

export function middleware(request: NextRequest) {
  const startTime = Date.now();

  // Get client IP address
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Get user agent
  const userAgent = request.headers.get("user-agent") || "unknown";

  // Track the request
  const response = NextResponse.next();

  // Add response time tracking
  response.headers.set("x-response-time", "0");

  // Track request in system monitor
  const responseTime = Date.now() - startTime;
  systemMonitor.trackRequest(responseTime);

  // Track page view if it's a page request
  if (
    request.nextUrl.pathname !== "/api" &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    analytics
      .trackPageView({
        url: request.nextUrl.pathname,
        referrer: request.headers.get("referer") || undefined,
        userAgent,
        ipAddress,
        pageLoadTime: responseTime,
      })
      .catch(error => {
        console.error("Failed to track page view:", error);
      });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
