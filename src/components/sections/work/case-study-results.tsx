"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { sectionPadding, containerWidth } from "@/lib/constants";
import type { PortfolioProject } from "@/lib/constants";

interface CaseStudyResultsProps {
  project: PortfolioProject;
}

export function CaseStudyResults({ project }: CaseStudyResultsProps) {
  const hasResults = project.results && project.results.length > 0;
  const hasMetric = Boolean(project.metric);

  if (!hasResults && !hasMetric) {
    return null;
  }

  return (
    <section
      data-section-id="case-study-results"
      data-theme="dark"
      className="dark relative bg-[var(--background)]"
    >
      {/* Gradient transition: cream → dark */}
      <div className="h-32 w-full bg-gradient-to-b from-[#f5f3f0] to-[#0a0a0a] md:h-40" />

      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Subtle glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124, 107, 240, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className={`relative ${sectionPadding}`}>
        <div className={containerWidth}>
          {/* Section heading */}
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              Impact
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mb-16 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:mb-20 md:text-5xl">
              Results
            </h2>
          </ScrollReveal>

          {/* Metric cards grid */}
          {hasResults ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.results!.map((result, i) => (
                <ScrollReveal key={result.metric} delay={i * 0.1}>
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm md:p-10">
                    <p className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                      {result.value}
                    </p>
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">
                      {result.metric}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Fallback: single metric display */
            <ScrollReveal delay={0.2}>
              <div className="flex items-center justify-center">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-12 py-10 text-center backdrop-blur-sm md:px-16 md:py-14">
                  <p className="font-display text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                    {project.metric}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Gradient transition: dark → cream */}
      <div className="h-32 w-full bg-gradient-to-b from-[#0a0a0a] to-[#f5f3f0] md:h-40" />
    </section>
  );
}
