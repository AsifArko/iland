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
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Ban,
  Scale,
  Lock,
  Eye,
  Copy,
  Microscope,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "License - iLand",
  description:
    "Restricted-use license: viewing and personal non-commercial education and research only. Not open source.",
};

const licenseTypes = [
  {
    icon: BookOpen,
    title: "Restricted use",
    description: "Not an open-source license",
    badge: "LICENSE",
    content:
      "Access is limited to viewing and to running the Software locally for personal, non-commercial education and research. All other rights remain with the copyright holders. See the LICENSE file in the repository for the complete terms.",
  },
  {
    icon: Shield,
    title: "Other use",
    description: "Commercial use and redistribution",
    badge: "Contact",
    content:
      "Commercial use, modification, reverse engineering (where restricted), and redistribution are not permitted without prior written permission from the copyright holders.",
  },
];

const licenseFeatures = [
  {
    icon: Eye,
    title: "View",
    description:
      "Inspect the source code and documentation for personal reference only.",
    color: "text-green-600",
  },
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Use for personal, non-commercial learning and study.",
    color: "text-blue-600",
  },
  {
    icon: Microscope,
    title: "Personal research",
    description:
      "Study the Software for your own non-commercial research.",
    color: "text-purple-600",
  },
];

const licenseTerms = [
  {
    icon: Ban,
    title: "No commercial use",
    description:
      "Operating a business, selling services, or other commercial advantage using the Software is not allowed without written permission.",
    badge: "Prohibited",
  },
  {
    icon: Lock,
    title: "No modification",
    description:
      "You may not adapt, merge, or create derivative works from the Software.",
    badge: "Prohibited",
  },
  {
    icon: Eye,
    title: "No reverse engineering",
    description:
      "Decompilation and attempts to extract trade secrets are prohibited, except where mandatory law overrides this restriction.",
    badge: "Prohibited",
  },
  {
    icon: Copy,
    title: "No redistribution",
    description:
      "Copying, publishing, sublicensing, or transferring the Software (beyond what law requires) is not allowed.",
    badge: "Prohibited",
  },
];

const licenseBenefits = [
  {
    icon: FileText,
    title: "Full text",
    description:
      "The authoritative terms are in the LICENSE file at the repository root.",
    badge: "Repository",
  },
  {
    icon: Shield,
    title: "As-is",
    description:
      "The Software is provided without warranties; liability is limited to the extent permitted by law.",
    badge: "Disclaimer",
  },
  {
    icon: Scale,
    title: "Third parties",
    description:
      "Bundled libraries may have their own licenses; those terms apply to those components.",
    badge: "Notice",
  },
  {
    icon: Mail,
    title: "Questions",
    description:
      "For licensing questions or to request written permission, email the copyright holders.",
    badge: "Contact",
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
    title: "License inquiries",
    description: "Request written permission for uses not covered by the LICENSE",
    link: "mailto:asif.imch@gmail.com",
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
              iLand is distributed under a restricted-use license. You may view
              the Software and use it locally for personal, non-commercial
              education and research only, subject to the LICENSE file.
              Commercial use, modification, reverse engineering, and
              redistribution require written permission.
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
              Permitted uses
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Allowed only within the limits of the LICENSE file in this
              repository.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              How this project is licensed
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              This is not an open-source grant: rights are limited to what the
              LICENSE file expressly allows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
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
              Restrictions
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Examples of activities not permitted without written permission
              from the copyright holders.
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
              Notices
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Disclaimers and where to read the full license text.
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
              Licensing questions
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Use the links below for policies, or email for permission for uses
              beyond the LICENSE.
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
