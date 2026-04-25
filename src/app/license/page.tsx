import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { LicenseAnimation } from "@/components/animations";
import {
  FileText,
  Shield,
  Users,
  Globe,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  BookOpen,
  Scale,
  Gavel,
  Lock,
  Eye,
  Heart,
  Key,
  Trophy,
  Star,
  Copy,
  Download,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "License - iLand",
  description:
    "License information and terms for iLand, the self-hosted source code selling platform for solo software engineers.",
};

const licenseTypes = [
  {
    icon: BookOpen,
    title: "MIT License",
    description: "Open source license with minimal restrictions",
    badge: "Open Source",
    content:
      "The MIT License is a permissive license that allows for maximum freedom in using, modifying, and distributing the software while providing minimal restrictions.",
  },
  {
    icon: Shield,
    title: "Commercial License",
    description: "For commercial and enterprise use",
    badge: "Commercial",
    content:
      "Commercial licenses are available for enterprise customers who need additional features, support, and usage rights beyond the open source version.",
  },
  {
    icon: Users,
    title: "Developer License",
    description: "Special licensing for developers and agencies",
    badge: "Developer",
    content:
      "Developer licenses provide special terms and pricing for software developers, agencies, and organizations using iLand for code selling.",
  },
  {
    icon: Globe,
    title: "Community License",
    description: "For community and non-profit organizations",
    badge: "Community",
    content:
      "Community licenses are designed for non-profit organizations, open source projects, and community initiatives with special terms and conditions.",
  },
  {
    icon: Zap,
    title: "Enterprise License",
    description: "For enterprise and large organizations",
    badge: "Enterprise",
    content:
      "Enterprise licenses provide additional rights for large organizations, developers, and those who want to extend and modify the iLand platform.",
  },
  {
    icon: Scale,
    title: "Custom License",
    description: "Custom licensing for specific needs",
    badge: "Custom",
    content:
      "Custom licenses can be negotiated for organizations with specific requirements, integrations, or usage patterns that need tailored terms.",
  },
];

const licenseFeatures = [
  {
    icon: CheckCircle,
    title: "Use",
    description: "Use the software for any purpose",
    color: "text-green-600",
  },
  {
    icon: Copy,
    title: "Modify",
    description: "Modify and adapt the source code",
    color: "text-blue-600",
  },
  {
    icon: Download,
    title: "Distribute",
    description: "Distribute copies of the software",
    color: "text-purple-600",
  },
  {
    icon: ExternalLink,
    title: "Commercial Use",
    description: "Use in commercial applications",
    color: "text-orange-600",
  },
];

const licenseTerms = [
  {
    icon: Gavel,
    title: "Attribution",
    description: "Maintain copyright and license notices",
    badge: "Required",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Disclose modifications when distributing",
    badge: "Required",
  },
  {
    icon: Heart,
    title: "No Warranty",
    description: "Software provided as-is without warranties",
    badge: "Standard",
  },
  {
    icon: Lock,
    title: "Liability",
    description: "Limited liability for damages",
    badge: "Standard",
  },
];

const licenseBenefits = [
  {
    icon: Star,
    title: "Flexibility",
    description: "Maximum flexibility for your use case",
    badge: "Benefit",
  },
  {
    icon: Trophy,
    title: "Community",
    description: "Join our growing community of users",
    badge: "Community",
  },
  {
    icon: FileText,
    title: "Support",
    description: "Access to documentation and support",
    badge: "Support",
  },
  {
    icon: Key,
    title: "Freedom",
    description: "Freedom to modify and extend",
    badge: "Freedom",
  },
];

const contactInfo = [
  {
    icon: FileText,
    title: "License Terms",
    description: "Review detailed license terms and conditions",
    link: "/terms",
    external: false,
  },
  {
    icon: Shield,
    title: "Security Policy",
    description: "Learn about our security measures",
    link: "/security",
    external: false,
  },
  {
    icon: BookOpen,
    title: "Privacy Policy",
    description: "Review our privacy practices",
    link: "/privacy",
    external: false,
  },
  {
    icon: Users,
    title: "Contact Sales",
    description: "Contact us for custom licensing",
            link: "mailto:sales@iland.com",
    external: true,
  },
];

export default function LicensePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                License
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                License Information
              </h1>
              <p className="text-sm text-primary font-medium">
                Understanding your rights and permissions
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
              iLand is available under multiple license types to meet different
              needs. From open source to commercial licenses, we provide
              flexible options for all users.
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
              <Link href="/terms" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-border/50 hover:bg-background/50 transition-all duration-300 w-full sm:w-auto min-w-[200px] h-12"
                >
                  Terms of Service
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border/50 flex items-center justify-center">
              <LicenseAnimation size="lg" className="w-48 h-48" theme="legal" />
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

      {/* License Features */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                License Features
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              What You Can Do
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Your rights and permissions under our license terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {licenseFeatures.map(feature => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <feature.icon
                        className={`h-4 w-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {feature.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* License Types */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                License Types
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Available Licenses
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Choose the license that best fits your needs and use case.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {licenseTypes.map(license => (
              <Card
                key={license.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <license.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {license.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {license.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed mb-3">
                    {license.description}
                  </div>
                  <div className="text-xs text-muted-foreground/60 leading-relaxed text-justify">
                    {license.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* License Terms */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                License Terms
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Terms and Conditions
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Important terms and conditions that apply to all license types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {licenseTerms.map(term => (
              <Card
                key={term.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <term.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {term.badge}
                    </Badge>
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

      {/* License Benefits */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Benefits
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Why Choose iLand
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              The benefits and advantages of using iLand under our license
              terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {licenseBenefits.map(benefit => (
              <Card
                key={benefit.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <benefit.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {benefit.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">
                    {benefit.description}
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
              Need Help with Licensing?
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Contact us for licensing questions or to discuss custom license
              options.
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
