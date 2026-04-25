import { createClient, SanityClient } from "@sanity/client";
import {
  PageView,
  UserEvent,
  PerformanceMetric,
  ConversionEvent,
  MonitoringConfig,
} from "./types";
import { logger } from "../logger";

class AnalyticsTracker {
  private client: SanityClient;
  private config: MonitoringConfig;
  private sessionId: string;

  constructor(config: MonitoringConfig) {
    this.config = config;
    this.sessionId = this.generateSessionId();

    // Initialize Sanity client for data storage
    this.client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDeviceType(userAgent: string): "desktop" | "mobile" | "tablet" {
    const mobileRegex =
      /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const tabletRegex = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i;

    if (tabletRegex.test(userAgent)) return "tablet";
    if (mobileRegex.test(userAgent)) return "mobile";
    return "desktop";
  }

  private getBrowser(userAgent: string): string {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("Opera")) return "Opera";
    return "Unknown";
  }

  private getOS(userAgent: string): string {
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Unknown";
  }

  private async getGeolocation(
    ipAddress: string
  ): Promise<{ country?: string; city?: string; isp?: string }> {
    if (!this.config.enableGeolocation) return {};

    try {
      // Use a free IP geolocation service
      const response = await fetch(
        `http://ip-api.com/json/${ipAddress}?fields=country,city,isp`
      );
      const data = await response.json();

      return {
        country: data.country,
        city: data.city,
        isp: data.isp,
      };
    } catch (error) {
      logger.warn("Failed to get geolocation data", {
        ipAddress,
        error: error instanceof Error ? error.message : String(error),
      });
      return {};
    }
  }

  private anonymizeIP(ipAddress: string): string {
    if (!this.config.privacyMode) return ipAddress;

    // Anonymize IP by removing last octet
    const parts = ipAddress.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
    return ipAddress;
  }

  async trackPageView(data: {
    url: string;
    referrer?: string;
    userAgent: string;
    ipAddress: string;
    userId?: string;
    pageLoadTime: number;
  }): Promise<void> {
    if (!this.config.enablePageTracking) return;

    try {
      const geolocation = await this.getGeolocation(data.ipAddress);

      const pageView: PageView = {
        id: `pv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        url: data.url,
        referrer: data.referrer,
        userAgent: data.userAgent,
        ipAddress: this.anonymizeIP(data.ipAddress),
        sessionId: this.sessionId,
        userId: data.userId,
        pageLoadTime: data.pageLoadTime,
        deviceType: this.getDeviceType(data.userAgent),
        browser: this.getBrowser(data.userAgent),
        os: this.getOS(data.userAgent),
        ...geolocation,
      };

      // Store in Sanity
      await this.client.create({
        _type: "pageView",
        ...pageView,
      });

      logger.info("Page view tracked", {
        url: data.url,
        sessionId: this.sessionId,
      });
    } catch (error) {
      logger.error(
        "Failed to track page view",
        error instanceof Error ? error : new Error(String(error)),
        { url: data.url }
      );
    }
  }

  async trackEvent(data: {
    eventType: UserEvent["eventType"];
    eventName: string;
    url: string;
    userId?: string;
    ipAddress: string;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    if (!this.config.enableEventTracking) return;

    try {
      const userEvent: UserEvent = {
        id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        eventType: data.eventType,
        eventName: data.eventName,
        sessionId: this.sessionId,
        userId: data.userId,
        url: data.url,
        metadata: data.metadata,
        ipAddress: this.anonymizeIP(data.ipAddress),
      };

      // Store in Sanity
      await this.client.create({
        _type: "userEvent",
        ...userEvent,
      });

      logger.info("User event tracked", {
        eventType: data.eventType,
        eventName: data.eventName,
        sessionId: this.sessionId,
      });
    } catch (error) {
      logger.error(
        "Failed to track user event",
        error instanceof Error ? error : new Error(String(error)),
        {
          eventType: data.eventType,
          eventName: data.eventName,
        }
      );
    }
  }

  async trackPerformance(data: {
    url: string;
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
    userId?: string;
  }): Promise<void> {
    if (!this.config.enablePerformanceTracking) return;

    try {
      const performanceMetric: PerformanceMetric = {
        id: `perf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        url: data.url,
        loadTime: data.loadTime,
        firstContentfulPaint: data.firstContentfulPaint,
        largestContentfulPaint: data.largestContentfulPaint,
        cumulativeLayoutShift: data.cumulativeLayoutShift,
        firstInputDelay: data.firstInputDelay,
        sessionId: this.sessionId,
        userId: data.userId,
      };

      // Store in Sanity
      await this.client.create({
        _type: "performanceMetric",
        ...performanceMetric,
      });

      logger.info("Performance metric tracked", {
        url: data.url,
        loadTime: data.loadTime,
      });
    } catch (error) {
      logger.error(
        "Failed to track performance metric",
        error instanceof Error ? error : new Error(String(error)),
        {
          url: data.url,
        }
      );
    }
  }

  async trackConversion(data: {
    conversionType: ConversionEvent["conversionType"];
    value: number;
    currency: string;
    userId?: string;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    try {
      const conversionEvent: ConversionEvent = {
        id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        conversionType: data.conversionType,
        value: data.value,
        currency: data.currency,
        sessionId: this.sessionId,
        userId: data.userId,
        metadata: data.metadata,
      };

      // Store in Sanity
      await this.client.create({
        _type: "conversionEvent",
        ...conversionEvent,
      });

      logger.info("Conversion tracked", {
        conversionType: data.conversionType,
        value: data.value,
        currency: data.currency,
      });
    } catch (error) {
      logger.error(
        "Failed to track conversion",
        error instanceof Error ? error : new Error(String(error)),
        {
          conversionType: data.conversionType,
        }
      );
    }
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

// Default configuration
const defaultConfig: MonitoringConfig = {
  enablePageTracking: true,
  enableEventTracking: true,
  enablePerformanceTracking: true,
  enableErrorTracking: true,
  enableSystemMetrics: true,
  sampleRate: 1.0, // Track all requests
  retentionDays: 90,
  enableGeolocation: true,
  enableRealTime: true,
  privacyMode: false,
};

// Create singleton instance
export const analytics = new AnalyticsTracker(defaultConfig);
