"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion as m, AnimatePresence, useMotionValue, useSpring, type TargetAndTransition } from "motion/react";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  navItems,
  siteConfig,
  motion as motionPresets,
  type PortfolioProject,
} from "@/lib/constants";
import { useActiveSection } from "@/hooks/use-active-section";

// ---------------------------------------------------------------------------
// useBodyModalOpen — watches document.body.dataset.modalOpen
// ---------------------------------------------------------------------------

function useBodyModalOpen(): boolean {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    setModalOpen(body.dataset.modalOpen === "true");

    const observer = new MutationObserver(() => {
      setModalOpen(body.dataset.modalOpen === "true");
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["data-modal-open"],
    });

    return () => observer.disconnect();
  }, []);

  return modalOpen;
}

// ---------------------------------------------------------------------------
// useContentWidth — measures an element's width via ResizeObserver
// ---------------------------------------------------------------------------

function useContentWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const measured = entry.contentRect.width;
        // Debounce: only commit width after ResizeObserver settles (50ms).
        // During AnimatePresence swaps the observer fires rapidly as
        // entering/exiting content overlaps — we want the final value only.
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setWidth(measured), 50);
      }
    });

    observer.observe(el);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      observer.disconnect();
    };
  }, [ref]);

  return width;
}

// ---------------------------------------------------------------------------
// Nav state derivation
// ---------------------------------------------------------------------------

type NavState = "hero" | "light" | "portfolio" | "dark" | "footer";

function getNavState(sectionId: string): NavState {
  switch (sectionId) {
    case "hero":
    case "about-hero":
      return "hero";
    case "portfolio":
      return "portfolio";
    case "stats":
    case "contact-hero":
      return "dark";
    case "footer-cta":
    case "footer":
      return "footer";
    default:
      return "light";
  }
}

// ---------------------------------------------------------------------------
// Pill color computation — inline styles for Motion interpolation
// ---------------------------------------------------------------------------

interface PillColors {
  backgroundColor: string;
  borderColor: string;
  boxShadow: string;
}

function getPillColors(
  navState: NavState,
  activeProject: PortfolioProject | undefined
): PillColors {
  if (navState === "portfolio" && activeProject) {
    return {
      backgroundColor: activeProject.accent,
      borderColor: activeProject.accent,
      boxShadow: `0 20px 25px -5px ${activeProject.accent}33`,
    };
  }

  const colorMap: Record<string, PillColors> = {
    hero: {
      backgroundColor: "rgba(255,255,255,0.04)",
      borderColor: "rgba(255,255,255,0.08)",
      boxShadow: "0 0 0 0 transparent",
    },
    light: {
      backgroundColor: "rgba(245,243,240,0.80)",
      borderColor: "rgba(212,208,200,0.5)",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
    },
    portfolio: {
      // Fallback when no activeProject (brand purple)
      backgroundColor: "rgba(124,107,240,1)",
      borderColor: "rgba(124,107,240,1)",
      boxShadow: "0 20px 25px -5px rgba(124,107,240,0.2)",
    },
    dark: {
      backgroundColor: "rgba(26,26,26,1)",
      borderColor: "rgba(38,38,38,1)",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
    },
    footer: {
      backgroundColor: "rgba(124,107,240,1)",
      borderColor: "rgba(124,107,240,1)",
      boxShadow: "0 20px 25px -5px rgba(124,107,240,0.2)",
    },
  };

  return colorMap[navState] || colorMap.light;
}

// ---------------------------------------------------------------------------
// Text color helpers — derived from navState (class-based for non-animated)
// ---------------------------------------------------------------------------

function getTextColors(navState: NavState) {
  switch (navState) {
    case "hero":
      return {
        text: "text-white/60",
        textHover: "hover:text-white",
        hoverBg: "bg-white/[0.06]",
        logo: "text-white",
      };
    case "light":
      return {
        text: "text-[var(--text-secondary)]",
        textHover: "hover:text-[var(--text-primary)]",
        hoverBg: "bg-black/[0.04]",
        logo: "text-[var(--text-primary)]",
      };
    case "portfolio":
    case "footer":
      return {
        text: "text-white/70",
        textHover: "hover:text-white",
        hoverBg: "bg-white/[0.1]",
        logo: "text-white",
      };
    case "dark":
      return {
        text: "text-white/60",
        textHover: "hover:text-white",
        hoverBg: "bg-white/[0.08]",
        logo: "text-white",
      };
  }
}

// ---------------------------------------------------------------------------
// Transition configs
// ---------------------------------------------------------------------------

const pillTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

