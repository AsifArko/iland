import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  try {
    const query = `*[_type == "performanceMetric"] | order(timestamp desc) {
      _id,
      id,
      metricName,
      value,
      url,
      sessionId,
      userId,
      timestamp,
      metadata
    }`;

    const data = await client.fetch(query);

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error fetching performance metrics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch performance metrics" },
      { status: 500 }
    );
  }
}
