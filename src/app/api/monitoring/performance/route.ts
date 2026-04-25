import { NextResponse } from "next/server";
import { trafficAnalyzer } from "@/lib/monitoring";

export async function GET() {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const performanceMetrics = await trafficAnalyzer.getPerformanceMetrics({
      start: oneHourAgo,
      end: now,
    });

    return NextResponse.json(performanceMetrics);
  } catch (error) {
    console.error("Failed to get performance metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch performance metrics" },
      { status: 500 }
    );
  }
}
