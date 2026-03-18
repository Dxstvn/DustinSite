import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutFounder } from "@/components/sections/about/about-founder";

export const metadata: Metadata = {
  title: "About | Jaspire",
  description:
    "Meet the team behind Jaspire. We craft premium digital experiences through web development, SEO, and social media management.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutFounder />
    </>
  );
}
