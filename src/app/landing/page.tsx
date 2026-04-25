import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Screenshots } from "./components/screenshots";
import { Pricing } from "./components/pricing";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Screenshots />
      <Pricing />
      <Footer />
    </div>
  );
}
