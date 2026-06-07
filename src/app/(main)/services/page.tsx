import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { ServiceSpreads } from "@/components/sections/services/service-spreads";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Services | Jaspire",
  description:
    "Web development, SEO, and social media — three disciplines engineered to one premium standard. Explore how Jaspire builds, ranks, and grows brands.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceSpreads />
      <CTASection />
    </>
  );
}
