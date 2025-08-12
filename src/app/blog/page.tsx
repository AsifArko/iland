import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { BlogAnimation } from "@/components/animations";
import {
  BookOpen,
  Shield,
  FileText,
  Globe,
  Star,
  ArrowLeft,
  GitBranch,
  Terminal,
  Database,
  Network,
  Search,
  Server,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - iLand",
  description:
    "Stay updated with the latest developments, upcoming features, and insights about iLand's journey in advancing source code marketplace technology.",
};

const upcomingFeatures = [
  {
    icon: GitBranch,
    title: "CI/CD Pipeline Integration",
    description:
      "We're developing comprehensive CI/CD pipelines to streamline development and deployment processes, ensuring faster and more reliable updates to the iLand platform.",
    badge: "DevOps",
    status: "In Development",
  },
  {
    icon: Terminal,
    title: "Enhanced Developer Tools",
    description:
      "Coming soon: Integrated development tools and IDE plugins for enhanced code development experience within the iLand marketplace.",
    badge: "Development",
    status: "Planned",
  },
  {
    icon: Database,
    title: "Advanced Analytics Dashboard",
    description:
      "Future integration with advanced analytics tools for comprehensive sales tracking, user behavior analysis, and marketplace insights.",
    badge: "Analytics",
    status: "Planned",
  },
  {
    icon: Network,
    title: "Security & Monitoring Tools",
    description:
      "Integration of advanced security monitoring, analytics tools, and performance optimization for enhanced marketplace security.",
    badge: "Security",
    status: "Planned",
  },
  {
    icon: Search,
    title: "Multi-Platform Integration",
    description:
      "Advanced integration capabilities for various payment platforms, code hosting services, and developer tools within the marketplace.",
    badge: "Integration",
    status: "Planned",
  },
  {
    icon: Server,
    title: "Enhanced Infrastructure Tools",
    description:
      "Comprehensive infrastructure tools and monitoring capabilities for marketplace scalability, performance, and reliability.",
    badge: "Infrastructure",
    status: "Planned",
  },
];

const recentUpdates = [
  {
    icon: BookOpen,
    title: "Enhanced Product Management",
    description:
      "Improved product management with unlimited content support including source code, documentation, and various file types.",
    badge: "Products",
    date: "Recent",
  },
  {
    icon: Shield,
    title: "Advanced Security Features",
    description:
      "Enhanced authentication, secure payment processing with Stripe, and robust backend infrastructure with Sanity CMS.",
    badge: "Security",
    date: "Recent",
  },
  {
    icon: Globe,
    title: "Secure Download System",
    description:
      "Seamless integration with GitHub repositories for secure source code downloads and distribution across all devices.",
    badge: "Downloads",
    date: "Recent",
  },
  {
    icon: FileText,
    title: "Comprehensive Asset Management",
    description:
      "Advanced file management system for organizing and distributing source code assets and marketplace resources.",
    badge: "Files",
    date: "Recent",
  },
];

const futureVision = [
  {
    icon: Star,
    title: "Expanded Developer Tool Integration",
    description:
      "Our vision includes integrating more developer tools, IDE plugins, and specialized software for various programming languages and frameworks.",
    badge: "Vision",
  },
  {
    icon: Star,
    title: "Advanced Analytics and Insights",
    description:
      "Comprehensive analytics dashboard for sellers to track sales performance, user engagement metrics, and marketplace insights with detailed analytics.",
    badge: "Analytics",
  },
  {
    icon: Star,
    title: "Collaborative Development Features",
    description:
      "Enhanced collaboration tools including real-time code sharing, team projects, and peer-to-peer development capabilities within the platform.",
    badge: "Collaboration",
  },
  {
    icon: Star,
    title: "AI-Powered Marketplace Assistance",
    description:
      "Integration of AI-powered features for personalized product recommendations, automated content analysis, and intelligent marketplace insights.",
    badge: "AI",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Blog
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                iLand Blog
              </h1>
              <p className="text-sm text-primary font-medium">
                Stay updated with our latest developments and future roadmap
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
              Discover what&apos;s new in iLand, explore upcoming features, and
              learn about our vision for the future of source code marketplace
              technology. We&apos;re constantly working to enhance the platform
              with new tools, integrations, and capabilities.
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
              <BlogAnimation size="lg" className="w-48 h-48" />
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

      {/* Upcoming Features Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Coming Soon
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Upcoming Features
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Exciting new capabilities and integrations we&apos;re working on
              to enhance the iLand marketplace experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFeatures.map(feature => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center justify-between">
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
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium h-6 px-2 rounded-md bg-warning/20 text-warning-foreground"
                    >
                      {feature.status}
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

      {/* Recent Updates Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Recent Updates
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Recent Updates
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Latest improvements and enhancements we&apos;ve made to the iLand
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentUpdates.map(update => (
              <Card
                key={update.title}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                        <update.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-medium h-6 px-2 rounded-md"
                      >
                        {update.badge}
                      </Badge>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium h-6 px-2 rounded-md bg-success/20 text-success-foreground"
                    >
                      {update.date}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {update.title}
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
                    {update.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Future Vision
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Our Vision for the Future
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Long-term goals and aspirations for advancing scientific and
              engineering education through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureVision.map((vision, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <vision.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {vision.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {vision.title}
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
                    {vision.description}
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
