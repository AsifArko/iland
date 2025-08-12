/**
 * Security Scanner
 *
 * Scans for common security vulnerabilities and provides security recommendations
 */

import { logger } from "@/lib/logger";

export interface SecurityVulnerability {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  recommendation: string;
  category:
    | "authentication"
    | "authorization"
    | "input-validation"
    | "data-exposure"
    | "configuration";
}

export interface SecurityScanResult {
  timestamp: string;
  vulnerabilities: SecurityVulnerability[];
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  recommendations: string[];
}

class SecurityScanner {
  private vulnerabilities: SecurityVulnerability[] = [];

  constructor() {
    this.initializeVulnerabilities();
  }

  /**
   * Initialize known vulnerability patterns
   */
  private initializeVulnerabilities(): void {
    this.vulnerabilities = [
      // SQL Injection
      {
        id: "SQL_INJECTION",
        severity: "critical",
        title: "SQL Injection Vulnerability",
        description: "Potential SQL injection detected in user input",
        recommendation: "Use parameterized queries and input validation",
        category: "input-validation",
      },
      // XSS
      {
        id: "XSS",
        severity: "high",
        title: "Cross-Site Scripting (XSS)",
        description: "Potential XSS vulnerability in user input",
        recommendation:
          "Sanitize user input and implement Content Security Policy",
        category: "input-validation",
      },
      // CSRF
      {
        id: "CSRF",
        severity: "high",
        title: "Cross-Site Request Forgery",
        description: "Missing CSRF protection on state-changing operations",
        recommendation: "Implement CSRF tokens and validate origin headers",
        category: "authentication",
      },
      // Sensitive Data Exposure
      {
        id: "SENSITIVE_DATA_EXPOSURE",
        severity: "high",
        title: "Sensitive Data Exposure",
        description: "Sensitive data may be exposed in logs or responses",
        recommendation:
          "Review logging and response data for sensitive information",
        category: "data-exposure",
      },
      // Weak Authentication
      {
        id: "WEAK_AUTH",
        severity: "medium",
        title: "Weak Authentication",
        description: "Authentication mechanism may be insufficient",
        recommendation: "Implement strong authentication with rate limiting",
        category: "authentication",
      },
      // Missing Security Headers
      {
        id: "MISSING_SECURITY_HEADERS",
        severity: "medium",
        title: "Missing Security Headers",
        description: "Important security headers are not configured",
        recommendation:
          "Configure Content-Security-Policy, X-Frame-Options, etc.",
        category: "configuration",
      },
      // Insecure Dependencies
      {
        id: "INSECURE_DEPENDENCIES",
        severity: "medium",
        title: "Insecure Dependencies",
        description: "Outdated or vulnerable dependencies detected",
        recommendation: "Update dependencies and run security audits",
        category: "configuration",
      },
    ];
  }

  /**
   * Scan request for security vulnerabilities
   */
  scanRequest(request: Request): SecurityVulnerability[] {
    const foundVulnerabilities: SecurityVulnerability[] = [];
    const url = new URL(request.url);
    const headers = request.headers;

    // Check for missing security headers
    if (!headers.get("content-security-policy")) {
      const missingHeadersVuln = this.vulnerabilities.find(
        v => v.id === "MISSING_SECURITY_HEADERS"
      );
      if (missingHeadersVuln) {
        foundVulnerabilities.push(missingHeadersVuln);
      }
    }

    // Check for potential XSS in query parameters
    const queryParams = Array.from(url.searchParams.entries());
    for (const [, value] of queryParams) {
      if (this.containsXSSPayload(value)) {
        const xssVuln = this.vulnerabilities.find(v => v.id === "XSS");
        if (xssVuln) {
          foundVulnerabilities.push(xssVuln);
        }
        break;
      }
    }

    // Check for potential SQL injection in query parameters
    for (const [, value] of queryParams) {
      if (this.containsSQLInjection(value)) {
        const sqlVuln = this.vulnerabilities.find(
          v => v.id === "SQL_INJECTION"
        );
        if (sqlVuln) {
          foundVulnerabilities.push(sqlVuln);
        }
        break;
      }
    }

    // Check for missing CSRF protection on state-changing operations
    if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
      if (!headers.get("x-csrf-token") && !headers.get("x-xsrf-token")) {
        const csrfVuln = this.vulnerabilities.find(v => v.id === "CSRF");
        if (csrfVuln) {
          foundVulnerabilities.push(csrfVuln);
        }
      }
    }

