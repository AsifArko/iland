import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET() {
  try {
    const query = `*[_type == "userEvent"] | order(timestamp desc) {
      _id,
      id,
      eventType,
      eventName,
      sessionId,
      userId,
      url,
      timestamp,
      ipAddress,
      metadata
    }`;

    const data = await client.fetch(query);

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error fetching user events:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user events" },
      { status: 500 }
    );
  }
}
