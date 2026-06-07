import type { Metadata } from "next";
import { PortfolioHero } from "@/components/sections/work/portfolio-hero";
import { PortfolioFeature } from "@/components/sections/work/portfolio-feature";
import { PortfolioIndex } from "@/components/sections/work/portfolio-index";
import { PortfolioCTA } from "@/components/sections/work/portfolio-cta";

export const metadata: Metadata = {
  title: "Work | Jaspire",
  description:
    "Explore our portfolio of premium web development, digital platforms, and design projects. From e-commerce to blockchain, EdTech to healthcare.",
};

export default function WorkPage() {
  return (
    // One continuous dark zone (hero -> feature -> index); the cream CTA paints
    // its own background at the very end. The wrapper colour prevents any flash
    // between the dark sections during load.
    <div style={{ backgroundColor: "#0d1b2a" }}>
      <PortfolioHero />
      <PortfolioFeature />
      <PortfolioIndex />
      <PortfolioCTA />
    </div>
  );
}