    return foundVulnerabilities;
  }

  /**
   * Scan response for security issues
   */
  scanResponse(response: Response): SecurityVulnerability[] {
    const foundVulnerabilities: SecurityVulnerability[] = [];
    const headers = response.headers;

    // Check for missing security headers
    if (!headers.get("content-security-policy")) {
      const missingHeadersVuln = this.vulnerabilities.find(
        v => v.id === "MISSING_SECURITY_HEADERS"
      );
      if (missingHeadersVuln) {
        foundVulnerabilities.push(missingHeadersVuln);
      }
    }

    if (!headers.get("x-frame-options")) {
      const missingHeadersVuln = this.vulnerabilities.find(
        v => v.id === "MISSING_SECURITY_HEADERS"
      );
      if (missingHeadersVuln) {
        foundVulnerabilities.push(missingHeadersVuln);
      }
    }

    // Check for sensitive data in response headers
    const sensitiveHeaders = ["x-powered-by", "server", "x-aspnet-version"];
    for (const header of sensitiveHeaders) {
      if (headers.get(header)) {
        const dataExposureVuln = this.vulnerabilities.find(
          v => v.id === "SENSITIVE_DATA_EXPOSURE"
        );
        if (dataExposureVuln) {
          foundVulnerabilities.push(dataExposureVuln);
        }
        break;
      }
    }

    return foundVulnerabilities;
  }

  /**
   * Scan environment for security issues
   */
  scanEnvironment(): SecurityVulnerability[] {
    const foundVulnerabilities: SecurityVulnerability[] = [];

    // Check for sensitive environment variables
    const sensitiveEnvVars = [
      "STRIPE_SECRET_KEY",
      "DATABASE_URL",
      "JWT_SECRET",
      "API_KEY",
    ];

    for (const envVar of sensitiveEnvVars) {
      if (process.env[envVar] && process.env.NODE_ENV === "development") {
        const dataExposureVuln = this.vulnerabilities.find(
          v => v.id === "SENSITIVE_DATA_EXPOSURE"
        );
        if (dataExposureVuln) {
          foundVulnerabilities.push(dataExposureVuln);
        }
        break;
      }
    }

    // Check for missing HTTPS in production
    if (process.env.NODE_ENV === "production" && !process.env.FORCE_HTTPS) {
      const missingHeadersVuln = this.vulnerabilities.find(
        v => v.id === "MISSING_SECURITY_HEADERS"
      );
      if (missingHeadersVuln) {
        foundVulnerabilities.push(missingHeadersVuln);
      }
    }

    return foundVulnerabilities;
  }

  /**
   * Perform comprehensive security scan
   */
  async performFullScan(
    request?: Request,
    response?: Response
  ): Promise<SecurityScanResult> {
    const allVulnerabilities: SecurityVulnerability[] = [];

    // Scan request if provided
    if (request) {
      allVulnerabilities.push(...this.scanRequest(request));
    }

    // Scan response if provided
    if (response) {
      allVulnerabilities.push(...this.scanResponse(response));
    }

    // Scan environment
    allVulnerabilities.push(...this.scanEnvironment());

    // Remove duplicates
    const uniqueVulnerabilities =
      this.removeDuplicateVulnerabilities(allVulnerabilities);

    // Generate summary
    const summary = {
      total: uniqueVulnerabilities.length,
      critical: uniqueVulnerabilities.filter(v => v.severity === "critical")
        .length,
      high: uniqueVulnerabilities.filter(v => v.severity === "high").length,
      medium: uniqueVulnerabilities.filter(v => v.severity === "medium").length,
      low: uniqueVulnerabilities.filter(v => v.severity === "low").length,
    };

    // Generate recommendations
    const recommendations = this.generateRecommendations(uniqueVulnerabilities);

    const result: SecurityScanResult = {
      timestamp: new Date().toISOString(),
      vulnerabilities: uniqueVulnerabilities,
      summary,
      recommendations,
    };

    // Log security scan results
    if (uniqueVulnerabilities.length > 0) {
      logger.warn("Security vulnerabilities detected", {
        vulnerabilities: uniqueVulnerabilities,
        summary,
        recommendations,
      });
    } else {
      logger.info("Security scan completed - no vulnerabilities detected");
    }

    return result;
  }

  /**
   * Check if string contains XSS payload
   */
  private containsXSSPayload(value: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    ];

    return xssPatterns.some(pattern => pattern.test(value));
  }

  /**
   * Check if string contains SQL injection
   */
  private containsSQLInjection(value: string): boolean {
    const sqlPatterns = [
      /(\b(union|select|insert|update|delete|drop|create|alter)\b)/gi,
      /(\b(or|and)\b\s+\d+\s*=\s*\d+)/gi,
      /(\b(union|select|insert|update|delete|drop|create|alter)\b.*\b(union|select|insert|update|delete|drop|create|alter)\b)/gi,
      /(\b(union|select|insert|update|delete|drop|create|alter)\b.*\b(or|and)\b)/gi,
    ];

    return sqlPatterns.some(pattern => pattern.test(value));
  }

  /**
   * Remove duplicate vulnerabilities
   */
  private removeDuplicateVulnerabilities(
    vulnerabilities: SecurityVulnerability[]
  ): SecurityVulnerability[] {
    const seen = new Set<string>();
    return vulnerabilities.filter(v => {
      if (seen.has(v.id)) {
        return false;
      }
      seen.add(v.id);
      return true;
    });
  }

  /**
   * Generate security recommendations
   */
  private generateRecommendations(
    vulnerabilities: SecurityVulnerability[]
  ): string[] {
    const recommendations: string[] = [];

    if (vulnerabilities.some(v => v.id === "SQL_INJECTION")) {
      recommendations.push(
        "Implement parameterized queries and input validation for all database operations"
      );
    }

    if (vulnerabilities.some(v => v.id === "XSS")) {
      recommendations.push(
        "Sanitize all user input and implement Content Security Policy"
      );
    }

    if (vulnerabilities.some(v => v.id === "CSRF")) {
      recommendations.push(
        "Implement CSRF tokens for all state-changing operations"
      );
    }

    if (vulnerabilities.some(v => v.id === "SENSITIVE_DATA_EXPOSURE")) {
      recommendations.push(
        "Review logging and response data to prevent sensitive information exposure"
      );
    }

    if (vulnerabilities.some(v => v.id === "MISSING_SECURITY_HEADERS")) {
      recommendations.push("Configure all recommended security headers");
    }

    return recommendations;
  }
}

// Global security scanner instance
export const securityScanner = new SecurityScanner();

/**
 * Security scanning middleware
 */
export function withSecurityScanning<T extends unknown[]>(
  handler: (request: Request, ...args: T) => Promise<Response>
): (request: Request, ...args: T) => Promise<Response> {
  return async (request: Request, ...args: T): Promise<Response> => {
    // Scan request before processing
    const requestVulnerabilities = securityScanner.scanRequest(request);

    if (requestVulnerabilities.length > 0) {
      logger.warn("Security vulnerabilities detected in request", {
        vulnerabilities: requestVulnerabilities,
        url: request.url,
        method: request.method,
      });
    }

    // Process request
    const response = await handler(request, ...args);

    // Scan response after processing
    const responseVulnerabilities = securityScanner.scanResponse(response);

    if (responseVulnerabilities.length > 0) {
      logger.warn("Security vulnerabilities detected in response", {
        vulnerabilities: responseVulnerabilities,
        status: response.status,
      });
    }

    return response;
  };
}
