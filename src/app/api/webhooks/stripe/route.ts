import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { serverClient } from "@/lib/sanity";
import { sendDownloadEmail, sendOrderConfirmationEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  console.log("Webhook received:", {
    body: body.substring(0, 200) + "...",
    sig: sig?.substring(0, 20) + "...",
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    console.log("Webhook event type:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    // Check if Sanity is configured
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.error("Sanity not configured, skipping webhook processing");
      return NextResponse.json({ received: true });
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("Processing checkout.session.completed:", {
          sessionId: session.id,
          email: session.customer_details?.email,
          amount: session.amount_total,
          currency: session.currency,
        });

        try {
          // Create order in Sanity
          const order = await serverClient.create({
            _type: "order",
            stripeSessionId: session.id,
            customerEmail: session.customer_details?.email || "",
            amount: session.amount_total || 0,
            currency: session.currency || "usd",
            status: "completed",
            product: "iland_source_code",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          console.log("Order created successfully in Sanity:", order._id);

          // Send emails to customer
          const customerEmail = session.customer_details?.email;
          const customerName = session.customer_details?.name;

          if (customerEmail) {
            console.log("Attempting to send emails to:", customerEmail);

            try {
              // Check email configuration
              console.log("Email configuration check:", {
                smtpHost: process.env.SMTP_HOST,
                smtpUser: process.env.SMTP_USER,
                hasSmtpPass: !!process.env.SMTP_PASS,
                contactEmail: process.env.CONTACT_EMAIL,
              });

              // Send order confirmation email
              console.log("Sending order confirmation email...");
              await sendOrderConfirmationEmail(customerEmail, {
                id: session.id,
                amount: (session.amount_total || 0) / 100, // Convert from cents
                status: "completed",
              });
              console.log("Order confirmation email sent successfully");

              // Create secure token for success page access
              const secureTokenResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/create-secure-token`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    sessionId: session.id,
                  }),
                }
              );

              if (!secureTokenResponse.ok) {
                throw new Error("Failed to create secure token");
              }

              const { secureToken } = await secureTokenResponse.json();

              // Generate success page URL with secure token
              const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success?token=${secureToken}`;
              console.log("Generated success URL with secure token");

              // Send download email with success page link
              console.log("Sending download email...");
              await sendDownloadEmail(
                customerEmail,
                successUrl,
                customerName || undefined
              );
              console.log("Download email sent successfully");

              console.log("All emails sent successfully to:", customerEmail);
            } catch (emailError) {
              console.error("Error sending emails:", emailError);
              console.error("Email error details:", {
                message:
                  emailError instanceof Error
                    ? emailError.message
                    : "Unknown error",
                stack:
                  emailError instanceof Error ? emailError.stack : undefined,
              });
              // Don't throw here to avoid failing the webhook
            }
          } else {
            console.log("No customer email found in session:", {
              sessionId: session.id,
              customerDetails: session.customer_details,
            });
          }
        } catch (sanityError) {
          console.error("Error creating order in Sanity:", sanityError);
          throw sanityError;
        }
        break;

      case "checkout.session.expired":
        const expiredSession = event.data.object as Stripe.Checkout.Session;

        // Update order status in Sanity
        await serverClient
          .patch({
            query: `*[_type == "order" && stripeSessionId == $sessionId][0]`,
            params: { sessionId: expiredSession.id },
          })
          .set({
            status: "failed",
            updatedAt: new Date().toISOString(),
          })
          .commit();

        console.log(
          "Order marked as failed for expired session:",
          expiredSession.id
        );
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
