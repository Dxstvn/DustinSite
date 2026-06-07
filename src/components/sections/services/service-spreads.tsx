"use client";

import { useRef } from "react";
import {
  motion as m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  services,
  accentColorMap,
  siteConfig,
  sectionPadding,
  containerWidth,
  motion as motionPresets,
  type Service,
} from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// Per-service art-directed imagery (verified present in public/images/portfolio).
const serviceImages: Record<string, string> = {
  "web-development": "/images/portfolio/web-project-1.jpg",
  seo: "/images/portfolio/ecommerce-project-4.jpg",
  "social-media": "/images/portfolio/social-project-3.jpg",
};

// Short uppercase badge label per discipline.
const serviceBadge: Record<string, string> = {
  "web-development": "Web",
  seo: "SEO",
  "social-media": "Social",
};

const monoKicker =
  "font-mono text-xs font-medium uppercase tracking-[0.2em]";

// Capability stagger variants (shared by desktop + mobile).
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/**
 * The per-service CTA: an accent ACTION pill to /contact plus a quiet mailto.
 * WCAG AA: blue (#3b82f6) is the only accent that passes white-on-fill, so it
 * gets the filled treatment; green/orange use accent border + accent text on
 * cream instead.
 */
function ServiceCTA({ service }: { service: Service }) {
  const colors = accentColorMap[service.accent];
  const accentFill = service.accent === "blue";

  return (
    <div className="mt-8 flex flex-col items-start gap-3">
      <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link
          href="/contact"
          className={cn(
            "group inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300",
            accentFill
              ? "text-white hover:brightness-110 hover:shadow-lg"
              : "border bg-transparent hover:brightness-95",
          )}
          style={
            accentFill
              ? { backgroundColor: colors.hex }
              : { borderColor: colors.hex, color: colors.hex }
          }
        >
          Start a {service.title} project
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </m.div>

      <a
        href={`mailto:${siteConfig.email}`}
        className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
      >
        or email us
      </a>
    </div>
  );
}

/** The art-directed image panel — relative + sized so next/image fill works. */
function ServiceImage({
  service,
  className,
  sizes,
  parallaxEnabled,
}: {
  service: Service;
  className?: string;
  sizes: string;
  parallaxEnabled: boolean;
}) {
  const colors = accentColorMap[service.accent];

  return (
    <m.div
      initial={parallaxEnabled ? { scale: 1.04 } : undefined}
      whileInView={parallaxEnabled ? { scale: 1 } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: motionPresets.duration.slower,
        ease: motionPresets.ease.outExpo,
      }}
      whileHover={
        parallaxEnabled
          ? { boxShadow: `0 0 40px -8px ${colors.hex}` }
          : undefined
      }
      className={cn(
        "relative overflow-hidden rounded-2xl ring-1",
        colors.ring,
        className,
      )}
    >
      <Image
        src={serviceImages[service.id]}
        alt={`${service.title} — selected work`}
        fill
        sizes={sizes}
        className="object-cover"
      />
      {/* Scrim + noise for cohesion */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"
      />
      <div aria-hidden className="noise absolute inset-0" />

      {/* Accent badge */}
      <span
        className={cn(
          "absolute left-4 top-4 inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] backdrop-blur-sm",
          colors.bgSubtle,
          colors.border,
          colors.text,
        )}
      >
        {serviceBadge[service.id]}
      </span>
    </m.div>
  );
}

