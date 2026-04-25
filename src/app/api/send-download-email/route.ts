import { NextRequest, NextResponse } from "next/server";
import { sendDownloadEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, downloadUrl, customerName } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    if (!downloadUrl) {
      return NextResponse.json(
        { error: "Download URL is required" },
        { status: 400 }
      );
    }

    // Validate download URL format
    if (
      !downloadUrl.includes("/api/download-proxy") ||
      !downloadUrl.includes("sessionId=")
    ) {
      return NextResponse.json(
        { error: "Invalid download URL format" },
        { status: 400 }
      );
    }

    await sendDownloadEmail(customerEmail, downloadUrl, customerName);

    return NextResponse.json({
      success: true,
      message: "Download email sent successfully",
    });
  } catch (error) {
    console.error("Error sending download email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
