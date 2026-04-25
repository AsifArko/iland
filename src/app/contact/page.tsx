"use client";
import { Footer } from "@/components/footer";
import {
  ContactHero,
  SectionHeader,
  ContactForm,
  ContactInfo,
  BusinessHours,
} from "@/components/contact";

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Cards Section */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader title="Contact Information" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Message Card */}
            <ContactForm />

            {/* Contact Information Card */}
            <ContactInfo />

            {/* Business Hours Card */}
            <BusinessHours />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
