import { NextResponse } from "next/server";
import { serverClient } from "@/lib/sanity";

export async function GET() {
  try {
    const orders = await serverClient.fetch(`
      *[_type == "order"] | order(createdAt desc) {
        _id,
        stripeSessionId,
        customerEmail,
        amount,
        currency,
        status,
        product,
        downloadUrl,
        createdAt,
        updatedAt
      }
    `);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