const outerSwap = { duration: 0.2 };
const innerSwap = { duration: 0.15 };

// ---------------------------------------------------------------------------
// Brand project icon — renders the project's SVG icon with a glow ring
// ---------------------------------------------------------------------------

function ProjectIcon({
  accent,
  iconSrc,
  title,
}: {
  accent: string;
  iconSrc: string;
  title: string;
}) {
  return (
    <m.div
      className="relative flex size-7 flex-shrink-0 items-center justify-center"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow ring */}
      <m.div
        className="absolute -inset-0.5 rounded-lg"
        style={{
          boxShadow: `0 0 10px 1px ${accent}55`,
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Brand icon */}
      <Image
        src={iconSrc}
        alt={title}
        width={28}
        height={28}
        className="relative rounded-md"
        unoptimized
      />
    </m.div>
  );
}

// ---------------------------------------------------------------------------
// Portfolio nav content — shows active project info
// ---------------------------------------------------------------------------

function PortfolioNavContent({
  activeProject,
}: {
  activeProject: PortfolioProject;
}) {
  const demoHref = activeProject.demoUrl;

  return (
    <m.div
      key={activeProject.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={innerSwap}
      className="flex items-center gap-2"
    >
      <ProjectIcon
        accent={activeProject.accent}
        iconSrc={activeProject.iconSrc}
        title={activeProject.title}
      />

      <span className="max-w-[140px] truncate text-sm font-bold tracking-tight text-white">
        {activeProject.title}
      </span>

      {/* Divider */}
      <div className="mx-2 hidden h-4 w-px bg-white/20 md:block" />

      {/* Description — desktop only */}
      <span className="hidden text-xs text-white/60 whitespace-nowrap md:block">
        {activeProject.description}
      </span>

      {/* Divider */}
      <div className="mx-1 hidden h-4 w-px bg-white/20 md:block" />

      {/* View Case CTA */}
      <Link
        href={demoHref}
        className="group/cta flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white whitespace-nowrap transition-colors hover:bg-white/25"
      >
        View Case
        <ArrowRight className="size-3 transition-transform group-hover/cta:translate-x-0.5" />
      </Link>
    </m.div>
  );
}

// ---------------------------------------------------------------------------
// Standard nav content — logo + links
// ---------------------------------------------------------------------------

function StandardNavContent({
  textColors,
}: {
  textColors: ReturnType<typeof getTextColors>;
}) {
  return (
    <div className="flex items-center gap-1">
      {/* Left nav items */}
      <div className="hidden items-center gap-0.5 md:flex">
        {navItems.slice(0, 2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative px-4 py-2 text-sm font-medium transition-colors",
              textColors.text,
              textColors.textHover
            )}
          >
            <span className="relative z-10 font-mono text-xs uppercase tracking-[0.15em]">
              {item.label}
            </span>
            <span
              className={cn(
                "absolute inset-0 scale-90 rounded-full opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100",
                textColors.hoverBg
              )}
            />
          </Link>
        ))}
      </div>

      {/* Center: logo */}
      <Link
        href="/"
        className="group relative mx-3 flex items-center px-4 py-2 md:mx-6"
      >
        <span
          className={cn(
            "text-lg font-bold tracking-tight transition-colors",
            textColors.logo
          )}
        >
          {siteConfig.name.toLowerCase()}
        </span>
        <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent transition-all duration-500 group-hover:w-full" />
      </Link>

      {/* Right nav items */}
      <div className="hidden items-center gap-0.5 md:flex">
        {navItems.slice(2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative px-4 py-2 text-sm font-medium transition-colors",
              textColors.text,
              textColors.textHover
            )}
          >
            <span className="relative z-10 font-mono text-xs uppercase tracking-[0.15em]">
              {item.label}
            </span>
            <span
              className={cn(
                "absolute inset-0 scale-90 rounded-full opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100",
                textColors.hoverBg
              )}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export function Navbar() {
  const { activeSectionId, activeProject } = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [email, setEmail] = useState("");
  const isModalOpen = useBodyModalOpen();

  const pathname = usePathname();
  const navState = getNavState(activeSectionId);
  const textColors = getTextColors(navState);
  const isFooter = navState === "footer" && pathname !== "/contact";
  const isPortfolioWithProject =
    navState === "portfolio" && !!activeProject;

  // Measure content width for smooth animated resizing
  const contentRef = useRef<HTMLDivElement>(null);
  const contentWidth = useContentWidth(contentRef);
  const pillPadding = 24; // px-3 * 2 = 24px

  // Width is measured by ResizeObserver + debounced for stability.
  // Inner AnimatePresence uses mode="wait" so only one project is in DOM
  // at a time — no measurement jitter during transitions.
  const targetNavWidth = contentWidth > 0 ? contentWidth + pillPadding : 0;

  // Spring-driven width: smoothly interpolates between states
  const navWidthMV = useMotionValue(targetNavWidth);
  const springWidth = useSpring(navWidthMV, { stiffness: 300, damping: 30 });

  // Push new target widths into the motion value (spring handles interpolation)
  useEffect(() => {
    if (targetNavWidth > 0) {
      navWidthMV.set(targetNavWidth);
    }
  }, [targetNavWidth, navWidthMV]);

  // Compute pill colors for smooth Motion interpolation
  const pillColors = useMemo(
    () => getPillColors(navState, activeProject),
    [navState, activeProject]
  );

  // Pill transition is unified for all states
  const activePillTransition = pillTransition;

  return (
    <>
      {/* Desktop floating pill nav — hidden when portfolio demo modal is open */}
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={
          isModalOpen ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }
        }
        transition={{
          duration: isModalOpen ? 0.3 : motionPresets.duration.slower,
          ease: motionPresets.ease.outExpo,
          delay: isModalOpen ? 0 : 0.2,
        }}
        className="fixed top-6 right-0 left-0 z-50 flex justify-center px-4"
        aria-hidden={isModalOpen}
        inert={isModalOpen || undefined}
      >
        <m.nav
          animate={pillColors as TargetAndTransition}
          transition={activePillTransition}
          style={{ width: targetNavWidth > 0 ? springWidth : "auto" }}
          className={cn(
            "flex flex-col items-center rounded-[28px] border py-2 overflow-hidden backdrop-blur-xl",
            isFooter ? "gap-3" : "gap-0"
          )}
        >
          {/* Main nav content — switches between standard and portfolio */}
          <div ref={contentRef} className="flex min-h-[40px] items-center gap-1 px-3">
            <AnimatePresence mode="popLayout">
              {isPortfolioWithProject ? (
                <m.div
                  key="portfolio-nav"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={outerSwap}
                  className="flex items-center gap-1"
                >
                  {/* Nested AnimatePresence for per-project transitions */}
                  <AnimatePresence mode="wait">
                    <PortfolioNavContent
                      key={activeProject.id}
                      activeProject={activeProject}
                    />
                  </AnimatePresence>

                  {/* Mobile menu button */}
                  <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="ml-2 flex size-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white md:hidden"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  >
                    {mobileOpen ? (
                      <X className="size-4" />
                    ) : (
                      <Menu className="size-4" />
                    )}
                  </button>
                </m.div>
              ) : (
                <m.div
                  key="standard-nav"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={outerSwap}
                  className="flex items-center gap-1"
                >
                  <StandardNavContent textColors={textColors} />

                  {/* Mobile menu button */}
                  <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className={cn(
                      "ml-2 flex size-8 items-center justify-center rounded-full transition-colors md:hidden",
                      textColors.text,
                      textColors.textHover
                    )}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  >
                    {mobileOpen ? (
                      <X className="size-4" />
                    ) : (
                      <Menu className="size-4" />
                    )}
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer expanded state: large email signup card */}
          <AnimatePresence>
            {isFooter && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="hidden w-full overflow-hidden md:block"
              >
                <div className="flex min-w-[480px] flex-col items-center px-6 pb-6 pt-4">
                  {/* Headline */}
                  <p className="mt-4 mb-8 max-w-[360px] text-center text-xl font-bold leading-snug tracking-tight text-white">
                    Industry insights, agency updates &amp; exclusive content
                  </p>

                  {/* Email input + submit */}
                  <div className="flex w-full items-center gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:bg-white/15"
                    />
                    <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#7c6bf0] transition-all hover:bg-white/90 active:scale-[0.97]">
                      Submit
                    </button>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.nav>
      </m.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            data-theme="dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="dark fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-2">
              {navItems.map((item, i) => (
                <m.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: motionPresets.ease.outExpo,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-3 px-6 py-4 text-3xl font-bold tracking-tight text-white transition-colors hover:text-[var(--primary)]"
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </m.div>
              ))}
            </nav>

            {/* Mobile email signup */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 flex w-full max-w-xs flex-col items-center gap-4 px-6"
            >
              <div className="flex w-full items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none"
                />
                <button className="rounded-full bg-[var(--primary)] px-4 py-2.5 text-xs font-semibold text-white">
                  Submit
                </button>
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-[#737373] transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
