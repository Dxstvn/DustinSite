"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { sectionPadding } from "@/lib/constants";

export function PortfolioCTA() {
  return (
    <section
      data-section-id="portfolio-cta"
      className="relative overflow-hidden"
    >
      {/* Dark -> cream seam. The page wrapper is #0d1b2a, so this band must paint
          its own cream; the gradient strip prevents any dark flash above it. */}
      <div
        aria-hidden
        className="h-24 w-full bg-gradient-to-b from-[#0d1b2a] to-[#f5f3f0] md:h-32"
      />

      <div className={`bg-[#f5f3f0] ${sectionPadding}`}>
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What's next"
            title="Have something worth building?"
            align="center"
            className="mb-10 md:mb-12"
          />

          <ScrollReveal delay={0.2}>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f3f0]"
              >
                <ShimmerButton tabIndex={-1}>
                  Start a project
                  <ArrowUpRight className="size-4" />
                </ShimmerButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
