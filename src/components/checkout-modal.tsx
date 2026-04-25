"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, Loader2, AlertCircle } from "lucide-react";
import { createCheckoutSession } from "@/app/landing/lib/stripe";
import { useStripePrice } from "@/hooks/use-stripe-price";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function CheckoutModal({
  isOpen,
  onClose,
  title = "Buy Source Code",
  description = "Get the complete iLand source code with full documentation and deployment guide.",
}: CheckoutModalProps) {
  const { price, loading: priceLoading, error: priceError } = useStripePrice();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Store email for later use
      localStorage.setItem("purchase_email", email);

      await createCheckoutSession(email);
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setError("Failed to initiate checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 pt-6">
          <div className="space-y-2 flex-1 pr-4">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 flex-shrink-0 -mt-2 -mr-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="pt-2">
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                We&apos;ll send your download link to this email
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-bold">
                {priceLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : priceError ? (
                  "Price unavailable"
                ) : (
                  price?.formatted_price || "Loading..."
                )}
              </span>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay with Stripe`
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by Stripe. You&apos;ll be redirected to
              complete your purchase.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
