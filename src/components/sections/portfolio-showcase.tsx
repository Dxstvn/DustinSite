"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion as m, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/lib/constants";
import {
  PortfolioDemoModal,
  type DemoProject,
} from "@/components/shared/portfolio-demo-modal";

const projects = portfolioProjects;

/* -------------------------------------------------------------------------- */
/*  Single portfolio card with scroll-linked entrance animation               */
/* -------------------------------------------------------------------------- */

function PortfolioCard({
  project,
  index,
  onCardClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onCardClick: (p: (typeof projects)[0]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFromLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.6],
    [isFromLeft ? "-50vw" : "50vw", "0%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.15, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.6],
    [isFromLeft ? -4 : 4, 0]
  );

  const alignClass = isFromLeft ? "mr-auto" : "ml-auto";
  const radiusClass = isFromLeft
    ? "rounded-none rounded-r-2xl md:rounded-r-3xl"
    : "rounded-none rounded-l-2xl md:rounded-l-3xl";

  return (
    <div ref={cardRef} data-project-id={project.id}>
      <m.div
        style={{ x, opacity, scale, rotate }}
        className={`group relative ${alignClass} h-[55vh] max-w-[1400px] cursor-pointer overflow-hidden ${radiusClass} shadow-2xl shadow-black/40 md:h-[65vh] lg:h-[75vh]`}
        onClick={() => onCardClick(project)}
      >
        {/* Image */}
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1400px"
          priority={index === 0}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-10">
          {/* Metric + Title — bottom-left */}
          <div>
            <p className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.15em] text-[var(--primary)] md:mb-2">
              {project.metric}
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
          </div>

          {/* View Demo pill — bottom-right */}
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-sm transition-all group-hover:border-white/40 group-hover:bg-white/20 group-hover:text-white md:gap-2 md:px-4 md:py-2 md:text-xs">
            View Demo
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:size-3.5" />
          </span>
        </div>
      </m.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Portfolio Showcase Section                                                 */
/* -------------------------------------------------------------------------- */

export function PortfolioShowcase() {
  const [activeProject, setActiveProject] = useState<DemoProject | null>(null);

  const handleCardClick = (project: (typeof projects)[0]) => {
    setActiveProject({
      id: project.id,
      title: project.title,
      domain: project.domain,
      demoUrl: project.demoUrl,
      liveUrl: project.liveUrl,
      techStack: project.techStack,
      description: project.description,
    });
  };

  return (
    <section
      data-section-id="portfolio"
      data-theme="dark"
      className="dark relative overflow-x-clip bg-[var(--background)] py-24 md:py-32 lg:py-40"
    >
      {/* Gradient transition: light section above -> dark portfolio */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-[#f5f3f0] to-[#0a0a0a] md:-top-40 md:h-40" />

      {/* Section header */}
      <div className="mb-12 px-4 sm:px-6 md:mb-16 lg:mb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Selected Work
          </p>
        </div>
      </div>

      {/* Vertical card stack */}
      <div className="space-y-20 md:space-y-32 lg:space-y-40">
        {projects.map((project, i) => (
          <PortfolioCard
            key={project.id}
            project={project}
            index={i}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* View All Work link */}
      <div className="mt-16 px-4 text-center sm:px-6 md:mt-24 lg:px-8">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          View All Work
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <PortfolioDemoModal
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        project={activeProject}
      />
    </section>
  );
}
