import { createClient, SanityClient } from "@sanity/client";
import { TrafficSummary } from "./types";
import { logger } from "../logger";

class TrafficAnalyzer {
  private client: SanityClient;

  constructor() {
    this.client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });
  }

  async getTrafficSummary(timeRange: {
    start: Date;
    end: Date;
  }): Promise<TrafficSummary> {
    try {
      // Get page views in time range
      const pageViews = await this.client.fetch(
        `
        *[_type == "pageView" && timestamp >= $start && timestamp <= $end] | order(timestamp desc)
      `,
        {
          start: timeRange.start.toISOString(),
          end: timeRange.end.toISOString(),
        }
      );

      // Get user events in time range (unused for now)
      await this.client.fetch(
        `
        *[_type == "userEvent" && timestamp >= $start && timestamp <= $end] | order(timestamp desc)
      `,
        {
          start: timeRange.start.toISOString(),
          end: timeRange.end.toISOString(),
        }
      );

      // Calculate metrics
      const totalPageViews = pageViews.length;
      const uniqueVisitors = this.getUniqueVisitors(pageViews);
      const averageSessionDuration =
        this.calculateAverageSessionDuration(pageViews);
      const bounceRate = this.calculateBounceRate(pageViews);
      const topPages = this.getTopPages(pageViews);
      const topReferrers = this.getTopReferrers(pageViews);
      const deviceBreakdown = this.getDeviceBreakdown(pageViews);
      const browserBreakdown = this.getBrowserBreakdown(pageViews);
      const geographicBreakdown = this.getGeographicBreakdown(pageViews);

      return {
        totalPageViews,
        uniqueVisitors,
        averageSessionDuration,
        bounceRate,
        topPages,
        topReferrers,
        deviceBreakdown,
        browserBreakdown,
        geographicBreakdown,
        timeRange,
      };
    } catch (error) {
      logger.error(
        "Failed to get traffic summary",
        error instanceof Error ? error : new Error(String(error))
      );
      return {
        totalPageViews: 0,
        uniqueVisitors: 0,
        averageSessionDuration: 0,
        bounceRate: 0,
        topPages: [],
        topReferrers: [],
        deviceBreakdown: {},
        browserBreakdown: {},
        geographicBreakdown: {},
        timeRange,
      };
    }
  }

  private getUniqueVisitors(pageViews: Array<{ sessionId: string }>): number {
    const uniqueSessions = new Set(pageViews.map(pv => pv.sessionId));
    return uniqueSessions.size;
  }

  private calculateAverageSessionDuration(
    pageViews: Array<{ sessionId: string; timestamp: string }>
  ): number {
    const sessionDurations: number[] = [];
    const sessions = new Map<
      string,
      Array<{ sessionId: string; timestamp: string }>
    >();

    // Group page views by session
    pageViews.forEach(pv => {
      if (!sessions.has(pv.sessionId)) {
        sessions.set(pv.sessionId, []);
      }
      sessions.get(pv.sessionId)!.push(pv);
    });

    // Calculate duration for each session
    sessions.forEach(sessionViews => {
      if (sessionViews.length > 1) {
        const sortedViews = sessionViews.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        const firstView = new Date(sortedViews[0].timestamp);
        const lastView = new Date(
          sortedViews[sortedViews.length - 1].timestamp
        );
        const duration = (lastView.getTime() - firstView.getTime()) / 1000; // in seconds

        sessionDurations.push(duration);
      }
    });

    if (sessionDurations.length === 0) return 0;

    return (
      sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
    );
  }

  private calculateBounceRate(pageViews: Array<{ sessionId: string }>): number {
    const sessions = new Map<string, Array<{ sessionId: string }>>();

    // Group page views by session
    pageViews.forEach(pv => {
      if (!sessions.has(pv.sessionId)) {
        sessions.set(pv.sessionId, []);
      }
      sessions.get(pv.sessionId)!.push(pv);
    });

    const totalSessions = sessions.size;
    const bouncedSessions = Array.from(sessions.values()).filter(
      sessionViews => sessionViews.length === 1
    ).length;

    return totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0;
  }

  private getTopPages(
    pageViews: Array<{ url: string }>
  ): Array<{ url: string; views: number }> {
    const pageCounts: Record<string, number> = {};

    pageViews.forEach(pv => {
      pageCounts[pv.url] = (pageCounts[pv.url] || 0) + 1;
    });

    return Object.entries(pageCounts)
      .map(([url, views]) => ({ url, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }

  private getTopReferrers(
    pageViews: Array<{ referrer?: string }>
  ): Array<{ referrer: string; visits: number }> {
    const referrerCounts: Record<string, number> = {};

    pageViews.forEach(pv => {
      const referrer = pv.referrer || "Direct";
      referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
    });

    return Object.entries(referrerCounts)
      .map(([referrer, visits]) => ({ referrer, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);
  }

  private getDeviceBreakdown(
    pageViews: Array<{ deviceType: string }>
  ): Record<string, number> {
    const deviceCounts: Record<string, number> = {};

    pageViews.forEach(pv => {
      deviceCounts[pv.deviceType] = (deviceCounts[pv.deviceType] || 0) + 1;
    });

    return deviceCounts;
  }

  private getBrowserBreakdown(
    pageViews: Array<{ browser: string }>
  ): Record<string, number> {
    const browserCounts: Record<string, number> = {};

    pageViews.forEach(pv => {
      browserCounts[pv.browser] = (browserCounts[pv.browser] || 0) + 1;
    });

    return browserCounts;
  }

  private getGeographicBreakdown(
    pageViews: Array<{ country?: string }>
  ): Record<string, number> {
    const countryCounts: Record<string, number> = {};

    pageViews.forEach(pv => {
      const country = pv.country || "Unknown";
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    return countryCounts;
  }

  async getRealTimeStats(): Promise<{
    activeUsers: number;
    recentPageViews: number;
    recentEvents: number;
  }> {
    try {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

      // Get recent page views
      const recentPageViews = await this.client.fetch(
        `
        *[_type == "pageView" && timestamp >= $fiveMinutesAgo] | order(timestamp desc)
      `,
        { fiveMinutesAgo: fiveMinutesAgo.toISOString() }
      );

      // Get recent user events
      const recentEvents = await this.client.fetch(
        `
        *[_type == "userEvent" && timestamp >= $fiveMinutesAgo] | order(timestamp desc)
      `,
        { fiveMinutesAgo: fiveMinutesAgo.toISOString() }
      );

      // Calculate active users (unique sessions in last 5 minutes)
      const activeUsers = new Set(
        recentPageViews.map((pv: { sessionId: string }) => pv.sessionId)
      ).size;

      return {
        activeUsers,
        recentPageViews: recentPageViews.length,
        recentEvents: recentEvents.length,
      };
    } catch (error) {
      logger.error(
        "Failed to get real-time stats",
        error instanceof Error ? error : new Error(String(error))
      );
      return {
        activeUsers: 0,
        recentPageViews: 0,
        recentEvents: 0,
      };
    }
  }

  async getConversionFunnel(): Promise<{
    pageViews: number;
    uniqueVisitors: number;
    conversions: number;
    conversionRate: number;
  }> {
    try {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Get page views
      const pageViews = await this.client.fetch(
        `
        *[_type == "pageView" && timestamp >= $oneDayAgo] | order(timestamp desc)
      `,
        { oneDayAgo: oneDayAgo.toISOString() }
      );

      // Get conversions
      const conversions = await this.client.fetch(
        `
        *[_type == "conversionEvent" && timestamp >= $oneDayAgo] | order(timestamp desc)
      `,
        { oneDayAgo: oneDayAgo.toISOString() }
      );

      const totalPageViews = pageViews.length;
      const uniqueVisitors = new Set(
        pageViews.map((pv: { sessionId: string }) => pv.sessionId)
      ).size;
      const totalConversions = conversions.length;
      const conversionRate =
        uniqueVisitors > 0 ? (totalConversions / uniqueVisitors) * 100 : 0;

      return {
        pageViews: totalPageViews,
        uniqueVisitors,
        conversions: totalConversions,
        conversionRate,
      };
    } catch (error) {
      logger.error(
        "Failed to get conversion funnel",
        error instanceof Error ? error : new Error(String(error))
      );
      return {
        pageViews: 0,
        uniqueVisitors: 0,
        conversions: 0,
        conversionRate: 0,
      };
    }
  }

  async getPerformanceMetrics(timeRange: { start: Date; end: Date }): Promise<{
    averageLoadTime: number;
    averageFCP: number;
    averageLCP: number;
    averageCLS: number;
    averageFID: number;
  }> {
    try {
      const metrics = await this.client.fetch(
        `
        *[_type == "performanceMetric" && timestamp >= $start && timestamp <= $end] | order(timestamp desc)
      `,
        {
          start: timeRange.start.toISOString(),
          end: timeRange.end.toISOString(),
        }
      );

      if (metrics.length === 0) {
        return {
          averageLoadTime: 0,
          averageFCP: 0,
          averageLCP: 0,
          averageCLS: 0,
          averageFID: 0,
        };
      }

      const averageLoadTime =
        metrics.reduce(
          (sum: number, m: { loadTime: number }) => sum + m.loadTime,
          0
        ) / metrics.length;
      const averageFCP =
        metrics.reduce(
          (sum: number, m: { firstContentfulPaint: number }) =>
            sum + m.firstContentfulPaint,
          0
        ) / metrics.length;
      const averageLCP =
        metrics.reduce(
          (sum: number, m: { largestContentfulPaint: number }) =>
            sum + m.largestContentfulPaint,
          0
        ) / metrics.length;
      const averageCLS =
        metrics.reduce(
          (sum: number, m: { cumulativeLayoutShift: number }) =>
            sum + m.cumulativeLayoutShift,
          0
        ) / metrics.length;
      const averageFID =
        metrics.reduce(
          (sum: number, m: { firstInputDelay: number }) =>
            sum + m.firstInputDelay,
          0
        ) / metrics.length;

      return {
        averageLoadTime,
        averageFCP,
        averageLCP,
        averageCLS,
        averageFID,
      };
    } catch (error) {
      logger.error(
        "Failed to get performance metrics",
        error instanceof Error ? error : new Error(String(error))
      );
      return {
        averageLoadTime: 0,
        averageFCP: 0,
        averageLCP: 0,
        averageCLS: 0,
        averageFID: 0,
      };
    }
  }
}

// Create singleton instance
export const trafficAnalyzer = new TrafficAnalyzer();
