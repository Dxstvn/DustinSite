"use client";

import Link from "next/link";
import { motion as m } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { siteConfig } from "@/lib/constants";

export function CTASection() {
  return (
    <section
      data-section-id="cta"
      data-theme="dark"
      className="dark relative overflow-hidden bg-[var(--background)] pb-24 pt-0 md:pb-32 lg:pb-40"
    >
      {/* Gradient transition from light to dark */}
      <div className="h-32 w-full bg-gradient-to-b from-[#f5f3f0] to-[#0a0a0a] md:h-40" />
      <div className="h-16 md:h-24 lg:h-32" />

      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Central glow */}
        <m.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 107, 240, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)",
          }}
        />

        {/* Secondary glow */}
        <m.div
          animate={{
            scale: [1.1, 0.9, 1.1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/3 top-1/3 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%)",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-tertiary) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="mb-6 inline-block font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Let&apos;s build something extraordinary
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Ready to elevate your{" "}
            <span className="text-gradient">digital presence</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-[var(--text-secondary)] md:text-xl">
            Whether it&apos;s a new website, SEO strategy, or social media
            overhaul — let&apos;s talk about making your brand unforgettable.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:brightness-110"
              >
                Start Your Project
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </m.div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
            >
              or email us at{" "}
              <span className="underline underline-offset-4">
                {siteConfig.email}
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
