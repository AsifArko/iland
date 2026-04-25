import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Code, Palette, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "For Developers",
    description:
      "Secure source code downloads, payment processing, user analytics, and mobile-friendly access to your code marketplace.",
    badge: "Developers",
  },
  {
    icon: Code,
    title: "For Sellers",
    description:
      "Sanity CMS, Stripe payments, secure proxy downloads, analytics dashboard, email notifications, and asset management.",
    badge: "Sellers",
  },
  {
    icon: Zap,
    title: "Technical Stack",
    description:
      "Next.js 15, Sanity CMS, Stripe payments, Tailwind CSS, shadcn/ui, radix-ui, Server Components, protected routes, dark mode.",
    badge: "Tech",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Clean, accessible, responsive design with micro-interactions, dark/light mode toggle, and modern aesthetics.",
    badge: "Design",
  },
];

export function Features() {
  return (
    <section className="py-8  bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Features
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Source Code Selling Platform
          </h2>
          <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
            Everything you need to sell, manage, and deliver source code
            securely with modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(feature => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full"
            >
              <CardHeader className="pb-2 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                    <feature.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs font-medium h-6 px-2 rounded-md"
                  >
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div
                  className="text-xs text-muted-foreground/70 leading-relaxed text-justify"
                  style={{
                    wordSpacing: "0.01em",
                    textAlignLast: "left",
                    hyphens: "auto",
                  }}
                >
                  {feature.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
