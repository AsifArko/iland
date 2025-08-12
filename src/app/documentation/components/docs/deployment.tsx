"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Cloud, Ship } from "lucide-react";
import { useState } from "react";

const deploymentOptions = [
  {
    icon: Cloud,
    title: "Vercel Deployment",
    description: "Recommended for production deployment",
    badge: "Recommended",
    steps: [
      "Install Vercel CLI: npm i -g vercel",
      "Login to Vercel: vercel login",
      "Create project on Vercel dashboard",
      "Add environment variables in Vercel settings",
      "Deploy: vercel (preview) or vercel --prod (production)",
    ],
    commands: ["npm i -g vercel", "vercel login", "vercel", "vercel --prod"],
    links: [
      { name: "Vercel Dashboard", url: "https://vercel.com" },
      { name: "CLI Documentation", url: "https://vercel.com/docs/cli" },
    ],
  },
  {
    icon: Ship,
    title: "Docker Deployment",
    description: "Containerized deployment option",
    badge: "Alternative",
    steps: [
      "Install Docker and Docker Compose",
      "Copy environment file to project root",
      "Build and run: docker-compose up --build",
      "Access Next.js at localhost:3000",
      "Access Sanity at localhost:3333",
    ],
    commands: ["docker-compose up --build", "docker-compose down"],
    links: [
      { name: "Docker Hub", url: "https://hub.docker.com" },
      { name: "Docker Compose", url: "https://docs.docker.com/compose/" },
    ],
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

export function Deployment() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Deployment
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Deployment Options
          </h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
            Choose your preferred deployment method. Vercel is recommended for
            production use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {deploymentOptions.map(option => (
            <Card
              key={option.title}
              className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 h-full"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                    <option.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                        {option.title}
                      </CardTitle>
                      <Badge
                        variant={
                          option.badge === "Recommended"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs font-medium h-5 px-2 rounded-md"
                      >
                        {option.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground/70">
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">
                    Deployment Steps:
                  </h4>
                  <ol className="space-y-2">
                    {option.steps.map((step, index) => (
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

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    Commands:
                  </h4>
                  <div className="space-y-2">
                    {option.commands.map((command, index) => (
                      <CodeBlock
                        key={index}
                        command={command}
                        onCopy={() => {}}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/50">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Resources:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {option.links.map(link => (
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
            </Card>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Cloud className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                  Vercel Benefits
                </h4>
                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Automatic deployments from Git</li>
                  <li>• Built-in CDN and edge functions</li>
                  <li>• Easy environment variable management</li>
                  <li>• Preview deployments for testing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <Ship className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-green-800 dark:text-green-200">
                  Docker Benefits
                </h4>
                <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                  <li>• Consistent environment across platforms</li>
                  <li>• Easy local development setup</li>
                  <li>• Isolated services and dependencies</li>
                  <li>• Scalable container orchestration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
