"use client";

import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { sectionPadding, containerWidth } from "@/lib/constants";
import type { PortfolioProject } from "@/lib/constants";

interface CaseStudyDemoProps {
  project: PortfolioProject;
}

export function CaseStudyDemo({ project }: CaseStudyDemoProps) {
  return (
    <section data-section-id="case-study-demo" className={sectionPadding}>
      <div className={containerWidth}>
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-2xl shadow-black/20">
            {/* macOS window chrome */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#1a1a1a] px-4 py-3">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#ff5f57]" />
                <div className="size-3 rounded-full bg-[#febc2e]" />
                <div className="size-3 rounded-full bg-[#28c840]" />
              </div>

              {/* URL bar */}
              <div className="mx-4 flex flex-1 items-center justify-center">
                <div className="flex max-w-md items-center gap-2 rounded-lg bg-white/[0.06] px-4 py-1.5">
                  <svg
                    className="size-3 text-white/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-xs text-white/50">
                    {project.domain}
                  </span>
                </div>
              </div>

              {/* Spacer to balance traffic lights */}
              <div className="w-[52px]" />
            </div>

            {/* Iframe content area */}
            <div className="bg-white">
              <iframe
                src={project.demoUrl}
                className="h-[400px] w-full border-0 md:h-[600px]"
                title={`${project.title} demo`}
                sandbox="allow-scripts allow-same-origin allow-popups"
                loading="lazy"
              />
            </div>

            {/* Bottom info bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#1a1a1a] px-4 py-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-white">
                  {project.title}
                </h3>
                <div className="hidden items-center gap-1.5 md:flex">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-medium text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white"
                >
                  Visit Live Site
                  <ExternalLink className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
