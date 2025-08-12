import Stripe from "stripe";

/**
 * Dynamic Pricing System for iLand
 *
 * This module provides functionality to fetch pricing information from Stripe
 * using the NEXT_PUBLIC_STRIPE_PRICE_ID environment variable. This eliminates
 * the need to hardcode prices throughout the application.
 *
 * Usage:
 * 1. Set NEXT_PUBLIC_STRIPE_PRICE_ID in your environment variables
 * 2. Use the useStripePrice hook in React components
 * 3. Prices are automatically fetched and cached for 5 minutes
 */

// Initialize Stripe with secret key for server-side operations
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export interface StripePrice {
  id: string;
  unit_amount: number | null;
  currency: string;
  formatted_price: string;
}

export async function getStripePrice(): Promise<StripePrice | null> {
  try {
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;

    if (!priceId) {
      console.error("NEXT_PUBLIC_STRIPE_PRICE_ID is not set");
      return null;
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set");
      return null;
    }

    const price = await stripe.prices.retrieve(priceId);

    if (!price || !price.unit_amount) {
      console.error("Invalid price or price amount");
      return null;
    }

    // Format the price for display
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency.toUpperCase(),
    }).format(price.unit_amount / 100);

    return {
      id: price.id,
      unit_amount: price.unit_amount,
      currency: price.currency,
      formatted_price: formattedPrice,
    };
  } catch (error) {
    console.error("Error fetching Stripe price:", error);
    return null;
  }
}

// Cache the price to avoid multiple API calls
let cachedPrice: StripePrice | null = null;
let cacheExpiry: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedStripePrice(): Promise<StripePrice | null> {
  const now = Date.now();

  if (cachedPrice && now < cacheExpiry) {
    return cachedPrice;
  }

  const price = await getStripePrice();

  if (price) {
    cachedPrice = price;
    cacheExpiry = now + CACHE_DURATION;
  }

  return price;
}
