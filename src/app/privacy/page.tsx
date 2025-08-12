import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { PrivacyAnimation } from "@/components/animations";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  CheckCircle,
  AlertTriangle,
  Users,
  Database,
  Globe,
  Settings,
  ArrowLeft,
  Key,
  Fingerprint,
  Server,
  Network,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - iLand",
  description:
    "Learn about how iLand protects your privacy and handles your data with transparency and security.",
};

const privacyPrinciples = [
  {
    icon: Shield,
    title: "Data Protection",
    description:
      "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
    badge: "Security",
  },
  {
    icon: Lock,
    title: "Encryption",
    description:
      "All sensitive data is encrypted both in transit and at rest using AES-256 encryption to ensure your information remains secure.",
    badge: "Encryption",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We are transparent about what data we collect, how we use it, and who we share it with. You have full control over your information.",
    badge: "Transparency",
  },
  {
    icon: Users,
    title: "User Control",
    description:
      "You have complete control over your data. Access, modify, or delete your information at any time through your account settings.",
    badge: "Control",
  },
  {
    icon: Database,
    title: "Data Minimization",
    description:
      "We only collect the data necessary to provide our services and improve your learning experience, nothing more.",
    badge: "Minimal",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description:
      "We comply with international privacy regulations including GDPR, CCPA, and other applicable data protection laws.",
    badge: "Compliance",
  },
];

const dataCollection = [
  {
    icon: FileText,
    title: "Email Address",
    description:
      "We only store the email address you provide during Stripe checkout for order confirmation and product access.",
    badge: "Required",
  },
  {
    icon: Settings,
    title: "Usage Analytics",
    description:
      "Anonymous usage data to improve our platform functionality and user experience, with no personal identification.",
    badge: "Analytics",
  },
  {
    icon: Network,
    title: "Technical Data",
    description:
      "Device information, IP addresses, and browser data for security, fraud prevention, and service optimization.",
    badge: "Technical",
  },
];

const dataRights = [
  {
    icon: Key,
    title: "Access Rights",
    description:
      "You have the right to access all personal data we hold about you and receive a copy in a portable format.",
    badge: "Access",
  },
  {
    icon: Fingerprint,
    title: "Correction Rights",
    description:
      "You can request corrections to any inaccurate or incomplete personal data we have about you.",
    badge: "Correction",
  },
  {
    icon: AlertTriangle,
    title: "Deletion Rights",
    description:
      "You can request the deletion of your personal data, subject to legal requirements and service continuity.",
    badge: "Deletion",
  },
  {
    icon: Server,
    title: "Portability Rights",
    description:
      "You can request a copy of your data in a structured, machine-readable format for transfer to another service.",
    badge: "Portability",
  },
];

const securityMeasures = [
  {
    icon: Shield,
    title: "Multi-Layer Security",
    description:
      "Enterprise-grade security infrastructure with firewalls, intrusion detection, and regular security audits.",
    badge: "Infrastructure",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All data transmission is encrypted using TLS 1.3, and stored data is encrypted with AES-256 encryption.",
    badge: "Encryption",
  },
  {
    icon: Users,
    title: "Access Controls",
    description:
      "Strict access controls and authentication mechanisms to ensure only authorized personnel can access your data.",
    badge: "Access",
  },
  {
    icon: CheckCircle,
    title: "Regular Audits",
    description:
      "Regular security assessments, penetration testing, and compliance audits to maintain the highest security standards.",
    badge: "Audits",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Privacy Policy
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Your Privacy Matters
              </h1>
              <p className="text-sm text-primary font-medium">
                Transparent data practices and robust security measures to
                protect your information
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
              At iLand, we believe privacy is a fundamental right. Our
              comprehensive privacy policy ensures your data is protected, your
              rights are respected, and you have full control over your personal
              information.
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
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-border/50 hover:bg-background/50 transition-all duration-300 w-full sm:w-auto min-w-[200px] h-12"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border/50 flex items-center justify-center">
              <PrivacyAnimation
                size="lg"
                className="w-48 h-48"
                theme="protection"
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

      {/* Privacy Principles Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Our Principles
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Privacy Principles
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              We are committed to protecting your privacy through transparent
              practices and robust security measures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privacyPrinciples.map(principle => (
              <Card
                key={principle.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg"
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
                  <div
                    className="text-xs text-muted-foreground/70 leading-relaxed text-justify"
                    style={{
                      wordSpacing: "0.01em",
                      textAlignLast: "left",
                      hyphens: "auto",
                    }}
                  >
                    {principle.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Collection Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Data Collection
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              What We Collect
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              We collect only the data necessary to provide our services and
              improve your learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataCollection.map(item => (
              <Card
                key={item.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <item.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {item.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
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
                    {item.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Your Rights
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Your Data Rights
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              You have complete control over your personal data and can exercise
              these rights at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataRights.map(right => (
              <Card
                key={right.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <right.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {right.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {right.title}
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
                    {right.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Security
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Security Measures
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              We implement comprehensive security measures to protect your data
              and ensure your privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityMeasures.map(measure => (
              <Card
                key={measure.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <measure.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {measure.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {measure.title}
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
                    {measure.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Questions
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Have Questions About Privacy?
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              If you have any questions about our privacy practices or would
              like to exercise your data rights, please don&apos;t hesitate to
              contact us.
            </p>
          </div>
          <div className="flex">
            <Link href="/contact">
              <Button
                size="lg"
                className="group transition-all duration-300 min-w-[200px] h-12"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
