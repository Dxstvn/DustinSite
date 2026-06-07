"use client";

import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { sectionPadding, containerWidth } from "@/lib/constants";
import type { PortfolioProject } from "@/lib/constants";

interface CaseStudyOverviewProps {
  project: PortfolioProject;
}

export function CaseStudyOverview({ project }: CaseStudyOverviewProps) {
  const challengeText = project.challenge ?? project.description;

  return (
    <section data-section-id="case-study-overview" className={sectionPadding}>
      <div className={containerWidth}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left column — challenge & approach */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                The Challenge
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                {challengeText}
              </p>
            </ScrollReveal>

            {project.approach && (
              <>
                <ScrollReveal delay={0.2}>
                  <h2 className="mb-4 mt-12 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    Our Approach
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <p className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                    {project.approach}
                  </p>
                </ScrollReveal>
              </>
            )}
          </div>

          {/* Right column — metadata sidebar */}
          <div className="lg:col-span-2">
            <div className="space-y-8 lg:sticky lg:top-32">
              {/* Services */}
              {project.services && project.services.length > 0 && (
                <ScrollReveal delay={0.1}>
                  <div>
                    <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                      Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-[var(--surface-tertiary)] px-3 py-1 text-sm font-medium text-[var(--text-primary)]"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Tech Stack */}
              {project.techStack.length > 0 && (
                <ScrollReveal delay={0.15}>
                  <div>
                    <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-[var(--surface-secondary)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Year */}
              {project.year && (
                <ScrollReveal delay={0.2}>
                  <div>
                    <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                      Year
                    </h3>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {project.year}
                    </p>
                  </div>
                </ScrollReveal>
              )}

              {/* Live Site */}
              {project.liveUrl && (
                <ScrollReveal delay={0.25}>
                  <div>
                    <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                      Live Site
                    </h3>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--primary)]"
                    >
                      {project.domain}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
