import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message } = await request.json();
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await sendContactEmail(email, subject, message);

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send message.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
