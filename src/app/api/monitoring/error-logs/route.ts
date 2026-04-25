import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  try {
    const query = `*[_type == "errorLog"] | order(timestamp desc) {
      _id,
      id,
      errorType,
      message,
      stack,
      url,
      sessionId,
      userId,
      ipAddress,
      userAgent,
      severity,
      resolved,
      timestamp
    }`;

    const data = await client.fetch(query);

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error fetching error logs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch error logs" },
      { status: 500 }
    );
  }
}
