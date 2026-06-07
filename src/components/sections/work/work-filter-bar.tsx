"use client";

import { useRef } from "react";
import { motion as m } from "motion/react";
import { cn } from "@/lib/utils";

interface WorkFilterBarProps {
  /** Filter labels, "All" first, then portfolioDisciplines. */
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function WorkFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
}: WorkFilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    // NOTE (QA): verify `top-24` against the real floating navbar pill height —
    // the nav is a glass pill, not a full bar, so the sticky offset may need a
    // nudge once both are rendered together on /portfolio.
    <div className="sticky top-24 z-30 border-b border-white/10 bg-[#0d1b2a]/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          role="tablist"
          aria-label="Filter projects by discipline"
          className="no-scrollbar flex gap-1 overflow-x-auto md:gap-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "relative flex min-h-11 shrink-0 items-center px-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 md:px-4",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1b2a]",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                <span className="relative z-10">{category}</span>

                {/* Animated underline indicator that slides between tabs. */}
                {isActive && (
                  <m.span
                    layoutId="active-filter"
                    className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-white md:inset-x-4"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
