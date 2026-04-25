"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Globe, Users } from "lucide-react";
import { useState } from "react";

const setupSteps = [
  {
    step: 1,
    title: "Environment Setup",
    description: "Copy and configure environment variables",
    command: "cp .env.example .env.local && cp .env.example .env",
    note: "Fill the secrets in both .env and .env.local files. The .env.local is used by next.js and .env is used for docker images.",
  },
  {
    step: 2,
    title: "Install Dependencies",
    description: "Install all required packages",
    command: "npm install",
    note: "This may take a few minutes",
  },
  {
    step: 3,
    title: "Generate Types",
    description: "Generate TypeScript types for Sanity",
    command: "npm run typegen",
    note: "This should be done while doing Sanity configuration",
  },
  {
    step: 4,
    title: "Deploy Sanity",
    description: "Deploy Sanity studio to production",
    command: "sanity deploy",
    note: "This should be done while doing Sanity configuration",
  },
  {
    step: 5,
    title: "Start Development",
    description: "Start the development server",
    command: "npm run dev",
    note: "For production: npm run build && npm start",
  },
];

const accessUrls = [
  {
    icon: Users,
    title: "For Teachers/Creators",
    urls: [
      { name: "Sanity Studio", url: "http://localhost:3000/studio" },
      {
        name: "Asset Manager",
        url: "http://localhost:3000/studio/asset-manager",
      },
    ],
    description: "Manage courses, lessons, and content",
  },
  {
    icon: Globe,
    title: "For Students",
    urls: [{ name: "Main Portal", url: "http://localhost:3000" }],
    description: "Browse and enroll in courses",
  },
];

function CodeBlock({
  command,
  onCopy,
}: {
  command: string;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted/50 border border-border/50 rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto">
        <code>{command}</code>
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

export function QuickSetup() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Get Started
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Quick Setup
          </h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
            Follow these steps to get your iLand source code selling platform up and
            running quickly.
          </p>
        </div>

        <div className="space-y-6">
          {setupSteps.map(step => (
            <Card
              key={step.step}
              className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <CodeBlock command={step.command} onCopy={() => {}} />
                {step.note && (
                  <div className="text-xs text-muted-foreground/60 bg-muted/30 p-2 rounded border-l-2 border-primary/30">
                    <strong>Note:</strong> {step.note}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold tracking-tight text-foreground mb-6">
            Access Your Application
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessUrls.map(access => (
              <Card
                key={access.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <access.icon className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                      {access.title}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground/70">
                    {access.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {access.urls.map(url => (
                      <div
                        key={url.name}
                        className="flex items-center justify-between p-2 bg-muted/30 rounded border"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {url.name}
                        </span>
                        <a
                          href={url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          {url.url}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
