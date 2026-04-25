"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { ILandAnimation } from "@/components/animations";
import { CheckoutModal } from "@/components/checkout-modal";
import Link from "next/link";
import { useState } from "react";

export function Hero() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <Badge
            variant="secondary"
            className="inline-flex items-center justify-center bg-gradient-to-r from-black/5 to-white/10 border-black/20 text-foreground/70 backdrop-blur-sm !rounded-sm font-normal"
          >
            <Sparkles className="mr-2 h-4 w-4 text-foreground/50" />
            Built with Next.js, Sanity, Stripe, Vercel
          </Badge>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              iLand
            </h1>
            <p className="text-sm text-primary font-medium">
              Single Source Code Selling Platform for Solo Software Engineers
            </p>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
            A comprehensive platform for solo developers to sell their source
            code securely. Features secure downloads, payment processing,
            analytics, and a modern tech stack built for developers.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto min-w-[200px] h-12"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Buy Now
              </Button>
              <Link href="/documentation" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-border/50 hover:bg-background/50 transition-all duration-300 w-full sm:w-auto min-w-[200px] h-12"
                >
                  Documentation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border/50 flex items-center justify-center">
            <ILandAnimation size="lg" className="w-48 h-48" />
          </div>
        </div>
      </div>

      {/* Enhanced Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary/30 to-primary/30 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
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
