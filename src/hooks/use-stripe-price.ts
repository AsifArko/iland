import { useState, useEffect } from "react";

/**
 * React Hook for Dynamic Stripe Pricing
 *
 * This hook fetches the current price from Stripe using the price ID
 * stored in NEXT_PUBLIC_STRIPE_PRICE_ID environment variable.
 *
 * Features:
 * - Automatic price fetching on component mount
 * - Loading and error states
 * - Formatted price display
 * - Server-side caching (5 minutes)
 *
 * @returns {Object} Object containing price data, loading state, and error state
 */
export interface StripePrice {
  id: string;
  unit_amount: number | null;
  currency: string;
  formatted_price: string;
}

export function useStripePrice() {
  const [price, setPrice] = useState<StripePrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/get-price");

        if (!response.ok) {
          throw new Error("Failed to fetch price");
        }

        const priceData = await response.json();
        setPrice(priceData);
      } catch (err) {
        console.error("Error fetching price:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch price");
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, []);

  return { price, loading, error };
}
