"use client";

import { motion as m } from "motion/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ContactForm } from "./contact-form";
import { motion as motionPresets } from "@/lib/constants";

export function ContactHero() {
  return (
    <section
      data-section-id="contact-hero"
      data-theme="dark"
      className="dark relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Central purple glow */}
        <m.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 107, 240, 0.12) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 70%)",
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

      {/* Background Beams */}
      <BackgroundBeams className="z-0 opacity-60" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl">
        {/* Kicker */}
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0.2,
          }}
          className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
        >
          Start a project
        </m.p>

        {/* Heading */}
        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: motionPresets.ease.outExpo,
            delay: 0.35,
          }}
          className="mb-10 text-center text-5xl font-bold tracking-tight text-white sm:text-6xl md:mb-12 md:text-7xl lg:text-8xl"
        >
          Let&apos;s build
          <br />
          <span className="text-gradient">something together.</span>
        </m.h1>

        {/* Multi-step form */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionPresets.duration.slower,
            ease: motionPresets.ease.outExpo,
            delay: 0.55,
          }}
        >
          <ContactForm />
        </m.div>
      </div>
    </section>
  );
}
