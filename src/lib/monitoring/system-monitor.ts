import { createClient, SanityClient } from "@sanity/client";
import { SystemMetric, ErrorLog, MonitoringStats } from "./types";
import { logger } from "../logger";

class SystemMonitor {
  private client: SanityClient;
  private metricsInterval?: NodeJS.Timeout;
  private startTime: Date;
  private requestCount: number = 0;
  private errorCount: number = 0;
  private responseTimes: number[] = [];

  constructor() {
    this.startTime = new Date();

    // Initialize Sanity client
    this.client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });

    // Start system metrics collection
    this.startMetricsCollection();
  }

  private startMetricsCollection(): void {
    // Collect system metrics every 5 minutes
    this.metricsInterval = setInterval(
      async () => {
        await this.collectSystemMetrics();
      },
      5 * 60 * 1000
    );
  }

  private async collectSystemMetrics(): Promise<void> {
    try {
      const metrics = await this.getSystemMetrics();

      for (const metric of metrics) {
        await this.client.create({
          _type: "systemMetric",
          ...metric,
        });
      }

      logger.info("System metrics collected", {
        cpu: metrics.find(m => m.metricType === "cpu")?.value,
        memory: metrics.find(m => m.metricType === "memory")?.value,
      });
    } catch (error) {
      logger.error(
        "Failed to collect system metrics",
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  private async getSystemMetrics(): Promise<SystemMetric[]> {
    const metrics: SystemMetric[] = [];
    const timestamp = new Date();

    try {
      // CPU Usage (simplified - in production you'd use os.cpus())
      const cpuUsage = Math.random() * 100; // Placeholder
      metrics.push({
        id: `cpu_${timestamp.getTime()}`,
        timestamp,
        metricType: "cpu",
        value: cpuUsage,
        unit: "percentage",
      });

      // Memory Usage
      if (typeof process !== "undefined" && process.memoryUsage) {
        const memUsage = process.memoryUsage();
        const memoryUsagePercent =
          (memUsage.heapUsed / memUsage.heapTotal) * 100;

        metrics.push({
          id: `mem_${timestamp.getTime()}`,
          timestamp,
          metricType: "memory",
          value: memoryUsagePercent,
          unit: "percentage",
          metadata: {
            heapUsed: memUsage.heapUsed,
            heapTotal: memUsage.heapTotal,
            external: memUsage.external,
            rss: memUsage.rss,
          },
        });
      }

      // Disk Usage (simplified)
      const diskUsage = Math.random() * 100; // Placeholder
      metrics.push({
        id: `disk_${timestamp.getTime()}`,
        timestamp,
        metricType: "disk",
        value: diskUsage,
        unit: "percentage",
      });

      // Network metrics (simplified)
      const networkLatency = Math.random() * 100; // Placeholder
      metrics.push({
        id: `net_${timestamp.getTime()}`,
        timestamp,
        metricType: "network",
        value: networkLatency,
        unit: "ms",
      });

      // Response time average
      if (this.responseTimes.length > 0) {
        const avgResponseTime =
          this.responseTimes.reduce((a, b) => a + b, 0) /
          this.responseTimes.length;
        metrics.push({
          id: `resp_${timestamp.getTime()}`,
          timestamp,
          metricType: "response_time",
          value: avgResponseTime,
          unit: "ms",
        });
      }

      // Error rate
      const errorRate =
        this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0;
      metrics.push({
        id: `err_${timestamp.getTime()}`,
        timestamp,
        metricType: "error_rate",
        value: errorRate,
        unit: "percentage",
      });
    } catch (error) {
      logger.error(
        "Failed to get system metrics",
        error instanceof Error ? error : new Error(String(error))
      );
    }

    return metrics;
  }

  async trackError(data: {
    errorType: ErrorLog["errorType"];
    message: string;
    stack?: string;
    url: string;
    sessionId?: string;
    userId?: string;
    ipAddress: string;
    userAgent: string;
    severity: ErrorLog["severity"];
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    try {
      this.errorCount++;

      const errorLog: ErrorLog = {
        id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        errorType: data.errorType,
        message: data.message,
        stack: data.stack,
        url: data.url,
        sessionId: data.sessionId,
        userId: data.userId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        severity: data.severity,
        resolved: false,
        metadata: data.metadata,
      };

      // Store in Sanity
      await this.client.create({
        _type: "errorLog",
        ...errorLog,
      });

      logger.info("Error logged", {
        message: data.message,
        severity: data.severity,
        url: data.url,
      });
    } catch (error) {
      logger.error(
        "Failed to track error",
        error instanceof Error ? error : new Error(String(error)),
        { message: data.message }
      );
    }
  }

  trackRequest(responseTime: number): void {
    this.requestCount++;
    this.responseTimes.push(responseTime);

    // Keep only last 1000 response times to prevent memory bloat
    if (this.responseTimes.length > 1000) {
      this.responseTimes = this.responseTimes.slice(-1000);
    }
  }

  async getMonitoringStats(): Promise<MonitoringStats> {
    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Get recent metrics
      const recentMetrics = await this.client.fetch(
        `
        *[_type == "systemMetric" && timestamp >= $oneHourAgo] | order(timestamp desc)
      `,
        { oneHourAgo: oneHourAgo.toISOString() }
      );

      // Get recent errors
      const recentErrors = await this.client.fetch(
        `
        *[_type == "errorLog" && timestamp >= $oneDayAgo] | order(timestamp desc)
      `,
        { oneDayAgo: oneDayAgo.toISOString() }
      );

      // Calculate error counts by message
      const errorCounts: Record<string, number> = {};
      recentErrors.forEach((error: { message: string }) => {
        errorCounts[error.message] = (errorCounts[error.message] || 0) + 1;
      });

      const topErrors = Object.entries(errorCounts)
        .map(([message, count]) => ({ message, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Get latest system health metrics
      const latestMetrics = recentMetrics.slice(0, 6); // Last 6 metrics (30 minutes)
      const cpu =
        latestMetrics.find(
          (m: { metricType: string; value: number }) => m.metricType === "cpu"
        )?.value || 0;
      const memory =
        latestMetrics.find(
          (m: { metricType: string; value: number }) =>
            m.metricType === "memory"
        )?.value || 0;
      const disk =
        latestMetrics.find(
          (m: { metricType: string; value: number }) => m.metricType === "disk"
        )?.value || 0;

      // Calculate uptime
      const uptime =
        ((now.getTime() - this.startTime.getTime()) / (1000 * 60 * 60 * 24)) *
        100; // Percentage of 24 hours

      // Calculate error rate
      const errorRate =
        this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0;

      // Calculate average response time
      const avgResponseTime =
        this.responseTimes.length > 0
          ? this.responseTimes.reduce((a, b) => a + b, 0) /
            this.responseTimes.length
          : 0;

      return {
        totalRequests: this.requestCount,
        averageResponseTime: avgResponseTime,
        errorRate,
        uptime: Math.min(uptime, 100), // Cap at 100%
        activeUsers: 0, // Would need to implement session tracking
        topErrors,
        systemHealth: {
          cpu,
          memory,
          disk,
        },
      };
    } catch (error) {
      logger.error(
        "Failed to get monitoring stats",
        error instanceof Error ? error : new Error(String(error))
      );
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        uptime: 0,
        activeUsers: 0,
        topErrors: [],
        systemHealth: {
          cpu: 0,
          memory: 0,
          disk: 0,
        },
      };
    }
  }

  async resolveError(errorId: string): Promise<void> {
    try {
      await this.client.patch(errorId).set({ resolved: true }).commit();

      logger.info("Error marked as resolved", { errorId });
    } catch (error) {
      logger.error(
        "Failed to resolve error",
        error instanceof Error ? error : new Error(String(error)),
        { errorId }
      );
    }
  }

  stop(): void {
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
    }
  }
}

// Create singleton instance
export const systemMonitor = new SystemMonitor();
