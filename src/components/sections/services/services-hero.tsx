"use client";

import { motion as m, useReducedMotion } from "motion/react";
import {
  services,
  accentColorMap,
  motion as motionPresets,
} from "@/lib/constants";

const monoKicker =
  "font-mono text-xs font-medium uppercase tracking-[0.2em]";

export function ServicesHero() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section-id="services-hero"
      data-theme="dark"
      className="dark relative flex min-h-[46vh] flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 max-sm:min-h-[40vh]"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Central breathing glow */}
        <m.div
          animate={
            reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
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
          className={`${monoKicker} mb-6 text-[#8a8a8a]`}
        >
          What We Do
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
          className="font-display text-5xl font-bold tracking-tight text-[#fafafa] md:text-6xl lg:text-7xl"
        >
          Three disciplines.{" "}
          <span className="text-gradient">One standard.</span>
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
          className="mx-auto mt-5 max-w-xl text-base text-[#a3a3a3] md:text-lg"
        >
          Web, search, and social — engineered to the same premium bar.
        </m.p>

        {/* Tally — derived, never hardcoded */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0.3,
          }}
          className={`${monoKicker} mt-7 text-[#6b7280]`}
        >
          {services.length} Disciplines · End to end
        </m.p>

        {/* Accent-dot anchor chips — in-page jump-nav + accent legend */}
        <m.nav
          aria-label="Disciplines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0.3,
          }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              <span
                className="size-2 rounded-full transition-transform group-hover:scale-150"
                style={{ backgroundColor: accentColorMap[service.accent].hex }}
              />
              {service.title}
            </a>
          ))}
        </m.nav>
      </div>
    </section>
  );
}
