"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronDown, ChevronUp, Settings } from "lucide-react";
import { useState } from "react";

const envVars = `# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...
SANITY_API_ADMIN_TOKEN=...
SANITY_STUDIO_PROJECT_ID=...
SANITY_STUDIO_DATASET=production

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...`;

function CodeBlock({ code, onCopy }: { code: string; onCopy: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted/50 border border-border/50 rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3 w-3 text-green-600" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}

export function EnvironmentVariables() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="environment-variables" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Configuration
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Environment Variables
          </h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
            Configure your environment variables to connect all the services
            together.
          </p>
        </div>

        <Card className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                    Environment Configuration
                  </CardTitle>
                  <p className="text-sm text-muted-foreground/70">
                    Copy these variables to your .env and .env.local files
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                    Sanity
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Content Management
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                    Stripe
                  </h4>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Payment Processing
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">
                    Clerk
                  </h4>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Authentication
                  </p>
                </div>
              </div>

              <CodeBlock code={envVars} onCopy={() => {}} />

              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                      Important Notes
                    </h4>
                    <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                      <li>
                        • Replace &ldquo;...&rdquo; with your actual API keys
                        and tokens
                      </li>
                      <li>
                        • Keep your .env files secure and never commit them to
                        version control
                      </li>
                      <li>
                        • Use different keys for development and production
                        environments
                      </li>
                      <li>
                        • Consistent naming is recommended across all platforms
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
}
