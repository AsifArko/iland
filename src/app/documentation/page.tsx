"use client";

import { Suspense } from "react";
import { DocumentationHero } from "./components/docs/documentation-hero";
import { Prerequisites } from "./components/docs/prerequisites";
import { QuickSetup } from "./components/docs/quick-setup";
import { EnvironmentVariables } from "./components/docs/environment-variables";
import { ServiceSetup } from "./components/docs/service-setup";
import { Deployment } from "./components/docs/deployment";
import { Architecture } from "./components/docs/architecture";
import { ContentModel } from "./components/docs/content-model";
import { Footer } from "@/components/footer";
import { useScrollToAnchor } from "@/hooks/use-scroll-to-anchor";

function DocumentationContent() {
  useScrollToAnchor();

  return (
    <div className="min-h-screen bg-background">
      <DocumentationHero />
      <Prerequisites />
      <ServiceSetup />
      <EnvironmentVariables />
      <QuickSetup />
      <Deployment />
      <Architecture />
      <ContentModel />
      <Footer />
    </div>
  );
}

export default function DocumentationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DocumentationContent />
    </Suspense>
  );
}
