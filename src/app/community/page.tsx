import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { CommunityAnimation } from "@/components/animations";
import {
  Brain,
  Code,
  Database,
  Globe,
  Users,
  ArrowLeft,
  Cpu,
  Network,
  Server,
  Star,
  Github,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Community - iLand",
  description:
    "Meet the iLand team - experts in software engineering and source code marketplace development building the future of code selling platforms.",
};

const teamMembers = [
  {
    name: "Software Engineer",
    role: "Full-Stack Engineer",
    institution: "iLand",
    focus: "System Architect",
    expertise: [
      "Frontend Development",
      "Backend Development",
      "Database Design",
      "Cloud Infrastructure",
      "Network Security",
    ],
    description:
      "Architecting and building robust, scalable systems with expertise in modern web technologies, cloud infrastructure, and enterprise-grade security solutions.",
    icon: Code,
    badge: "Engineering",
    linkedinUrl: "https://www.linkedin.com/in/asifimch",
  },
];

const ourValues = [
  {
    icon: Users,
    title: "Developer Empowerment",
    description:
      "We believe in empowering solo software engineers to build and manage their own source code selling platforms with professional-grade tools.",
    badge: "Empowerment",
  },
  {
    icon: Brain,
    title: "Innovation-Driven Development",
    description:
      "Our platform is built on cutting-edge web technologies and best practices, ensuring we stay at the forefront of marketplace development.",
    badge: "Innovation",
  },
  {
    icon: Code,
    title: "Engineering Excellence",
    description:
      "We maintain the highest standards in software engineering, from clean code architecture to robust security and scalable infrastructure.",
    badge: "Excellence",
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Our mission is to make professional source code selling platforms accessible to developers worldwide, regardless of their technical background.",
    badge: "Accessibility",
  },
];

const expertiseAreas = [
  {
    icon: Brain,
    title: "Web Development",
    description:
      "Modern web technologies, responsive design, and scalable frontend systems for marketplace platforms.",
    badge: "Frontend",
  },
  {
    icon: Cpu,
    title: "Backend Systems",
    description:
      "Robust API development, database design, and scalable backend systems for marketplace applications.",
    badge: "Backend",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "Modern web technologies, responsive design, and scalable backend systems for marketplace platforms.",
    badge: "Development",
  },
  {
    icon: Database,
    title: "Database & Cloud",
    description:
      "Robust database design, cloud infrastructure, and scalable data management solutions.",
    badge: "Infrastructure",
  },
  {
    icon: Network,
    title: "Networking & Security",
    description:
      "Enterprise-grade security, network architecture, and system administration for marketplace platforms.",
    badge: "Security",
  },
  {
    icon: Server,
    title: "System Architecture",
    description:
      "Scalable system design, microservices architecture, and high-performance computing solutions.",
    badge: "Architecture",
  },
];

const getInvolved = [
  {
    icon: Github,
    title: "Open Source",
    description:
      "Contribute to our open-source projects and help shape the future of source code marketplace technology.",
    badge: "Contribute",
  },
  {
    icon: Mail,
    title: "Platform Collaboration",
    description:
      "Partner with us on platform development projects and marketplace technology innovations.",
    badge: "Collaboration",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join our community of developers, entrepreneurs, and marketplace builders.",
    badge: "Community",
  },
  {
    icon: Star,
    title: "Feedback & Ideas",
    description:
      "Share your ideas and feedback to help us improve iLand and make it better for everyone.",
    badge: "Feedback",
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-16 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Our Team
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                iLand Community
              </h1>
              <p className="text-sm text-primary font-medium">
                Meet the experts behind iLand - software engineers building the
                future of source code marketplaces
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
              Our team combines cutting-edge research in machine learning and
              quantum computing with expert software engineering to create
              innovative educational technology solutions.
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
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
              <CommunityAnimation size="lg" className="w-48 h-48" />
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

      {/* Team Members Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Meet Our Team
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              The Minds Behind iLand
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Our diverse team brings together expertise in research and
              engineering to create innovative educational solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg"
              >
                <CardHeader className="pb-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Link
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-300 cursor-pointer"
                      >
                        <member.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </Link>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {member.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.institution}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {member.badge}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground/70 leading-relaxed">
                        {member.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Expertise Areas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="text-xs font-medium h-5 px-2 rounded-md bg-muted/50"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Our Values
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              What Drives Us
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              The principles that guide our work and shape the future of
              educational technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ourValues.map((value, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] rounded-lg"
              >
                <CardHeader className="pb-0 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50">
                      <value.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      {value.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                    {value.title}
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
                    {value.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Expertise
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Areas of Expertise
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              Our combined expertise spans cutting-edge research and practical
              engineering solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, index) => (
              <Card
                key={index}
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

      {/* Get Involved Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
              <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
                Get Involved
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Join Our Community
            </h2>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
              There are many ways to get involved with iLand and help shape the
              future of educational technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getInvolved.map((item, index) => (
              <Card
                key={index}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
