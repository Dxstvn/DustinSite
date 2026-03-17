"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Search, Share2 } from "lucide-react";
import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";
import { services, accentColorMap, motion as motionPresets } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const serviceIcons = {
  "web-development": Globe,
  seo: Search,
  "social-media": Share2,
} as const;

export function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What we do"
          title="Services that drive results"
          description="We combine web development, SEO, and social media management into a unified growth engine for your brand."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
            const colors = accentColorMap[service.accent];

            return (
              <ScrollReveal key={service.id} delay={i * motionPresets.stagger}>
                <Link href={service.href} className="group block h-full">
                  <m.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{
                      duration: motionPresets.duration.base,
                      ease: motionPresets.ease.outExpo,
                    }}
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-secondary)] p-8 transition-colors duration-500 md:p-10",
                      "hover:border-transparent",
                    )}
                    style={{
                      // Subtle accent glow on hover via CSS
                    }}
                  >
                    {/* Accent glow — top edge */}
                    <div
                      className="absolute -top-px left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${colors.hex}, transparent)`,
                      }}
                    />

                    {/* Icon */}
                    <div
                      className={cn(
                        "mb-6 flex size-12 items-center justify-center rounded-xl transition-colors duration-300",
                        colors.bgSubtle
                      )}
                    >
                      <Icon className={cn("size-5", colors.text)} />
                    </div>

                    {/* Content */}
                    <h3 className="mb-3 text-xl font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-tertiary)] transition-colors group-hover:text-[var(--text-primary)]">
                      <span>Learn more</span>
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </m.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
