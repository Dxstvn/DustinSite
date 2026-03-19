"use client";

import Image from "next/image";
import { sectionPadding, containerWidth } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

interface BioBlock {
  kicker: string;
  title: string;
  content: string;
}

const bioBlocks: BioBlock[] = [
  {
    kicker: "Origin",
    title: "From Vision to Venture",
    content:
      "Jaspire was born from a simple belief: that every ambitious brand deserves a digital partner who cares as deeply about their success as they do. What started as a one-person mission to bridge the gap between design excellence and business results has grown into a studio trusted by brands across industries.",
  },
  {
    kicker: "Philosophy",
    title: "Craft Meets Strategy",
    content:
      "We don't believe in choosing between beautiful and effective. The best digital experiences are both — they captivate on first impression and convert through thoughtful user journeys. Every pixel serves a purpose, every interaction drives toward a goal.",
  },
  {
    kicker: "Approach",
    title: "Embedded, Not Outsourced",
    content:
      "We work as an extension of your team, not a vendor on the sideline. Deep immersion in your brand, your audience, and your competitive landscape means we make decisions grounded in context — not assumptions.",
  },
  {
    kicker: "Vision",
    title: "Building What's Next",
    content:
      "The digital landscape moves fast, but principles endure. We invest in mastering emerging technologies — from AI-driven personalization to performance-first frameworks — so our clients are always ahead of the curve, never catching up.",
  },
];

export function AboutFounder() {
  return (
    <section data-section-id="about-founder" className={sectionPadding}>
      <div className={containerWidth}>
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            The Founder
          </p>
          <h2 className="mb-16 max-w-lg text-3xl font-bold tracking-tight md:mb-20 md:text-4xl">
            Built by a builder, for builders.
          </h2>
        </ScrollReveal>

        {/* Desktop: sticky photo left + scrollable bio right */}
        <div className="hidden gap-16 md:flex">
          {/* Left: sticky photo */}
          <div className="w-[45%]">
            <div className="sticky top-[20%]">
              <ScrollReveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/about/founder-portrait.png"
                    alt="Dustin Jasmin — Founder of Jaspire"
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Name and title below photo */}
                <div className="mt-6">
                  <p className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                    Dustin Jasmin
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                    Founder & Creative Director
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right: scrollable bio blocks */}
          <div className="w-[55%]">
            {bioBlocks.map((block, i) => (
              <ScrollReveal key={block.kicker} delay={i * 0.08}>
                <div className="flex min-h-[50vh] flex-col justify-center py-12 first:pt-0 last:pb-0">
                  <span className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
                    {block.kicker}
                  </span>
                  <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                    {block.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                    {block.content}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="md:hidden">
          {/* Photo */}
          <ScrollReveal>
            <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/about/founder-portrait.png"
                alt="Dustin Jasmin — Founder of Jaspire"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Name and title */}
            <div className="mb-10">
              <p className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                Dustin Jasmin
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Founder & Creative Director
              </p>
            </div>
          </ScrollReveal>

          {/* Bio blocks */}
          <div className="space-y-12">
            {bioBlocks.map((block, i) => (
              <ScrollReveal key={block.kicker} delay={i * 0.08}>
                <div>
                  <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
                    {block.kicker}
                  </span>
                  <h3 className="mb-3 text-xl font-bold tracking-tight">
                    {block.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                    {block.content}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
