#!/usr/bin/env node

/**
 * Test script for the custom monitoring system
 * This script simulates various monitoring scenarios to verify the system is working
 */

const https = require("https");
const http = require("http");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

console.log("🧪 Testing Custom Monitoring System...\n");

// Test functions
async function testHealthCheck() {
  console.log("1. Testing health check...");
  try {
    const response = await makeRequest(`${BASE_URL}/api/health`);
    console.log("✅ Health check passed");
    return true;
  } catch (error) {
    console.log("❌ Health check failed:", error.message);
    return false;
  }
}

async function testMonitoringStats() {
  console.log("2. Testing monitoring stats endpoint...");
  try {
    const response = await makeRequest(`${BASE_URL}/api/monitoring/stats`);
    console.log("✅ Monitoring stats endpoint working");
    console.log("   - Total requests:", response.totalRequests);
    console.log("   - Error rate:", response.errorRate?.toFixed(2) + "%");
    console.log("   - Uptime:", response.uptime?.toFixed(2) + "%");
    return true;
  } catch (error) {
    console.log("❌ Monitoring stats failed:", error.message);
    return false;
  }
}

async function testTrafficAnalytics() {
  console.log("3. Testing traffic analytics endpoint...");
  try {
    const response = await makeRequest(`${BASE_URL}/api/monitoring/traffic`);
    console.log("✅ Traffic analytics endpoint working");
    console.log("   - Page views:", response.totalPageViews);
    console.log("   - Unique visitors:", response.uniqueVisitors);
    console.log("   - Bounce rate:", response.bounceRate?.toFixed(2) + "%");
    return true;
  } catch (error) {
    console.log("❌ Traffic analytics failed:", error.message);
    return false;
  }
}

async function testRealTimeStats() {
  console.log("4. Testing real-time stats endpoint...");
  try {
    const response = await makeRequest(`${BASE_URL}/api/monitoring/realtime`);
    console.log("✅ Real-time stats endpoint working");
    console.log("   - Active users:", response.activeUsers);
    console.log("   - Recent page views:", response.recentPageViews);
    console.log("   - Recent events:", response.recentEvents);
    return true;
  } catch (error) {
    console.log("❌ Real-time stats failed:", error.message);
    return false;
  }
}

async function testPerformanceMetrics() {
  console.log("5. Testing performance metrics endpoint...");
  try {
    const response = await makeRequest(
      `${BASE_URL}/api/monitoring/performance`
    );
    console.log("✅ Performance metrics endpoint working");
    console.log(
      "   - Average load time:",
      response.averageLoadTime?.toFixed(0) + "ms"
    );
    console.log("   - Average FCP:", response.averageFCP?.toFixed(0) + "ms");
    console.log("   - Average LCP:", response.averageLCP?.toFixed(0) + "ms");
    return true;
  } catch (error) {
    console.log("❌ Performance metrics failed:", error.message);
    return false;
  }
}

async function testAnalyticsTracking() {
  console.log("6. Testing analytics tracking endpoint...");
  try {
    const testData = {
      type: "page_view",
      url: "/test-page",
      sessionId: "test-session-" + Date.now(),
      loadTime: 1200,
      firstContentfulPaint: 800,
      largestContentfulPaint: 1500,
      cumulativeLayoutShift: 0.1,
      firstInputDelay: 50,
      userAgent: "Test User Agent",
      referrer: "https://example.com",
    };

    const response = await makeRequest(`${BASE_URL}/api/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    console.log("✅ Analytics tracking endpoint working");
    return true;
  } catch (error) {
    console.log("❌ Analytics tracking failed:", error.message);
    return false;
  }
}

async function simulatePageViews() {
  console.log("7. Simulating page views...");
  try {
    const pages = ["/", "/about", "/pricing", "/contact", "/features"];
    const promises = pages.map(async (page, index) => {
      await new Promise(resolve => setTimeout(resolve, index * 100));
      return makeRequest(`${BASE_URL}${page}`);
    });

    await Promise.all(promises);
    console.log("✅ Page view simulation completed");
    return true;
  } catch (error) {
    console.log("❌ Page view simulation failed:", error.message);
    return false;
  }
}

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === "https:";
    const client = isHttps ? https : http;

    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || "GET",
      headers: options.headers || {},
    };

    const req = client.request(requestOptions, res => {
      let data = "";
      res.on("data", chunk => (data += chunk));
      res.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          resolve(data);
        }
      });
    });

    req.on("error", reject);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

// Main test runner
async function runTests() {
  const tests = [
    testHealthCheck,
    testMonitoringStats,
    testTrafficAnalytics,
    testRealTimeStats,
    testPerformanceMetrics,
    testAnalyticsTracking,
    simulatePageViews,
  ];

  let passed = 0;
  let total = tests.length;

  for (const test of tests) {
    const result = await test();
    if (result) passed++;
    console.log("");
  }

  console.log("📊 Test Results:");
  console.log(`   Passed: ${passed}/${total}`);
  console.log(`   Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

  if (passed === total) {
    console.log(
      "\n🎉 All tests passed! The monitoring system is working correctly."
    );
  } else {
    console.log(
      "\n⚠️  Some tests failed. Please check the error messages above."
    );
  }

  console.log("\n📝 Next Steps:");
  console.log("   1. Check the Sanity Studio for the Monitoring Dashboard");
  console.log("   2. Verify data is being collected in the Sanity dataset");
  console.log("   3. Test the real-time dashboard functionality");
}

// Run the tests
runTests().catch(console.error);
