"use client";

import Link from "next/link";
import { motion as m } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { motion as motionPresets } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4">
      {/* Background — animated radial gradient with grid */}
      <div className="absolute inset-0 -z-10">
        {/* Primary glow — center */}
        <m.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 107, 240, 0.15) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)",
          }}
        />
        {/* Secondary glow — offset */}
        <m.div
          animate={{
            scale: [1.1, 0.9, 1.1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%)",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Badge */}
        <m.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0.5,
          }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface-secondary)]/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--primary)] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--primary)]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Digital Agency
            </span>
          </span>
        </m.div>

        {/* Headline — static part */}
        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: motionPresets.ease.outExpo,
            delay: 0.7,
          }}
          className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          We Build Digital
        </m.h1>

        {/* Headline — morphing part (21st.dev GooeyText) */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: motionPresets.ease.outExpo,
            delay: 0.9,
          }}
          className="mt-2 h-[1.2em] w-full sm:h-[1.3em]"
        >
          <GooeyText
            texts={["Experiences", "Brands", "Growth"]}
            morphTime={1.5}
            cooldownTime={1}
            className="h-full"
            textClassName="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gradient"
          />
        </m.div>

        {/* Subtitle */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 1.1,
          }}
          className="mt-8 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg md:mt-10 md:text-xl"
        >
          Crafting websites, SEO strategies, and social media presence that
          transform brands and drive real results.
        </m.p>

        {/* CTAs */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 1.3,
          }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/25 hover:brightness-110"
          >
            View Our Work
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-secondary)]/50 px-7 py-3.5 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--text-tertiary)] hover:bg-[var(--surface-tertiary)]"
          >
            Start a Project
            <Play className="size-3.5 fill-current transition-transform group-hover:translate-x-0.5" />
          </Link>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-[var(--text-tertiary)] to-transparent" />
        </m.div>
      </m.div>
    </section>
  );
}
