"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion as m, useScroll, useTransform } from "motion/react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ScrollProgressSegments } from "@/components/shared/scroll-progress-segments";
import { useMediaQuery } from "@/hooks/use-media-query";

const galleryImages = [
  { src: "/images/gallery/gallery-1.jpg", alt: "Creative workspace" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Design process" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Brand development" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Team collaboration" },
  { src: "/images/gallery/gallery-5.jpg", alt: "Digital production" },
  { src: "/images/gallery/gallery-6.jpg", alt: "Client presentation" },
];

function DesktopGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(galleryImages.length - 1) * 100}%`]
  );

  return (
    <section
      ref={sectionRef}
      data-section-id="gallery"
      className="relative"
      style={{ height: `${galleryImages.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-10 px-4 pt-24 pb-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                Behind the Work
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Learning to see.
              </h2>
            </div>
            <span className="hidden rounded-full border border-[var(--surface-border)] px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-tertiary)] md:inline-block">
              Explore
            </span>
          </div>
        </div>

        {/* Horizontal image track */}
        <m.div
          className="flex flex-1 items-center"
          style={{ x: trackX }}
        >
          {galleryImages.map((image, i) => (
            <div
              key={image.src}
              className="flex h-full w-screen flex-shrink-0 items-center justify-center px-3 md:px-6"
            >
              <m.div
                className="relative h-[70vh] w-full max-w-[88vw] overflow-hidden rounded-2xl"
                whileHover={{ scale: 0.99 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-[2s] ease-out hover:scale-105"
                  sizes="88vw"
                  priority={i === 0}
                />
              </m.div>
            </div>
          ))}
        </m.div>

        {/* Progress segments */}
        <div className="relative z-10 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <ScrollProgressSegments
              count={galleryImages.length}
              progress={scrollYProgress}
              className="flex-1 max-w-md"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              {galleryImages.length} photos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileGallery() {
  return (
    <section data-section-id="gallery" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
              Behind the Work
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Learning to see.
            </h2>
          </div>
        </ScrollReveal>

        <div className="columns-2 gap-3 space-y-3">
          {galleryImages.map((image, i) => (
            <ScrollReveal key={image.src} delay={i * 0.05}>
              <div className="relative overflow-hidden rounded-xl break-inside-avoid">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={i % 3 === 0 ? 400 : 300}
                  className="w-full object-cover"
                  sizes="50vw"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MediaGallery() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (typeof window === "undefined") {
    return <MobileGallery />;
  }

  return isDesktop ? <DesktopGallery /> : <MobileGallery />;
}
