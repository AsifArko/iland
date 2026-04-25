import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  try {
    const query = `*[_type == "conversionEvent"] | order(timestamp desc) {
      _id,
      id,
      conversionType,
      value,
      currency,
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
    console.error("Error fetching conversion events:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch conversion events" },
      { status: 500 }
    );
  }
}
