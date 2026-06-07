"use client";

import { useRef } from "react";
import {
  motion as m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  sectionPadding,
  containerWidth,
  motion as motionPresets,
  siteConfig,
} from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

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

const monoKicker =
  "font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]";

/**
 * Brand card — the non-face anchor that replaces the deleted portrait. The
 * gradient panel now carries real brand content (wordmark, ethos, tagline) so
 * it reads as an intentional brand mark rather than an empty decorative box.
 */
function BrandPlate({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "noise glow-brand bg-gradient-brand relative overflow-hidden rounded-2xl text-white",
        className,
      )}
    >
      {/* Soft inner light to give the flat gradient depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_15%,rgba(255,255,255,0.22),transparent_60%)]"
      />
      {/* Bottom scrim anchors the small type for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
      />

      {/* Brand content */}
      <div className="relative flex h-full flex-col justify-between gap-5 p-6 md:p-8">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="size-2.5 rounded-full bg-white/90" />
          <span className="font-display text-2xl font-bold lowercase tracking-tight md:text-3xl">
            {siteConfig.name}
          </span>
        </div>

        {/* Ethos line — drawn from the Philosophy block */}
        <p className="font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
          Craft meets strategy.
        </p>

        {/* Tagline + domain */}
        <div className="space-y-1.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/75">
            {siteConfig.tagline}
          </p>
          <p className="font-mono text-[11px] tracking-wide text-white/60">
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AboutFounder() {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();
  const parallaxEnabled = isDesktop && !prefersReducedMotion;

  // Subtle, section-wide numeral parallax — gated to desktop + motion-OK.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const numeralShift = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      ref={sectionRef}
      data-section-id="about-founder"
      className={sectionPadding}
    >
      <div className={containerWidth}>
        {/* Header */}
        <ScrollReveal>
          <p className={cn(monoKicker, "mb-5")}>The Founder</p>
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
            Built by a builder, for builders.
          </h2>
        </ScrollReveal>

        {/* Desktop: editorial zig-zag spread on a 12-col grid */}
        <div className="mt-20 hidden md:block">
          {bioBlocks.map((block, i) => {
            const numeral = String(i + 1).padStart(2, "0");
            const isEven = i % 2 === 1; // 02, 04 mirror
            const direction = isEven ? "right" : "left";

            return (
              <ScrollReveal
                key={block.kicker}
                direction={direction}
                delay={0.05 * i}
                className="border-t border-[var(--surface-border)] first:border-t-0"
              >
                <div className="grid grid-cols-12 items-start gap-x-8 py-16">
                  {/* ODD: title-left / content-right. EVEN: mirror. */}
                  {isEven ? (
                    <>
                      {/* Content (left) */}
                      <div className="order-2 col-span-6">
                        <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)] lg:text-lg">
                          {block.content}
                        </p>
                      </div>
                      {/* Ghost numeral + kicker + title (right) */}
                      <div className="order-1 col-span-5 col-start-8">
                        <m.span
                          aria-hidden
                          style={parallaxEnabled ? { y: numeralShift } : undefined}
                          className="block font-display text-7xl font-bold leading-none text-[var(--text-tertiary)] opacity-[0.32] lg:text-8xl"
                        >
                          {numeral}
                        </m.span>
                        <span className={cn(monoKicker, "mt-6 block text-[var(--primary)]")}>
                          {block.kicker}
                        </span>
                        <h3 className="mt-3 font-display text-3xl font-bold tracking-tight lg:text-4xl">
                          {block.title}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Ghost numeral + kicker + title (left) */}
                      <div className="col-span-5">
                        <m.span
                          aria-hidden
                          style={parallaxEnabled ? { y: numeralShift } : undefined}
                          className="block font-display text-7xl font-bold leading-none text-[var(--text-tertiary)] opacity-[0.32] lg:text-8xl"
                        >
                          {numeral}
                        </m.span>
                        <span className={cn(monoKicker, "mt-6 block text-[var(--primary)]")}>
                          {block.kicker}
                        </span>
                        <h3 className="mt-3 font-display text-3xl font-bold tracking-tight lg:text-4xl">
                          {block.title}
                        </h3>
                      </div>
                      {/* Content (right) */}
                      <div className="col-span-6 col-start-7">
                        <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)] lg:text-lg">
                          {block.content}
                        </p>
                        {/* Brand plate slotted into the empty gutter beside rows 02/03 */}
                        {i === 2 && (
                          <ScrollReveal direction="up" delay={0.15} className="mt-12">
                            <BrandPlate className="aspect-[3/4] w-full max-w-xs" />
                          </ScrollReveal>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </ScrollReveal>
            );
          })}

          {/* Typographic sign-off */}
          <ScrollReveal
            direction="none"
            duration={motionPresets.duration.slower}
            className="border-t border-[var(--surface-border)]"
          >
            <m.div
              initial={{ opacity: 0.8, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: motionPresets.duration.slower,
                ease: motionPresets.ease.outExpo,
              }}
              className="pt-16"
            >
              <p className="font-display text-6xl font-bold tracking-tight text-[var(--text-primary)] lg:text-7xl">
                Dustin Jasmin
              </p>
              <p className={cn(monoKicker, "mt-4")}>Founder &amp; Creative Director</p>
              <m.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: motionPresets.duration.slower,
                  ease: motionPresets.ease.outExpo,
                }}
                className="mt-8 h-px origin-left bg-[var(--surface-border)]"
              />
            </m.div>
          </ScrollReveal>
        </div>

        {/* Mobile: single column */}
        <div className="mt-14 md:hidden">
          {bioBlocks.map((block, i) => {
            const numeral = String(i + 1).padStart(2, "0");

            return (
              <div key={block.kicker}>
                <ScrollReveal
                  direction="up"
                  delay={0.05 * i}
                  className="border-t border-[var(--surface-border)] first:border-t-0"
                >
                  <div className="py-10">
                    <span
                      aria-hidden
                      className="block font-display text-5xl font-bold leading-none text-[var(--text-tertiary)] opacity-[0.32]"
                    >
                      {numeral}
                    </span>
                    <span className={cn(monoKicker, "mt-4 block text-[var(--primary)]")}>
                      {block.kicker}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
                      {block.content}
                    </p>
                  </div>
                </ScrollReveal>

                {/* Brand plate band after block 02 */}
                {i === 1 && (
                  <ScrollReveal direction="up" delay={0.1} className="py-2">
                    <BrandPlate className="aspect-[16/10] w-full" />
                  </ScrollReveal>
                )}
              </div>
            );
          })}

          {/* Typographic sign-off */}
          <ScrollReveal
            direction="none"
            className="border-t border-[var(--surface-border)]"
          >
            <m.div
              initial={{ opacity: 0.8, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: motionPresets.duration.slower,
                ease: motionPresets.ease.outExpo,
              }}
              className="pt-10"
            >
              <p className="font-display text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                Dustin Jasmin
              </p>
              <p className={cn(monoKicker, "mt-3")}>Founder &amp; Creative Director</p>
              <m.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: motionPresets.duration.slower,
                  ease: motionPresets.ease.outExpo,
                }}
                className="mt-6 h-px origin-left bg-[var(--surface-border)]"
              />
            </m.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
