import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { TermsAnimation } from "@/components/animations";
import {
  FileText,
  Shield,
  Users,
  Globe,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Scale,
  Gavel,
  Lock,
  Eye,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - iLand",
  description:
    "Terms of Service for iLand, the self-hosted source code selling platform for solo software engineers.",
};

const termsSections = [
  {
    icon: BookOpen,
    title: "Acceptance of Terms",
    description:
      "By accessing and using iLand, you accept and agree to be bound by these terms",
    badge: "Legal",
    content:
      "These Terms of Service govern your use of the iLand platform. By accessing or using our services, you agree to be bound by these terms and all applicable laws and regulations.",
  },
  {
    icon: Users,
    title: "User Responsibilities",
    description:
      "Your responsibilities when using the iLand platform and services",
    badge: "Users",
    content:
      "You are responsible for maintaining the confidentiality of your account, ensuring compliance with applicable laws, and using the platform in accordance with these terms.",
  },
  {
    icon: Shield,
    title: "Privacy & Data",
    description: "How we handle your data and maintain your privacy",
    badge: "Privacy",
    content:
      "We are committed to protecting your privacy. Our data collection and usage practices are outlined in our Privacy Policy and comply with applicable data protection laws.",
  },
  {
    icon: Globe,
    title: "Intellectual Property",
    description: "Rights and restrictions regarding intellectual property",
    badge: "IP",
    content:
      "iLand retains all rights to its platform and services. Users retain rights to their content while granting us license to provide our services.",
  },
  {
    icon: Zap,
    title: "Service Availability",
    description: "Our commitment to service availability and uptime",
    badge: "Service",
    content:
      "We strive to maintain high service availability but cannot guarantee uninterrupted access. We reserve the right to modify or discontinue services with notice.",
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    description: "Limitations on our liability for service use",
    badge: "Legal",
    content:
      "iLand is provided as-is without warranties. Our liability is limited to the extent permitted by law for any damages arising from service use.",
  },
];

const keyTerms = [
  {
    icon: CheckCircle,
    title: "Acceptance Required",
    description: "You must accept these terms to use iLand services",
    color: "text-green-600",
  },
  {
    icon: AlertCircle,
    title: "Compliance Mandatory",
    description: "All users must comply with applicable laws and regulations",
    color: "text-orange-600",
  },
  {
    icon: Clock,
    title: "Effective Date",
    description: "These terms are effective as of the date of publication",
    color: "text-blue-600",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    description: "Users must maintain confidentiality of their accounts",
    color: "text-purple-600",
  },
];

const legalPrinciples = [
  {
    icon: Gavel,
    title: "Legal Compliance",
    description:
      "All activities must comply with applicable laws and regulations",
    badge: "Compliance",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We are transparent about our practices and policies",
    badge: "Transparency",
  },
  {
    icon: Heart,
    title: "User Protection",
    description: "We prioritize user safety and data protection",
    badge: "Protection",
  },
  {
    icon: Scale,
    title: "Fair Use",
    description: "Services must be used fairly and responsibly",
    badge: "Fair Use",
  },
];

const contactInfo = [
  {
    icon: FileText,
    title: "License Information",
    description: "View licensing terms and conditions",
    link: "/license",
    external: false,
  },
  {
    icon: Shield,
    title: "Security Policy",
    description: "Learn about our security measures and practices",
    link: "/security",
    external: false,
  },
  {
    icon: BookOpen,
    title: "Privacy Policy",
    description: "Review our privacy practices and data handling",
    link: "/privacy",
    external: false,
  },
  {
    icon: Users,
    title: "Email Support",
    description: "Contact us via email for legal inquiries",
            link: "mailto:legal@iland.com",
    external: true,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Legal
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Terms of Service
              </h1>
              <p className="text-sm text-primary font-medium">
                Understanding your rights and responsibilities
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
              These terms govern your use of iLand and outline the legal
              framework for our relationship. Please read them carefully to
              understand your rights and obligations.
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
              <Link href="/privacy" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-border/50 hover:bg-background/50 transition-all duration-300 w-full sm:w-auto min-w-[200px] h-12"
                >
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border/50 flex items-center justify-center">
              <TermsAnimation size="lg" className="w-48 h-48" theme="legal" />
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

      {/* Key Terms */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Key Terms
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Important Information
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Essential terms and conditions you need to understand before using
              iLand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyTerms.map(term => (
              <Card
                key={term.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <term.icon
                        className={`h-4 w-4 ${term.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {term.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {term.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Terms Sections
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Detailed Terms
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Comprehensive breakdown of our terms of service and legal
              framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {termsSections.map(section => (
              <Card
                key={section.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <section.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {section.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed mb-3">
                    {section.description}
                  </div>
                  <div className="text-xs text-muted-foreground/60 leading-relaxed text-justify">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Principles */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Legal Principles
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Our Legal Framework
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              The principles that guide our legal practices and user protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalPrinciples.map(principle => (
              <Card
                key={principle.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <principle.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {principle.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {principle.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {principle.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Contact
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Need Legal Help?
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Contact us for legal inquiries or review related policies and
              documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map(contact => (
              <Card
                key={contact.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg cursor-pointer"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <contact.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {contact.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed mb-4">
                    {contact.description}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary font-medium">
                    <span>Learn more</span>
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
