import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const createCheckoutSession = async (email?: string) => {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId:
          process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_iland_source_code",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/landing?canceled=true`,
        customerEmail: email,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { sessionId, error } = await response.json();

    if (error) {
      throw new Error(error);
    }

    const stripe = await stripePromise;

    if (stripe) {
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });
      if (stripeError) {
        console.error("Stripe checkout error:", stripeError);
        throw stripeError;
      }
    } else {
      throw new Error("Stripe failed to load");
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
