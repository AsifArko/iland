#!/usr/bin/env node

/**
 * Performance Monitoring Script
 *
 * Monitors application performance and generates reports
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

class PerformanceMonitor {
  constructor(config = {}) {
    this.config = {
      baseUrl: config.baseUrl || "http://localhost:3000",
      interval: config.interval || 30000, // 30 seconds
      duration: config.duration || 300000, // 5 minutes
      endpoints: config.endpoints || ["/api/health", "/", "/api/get-price"],
      outputFile: config.outputFile || "./performance-report.json",
      ...config,
    };

    this.metrics = [];
    this.startTime = Date.now();
  }

  /**
   * Make HTTP request and measure performance
   */
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const protocol = url.startsWith("https") ? https : http;

      const req = protocol.get(url, res => {
        let data = "";

        res.on("data", chunk => {
          data += chunk;
        });

        res.on("end", () => {
          const endTime = Date.now();
          const duration = endTime - startTime;

          resolve({
            url,
            statusCode: res.statusCode,
            duration,
            timestamp: new Date().toISOString(),
            headers: res.headers,
            size: data.length,
          });
        });
      });

      req.on("error", error => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        reject({
          url,
          error: error.message,
          duration,
          timestamp: new Date().toISOString(),
        });
      });

      req.setTimeout(10000, () => {
        req.destroy();
        reject({
          url,
          error: "Request timeout",
          duration: 10000,
          timestamp: new Date().toISOString(),
        });
      });
    });
  }

  /**
   * Monitor single endpoint
   */
  async monitorEndpoint(endpoint) {
    const url = `${this.config.baseUrl}${endpoint}`;

    try {
      const result = await this.makeRequest(url);
      console.log(
        `✅ ${endpoint}: ${result.duration}ms (${result.statusCode})`
      );
      return result;
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.error} (${error.duration}ms)`);
      return error;
    }
  }

  /**
   * Monitor all endpoints
   */
  async monitorAllEndpoints() {
    const results = [];

    for (const endpoint of this.config.endpoints) {
      const result = await this.monitorEndpoint(endpoint);
      results.push(result);
    }

    return results;
  }

  /**
   * Calculate performance statistics
   */
  calculateStats(metrics) {
    const successfulRequests = metrics.filter(m => !m.error);
    const failedRequests = metrics.filter(m => m.error);

    if (successfulRequests.length === 0) {
      return {
        totalRequests: metrics.length,
        successfulRequests: 0,
        failedRequests: failedRequests.length,
        averageResponseTime: 0,
        minResponseTime: 0,
        maxResponseTime: 0,
        errorRate: 100,
        throughput: 0,
      };
    }

    const responseTimes = successfulRequests.map(m => m.duration);
    const totalDuration =
      Math.max(...responseTimes) - Math.min(...responseTimes);

    return {
      totalRequests: metrics.length,
      successfulRequests: successfulRequests.length,
      failedRequests: failedRequests.length,
      averageResponseTime: Math.round(
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      ),
      minResponseTime: Math.min(...responseTimes),
      maxResponseTime: Math.max(...responseTimes),
      errorRate: Math.round((failedRequests.length / metrics.length) * 100),
      throughput:
        totalDuration > 0
          ? Math.round((successfulRequests.length / totalDuration) * 1000)
          : 0,
    };
  }

  /**
   * Generate performance report
   */
  generateReport() {
    const stats = this.calculateStats(this.metrics);
    const duration = Date.now() - this.startTime;

    const report = {
      timestamp: new Date().toISOString(),
      duration: duration,
      configuration: this.config,
      summary: stats,
      metrics: this.metrics,
      recommendations: this.generateRecommendations(stats),
    };

    return report;
  }

  /**
   * Generate performance recommendations
   */
  generateRecommendations(stats) {
    const recommendations = [];

    if (stats.averageResponseTime > 1000) {
      recommendations.push(
        "Consider optimizing response times - average is over 1 second"
      );
    }

    if (stats.errorRate > 5) {
      recommendations.push(
        "High error rate detected - investigate failed requests"
      );
    }

    if (stats.maxResponseTime > 5000) {
      recommendations.push(
        "Some requests are taking over 5 seconds - optimize slow endpoints"
      );
    }

    if (stats.throughput < 10) {
      recommendations.push(
        "Low throughput detected - consider performance optimizations"
      );
    }

    if (recommendations.length === 0) {
      recommendations.push("Performance looks good!");
    }

    return recommendations;
  }

  /**
   * Save report to file
   */
  saveReport(report) {
    try {
      fs.writeFileSync(this.config.outputFile, JSON.stringify(report, null, 2));
      console.log(`📊 Performance report saved to ${this.config.outputFile}`);
    } catch (error) {
      console.error("Failed to save performance report:", error.message);
    }
  }

  /**
   * Print summary to console
   */
  printSummary(stats) {
    console.log("\n📈 Performance Summary:");
    console.log("========================");
    console.log(`Total Requests: ${stats.totalRequests}`);
    console.log(`Successful: ${stats.successfulRequests}`);
    console.log(`Failed: ${stats.failedRequests}`);
    console.log(`Error Rate: ${stats.errorRate}%`);
    console.log(`Average Response Time: ${stats.averageResponseTime}ms`);
    console.log(`Min Response Time: ${stats.minResponseTime}ms`);
    console.log(`Max Response Time: ${stats.maxResponseTime}ms`);
    console.log(`Throughput: ${stats.throughput} req/s`);
  }

  /**
   * Start monitoring
   */
  async start() {
    console.log(
      `🚀 Starting performance monitoring for ${this.config.duration / 1000} seconds`
    );
    console.log(`📡 Monitoring endpoints: ${this.config.endpoints.join(", ")}`);
    console.log(`⏱️  Interval: ${this.config.interval / 1000} seconds\n`);

    const intervalId = setInterval(async () => {
      const results = await this.monitorAllEndpoints();
      this.metrics.push(...results);

      // Check if monitoring duration has elapsed
      if (Date.now() - this.startTime >= this.config.duration) {
        clearInterval(intervalId);
        await this.stop();
      }
    }, this.config.interval);

    // Initial monitoring
    const initialResults = await this.monitorAllEndpoints();
    this.metrics.push(...initialResults);
  }

  /**
   * Stop monitoring and generate report
   */
  async stop() {
    console.log("\n🛑 Performance monitoring completed");

    const report = this.generateReport();
    this.printSummary(report.summary);

    console.log("\n💡 Recommendations:");
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });

    this.saveReport(report);

    process.exit(0);
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
      case "interval":
        config.interval = parseInt(value) * 1000;
        break;
      case "duration":
        config.duration = parseInt(value) * 1000;
        break;
      case "output":
        config.outputFile = value;
        break;
      case "endpoints":
        config.endpoints = value.split(",");
        break;
    }
  }

  const monitor = new PerformanceMonitor(config);

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n🛑 Received SIGINT, stopping monitoring...");
    monitor.stop();
  });

  process.on("SIGTERM", () => {
    console.log("\n🛑 Received SIGTERM, stopping monitoring...");
    monitor.stop();
  });

  monitor.start();
}

module.exports = PerformanceMonitor;
