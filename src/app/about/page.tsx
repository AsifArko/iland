import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { InfographicAnimation } from "@/components/animations";
import {
  Code,
  Zap,
  BookOpen,
  Shield,
  Smartphone,
  FileText,
  Lock,
  FolderOpen,
  Brain,
  Globe,
  Settings,
  Star,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About - iLand",
  description:
    "Learn more about iLand, the source code selling platform empowering solo software engineers.",
};

const whatWeOffer = [
  {
    icon: BookOpen,
    title: "Source Code Marketplace",
    description:
      "Comprehensive platform for selling and distributing source code with secure payment processing and automated delivery.",
    badge: "Marketplace",
  },
  {
    icon: Globe,
    title: "Secure Downloads",
    description:
      "Time-limited, secure proxy download system with GitHub integration for private repository access.",
    badge: "Security",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description:
      "Integrated Stripe payment processing with secure checkout and reliable transaction handling.",
    badge: "Payments",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Fully responsive design that works perfectly on all devices, from mobile phones to desktop computers.",
    badge: "Design",
  },
  {
    icon: FileText,
    title: "Content Management",
    description:
      "Powerful Sanity CMS for easy product creation, management, and content updates with flexible structure.",
    badge: "CMS",
  },
  {
    icon: Lock,
    title: "User Management",
    description:
      "Secure user authentication and authorization with protected routes and comprehensive user management.",
    badge: "Auth",
  },
  {
    icon: FolderOpen,
    title: "Asset Manager",
    description:
      "Comprehensive file management system for organizing and distributing source code assets and resources.",
    badge: "Files",
  },
  {
    icon: Code,
    title: "Analytics Dashboard",
    description:
      "Built-in analytics and monitoring system for tracking sales, downloads, and platform performance.",
    badge: "Analytics",
  },
  {
    icon: Brain,
    title: "Email Automation",
    description:
      "Automated email system for order confirmations, download links, and customer support notifications.",
    badge: "Automation",
  },
];

const focusAreas = [
  {
    icon: Zap,
    title: "Developer Tools Integration",
    description:
      "We will continue to focus on integration of developer tools and IDE plugins for enhanced code development experience.",
    badge: "Tools",
  },
  {
    icon: Brain,
    title: "iLand Platform Enhancements",
    description:
      "We will also focus on iLand platform improvements to enhance functionality and user experience.",
    badge: "Platform",
  },
  {
    icon: Code,
    title: "UI Experience & Bug Fixes",
    description:
      "We will focus on better UI experiences and continuously fix bugs to ensure smooth operation.",
    badge: "UX",
  },
  {
    icon: Globe,
    title: "Security & Monitoring Tools",
    description:
      "Integrating advanced security monitoring, analytics tools, and performance optimization for our platform.",
    badge: "Security",
  },
  {
    icon: Settings,
    title: "CI/CD Pipeline Development",
    description:
      "Developing our CI/CD pipelines to streamline development and deployment processes.",
    badge: "DevOps",
  },
];

const whyChooseiLand = [
  {
    icon: Star,
    title: "Self-Hosted Source Code Platform",
    description:
      "We are providing self-hosted, self-managed source code selling platform with developer tools, analytics, and security features.",
    badge: "Self-Hosted",
  },
  {
    icon: Star,
    title: "Code Selling for Everyone",
    description:
      "We believe code selling should be accessible to every developer and we are trying to provide everyone in the software development background to own, manage, customize and extend their own source code marketplace.",
    badge: "Inclusive",
  },
  {
    icon: Star,
    title: "Comprehensive Platform Experience",
    description:
      "Our platform is very comprehensive, featuring secure downloads, payment processing, analytics dashboard, email automation, and asset management. No limitation on product types, file sizes, or platform features.",
    badge: "Comprehensive",
  },
  {
    icon: Star,
    title: "Enterprise-Grade Security",
    description:
      "Secured authentication, secured payments with Stripe, very robust Sanity backend which doesn&apos;t crash and is failsafe on multiple layers, safe and secured single command deploy on Vercel.",
    badge: "Secure",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                About us
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                About iLand
              </h1>
              <p className="text-sm text-primary font-medium">
                Empowering solo software engineers with secure source code
                selling platform and developer tools
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
              At iLand, we believe that code selling should be accessible to
              every developer. Our platform provides a customizable self-hosted
              source code marketplace for software engineers that is easy to
              develop, manage and deploy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-border/50 hover:bg-background/50 transition-all duration-300 w-full sm:w-auto min-w-[200px] h-12 !px-6"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/documentation" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-border/50 hover:bg-background/50 transition-all duration-300 w-full sm:w-auto min-w-[200px] h-12"
                >
                  Documentation
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border/50 flex items-center justify-center">
              <InfographicAnimation
                size="lg"
                className="w-48 h-48"
                theme="data"
              />
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
      </section>

      {/* What We Offer Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                What We Offer
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Comprehensive Learning Platform
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Everything you need to create, manage, and deliver online courses
              with modern technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeOffer.map(feature => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
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

      {/* Our Focus Areas */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Focus Areas
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Our Focus Areas
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Our ongoing commitment to improving iLand&apos;s functionality and
              user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map(area => (
              <Card
                key={area.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <area.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {area.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {area.title}
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
                    {area.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

              {/* Why Choose iLand */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Why Choose
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Why Choose iLand
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              What makes us different from other learning platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseiLand.map((reason, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <reason.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {reason.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {reason.title}
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
                    {reason.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
