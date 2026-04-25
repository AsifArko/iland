import { NextResponse } from "next/server";
import { trafficAnalyzer } from "@/lib/monitoring";

export async function GET() {
  try {
    const realTimeStats = await trafficAnalyzer.getRealTimeStats();

    return NextResponse.json(realTimeStats);
  } catch (error) {
    console.error("Failed to get real-time stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch real-time stats" },
      { status: 500 }
    );
  }
}
