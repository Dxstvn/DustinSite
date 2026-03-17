"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { motion as motionPresets } from "@/lib/constants";

// Placeholder portfolio projects
const projects = [
  {
    id: "meridian",
    title: "Meridian Studio",
    category: "Web Development",
    description: "A full-stack platform for a creative production studio",
    metric: "3x more leads",
    gradient: "from-violet-600/20 via-indigo-600/20 to-blue-600/20",
    accentBorder: "hover:border-violet-500/30",
  },
  {
    id: "verdant",
    title: "Verdant Organics",
    category: "SEO + Web",
    description: "E-commerce redesign with organic search dominance",
    metric: "280% organic growth",
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    accentBorder: "hover:border-emerald-500/30",
  },
  {
    id: "resonance",
    title: "Resonance Audio",
    category: "Social Media",
    description: "Community-driven launch campaign for a music tech startup",
    metric: "50K followers in 90 days",
    gradient: "from-orange-600/20 via-amber-600/20 to-yellow-600/20",
    accentBorder: "hover:border-orange-500/30",
  },
  {
    id: "atlas",
    title: "Atlas Ventures",
    category: "Full Service",
    description: "Complete digital transformation for a VC firm",
    metric: "4.2s → 1.1s load time",
    gradient: "from-rose-600/20 via-pink-600/20 to-fuchsia-600/20",
    accentBorder: "hover:border-rose-500/30",
  },
];

export function PortfolioShowcase() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Selected work"
          title="Projects that speak for themselves"
          description="Every project is a partnership. Here's what happens when ambition meets execution."
        />

        {/* Asymmetric grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.id}
              delay={i * motionPresets.stagger}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <Link href={`/portfolio/${project.id}`} className="group block">
                <m.div
                  whileHover={{ y: -6 }}
                  transition={{
                    duration: motionPresets.duration.base,
                    ease: motionPresets.ease.outExpo,
                  }}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-2xl border border-[var(--surface-border)] transition-all duration-500",
                    project.accentBorder,
                    // Alternate heights for visual rhythm
                    i % 3 === 0 ? "min-h-[420px]" : "min-h-[360px]"
                  )}
                >
                  {/* Gradient background — simulates project imagery */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-100",
                      project.gradient
                    )}
                  />

                  {/* Grid texture overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-tertiary) 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-1 flex-col justify-between p-8 md:p-10">
                    <div>
                      {/* Category pill */}
                      <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-secondary)] backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>

                    <div>
                      {/* Metric */}
                      <p className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-[var(--primary)]">
                        {project.metric}
                      </p>
                      {/* Title */}
                      <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        {project.description}
                      </p>

                      {/* CTA */}
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--text-tertiary)] transition-colors group-hover:text-[var(--text-primary)]">
                        <span>View project</span>
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </m.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View all link */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              View all projects
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
