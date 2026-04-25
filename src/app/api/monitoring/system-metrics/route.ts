import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  try {
    const query = `*[_type == "systemMetric"] | order(timestamp desc) {
      _id,
      id,
      metricType,
      value,
      unit,
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
    console.error("Error fetching system metrics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch system metrics" },
      { status: 500 }
    );
  }
}
