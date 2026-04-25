import { NextResponse } from "next/server";
import { systemMonitor } from "@/lib/monitoring";

export async function GET() {
  try {
    const stats = await systemMonitor.getMonitoringStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to get monitoring stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch monitoring stats" },
      { status: 500 }
    );
  }
}
