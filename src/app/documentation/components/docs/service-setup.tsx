"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Database,
  User,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Database,
    title: "Sanity Setup",
    color: "blue",
    steps: [
      "Create project at sanity.io",
      "Install Sanity CLI: npm install -g @sanity/cli",
      "Create Sanity project: npm create sanity@latest -- --project <project-id> --dataset production --template clean",
      "Login and manage: sanity login → sanity manage",
      "Create API tokens (Admin & Read-only) in Sanity API settings",
      "Generate types: npm run typegen",
      "Deploy studio: sanity deploy",
    ],
    links: [
      { name: "Sanity Dashboard", url: "https://sanity.io" },
      { name: "API Settings", url: "https://www.sanity.io/organizations" },
    ],
  },
  {
    icon: User,
    title: "Clerk Setup",
    color: "purple",
    steps: [
      "Go to Clerk Dashboard and create a new app",
      "Navigate to Configure > API Keys",
      "Copy Publishable Key and Secret Key",
      "Add redirect URLs for your application",
      "Configure authentication settings as needed",
    ],
    links: [
      { name: "Clerk Dashboard", url: "https://dashboard.clerk.com/" },
      { name: "Documentation", url: "https://clerk.com/docs" },
    ],
  },
  {
    icon: CreditCard,
    title: "Stripe Setup",
    color: "green",
    steps: [
      "Create account at Stripe Dashboard",
      "Copy Publishable Key and Secret Key",
      "Set up webhooks for payment processing",
      "For local development: stripe listen --forward-to localhost:3000/api/stripe/webhook",
      "For production: set endpoint to your Vercel webhook URL",
      "Configure webhook secret in environment variables",
    ],
    links: [
      { name: "Stripe Dashboard", url: "https://dashboard.stripe.com/" },
      { name: "Webhook Guide", url: "https://stripe.com/docs/webhooks" },
    ],
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-300",
    icon: "text-blue-600",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-300",
    icon: "text-purple-600",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-700 dark:text-green-300",
    icon: "text-green-600",
  },
};

export function ServiceSetup() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <section id="service-setup" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Service Configuration
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Service Setup
          </h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
            Configure each service individually to ensure proper integration
            with your iLand platform.
          </p>
        </div>

        <div className="space-y-6">
          {services.map(service => {
            const colors =
              colorClasses[service.color as keyof typeof colorClasses];
            const isExpanded = expandedService === service.title;

            return (
              <Card
                key={service.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-md ${colors.bg} ${colors.border}`}
                      >
                        <service.icon className={`h-4 w-4 ${colors.icon}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                          {service.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground/70">
                          Step-by-step configuration guide
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedService(isExpanded ? null : service.title)
                      }
                      className="h-8 w-8 p-0"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0 space-y-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">
                        Setup Steps:
                      </h4>
                      <ol className="space-y-2">
                        {service.steps.map((step, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-muted-foreground/80"
                          >
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="pt-3 border-t border-border/50">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Useful Links:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.links.map(link => (
                          <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded transition-colors"
                          >
                            {link.name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Pro Tip</h4>
              <p className="text-xs text-muted-foreground/70">
                Use consistent naming across all platforms (Clerk, Sanity,
                Stripe) for easier management. For example, if your project is
                called &ldquo;iland-marketplace&rdquo;, use that name consistently
                in all service configurations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
