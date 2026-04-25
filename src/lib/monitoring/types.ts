export interface PageView {
  id: string;
  timestamp: Date;
  url: string;
  referrer?: string;
  userAgent: string;
  ipAddress: string;
  sessionId: string;
  userId?: string;
  pageLoadTime: number;
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string;
  os: string;
  country?: string;
  city?: string;
  isp?: string;
}

export interface UserEvent {
  id: string;
  timestamp: Date;
  eventType:
    | "page_view"
    | "button_click"
    | "form_submit"
    | "download"
    | "purchase"
    | "error";
  eventName: string;
  sessionId: string;
  userId?: string;
  url: string;
  metadata?: Record<string, unknown>;
  ipAddress: string;
}

export interface SystemMetric {
  id: string;
  timestamp: Date;
  metricType:
    | "cpu"
    | "memory"
    | "disk"
    | "network"
    | "response_time"
    | "error_rate";
  value: number;
  unit: string;
  metadata?: Record<string, unknown>;
}

export interface ErrorLog {
  id: string;
  timestamp: Date;
  errorType: "client" | "server" | "database" | "external";
  message: string;
  stack?: string;
  url: string;
  sessionId?: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  severity: "low" | "medium" | "high" | "critical";
  resolved: boolean;
  metadata?: Record<string, unknown>;
}

export interface TrafficSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ url: string; views: number }>;
  topReferrers: Array<{ referrer: string; visits: number }>;
  deviceBreakdown: Record<string, number>;
  browserBreakdown: Record<string, number>;
  geographicBreakdown: Record<string, number>;
  timeRange: {
    start: Date;
    end: Date;
  };
}

export interface PerformanceMetric {
  id: string;
  timestamp: Date;
  url: string;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  sessionId: string;
  userId?: string;
}

export interface ConversionEvent {
  id: string;
  timestamp: Date;
  conversionType: "purchase" | "download" | "signup" | "contact";
  value: number;
  currency: string;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface MonitoringConfig {
  enablePageTracking: boolean;
  enableEventTracking: boolean;
  enablePerformanceTracking: boolean;
  enableErrorTracking: boolean;
  enableSystemMetrics: boolean;
  sampleRate: number; // 0-1, percentage of requests to track
  retentionDays: number;
  enableGeolocation: boolean;
  enableRealTime: boolean;
  privacyMode: boolean; // Anonymize IP addresses
}

export interface AnalyticsData {
  pageViews: PageView[];
  userEvents: UserEvent[];
  systemMetrics: SystemMetric[];
  errorLogs: ErrorLog[];
  performanceMetrics: PerformanceMetric[];
  conversionEvents: ConversionEvent[];
}

export interface MonitoringStats {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  uptime: number;
  activeUsers: number;
  topErrors: Array<{ message: string; count: number }>;
  systemHealth: {
    cpu: number;
    memory: number;
    disk: number;
  };
}
