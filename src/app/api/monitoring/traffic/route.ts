import { NextResponse } from "next/server";
import { trafficAnalyzer } from "@/lib/monitoring";

export async function GET() {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const trafficSummary = await trafficAnalyzer.getTrafficSummary({
      start: oneDayAgo,
      end: now,
    });

    return NextResponse.json(trafficSummary);
  } catch (error) {
    console.error("Failed to get traffic data:", error);
    return NextResponse.json(
      { error: "Failed to fetch traffic data" },
      { status: 500 }
    );
  }
}
