"use client";

import Link from "next/link";
import { motion as m } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { siteConfig } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Central glow */}
        <m.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 107, 240, 0.12) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%)",
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
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Ready to elevate your{" "}
            <span className="text-gradient">digital presence</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">
            Whether it&apos;s a new website, SEO strategy, or social media
            overhaul — let&apos;s talk about making your brand unforgettable.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:brightness-110"
            >
              Start Your Project
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
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
