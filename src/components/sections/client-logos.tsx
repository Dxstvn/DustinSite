"use client";

import { motion as m } from "motion/react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

// Using tech/platform logos as "trusted by" since we're using placeholder content
const logos = [
  { name: "Next.js", width: "w-20" },
  { name: "Vercel", width: "w-20" },
  { name: "Shopify", width: "w-20" },
  { name: "Stripe", width: "w-16" },
  { name: "Figma", width: "w-16" },
  { name: "Notion", width: "w-20" },
  { name: "Linear", width: "w-16" },
  { name: "Framer", width: "w-20" },
];

export function ClientLogos() {
  return (
    <section className="relative border-y border-[var(--surface-border)] py-14 md:py-16">
      <ScrollReveal>
        <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          Technologies we build with
        </p>
      </ScrollReveal>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--surface-primary)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--surface-primary)] to-transparent" />

        <m.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex w-max items-center gap-16"
        >
          {/* Double the logos for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center justify-center opacity-30 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0"
            >
              <span className={`${logo.width} text-center font-mono text-sm font-medium tracking-wide text-[var(--text-secondary)]`}>
                {logo.name}
              </span>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
