"use client";

import { motion as m } from "motion/react";
import {
  motion as motionPresets,
  portfolioProjects,
  portfolioDisciplines,
} from "@/lib/constants";

export function PortfolioHero() {
  return (
    <section
      data-section-id="work-hero"
      data-theme="dark"
      className="dark relative flex min-h-[42vh] flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:min-h-[48vh] lg:px-8 max-sm:min-h-[38vh]"
      style={{ backgroundColor: "#0d1b2a" }}
    >
      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Central purple glow */}
        <m.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 107, 240, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--text-tertiary) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Kicker */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0,
          }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a8a]"
        >
          Selected Work — 2024–2026
        </m.p>

        {/* Heading */}
        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0.1,
          }}
          className="mb-5 font-display text-5xl font-bold tracking-tight text-[#fafafa] md:text-6xl lg:text-7xl"
        >
          The work speaks.
        </m.h1>

        {/* Subtitle */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0.2,
          }}
          className="mx-auto max-w-xl text-base text-[#a3a3a3] md:text-lg"
        >
          Digital products, platforms, and brands — built end to end.
        </m.p>

        {/* Tally — counts derived from data, never hardcoded */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0.3,
          }}
          className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-[#6b7280]"
        >
          {portfolioProjects.length} Projects · {portfolioDisciplines.length}{" "}
          Disciplines
        </m.p>
      </div>
    </section>
  );
}
