"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { sectionPadding, containerWidth } from "@/lib/constants";
import type { PortfolioProject } from "@/lib/constants";

interface CaseStudyGalleryProps {
  project: PortfolioProject;
}

export function CaseStudyGallery({ project }: CaseStudyGalleryProps) {
  if (!project.galleryImages || project.galleryImages.length === 0) {
    return null;
  }

  return (
    <section data-section-id="case-study-gallery" className={sectionPadding}>
      <div className={containerWidth}>
        <SectionHeading
          label="Gallery"
          title="Project Screens"
          align="left"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {project.galleryImages.map((src, i) => (
            <ScrollReveal key={src} delay={i * 0.1}>
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width={800}
                  height={500}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
