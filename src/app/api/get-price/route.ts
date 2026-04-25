import { NextResponse } from "next/server";
import { getCachedStripePrice } from "@/lib/stripe";

export async function GET() {
  try {
    const price = await getCachedStripePrice();

    if (!price) {
      return NextResponse.json(
        { error: "Failed to fetch price" },
        { status: 500 }
      );
    }

    return NextResponse.json(price);
  } catch (error) {
    console.error("Error in get-price API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
