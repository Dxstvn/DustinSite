"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion as m, AnimatePresence } from "motion/react";
import { services, accentColorMap, motion as motionPresets } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const serviceImages: Record<string, string> = {
  "web-development": "/images/portfolio/web-project-1.jpg",
  seo: "/images/portfolio/ecommerce-project-4.jpg",
  "social-media": "/images/portfolio/social-project-3.jpg",
};

export function ServicesOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const imagePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Smooth image follow using RAF interpolation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      imagePos.current.x += (mousePos.current.x - imagePos.current.x) * 0.1;
      imagePos.current.y += (mousePos.current.y - imagePos.current.y) * 0.1;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${imagePos.current.x - 140}px, ${imagePos.current.y - 100}px) rotate(${(mousePos.current.x - imagePos.current.x) * 0.05}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section data-section-id="services" className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — COLLINS style */}
        <ScrollReveal>
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                Programs
              </p>
              <h2 className="max-w-lg text-2xl leading-snug tracking-tight text-[var(--text-primary)] md:text-3xl">
                Three ways we help brands find and command their unique premium.
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-[var(--surface-border)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-all hover:border-[var(--text-tertiary)] hover:text-[var(--text-primary)] md:self-auto"
            >
              Explore Programs
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Service list with hover image preview */}
        <div ref={containerRef} className="relative">
          {/* Floating image preview */}
          <div
            ref={imageRef}
            className="pointer-events-none absolute z-20 hidden md:block"
            style={{ width: 280, height: 200 }}
          >
            <AnimatePresence mode="wait">
              {hoveredService && serviceImages[hoveredService] && (
                <m.div
                  key={hoveredService}
                  initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 8 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="h-full w-full overflow-hidden rounded-xl shadow-2xl shadow-black/20"
                >
                  <Image
                    src={serviceImages[hoveredService]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Service rows */}
          <div className="border-t border-[var(--surface-border)]">
            {services.map((service, i) => {
              const colors = accentColorMap[service.accent];

              return (
                <ScrollReveal key={service.id} delay={i * motionPresets.stagger}>
                  <Link
                    href={service.href}
                    className="group block"
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <m.div
                      whileHover={{ x: 12 }}
                      transition={{
                        duration: motionPresets.duration.base,
                        ease: motionPresets.ease.outExpo,
                      }}
                      className="flex flex-col gap-4 border-b border-[var(--surface-border)] py-10 transition-colors duration-300 md:flex-row md:items-baseline md:justify-between md:py-14"
                    >
                      {/* Service name — DM Serif Display */}
                      <div className="flex items-baseline gap-5">
                        <span
                          className="inline-block size-3 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg"
                          style={{
                            backgroundColor: colors.hex,
                            boxShadow: `0 0 0 0 ${colors.hex}`,
                          }}
                        />
                        <h3
                          className="text-4xl font-normal tracking-tight transition-colors duration-300 group-hover:text-[var(--primary)] md:text-5xl lg:text-6xl"
                        >
                          {service.title}
                        </h3>
                      </div>

                      {/* Tagline + arrow */}
                      <div className="flex items-center gap-5 pl-8 md:pl-0">
                        <p className="max-w-xs text-base text-[var(--text-secondary)] md:text-right md:text-lg">
                          {service.tagline}
                        </p>
                        <ArrowUpRight className="size-5 shrink-0 text-[var(--text-tertiary)] opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)] group-hover:opacity-100" />
                      </div>
                    </m.div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* All programs link */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex justify-end">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                All Programs ({services.length})
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
