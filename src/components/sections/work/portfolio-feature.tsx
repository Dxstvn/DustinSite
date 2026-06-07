"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion as m,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion as motionPresets, portfolioProjects } from "@/lib/constants";

// Curated featured set — ordered. Each has a strong preview.
const FEATURED_IDS = [
  "skinproduct",
  "haiti-kalshi",
  "annpale",
  "clearhold",
  "haiti-lottery",
  "tutor-site", // Colibri
] as const;

const ROTATE_MS = 5500;

export function PortfolioFeature() {
  const prefersReducedMotion = useReducedMotion();

  // Resolve the curated set against the data source, preserving order and
  // silently dropping any id that no longer exists.
  const featuredSet = useMemo(
    () =>
      FEATURED_IDS.map((id) =>
        portfolioProjects.find((p) => p.id === id),
      ).filter((p): p is (typeof portfolioProjects)[number] => Boolean(p)),
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const count = featuredSet.length;

  // ONE source of truth for both the dwell timer AND the progress-bar fill: a
  // 0→1 MotionValue. The bar binds to it, and the slide advances on complete.
  // Pause = stop the tween (it holds its value); resume continues from there,
  // so the bar and the timer can never desync.
  const progress = useMotionValue(0);
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || count <= 1) return;

    // Resume from wherever progress currently sits (full dwell after a reset,
    // partial after un-pausing).
    const remainingMs = ROTATE_MS * (1 - progress.get());
    const controls = animate(progress, 1, {
      duration: remainingMs / 1000,
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setActiveIndex((i) => (i + 1) % count);
      },
    });

    return () => controls.stop();
  }, [activeIndex, isPaused, prefersReducedMotion, count, progress]);

  if (count === 0) return null;

  const active = featuredSet[activeIndex] ?? featuredSet[0];
  const activeId = active.id;
  const href = `/portfolio/${active.slug ?? active.id}`;

  const handleSelect = (index: number) => {
    // Reset the shared clock so a manual pick gets a full dwell (and the bar
    // restarts in lockstep).
    progress.set(0);
    setActiveIndex(index);
  };

  const crossfade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: prefersReducedMotion
        ? motionPresets.duration.fast
        : motionPresets.duration.slow,
      ease: motionPresets.ease.outExpo,
    },
  } as const;

  return (
    <section
      data-section-id="portfolio-feature"
      data-theme="dark"
      className="dark relative isolate min-h-[46vh] overflow-hidden md:min-h-[56vh]"
      style={{ backgroundColor: "#0d1b2a" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        // Only resume when focus leaves the band entirely.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      {/* Atmospheric backdrop — the 4:5 preview reads as ambience, never a
          stretched hero. Whole band is a link to the active case study. */}
      <Link
        href={href}
        aria-label={`View case study — ${active.title}`}
        className="group absolute inset-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
      >
        {/* Image crossfade — keyed on the active project id */}
        <AnimatePresence initial={false}>
          <m.div
            key={activeId}
            aria-hidden
            className="absolute inset-0"
            initial={crossfade.initial}
            animate={crossfade.animate}
            exit={crossfade.exit}
            transition={crossfade.transition}
          >
            <Image
              src={active.imageSrc}
              alt=""
              fill
              // AnimatePresence keeps at most ~2 images mounted, so eager-loading
              // the active one is the right LCP candidate (no 6× preload) and
              // avoids an empty layer flashing mid-crossfade.
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              style={
                active.imagePosition
                  ? { objectPosition: active.imagePosition }
                  : undefined
              }
            />
          </m.div>
        </AnimatePresence>

        {/* Noise texture */}
        <div className="noise absolute inset-0" />

        {/* Per-project accent glow — crossfades with the active project */}
        <AnimatePresence initial={false}>
          <m.div
            key={`${activeId}-glow`}
            aria-hidden
            className="absolute inset-0"
            initial={crossfade.initial}
            animate={crossfade.animate}
            exit={crossfade.exit}
            transition={crossfade.transition}
            style={{
              backgroundImage: `radial-gradient(60% 60% at 20% 80%, ${active.accent}14 0%, transparent 70%)`,
            }}
          />
        </AnimatePresence>

        {/* Scrim — bottom-anchored on mobile, left-anchored from md up */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#0d1b2a]/60 to-transparent md:bg-gradient-to-r"
        />
      </Link>

      {/* Content — sits above the link layer; CTA + indicators stay
          independently focusable */}
      <div className="pointer-events-none relative z-10 flex min-h-[46vh] flex-col justify-end md:min-h-[56vh]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
          <div className="max-w-2xl">
            <ScrollReveal direction="up">
              <span className="inline-block font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
                Featured
              </span>
            </ScrollReveal>

            {/* Text crossfades per active project; ScrollReveal stays as the
                one-time entrance wrapper, AnimatePresence handles rotation. */}
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={activeId}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 12, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -12, filter: "blur(6px)" }
                  }
                  transition={crossfade.transition}
                >
                  <ScrollReveal direction="up" delay={0.06}>
                    <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                      {active.title}
                    </h2>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={0.12}>
                    <p className="mt-4 max-w-md text-base text-[#cfcfcf] md:text-lg">
                      {active.description}
                    </p>
                  </ScrollReveal>

                  <ScrollReveal direction="up" delay={0.18}>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {/* Glass metric pill */}
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md">
                        {active.metric}
                      </span>
                      {/* Category · year meta */}
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a8a8a]">
                        {active.category} · {active.year}
                      </span>
                    </div>
                  </ScrollReveal>
                </m.div>
              </AnimatePresence>
            </div>

            <ScrollReveal direction="up" delay={0.24}>
              {/* CTA target tracks the active project */}
              <Link
                href={href}
                className="pointer-events-auto mt-8 inline-flex w-full rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto"
              >
                <ShimmerButton
                  tabIndex={-1}
                  className="w-full sm:w-auto"
                  background={active.accent}
                  shimmerColor="#ffffff"
                >
                  View case study
                  <ArrowUpRight className="size-4" />
                </ShimmerButton>
              </Link>
            </ScrollReveal>
          </div>

          {/* Clickable spotlight indicators — progress bars, one per featured
              project. Active fills with that project's accent. */}
          {count > 1 && (
            <div
              role="group"
              aria-label="Featured projects"
              className="pointer-events-auto mt-8 flex flex-wrap items-center gap-2 md:justify-end"
            >
              {featuredSet.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => handleSelect(index)}
                    aria-label={`Show featured project — ${project.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group/ind relative h-6 shrink-0 cursor-pointer rounded-full px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    {/* Track */}
                    <span
                      aria-hidden
                      className="block h-1 w-8 overflow-hidden rounded-full bg-white/20 transition-[width,background-color] duration-300 ease-out group-hover/ind:bg-white/30 md:w-10"
                      style={isActive ? { width: "2.75rem" } : undefined}
                    >
                      {/* Fill — the ACTIVE bar binds to the shared `progress`
                          clock (so it pauses/resumes in lockstep with the
                          dwell timer); inactive bars are empty. Under reduced
                          motion the active bar is simply full (no animation). */}
                      <m.span
                        className="block h-full rounded-full"
                        style={{
                          backgroundColor: project.accent,
                          width: isActive
                            ? prefersReducedMotion
                              ? "100%"
                              : fillWidth
                            : "0%",
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
