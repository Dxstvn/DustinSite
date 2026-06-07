"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion as m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import NumberFlow from "@number-flow/react";
import {
  portfolioProjects,
  portfolioDisciplines,
  getProjectDiscipline,
} from "@/lib/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { WorkFilterBar } from "./work-filter-bar";
import { PortfolioRow } from "./portfolio-row";

const ALL = "All";
const FILTERS = [ALL, ...portfolioDisciplines];

// Cursor-follow preview sizing (native 4:5).
const PREVIEW_W = 320;
const PREVIEW_H = 400;
// Offset the preview up-left of the cursor so it never sits under the pointer.
const OFFSET_X = -PREVIEW_W - 24;
const OFFSET_Y = -PREVIEW_H - 24;

export function PortfolioIndex() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const reduceMotion = useReducedMotion();
  const hasHover = useMediaQuery("(hover: hover)");
  // Enhancement gate: cursor-follow + sibling-dim only when a real pointer is
  // present AND motion is allowed. Defaults to false on SSR / first render and
  // on touch, so those users get the inline mobile thumbnail + simple hover.
  const enhanced = hasHover && !reduceMotion;

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? portfolioProjects
        : portfolioProjects.filter(
            (project) => getProjectDiscipline(project) === activeCategory
          ),
    [activeCategory]
  );

  // Cursor-follow preview motion values.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!enhanced) return;
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const hoveredProject = enhanced
    ? filtered.find((p) => (p.slug ?? p.id) === hoveredSlug)
    : undefined;

  return (
    <section
      data-section-id="portfolio-index"
      data-theme="dark"
      className="dark relative pb-24 md:pb-32"
      style={{ backgroundColor: "#0d1b2a" }}
      onPointerMove={handlePointerMove}
    >
      <WorkFilterBar
        categories={FILTERS}
        activeCategory={activeCategory}
        onCategoryChange={(cat) => {
          setActiveCategory(cat);
          setHoveredSlug(null);
        }}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Live count — mirrors stats-bar NumberFlow usage. */}
        <div
          aria-live="polite"
          className="flex items-baseline justify-end gap-2 pt-8 pb-2 md:pt-10"
        >
          <NumberFlow
            value={filtered.length}
            className="font-mono text-sm tabular-nums text-[#e5e5e5]"
          />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#737373]">
            {filtered.length === 1 ? "Project" : "Projects"}
          </span>
        </div>

        {/* Column header — desktop only, quiet ledger labels. */}
        <div
          aria-hidden
          className="hidden grid-cols-[56px_1fr_200px_200px_80px_40px] items-baseline gap-6 border-b border-white/[0.08] pb-3 md:grid"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373]">
            No
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373]">
            Project
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373]">
            Discipline
          </span>
          <span className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373]">
            Outcome
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373]">
            Year
          </span>
          <span aria-hidden />
        </div>

        {/* Ledger rows */}
        <ul className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, index) => {
              const slug = project.slug ?? project.id;
              return (
                <PortfolioRow
                  key={slug}
                  project={project}
                  index={index}
                  isDimmed={Boolean(
                    enhanced && hoveredSlug && hoveredSlug !== slug
                  )}
                  onHover={setHoveredSlug}
                  interactive={enhanced}
                />
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* The ONE viewport-fixed cursor-follow preview. Enhancement-only. */}
      {enhanced && (
        <m.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-40"
          style={{ x: springX, y: springY }}
        >
          <div
            style={{
              transform: `translate(${OFFSET_X}px, ${OFFSET_Y}px)`,
            }}
          >
            <AnimatePresence mode="popLayout">
              {hoveredProject && (
                <m.img
                  key={hoveredProject.slug ?? hoveredProject.id}
                  src={hoveredProject.imageSrc}
                  alt=""
                  width={PREVIEW_W}
                  height={PREVIEW_H}
                  initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: -3 }}
                  transition={{ duration: 0.24, ease: [0.19, 1, 0.22, 1] }}
                  className="block rounded-xl object-cover shadow-2xl ring-1 ring-white/10"
                  style={{
                    width: PREVIEW_W,
                    height: PREVIEW_H,
                    objectPosition: hoveredProject.imagePosition ?? undefined,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </m.div>
      )}
    </section>
  );
}
