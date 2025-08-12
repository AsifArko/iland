import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { SupportAnimation } from "@/components/animations";
import {
  HelpCircle,
  BookOpen,
  Settings,
  CreditCard,
  Shield,
  Users,
  FileText,
  Globe,
  Zap,
  ArrowRight,
  MessageCircle,
  Mail,
  Github,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center - iLand",
  description:
    "Get help and support for iLand, the self-hosted source code selling platform for solo software engineers.",
};

const helpCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn how to set up and deploy your iLand platform",
    badge: "Setup",
    link: "/documentation#prerequisites",
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Configure your platform settings and integrations",
    badge: "Config",
    link: "/documentation#environment-variables",
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    description: "Manage Stripe payments and billing settings",
    badge: "Payments",
    link: "/documentation#service-setup",
  },
  {
    icon: Shield,
    title: "Security & Auth",
    description: "Security best practices and authentication setup",
    badge: "Security",
    link: "/documentation#service-setup",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Manage users, roles, and permissions",
    badge: "Users",
    link: "/documentation#service-setup",
  },
  {
    icon: FileText,
    title: "Content Management",
    description: "Create and manage products with Sanity CMS",
    badge: "CMS",
    link: "/documentation#content-model",
  },
];

const faqItems = [
  {
    question: "How do I deploy iLand to production?",
    answer:
      "Follow our comprehensive deployment guide in the documentation. We recommend using Vercel for the easiest deployment experience with automatic CI/CD.",
    category: "Deployment",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "iLand integrates with Stripe, supporting all major credit cards, digital wallets, and international payment methods.",
    category: "Payments",
  },
  {
    question: "Can I customize the platform design?",
    answer:
      "Yes, iLand is fully customizable. You can modify the UI components, styling, and functionality to match your brand and requirements.",
    category: "Customization",
  },
  {
    question: "How do I add new products?",
    answer:
      "Use the Sanity Studio CMS to create and manage products. You can add source code, documentation, and various file types.",
    category: "Content",
  },
  {
    question: "Is iLand suitable for enterprise use?",
    answer:
      "Absolutely. iLand includes enterprise-grade security, user authentication, and can be deployed on your own infrastructure.",
    category: "Enterprise",
  },
  {
    question: "How do I integrate with external tools?",
    answer:
      "iLand supports integration with GitHub repositories, various payment platforms, and analytics tools. Check our documentation for detailed guides.",
    category: "Integrations",
  },
];

const gettingStartedSteps = [
  {
    step: "01",
    title: "Clone the Repository",
    description: "Start by cloning the iLand repository to your local machine",
    icon: Github,
  },
  {
    step: "02",
    title: "Install Dependencies",
    description: "Install all required dependencies using npm or yarn",
    icon: Zap,
  },
  {
    step: "03",
    title: "Configure Environment",
    description: "Set up your environment variables for all services",
    icon: Settings,
  },
  {
    step: "04",
    title: "Deploy to Vercel",
    description: "Deploy your platform to Vercel with one-click deployment",
    icon: Globe,
  },
];

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "Join our community to ask questions and share experiences",
    link: "#",
    external: true,
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get direct support from our team via email",
    link: "mailto:support@iland.com",
    external: true,
  },
  {
    icon: Github,
    title: "GitHub Issues",
    description: "Report bugs and request features on GitHub",
    link: "#",
    external: true,
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides and API documentation",
    link: "/documentation",
    external: false,
  },
];

export default function HelpPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Help Center
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                How can we help?
              </h1>
              <p className="text-sm text-primary font-medium">
                Find answers, guides, and support for iLand
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
              Get help with setup, configuration, troubleshooting, and more. Our
              comprehensive help center covers everything you need to know about
              iLand.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border/50 flex items-center justify-center">
              <SupportAnimation size="lg" className="w-48 h-48" />
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

      {/* Help Categories */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Help Categories
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Find what you need
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Browse our help categories to find the information you&apos;re
              looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map(category => (
              <Link
                href={category.link}
                key={category.title}
                className="block h-full"
              >
                <Card className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg cursor-pointer">
                  <CardHeader className="pb-0 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                        <category.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-medium h-6 px-2 rounded-md"
                      >
                        {category.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-xs text-muted-foreground/70 leading-relaxed mb-4">
                      {category.description}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-primary font-medium">
                      <span>Learn more</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Getting Started
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Quick Start Guide
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Get up and running with iLand in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gettingStartedSteps.map(step => (
              <Card
                key={step.step}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <step.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {step.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                FAQ
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Find answers to the most common questions about iLand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <HelpCircle className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {item.answer}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Support
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Need more help?
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Connect with our support team and community for additional
              assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map(channel => (
              <Card
                key={channel.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg cursor-pointer"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <channel.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {channel.external && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {channel.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed mb-4">
                    {channel.description}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary font-medium">
                    <span>Get help</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
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
