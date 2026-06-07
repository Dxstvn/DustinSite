"use client";

import Image from "next/image";
import Link from "next/link";
import { motion as m } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  containerWidth,
  portfolioProjects,
  motion as motionPresets,
} from "@/lib/constants";
import type { PortfolioProject } from "@/lib/constants";

interface CaseStudyNextProps {
  currentProject: PortfolioProject;
}

export function CaseStudyNext({ currentProject }: CaseStudyNextProps) {
  const currentIndex = portfolioProjects.findIndex(
    (p) => p.id === currentProject.id
  );
  const nextProject =
    portfolioProjects[(currentIndex + 1) % portfolioProjects.length];

  const nextSlug = nextProject.slug ?? nextProject.id;

  return (
    <section
      data-section-id="case-study-next"
      className="py-32 md:py-40"
    >
      <div className={containerWidth}>
        <Link href={`/portfolio/${nextSlug}`} className="group block">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              Next Project
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-8 flex items-center gap-3">
              <h2 className="font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--primary)] md:text-5xl">
                {nextProject.title}
              </h2>
              <ArrowUpRight className="size-6 text-[var(--text-tertiary)] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--primary)] md:size-8" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="overflow-hidden rounded-2xl">
              <m.div
                whileHover={{ scale: 1.02 }}
                transition={{
                  duration: motionPresets.duration.slow,
                  ease: motionPresets.ease.outExpo,
                }}
              >
                <Image
                  src={nextProject.heroImageSrc ?? nextProject.imageSrc}
                  alt={nextProject.title}
                  width={1400}
                  height={600}
                  className="h-auto max-h-[400px] w-full object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  loading="lazy"
                />
              </m.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white"
                style={{ backgroundColor: nextProject.accent }}
              >
                {nextProject.category}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                {nextProject.description}
              </span>
            </div>
          </ScrollReveal>
        </Link>
      </div>
    </section>
  );
}
