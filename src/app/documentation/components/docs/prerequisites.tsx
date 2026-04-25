import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ExternalLink,
  Package,
  User,
  CreditCard,
  Globe,
} from "lucide-react";

const prerequisites = [
  {
    icon: Package,
    title: "Node.js & npm",
    description: "Node.js v22.12.0 and npm v11.2.0",
    badge: "Required",
    type: "software",
  },
  {
    icon: Package,
    title: "Next.js",
    description: "Next.js v15.3.5",
    badge: "Required",
    type: "software",
  },
  {
    icon: User,
    title: "Clerk Account",
    description: "Authentication service account",
    badge: "Account",
    type: "account",
    link: "https://clerk.com/",
  },
  {
    icon: Package,
    title: "Sanity Account",
    description: "Content management system",
    badge: "Account",
    type: "account",
    link: "https://sanity.io/",
  },
  {
    icon: CreditCard,
    title: "Stripe Account",
    description: "Payment processing service",
    badge: "Account",
    type: "account",
    link: "https://stripe.com",
  },
  {
    icon: Globe,
    title: "Vercel Account",
    description: "Deployment platform",
    badge: "Account",
    type: "account",
    link: "https://vercel.com",
  },
];

export function Prerequisites() {
  return (
    <section id="prerequisites" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Before You Start
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Prerequisites
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
            Ensure you have the following software and accounts ready before
            setting up iLand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prerequisites.map(prereq => (
            <Card
              key={prereq.title}
              className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full"
            >
              <CardHeader className="pb-2 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/50">
                    <prereq.icon className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <Badge
                    variant={
                      prereq.type === "software" ? "outline" : "secondary"
                    }
                    className="text-xs font-medium h-5 px-2 rounded-md"
                  >
                    {prereq.badge}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
                  {prereq.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs text-muted-foreground/70 leading-relaxed">
                  {prereq.description}
                </div>
                {prereq.type === "account" && prereq.link && (
                  <a
                    href={prereq.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Create account</span>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">
                Ready to proceed?
              </h3>
              <p className="text-xs text-muted-foreground/70">
                Once you have all the prerequisites installed and accounts
                created, you can proceed with the environment variable setup
                guide below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
