import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  try {
    const query = `*[_type == "pageView"] | order(timestamp desc) {
      _id,
      id,
      url,
      sessionId,
      userId,
      timestamp,
      loadTime,
      userAgent,
      ipAddress,
      referrer,
      metadata
    }`;

    const data = await client.fetch(query);

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error fetching page views:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch page views" },
      { status: 500 }
    );
  }
}
