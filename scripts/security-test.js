#!/usr/bin/env node

/**
 * Security Testing Script
 *
 * Performs automated security checks on the application
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

class SecurityTester {
  constructor(config = {}) {
    this.config = {
      baseUrl: config.baseUrl || "http://localhost:3000",
      outputFile: config.outputFile || "./security-report.json",
      ...config,
    };

    this.vulnerabilities = [];
    this.startTime = Date.now();
  }

  /**
   * Make HTTP request
   */
  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith("https") ? https : http;
      const urlObj = new URL(url);

      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === "https:" ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || "GET",
        headers: options.headers || {},
        ...options,
      };

      const req = protocol.request(requestOptions, res => {
        let data = "";

        res.on("data", chunk => {
          data += chunk;
        });

        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
            url: url,
          });
        });
      });

      req.on("error", error => {
        reject(error);
      });

      if (options.body) {
        req.write(options.body);
      }

      req.end();
    });
  }

  /**
   * Test for missing security headers
   */
  async testSecurityHeaders() {
    console.log("🔒 Testing security headers...");

    try {
      const response = await this.makeRequest(this.config.baseUrl);
      const headers = response.headers;

      const requiredHeaders = [
        "x-frame-options",
        "x-content-type-options",
        "x-xss-protection",
        "content-security-policy",
        "referrer-policy",
      ];

      const missingHeaders = requiredHeaders.filter(header => !headers[header]);

      if (missingHeaders.length > 0) {
        this.vulnerabilities.push({
          type: "missing_security_headers",
          severity: "medium",
          description: `Missing security headers: ${missingHeaders.join(", ")}`,
          recommendation: "Configure all recommended security headers",
        });
        console.log(`❌ Missing headers: ${missingHeaders.join(", ")}`);
      } else {
        console.log("✅ All security headers present");
      }

      // Check for sensitive headers
      const sensitiveHeaders = ["x-powered-by", "server", "x-aspnet-version"];
      const exposedHeaders = sensitiveHeaders.filter(header => headers[header]);

      if (exposedHeaders.length > 0) {
        this.vulnerabilities.push({
          type: "sensitive_headers_exposed",
          severity: "low",
          description: `Sensitive headers exposed: ${exposedHeaders.join(", ")}`,
          recommendation: "Remove or hide sensitive server information",
        });
        console.log(
          `⚠️  Sensitive headers exposed: ${exposedHeaders.join(", ")}`
        );
      }
    } catch (error) {
      console.log(`❌ Failed to test security headers: ${error.message}`);
    }
  }

  /**
   * Test for XSS vulnerabilities
   */
  async testXSSVulnerabilities() {
    console.log("🛡️ Testing for XSS vulnerabilities...");

    const xssPayloads = [
      '<script>alert("XSS")</script>',
      'javascript:alert("XSS")',
      '<img src="x" onerror="alert(\'XSS\')">',
      "<iframe src=\"javascript:alert('XSS')\"></iframe>",
    ];

    const testEndpoints = ["/api/contact", "/api/test-email"];

    for (const endpoint of testEndpoints) {
      for (const payload of xssPayloads) {
        try {
          const response = await this.makeRequest(
            `${this.config.baseUrl}${endpoint}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: payload,
                email: "test@example.com",
                subject: "XSS Test",
                message: payload,
              }),
            }
          );

          // Check if payload is reflected in response
          if (response.data.includes(payload)) {
            this.vulnerabilities.push({
              type: "xss_vulnerability",
              severity: "high",
              description: `XSS payload reflected in ${endpoint}`,
              recommendation:
                "Sanitize user input and implement Content Security Policy",
              payload: payload,
              endpoint: endpoint,
            });
            console.log(`❌ XSS vulnerability found in ${endpoint}`);
            break;
          }
        } catch (error) {
          // Ignore errors for security testing
        }
      }
    }

    console.log("✅ XSS testing completed");
  }

  /**
   * Test for SQL injection vulnerabilities
   */
  async testSQLInjection() {
    console.log("🗄️ Testing for SQL injection vulnerabilities...");

    const sqlPayloads = [
      "' OR '1'='1",
      "'; DROP TABLE users; --",
      "' UNION SELECT * FROM users --",
      "1' AND 1=1 --",
    ];

    const testEndpoints = ["/api/get-price", "/api/health"];

    for (const endpoint of testEndpoints) {
      for (const payload of sqlPayloads) {
        try {
          const url = `${this.config.baseUrl}${endpoint}?test=${encodeURIComponent(payload)}`;
          const response = await this.makeRequest(url);

          // Check for SQL error messages
          const sqlErrors = [
            "sql syntax",
            "mysql_fetch",
            "oracle error",
            "postgresql error",
            "sqlite error",
          ];

          const hasError = sqlErrors.some(error =>
            response.data.toLowerCase().includes(error)
          );

          if (hasError) {
            this.vulnerabilities.push({
              type: "sql_injection",
              severity: "critical",
              description: `SQL injection vulnerability in ${endpoint}`,
              recommendation: "Use parameterized queries and input validation",
              payload: payload,
              endpoint: endpoint,
            });
            console.log(`❌ SQL injection vulnerability found in ${endpoint}`);
            break;
          }
        } catch (error) {
          // Ignore errors for security testing
        }
      }
    }

    console.log("✅ SQL injection testing completed");
  }

  /**
   * Test for CSRF vulnerabilities
   */
  async testCSRFVulnerabilities() {
    console.log("🔄 Testing for CSRF vulnerabilities...");

    const csrfEndpoints = ["/api/contact", "/api/create-checkout-session"];

    for (const endpoint of csrfEndpoints) {
      try {
        const response = await this.makeRequest(
          `${this.config.baseUrl}${endpoint}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://malicious-site.com",
            },
            body: JSON.stringify({
              name: "CSRF Test",
              email: "test@example.com",
              subject: "CSRF Test",
              message: "CSRF Test",
            }),
          }
        );

        // Check if request was accepted without CSRF protection
        if (response.statusCode === 200 || response.statusCode === 201) {
          this.vulnerabilities.push({
            type: "csrf_vulnerability",
            severity: "high",
            description: `CSRF vulnerability in ${endpoint}`,
            recommendation: "Implement CSRF tokens and validate origin headers",
            endpoint: endpoint,
          });
          console.log(`❌ CSRF vulnerability found in ${endpoint}`);
        }
      } catch (error) {
        // Ignore errors for security testing
      }
    }

    console.log("✅ CSRF testing completed");
  }

  /**
   * Test for information disclosure
   */
  async testInformationDisclosure() {
    console.log("🔍 Testing for information disclosure...");

    const sensitiveEndpoints = [
      "/.env",
      "/config.json",
      "/package.json",
      "/.git/config",
      "/api/admin",
      "/admin",
      "/debug",
      "/error",
    ];

    for (const endpoint of sensitiveEndpoints) {
      try {
        const response = await this.makeRequest(
          `${this.config.baseUrl}${endpoint}`
        );

        if (response.statusCode === 200) {
          this.vulnerabilities.push({
            type: "information_disclosure",
            severity: "medium",
            description: `Sensitive information exposed at ${endpoint}`,
            recommendation: "Remove or protect sensitive endpoints",
            endpoint: endpoint,
          });
          console.log(`❌ Information disclosure at ${endpoint}`);
        }
      } catch (error) {
        // Ignore errors for security testing
      }
    }

    console.log("✅ Information disclosure testing completed");
  }

  /**
   * Test for rate limiting
   */
  async testRateLimiting() {
    console.log("⏱️ Testing rate limiting...");

    const testEndpoint = "/api/contact";
    const requests = [];

    // Make multiple rapid requests
    for (let i = 0; i < 20; i++) {
      try {
        const response = await this.makeRequest(
          `${this.config.baseUrl}${testEndpoint}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: `Rate Limit Test ${i}`,
              email: "test@example.com",
              subject: "Rate Limit Test",
              message: "Rate Limit Test",
            }),
          }
        );

        requests.push({
          statusCode: response.statusCode,
          headers: response.headers,
        });
      } catch (error) {
        requests.push({ error: error.message });
      }
    }

    // Check if rate limiting is working
    const rateLimited = requests.some(
      req =>
        req.statusCode === 429 || (req.headers && req.headers["retry-after"])
    );

    if (!rateLimited) {
      this.vulnerabilities.push({
        type: "missing_rate_limiting",
        severity: "medium",
        description: "Rate limiting not properly configured",
        recommendation: "Implement rate limiting for all endpoints",
        endpoint: testEndpoint,
      });
      console.log("❌ Rate limiting not detected");
    } else {
      console.log("✅ Rate limiting is working");
    }
  }

  /**
   * Generate security report
   */
  generateReport() {
    const duration = Date.now() - this.startTime;

    const summary = {
      totalVulnerabilities: this.vulnerabilities.length,
      critical: this.vulnerabilities.filter(v => v.severity === "critical")
        .length,
      high: this.vulnerabilities.filter(v => v.severity === "high").length,
      medium: this.vulnerabilities.filter(v => v.severity === "medium").length,
      low: this.vulnerabilities.filter(v => v.severity === "low").length,
    };

    const report = {
      timestamp: new Date().toISOString(),
      duration: duration,
      configuration: this.config,
      summary: summary,
      vulnerabilities: this.vulnerabilities,
      recommendations: this.generateRecommendations(),
    };

    return report;
  }

  /**
   * Generate security recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.vulnerabilities.some(v => v.type === "sql_injection")) {
      recommendations.push(
        "Implement parameterized queries and input validation for all database operations"
      );
    }

    if (this.vulnerabilities.some(v => v.type === "xss_vulnerability")) {
      recommendations.push(
        "Sanitize all user input and implement Content Security Policy"
      );
    }

    if (this.vulnerabilities.some(v => v.type === "csrf_vulnerability")) {
      recommendations.push(
        "Implement CSRF tokens for all state-changing operations"
      );
    }

    if (this.vulnerabilities.some(v => v.type === "missing_security_headers")) {
      recommendations.push("Configure all recommended security headers");
    }

    if (this.vulnerabilities.some(v => v.type === "missing_rate_limiting")) {
      recommendations.push("Implement rate limiting for all endpoints");
    }

    if (this.vulnerabilities.some(v => v.type === "information_disclosure")) {
      recommendations.push("Review and secure all sensitive endpoints");
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "No critical security issues found. Continue regular security testing."
      );
    }

    return recommendations;
  }

  /**
   * Save report to file
   */
  saveReport(report) {
    try {
      fs.writeFileSync(this.config.outputFile, JSON.stringify(report, null, 2));
      console.log(`📊 Security report saved to ${this.config.outputFile}`);
    } catch (error) {
      console.error("Failed to save security report:", error.message);
    }
  }

  /**
   * Print summary to console
   */
  printSummary(summary) {
    console.log("\n🔒 Security Test Summary:");
    console.log("==========================");
    console.log(`Total Vulnerabilities: ${summary.totalVulnerabilities}`);
    console.log(`Critical: ${summary.critical}`);
    console.log(`High: ${summary.high}`);
    console.log(`Medium: ${summary.medium}`);
    console.log(`Low: ${summary.low}`);
  }

  /**
   * Run all security tests
   */
  async runAllTests() {
    console.log("🚀 Starting security testing...\n");

    await this.testSecurityHeaders();
    await this.testXSSVulnerabilities();
    await this.testSQLInjection();
    await this.testCSRFVulnerabilities();
    await this.testInformationDisclosure();
    await this.testRateLimiting();

    console.log("\n🛑 Security testing completed");

    const report = this.generateReport();
    this.printSummary(report.summary);

    console.log("\n💡 Recommendations:");
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });

    this.saveReport(report);

    return report;
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const config = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace("--", "");
    const value = args[i + 1];

    switch (key) {
      case "url":
        config.baseUrl = value;
        break;
      case "output":
        config.outputFile = value;
        break;
    }
  }

  const tester = new SecurityTester(config);

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n🛑 Received SIGINT, stopping security testing...");
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    console.log("\n🛑 Received SIGTERM, stopping security testing...");
    process.exit(0);
  });

  tester
    .runAllTests()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      console.error("Security testing failed:", error);
      process.exit(1);
    });
}

module.exports = SecurityTester;
