import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { SecurityAnimation } from "@/components/animations";
import {
  Shield,
  Lock,
  Eye,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  FileText,
  Globe,
  Server,
  Key,
  Fingerprint,
  Database,
  Network,
  Monitor,
  Bug,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security - iLand",
  description:
    "Security measures and practices for iLand, the self-hosted source code selling platform for solo software engineers.",
};

const securityFeatures = [
  {
    icon: Shield,
    title: "Data Encryption",
    description:
      "All data is encrypted in transit and at rest using industry-standard protocols",
    badge: "Encryption",
    content:
      "We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. All sensitive information is encrypted before storage and transmission.",
  },
  {
    icon: Lock,
    title: "Authentication",
    description:
      "Secure user authentication with multi-factor authentication support",
    badge: "Auth",
    content:
      "Our authentication system supports secure login, session management, and multi-factor authentication options for enhanced security.",
  },
  {
    icon: Eye,
    title: "Privacy Protection",
    description: "Comprehensive privacy controls and data protection measures",
    badge: "Privacy",
    content:
      "We implement strict privacy controls, data minimization practices, and regular privacy audits to ensure your data remains protected.",
  },
  {
    icon: Zap,
    title: "Secure Payments",
    description: "PCI DSS compliant payment processing with Stripe integration",
    badge: "Payments",
    content:
      "All payment processing is handled by Stripe, a PCI DSS Level 1 compliant service provider, ensuring your financial data is secure.",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description:
      "Enterprise-grade infrastructure with regular security updates",
    badge: "Infrastructure",
    content:
      "Our infrastructure runs on secure cloud platforms with automated security updates, intrusion detection, and 24/7 monitoring.",
  },
  {
    icon: Network,
    title: "Network Security",
    description: "Advanced network security with DDoS protection and firewalls",
    badge: "Network",
    content:
      "We employ multiple layers of network security including DDoS protection, Web Application Firewalls, and secure VPN access.",
  },
];

const securityMeasures = [
  {
    icon: CheckCircle,
    title: "Regular Audits",
    description: "Comprehensive security audits conducted quarterly",
    color: "text-green-600",
  },
  {
    icon: AlertTriangle,
    title: "Threat Monitoring",
    description: "24/7 threat detection and response systems",
    color: "text-orange-600",
  },
  {
    icon: Clock,
    title: "Incident Response",
    description: "Rapid incident response within 1 hour of detection",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "Team Training",
    description: "Regular security training for all team members",
    color: "text-purple-600",
  },
];

const securityStandards = [
  {
    icon: Database,
    title: "Data Protection",
    description: "GDPR and CCPA compliant data handling practices",
    badge: "Compliance",
  },
  {
    icon: Key,
    title: "Access Control",
    description: "Role-based access control with least privilege principle",
    badge: "Access",
  },
  {
    icon: Fingerprint,
    title: "Identity Verification",
    description: "Multi-factor authentication and identity verification",
    badge: "Identity",
  },
  {
    icon: Monitor,
    title: "Continuous Monitoring",
    description: "Real-time security monitoring and alerting",
    badge: "Monitoring",
  },
];

const securityTools = [
  {
    icon: Bug,
    title: "Vulnerability Scanning",
    description: "Automated vulnerability scanning and penetration testing",
    badge: "Testing",
  },
  {
    icon: Heart,
    title: "Health Checks",
    description: "Regular security health checks and assessments",
    badge: "Health",
  },
  {
    icon: FileText,
    title: "Security Documentation",
    description: "Comprehensive security documentation and procedures",
    badge: "Docs",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "Adherence to international security standards",
    badge: "Standards",
  },
];

const contactInfo = [
  {
    icon: Shield,
    title: "Security Team",
    description: "Contact our security team for urgent issues",
    link: "mailto:security@iland.com",
    external: true,
  },
  {
    icon: FileText,
    title: "Security Policy",
    description: "Review our comprehensive security policy",
    link: "/terms",
    external: false,
  },
  {
    icon: Users,
    title: "Privacy Policy",
    description: "Learn about our privacy and data protection",
    link: "/privacy",
    external: false,
  },
  {
    icon: Lock,
    title: "Bug Bounty",
    description: "Report security vulnerabilities to our team",
    link: "mailto:security@iland.com",
    external: true,
  },
];

export default function SecurityPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Security
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Security First
              </h1>
              <p className="text-sm text-primary font-medium">
                Protecting your data with enterprise-grade security
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
              Your security is our top priority. We implement industry-leading
              security measures to protect your data, ensure privacy, and
              maintain the highest standards of security.
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
              <SecurityAnimation
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

      {/* Security Measures */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Security Measures
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Our Security Approach
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Multi-layered security measures to protect your data and ensure
              platform integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMeasures.map(measure => (
              <Card
                key={measure.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <measure.icon
                        className={`h-4 w-4 ${measure.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {measure.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {measure.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Security Features
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Comprehensive Protection
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Enterprise-grade security features designed to protect your data
              at every level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map(feature => (
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
                  <div className="text-xs text-muted-foreground/70 leading-relaxed mb-3">
                    {feature.description}
                  </div>
                  <div className="text-xs text-muted-foreground/60 leading-relaxed text-justify">
                    {feature.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Standards */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Security Standards
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Industry Standards
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              We adhere to the highest security standards and best practices in
              the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityStandards.map(standard => (
              <Card
                key={standard.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <standard.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {standard.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {standard.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {standard.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Tools */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Security Tools
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Security Infrastructure
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Advanced security tools and infrastructure to maintain platform
              security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityTools.map(tool => (
              <Card
                key={tool.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <tool.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {tool.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {tool.description}
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
              Security Support
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Contact our security team for questions, concerns, or to report
              security issues.
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
