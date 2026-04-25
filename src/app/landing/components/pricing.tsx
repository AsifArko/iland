"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Loader2, Sparkles } from "lucide-react";
import { CheckoutModal } from "@/components/checkout-modal";
import { useStripePrice } from "@/hooks/use-stripe-price";
import { useState } from "react";

const features = [
  "Complete source code",
  "Full documentation",
  "Custom modifications",
  "Deployment guide",
];

export function Pricing() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { price, loading: priceLoading, error: priceError } = useStripePrice();

  return (
    <section className="py-12  bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Pricing
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Get the complete source code
          </h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
            Own the complete iLand source code selling platform. Perfect for
            developers who want to build their own code marketplace.
          </p>
        </div>

        {/* Horizontal Pricing Card */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Section - Content */}
              <div className="flex-1 p-8 lg:p-10">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 text-primary/80 backdrop-blur-sm !rounded-sm font-normal"
                      >
                        <Sparkles className="mr-2 h-3 w-3" />
                        Complete Package
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      iLand Source Code
                    </h3>
                    <p className="text-sm text-muted-foreground/70">
                      Everything you need to build and deploy your own source
                      code selling platform
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map(feature => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground/80">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
                    <span>One-time payment</span>
                    <span>•</span>
                    <span>Lifetime access</span>
                    <span>•</span>
                    <span>Instant download</span>
                  </div>
                </div>
              </div>

              {/* Right Section - Price & CTA */}
              <div className="lg:w-80 bg-gradient-to-br from-background to-muted/30 border-l border-border/50 p-8 lg:p-10 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    {priceLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Loading price...
                        </span>
                      </div>
                    ) : priceError ? (
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-foreground">
                          Price unavailable
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Please try again later
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-bold text-foreground">
                            {price?.formatted_price || "Loading..."}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {price?.currency?.toUpperCase() || "USD"}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Secure payment via Stripe
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => setIsCheckoutOpen(true)}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 h-12"
                    disabled={priceLoading || !!priceError}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Buy Source Code
                  </Button>

                  {/* Trust indicators */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60">
                      <span>🔒 Secure</span>
                      <span>⚡ Instant</span>
                      <span>📧 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="Buy iLand Source Code"
        description="Get the complete iLand source code selling platform with full documentation and deployment guide."
      />
    </section>
  );
}
