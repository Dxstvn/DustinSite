"use client";

import Image from "next/image";
import { motion as m } from "motion/react";
import { motion as motionPresets } from "@/lib/constants";
import type { PortfolioProject } from "@/lib/constants";

interface CaseStudyHeroProps {
  project: PortfolioProject;
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const heroImage = project.heroImageSrc ?? project.imageSrc;

  return (
    <section
      data-section-id="case-study-hero"
      data-theme="dark"
      className="dark relative flex min-h-[70vh] flex-col justify-end overflow-hidden bg-[var(--background)]"
    >
      {/* Background image */}
      <Image
        src={heroImage}
        alt={project.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8 lg:pb-24">
        {/* Pills row */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {/* Category pill */}
          <m.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionPresets.duration.slower,
              ease: motionPresets.ease.outExpo,
              delay: 0,
            }}
            className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white"
            style={{ backgroundColor: project.accent }}
          >
            {project.category}
          </m.span>

          {/* Year badge */}
          {project.year && (
            <m.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionPresets.duration.slower,
                ease: motionPresets.ease.outExpo,
                delay: 0.05,
              }}
              className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70"
            >
              {project.year}
            </m.span>
          )}
        </div>

        {/* Title */}
        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: motionPresets.ease.outExpo,
            delay: 0.1,
          }}
          className="mb-5 max-w-4xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {project.title}
        </m.h1>

        {/* Metric badge */}
        {project.metric && (
          <m.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: motionPresets.duration.slower,
              ease: motionPresets.ease.outExpo,
              delay: 0.2,
            }}
            className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm"
          >
            {project.metric}
          </m.span>
        )}
      </div>

      {/* Bottom gradient transition to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#f5f3f0] md:h-32" />
    </section>
  );
}
