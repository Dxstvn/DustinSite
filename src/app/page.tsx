import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { ServicesOverview } from "@/components/sections/services-overview";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { StatsBar } from "@/components/sections/stats-bar";
import { ProcessSection } from "@/components/sections/process-section";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ServicesOverview />
      <PortfolioShowcase />
      <StatsBar />
      <ProcessSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
