import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Stripe secret key validation
 * @throws {Error} When STRIPE_SECRET_KEY is not set in environment variables
 */
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

/**
 * Stripe client instance configured with the latest API version
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

/**
 * Request body interface for checkout session creation
 */
interface CreateCheckoutSessionRequest {
  /** Stripe price ID for the product */
  priceId: string;
  /** URL to redirect to after successful payment */
  successUrl: string;
  /** URL to redirect to after cancelled payment */
  cancelUrl: string;
  /** Optional customer email for pre-filling checkout */
  customerEmail?: string;
}

/**
 * Response interface for checkout session creation
 */
interface CreateCheckoutSessionResponse {
  /** Stripe checkout session ID */
  sessionId: string;
}

/**
 * Error response interface
 */
interface ErrorResponse {
  /** Error message */
  error: string;
  /** HTTP status code */
  status?: number;
}

/**
 * Creates a new Stripe checkout session for secure payment processing
 *
 * This endpoint handles the creation of Stripe checkout sessions for purchasing
 * source code products. It validates the request body, creates a checkout session
 * with the specified parameters, and returns the session ID for client-side
 * redirect to Stripe Checkout.
 *
 * @param request - Next.js request object containing checkout session parameters
 * @returns Promise<NextResponse> - JSON response with session ID or error details
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/create-checkout-session', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     priceId: 'price_1234567890',
 *     successUrl: 'https://yourdomain.com/success',
 *     cancelUrl: 'https://yourdomain.com/cancel',
 *     customerEmail: 'customer@example.com'
 *   })
 * });
 * const { sessionId } = await response.json();
 * ```
 *
 * @throws {Error} When Stripe API calls fail
 * @throws {Error} When required environment variables are missing
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateCheckoutSessionResponse | ErrorResponse>> {
  try {
    const body: CreateCheckoutSessionRequest = await request.json();
    const { priceId, successUrl, cancelUrl } = body;

    // Validate required fields
    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    if (!successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: "Success and cancel URLs are required" },
        { status: 400 }
      );
    }

    /**
     * Create Stripe checkout session with validated parameters
     *
     * The session is configured for one-time payments with card payment methods.
     * It includes metadata for tracking and customer email for pre-filling.
     */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      customer_email: body.customerEmail,
      metadata: {
        product: "iland_source_code",
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);

    /**
     * Handle Stripe-specific errors with appropriate error messages
     */
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    /**
     * Handle generic errors with a user-friendly message
     */
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
