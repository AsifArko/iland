"use client";

import { useEffect, useCallback } from "react";

interface ClientAnalyticsProps {
  sessionId: string;
}

// Extend Window interface to include our tracking function
declare global {
  interface Window {
    trackAnalyticsEvent: (
      eventName: string,
      metadata?: Record<string, unknown>
    ) => Promise<void>;
  }
}

export function ClientAnalytics({ sessionId }: ClientAnalyticsProps) {
  const trackPageView = useCallback(async () => {
    try {
      const performance = window.performance;
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      // Get performance metrics
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const firstContentfulPaint =
        performance.getEntriesByName("first-contentful-paint")[0]?.startTime ||
        0;
      const largestContentfulPaint =
        performance.getEntriesByName("largest-contentful-paint")[0]
          ?.startTime || 0;

      // Cast to proper types for layout shift and first input
      const layoutShiftEntry = performance.getEntriesByName(
        "layout-shift"
      )[0] as PerformanceEntry & { value?: number };
      const firstInputEntry = performance.getEntriesByName(
        "first-input"
      )[0] as PerformanceEntry & { processingStart?: number };

      const cumulativeLayoutShift = layoutShiftEntry?.value || 0;
      const firstInputDelay = firstInputEntry?.processingStart || 0;

      // Send analytics data
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "page_view",
          sessionId,
          url: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          loadTime,
          firstContentfulPaint,
          largestContentfulPaint,
          cumulativeLayoutShift,
          firstInputDelay,
        }),
      });
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  }, [sessionId]);

  const trackEvent = useCallback(
    async (eventName: string, metadata?: Record<string, unknown>) => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "user_event",
            sessionId,
            url: window.location.href,
            userAgent: navigator.userAgent,
            eventName,
            metadata,
          }),
        });
      } catch (error) {
        console.error("Failed to track event:", error);
      }
    },
    [sessionId]
  );

  useEffect(() => {
    // Track initial page view
    trackPageView();

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackPageView();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [trackPageView]);

  // Expose tracking functions globally for other components to use
  useEffect(() => {
    window.trackAnalyticsEvent = trackEvent;
  }, [trackEvent]);

  return null; // This component doesn't render anything
}
