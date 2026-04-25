import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { getPerformanceMetrics } from "@/lib/performance/monitor";
import { securityScanner } from "@/lib/security/scanner";

// Force Node.js runtime for this API route
export const runtime = "nodejs";

interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  services: {
    stripe: "connected" | "disconnected" | "error";
    sanity: "connected" | "disconnected" | "error";
    email: "configured" | "not-configured" | "error";
  };
  performance: {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    memoryUsage: {
      heapUsed: number;
      heapTotal: number;
      external: number;
      rss: number;
    };
    slowRequests: number;
  };
  security: {
    vulnerabilities: number;
    lastScan: string;
    recommendations: string[];
  };
  system: {
    nodeVersion: string;
    platform: string;
    arch: string;
    memory: {
      total: number;
      free: number;
      used: number;
    };
  };
}

/**
 * Check Stripe connection
 */
async function checkStripeConnection(): Promise<
  "connected" | "disconnected" | "error"
> {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return "disconnected";
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    await stripe.paymentMethods.list({ limit: 1 });
    return "connected";
  } catch (error) {
    logger.error(
      "Stripe connection check failed",
      error instanceof Error ? error : new Error(String(error))
    );
    return "error";
  }
}

/**
 * Check Sanity connection
 */
async function checkSanityConnection(): Promise<
  "connected" | "disconnected" | "error"
> {
  try {
    if (
      !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
      !process.env.SANITY_API_TOKEN
    ) {
      return "disconnected";
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require("@sanity/client");
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    await client.fetch("*[_type == 'system' && _id == 'system'][0]");
    return "connected";
  } catch (error) {
    logger.error(
      "Sanity connection check failed",
      error instanceof Error ? error : new Error(String(error))
    );
    return "error";
  }
}

/**
 * Check email configuration
 */
function checkEmailConfiguration(): "configured" | "not-configured" | "error" {
  const requiredEnvVars = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "FROM_EMAIL",
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length === 0) {
    return "configured";
  } else if (missingVars.length === requiredEnvVars.length) {
    return "not-configured";
  } else {
    return "error";
  }
}

/**
 * Get system information
 */
function getSystemInfo(): {
  nodeVersion: string;
  platform: string;
  arch: string;
  memory: {
    total: number;
    free: number;
    used: number;
  };
} {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const os = require("os");

  return {
    nodeVersion: process.version,
    platform: os.platform(),
    arch: os.arch(),
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
    },
  };
}

/**
 * Determine overall health status
 */
function determineHealthStatus(
  services: HealthCheckResponse["services"],
  performance: HealthCheckResponse["performance"],
  security: HealthCheckResponse["security"]
): "healthy" | "degraded" | "unhealthy" {
  // Check if any critical services are down
  const criticalServices = [services.stripe, services.sanity];
  const hasCriticalFailure = criticalServices.some(
    service => service === "error"
  );

  if (hasCriticalFailure) {
    return "unhealthy";
  }

  // Check performance metrics
  const hasPerformanceIssues =
    performance.errorRate > 10 || // More than 10% error rate
    performance.averageResponseTime > 2000 || // More than 2 seconds average
    performance.memoryUsage.heapUsed > 500 * 1024 * 1024; // More than 500MB

  // Check security
  const hasSecurityIssues = security.vulnerabilities > 5; // More than 5 vulnerabilities

  if (hasPerformanceIssues || hasSecurityIssues) {
    return "degraded";
  }

  return "healthy";
}

/**
 * Health check handler
 */
async function healthCheckHandler(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  // Check service connections
  const [stripeStatus, sanityStatus] = await Promise.all([
    checkStripeConnection(),
    checkSanityConnection(),
  ]);

  const emailStatus = checkEmailConfiguration();

  // Get performance metrics
  const performanceMetrics = getPerformanceMetrics();

  // Perform security scan
  const securityScan = await securityScanner.performFullScan(request);

  // Get system information
  const systemInfo = getSystemInfo();

  // Determine overall health status
  const services = {
    stripe: stripeStatus,
    sanity: sanityStatus,
    email: emailStatus,
  };

  const performance = {
    totalRequests: performanceMetrics.totalRequests,
    averageResponseTime: Math.round(performanceMetrics.averageResponseTime),
    errorRate: Math.round(performanceMetrics.errorRate * 100) / 100,
    memoryUsage: {
      heapUsed: performanceMetrics.memoryUsage.heapUsed,
      heapTotal: performanceMetrics.memoryUsage.heapTotal,
      external: performanceMetrics.memoryUsage.external,
      rss: performanceMetrics.memoryUsage.rss,
    },
    slowRequests: performanceMetrics.slowRequests,
  };

  const security = {
    vulnerabilities: securityScan.summary.total,
    lastScan: securityScan.timestamp,
    recommendations: securityScan.recommendations,
  };

  const status = determineHealthStatus(services, performance, security);

  const response: HealthCheckResponse = {
    status,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    services,
    performance,
    security,
    system: systemInfo,
  };

  const duration = Date.now() - startTime;

  // Log health check results
  logger.info("Health check completed", {
    status,
    duration,
    services,
    performance: {
      totalRequests: performance.totalRequests,
      averageResponseTime: performance.averageResponseTime,
      errorRate: performance.errorRate,
    },
    security: {
      vulnerabilities: security.vulnerabilities,
    },
  });

  return NextResponse.json(response, {
    status: status === "unhealthy" ? 503 : status === "degraded" ? 200 : 200,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Health-Check": "true",
      "X-Response-Time": `${duration}ms`,
    },
  });
}

// Export the handler
export const GET = healthCheckHandler;

export async function HEAD(): Promise<NextResponse> {
  // Simple health check for load balancers

  return new NextResponse(null, { status: 200 });
}
