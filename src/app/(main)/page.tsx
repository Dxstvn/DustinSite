import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { ServicesOverview } from "@/components/sections/services-overview";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { StatsBar } from "@/components/sections/stats-bar";
import { ProcessSection } from "@/components/sections/process-section";
import { Testimonials } from "@/components/sections/testimonials";
import { GlobalReach } from "@/components/sections/global-reach";

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
      <GlobalReach />
    </>
  );
}
