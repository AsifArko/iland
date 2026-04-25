/**
 * Performance Monitoring System
 *
 * Tracks API response times, memory usage, and other performance metrics
 * for production monitoring and optimization.
 */

import { logger } from "@/lib/logger";

export interface PerformanceMetrics {
  requestId: string;
  method: string;
  url: string;
  duration: number;
  memoryUsage: NodeJS.MemoryUsage;
  timestamp: string;
  statusCode: number;
  userAgent?: string;
  ip?: string;
}

export interface PerformanceThresholds {
  slowRequestThreshold: number; // milliseconds
  memoryWarningThreshold: number; // bytes
  errorRateThreshold: number; // percentage
}

const defaultThresholds: PerformanceThresholds = {
  slowRequestThreshold: 1000, // 1 second
  memoryWarningThreshold: 100 * 1024 * 1024, // 100MB
  errorRateThreshold: 5, // 5%
};

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private thresholds: PerformanceThresholds;
  private errorCount = 0;
  private totalRequests = 0;

  constructor(thresholds: Partial<PerformanceThresholds> = {}) {
    this.thresholds = { ...defaultThresholds, ...thresholds };
  }

  /**
   * Start monitoring a request
   */
  startRequest(
    requestId: string,
    method: string,
    url: string
  ): (statusCode: number, userAgent?: string, ip?: string) => void {
    const startTime = Date.now();
    // Note: startMemory is captured but not used in this implementation
    // It could be used for memory delta calculations if needed
    // const startMemory = process.memoryUsage();

    return (statusCode: number, userAgent?: string, ip?: string) => {
      const duration = Date.now() - startTime;
      const endMemory = process.memoryUsage();

      const metric: PerformanceMetrics = {
        requestId,
        method,
        url,
        duration,
        memoryUsage: endMemory,
        timestamp: new Date().toISOString(),
        statusCode,
        userAgent,
        ip,
      };

      this.recordMetric(metric);
      this.checkThresholds(metric);
    };
  }

  /**
   * Record a performance metric
   */
  private recordMetric(metric: PerformanceMetrics): void {
    this.metrics.push(metric);
    this.totalRequests++;

    // Keep only last 1000 metrics to prevent memory leaks
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Log slow requests
    if (metric.duration > this.thresholds.slowRequestThreshold) {
      logger.warn("Slow request detected", undefined, {
        requestId: metric.requestId,
        duration: metric.duration,
        url: metric.url,
        method: metric.method,
        threshold: this.thresholds.slowRequestThreshold,
      });
    }

    // Log memory warnings
    if (metric.memoryUsage.heapUsed > this.thresholds.memoryWarningThreshold) {
      logger.warn("High memory usage detected", undefined, {
        requestId: metric.requestId,
        heapUsed: metric.memoryUsage.heapUsed,
        threshold: this.thresholds.memoryWarningThreshold,
      });
    }
  }

  /**
   * Check performance thresholds and alert if needed
   */
  private checkThresholds(metric: PerformanceMetrics): void {
    // Track errors for error rate calculation
    if (metric.statusCode >= 400) {
      this.errorCount++;
    }

    // Calculate error rate
    const errorRate = (this.errorCount / this.totalRequests) * 100;

    if (errorRate > this.thresholds.errorRateThreshold) {
      logger.error(
        "High error rate detected",
        new Error(
          `Error rate ${errorRate.toFixed(2)}% exceeds threshold ${this.thresholds.errorRateThreshold}%`
        )
      );
    }
  }

  /**
   * Get performance summary
   */
  getSummary(): {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    memoryUsage: NodeJS.MemoryUsage;
    slowRequests: number;
  } {
    const slowRequests = this.metrics.filter(
      m => m.duration > this.thresholds.slowRequestThreshold
    ).length;

    const averageResponseTime =
      this.metrics.length > 0
        ? this.metrics.reduce((sum, m) => sum + m.duration, 0) /
          this.metrics.length
        : 0;

    const errorRate =
      this.totalRequests > 0 ? (this.errorCount / this.totalRequests) * 100 : 0;

    const latestMemory =
      this.metrics.length > 0
        ? this.metrics[this.metrics.length - 1].memoryUsage
        : process.memoryUsage();

    return {
      totalRequests: this.totalRequests,
      averageResponseTime,
      errorRate,
      memoryUsage: latestMemory,
      slowRequests,
    };
  }

  /**
   * Get recent metrics
   */
  getRecentMetrics(limit: number = 100): PerformanceMetrics[] {
    return this.metrics.slice(-limit);
  }

  /**
   * Clear metrics (useful for testing)
   */
  clearMetrics(): void {
    this.metrics = [];
    this.errorCount = 0;
    this.totalRequests = 0;
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Performance monitoring middleware for API routes
 */
export function withPerformanceMonitoring<T extends unknown[]>(
  handler: (request: Request, ...args: T) => Promise<Response>
): (request: Request, ...args: T) => Promise<Response> {
  return async (request: Request, ...args: T): Promise<Response> => {
    const requestId = crypto.randomUUID();
    const url = new URL(request.url);
    const method = request.method;
    const userAgent = request.headers.get("user-agent");
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const endRequest = performanceMonitor.startRequest(
      requestId,
      method,
      url.pathname
    );

    try {
      const response = await handler(request, ...args);
      endRequest(response.status, userAgent || undefined, ip);
      return response;
    } catch (error) {
      endRequest(500, userAgent || undefined, ip);
      throw error;
    }
  };
}

/**
 * Get current performance metrics for health checks
 */
export function getPerformanceMetrics(): {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  memoryUsage: NodeJS.MemoryUsage;
  slowRequests: number;
} {
  return performanceMonitor.getSummary();
}
