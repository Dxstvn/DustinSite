"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion as m, useReducedMotion } from "motion/react";
import {
  type PortfolioProject,
  getProjectDiscipline,
  motion as motionPresets,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PortfolioRowProps {
  project: PortfolioProject;
  index: number;
  isDimmed: boolean;
  onHover: (slug: string | null) => void;
  /** When false (touch / reduced-motion / SSR), drop the cursor-follow + dim
   *  enhancements and keep the row a plain accessible link. */
  interactive: boolean;
}

// ---------------------------------------------------------------------------
// Deterministic accent → row-flood color.
// Several portfolio accents are near-black (e.g. #0A2540, #1A3C34, #134E4A,
// #0D47A1). On the #0d1b2a row bed a 10% wash of those is invisible, so the
// hover affordance would silently fail. We bake the rule in: compute relative
// luminance (WCAG-style) and, for dark accents, either flood at a higher alpha
// or fall back to a brand-purple wash. The solid 2px LEFT bar always uses the
// full accent so the project's identity still reads.
// ---------------------------------------------------------------------------
const BRAND_PURPLE = "#7c6bf0";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return null;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return null;
  return { r, g, b };
}

/** Relative luminance, 0 (black) → 1 (white). WCAG linearized channels. */
function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function toRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(124, 107, 240, ${alpha})`; // brand fallback
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Resolve the background flood for a given accent against the dark row bed.
 * - Bright/mid accents: 10% accent wash.
 * - Dark accents (luminance below threshold): they vanish at 10% on #0d1b2a,
 *   so bump alpha to ~18%; if the accent is *extremely* dark, lean on a
 *   brand-purple wash that is guaranteed to register.
 */
function resolveRowFlood(accent: string): string {
  const rgb = hexToRgb(accent);
  if (!rgb) return toRgba(BRAND_PURPLE, 0.1);

  const lum = relativeLuminance(rgb);

  // Extremely dark (effectively indistinguishable from the bed): brand wash.
  if (lum < 0.015) return toRgba(BRAND_PURPLE, 0.12);
  // Dark-but-not-black: raise the accent alpha so it actually reads.
  if (lum < 0.06) return toRgba(accent, 0.18);
  // Comfortable contrast: the spec'd ~10% accent wash.
  return toRgba(accent, 0.1);
}

export function PortfolioRow({
  project,
  index,
  isDimmed,
  onHover,
  interactive,
}: PortfolioRowProps) {
  const reduceMotion = useReducedMotion();
  const slug = project.slug ?? project.id;
  const discipline = getProjectDiscipline(project);
  const number = String(index + 1).padStart(2, "0");
  const rowFlood = resolveRowFlood(project.accent);

  const handleEnter = () => interactive && onHover(slug);
  const handleLeave = () => interactive && onHover(null);
  // Keyboard users always get the accent state on focus, even when the
  // cursor-follow enhancement is gated off — so feedback never disappears.
  const handleFocus = () => onHover(slug);
  const handleBlur = () => onHover(null);

  return (
    <m.li
      layout={interactive && !reduceMotion}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: motionPresets.duration.slow,
        delay: index * 0.04,
        ease: motionPresets.ease.outExpo,
        // Filter reflow: remaining rows settle to their new slot on a spring.
        layout: { type: "spring", stiffness: 260, damping: 30 },
      }}
      className="group relative"
    >
      <Link
        href={`/portfolio/${slug}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // Sibling-dim lives here (CSS), NOT on the m.li's animate prop: the
        // li's whileInView latches opacity to 1 (once:true), which would
        // override an animate-driven dim. A plain transitioned style is
        // independent of the one-time entrance and always applies.
        style={{ opacity: isDimmed ? 0.35 : 1 }}
        className="relative block rounded-lg border-b border-white/[0.08] outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a]"
      >
        {/* Row flood — animates in on hover/focus. */}
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{ backgroundColor: rowFlood }}
        />
        {/* Solid 2px LEFT accent bar — full accent, scaleY 0 → 1 from the top. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-within:scale-y-100"
          style={{ backgroundColor: project.accent }}
        />

        {/* ---- DESKTOP: ledger grid ---- */}
        <div className="relative hidden grid-cols-[56px_1fr_200px_200px_80px_40px] items-baseline gap-6 py-7 md:grid md:py-8">
          {/* No. */}
          <span className="font-mono text-sm tabular-nums text-[#737373] transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1">
            {number}
          </span>

          {/* Title */}
          <h3 className="font-display text-2xl font-bold tracking-tight text-[#e5e5e5] transition-all duration-300 group-hover:translate-x-2.5 group-hover:text-white group-focus-within:translate-x-2.5 group-focus-within:text-white md:text-3xl lg:text-4xl">
            {project.title}
          </h3>

          {/* Discipline */}
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#8a8a8a]">
            {discipline}
          </span>

          {/* Metric — the proof anchor, right-aligned */}
          <span className="text-right font-mono text-xs tracking-wide text-[#8a8a8a]">
            {project.metric}
          </span>

          {/* Year */}
          <span className="font-mono text-sm tabular-nums text-[#737373]">
            {project.year ?? "—"}
          </span>

          {/* Arrow */}
          <span className="flex justify-end">
            <ArrowUpRight
              aria-hidden
              className="size-5 -translate-x-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
            />
          </span>
        </div>

        {/* ---- MOBILE: two-line tappable block ---- */}
        <div className="relative flex min-h-20 items-center gap-4 py-4 pl-3 md:hidden">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-xs tabular-nums text-[#737373]">
                {number}
              </span>
              <h3 className="truncate font-display text-xl font-bold tracking-tight text-[#e5e5e5]">
                {project.title}
              </h3>
            </div>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#8a8a8a]">
              {discipline}
              <span className="mx-1.5 text-[#525252]">·</span>
              {project.year ?? "—"}
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-wide text-[#737373]">
              {project.metric}
            </p>
          </div>

          {/* 4:5 thumbnail pinned right */}
          <div
            className={cn(
              "relative h-20 w-16 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10"
            )}
          >
            <Image
              src={project.imageSrc}
              alt=""
              fill
              className="object-cover"
              style={
                project.imagePosition
                  ? { objectPosition: project.imagePosition }
                  : undefined
              }
              sizes="64px"
            />
          </div>
        </div>
      </Link>
    </m.li>
  );
}