/** The text column: accent rule + ghost numeral + kicker + title + tagline + copy + capabilities + CTA. */
function ServiceText({
  service,
  numeral,
  numeralShift,
  parallaxEnabled,
}: {
  service: Service;
  numeral: string;
  numeralShift: ReturnType<typeof useTransform<number, number>>;
  parallaxEnabled: boolean;
}) {
  const colors = accentColorMap[service.accent];

  return (
    <div className="relative pl-6">
      {/* Accent vertical rule — draws on scroll */}
      <m.div
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: motionPresets.duration.slower,
          ease: motionPresets.ease.outExpo,
        }}
        className="absolute left-0 top-1 h-full w-[3px] origin-top rounded-full"
        style={{ backgroundColor: colors.hex }}
      />

      {/* Ghost numeral */}
      <m.span
        aria-hidden
        style={parallaxEnabled ? { y: numeralShift } : undefined}
        className="block font-display text-7xl font-bold leading-none text-[var(--text-tertiary)] opacity-[0.32] lg:text-8xl"
      >
        {numeral}
      </m.span>

      {/* Kicker — purple is Jaspire's voice */}
      <span className={cn(monoKicker, "mt-6 block text-[var(--primary)]")}>
        Discipline / {numeral}
      </span>

      {/* Title */}
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight lg:text-6xl">
        {service.title}
      </h2>

      {/* Tagline — the hook, not muted */}
      <p className="mt-4 text-2xl leading-snug text-[var(--text-primary)] lg:text-3xl">
        {service.tagline}
      </p>

      {/* Description */}
      <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--text-secondary)]">
        {service.description}
      </p>

      {/* Capabilities */}
      <m.ul
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-8 max-w-md"
      >
        {service.capabilities.map((capability) => (
          <m.li
            key={capability}
            variants={itemVariants}
            transition={{ duration: motionPresets.duration.base }}
            className="flex min-h-11 items-center gap-3 border-b border-[var(--surface-border)] py-3"
          >
            <m.span
              variants={{
                hidden: { scale: 0.6 },
                show: { scale: 1 },
              }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: colors.hex }}
            />
            <span className="text-[var(--text-primary)]">{capability}</span>
          </m.li>
        ))}
      </m.ul>

      {/* Per-service CTA */}
      <ServiceCTA service={service} />
    </div>
  );
}

/** A single editorial spread — desktop zig-zag is owned by the parent grid. */
function ServiceSpread({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();
  const parallaxEnabled = isDesktop && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const numeralShift = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const numeral = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 1; // only seo (idx 1) mirrors
  const direction = isEven ? "right" : "left";

  return (
    <m.section
      ref={sectionRef}
      id={service.id}
      data-section-id={`service-${service.id}`}
      className="scroll-mt-28 border-t border-[var(--surface-border)] first:border-t-0 md:scroll-mt-32"
    >
      {/* Desktop: 12-col zig-zag */}
      <div className="hidden md:block">
        <ScrollReveal direction={direction} delay={0.05 * index}>
          <div className="grid grid-cols-12 items-center gap-x-8 py-20 lg:gap-x-12 lg:py-28">
            {isEven ? (
              <>
                {/* Image (left) */}
                <div className="order-1 col-span-6">
                  <ServiceImage
                    service={service}
                    className="aspect-[4/5] lg:aspect-[3/4]"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    parallaxEnabled={parallaxEnabled}
                  />
                </div>
                {/* Text (right) */}
                <div className="order-2 col-span-6">
                  <ServiceText
                    service={service}
                    numeral={numeral}
                    numeralShift={numeralShift}
                    parallaxEnabled={parallaxEnabled}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Text (left) */}
                <div className="col-span-6">
                  <ServiceText
                    service={service}
                    numeral={numeral}
                    numeralShift={numeralShift}
                    parallaxEnabled={parallaxEnabled}
                  />
                </div>
                {/* Image (right) */}
                <div className="col-span-6">
                  <ServiceImage
                    service={service}
                    className="aspect-[4/5] lg:aspect-[3/4]"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    parallaxEnabled={parallaxEnabled}
                  />
                </div>
              </>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile: single column, image first */}
      <div className="md:hidden">
        <ScrollReveal direction="up" delay={0.05 * index}>
          <div className="py-12">
            <ServiceImage
              service={service}
              className="aspect-[16/10]"
              sizes="90vw"
              parallaxEnabled={false}
            />
            <div className="mt-8">
              <ServiceText
                service={service}
                numeral={numeral}
                numeralShift={numeralShift}
                parallaxEnabled={false}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </m.section>
  );
}

export function ServiceSpreads() {
  return (
    <section className={sectionPadding}>
      <div className={containerWidth}>
        {services.map((service, i) => (
          <ServiceSpread key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
