"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { HeaderCategoryBar } from "./header-category-bar";

interface HeaderProps {
  currentPath?: string;
  activeCategory?: string;
  className?: string;
}

export function Header({
  currentPath,
  activeCategory,
  className,
}: HeaderProps) {
  const isMacheActive =
    currentPath?.startsWith("/mache") || currentPath?.startsWith("/kategori");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-bg-surface/60 backdrop-blur-2xl",
        className
      )}
    >
      {/* TOP ROW */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2.5 md:px-6">
        {/* Left: Logo + Mache link */}
        <div className="flex items-center gap-6">
          <span
            className="text-xl font-bold text-gradient-brand tracking-tight"
          >
            Parye.com
          </span>

          <span
            className={cn(
              "hidden md:inline-flex text-sm font-medium transition-colors cursor-pointer",
              isMacheActive
                ? "text-brand-primary"
                : "text-text-muted hover:text-text-primary"
            )}
          >
            Mache
          </span>
        </div>

        {/* Right: Theme + Auth buttons */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Konekte
            </Button>
            <Button size="sm" className="bg-brand-primary text-white hover:bg-brand-primary-hover">
              Enskri
            </Button>
          </div>
        </div>
      </div>

      {/* Divider between rows */}
      <div className="mx-4 md:mx-6 h-px bg-border-divider" />

      {/* BOTTOM ROW: Category tabs */}
      <div className="mx-auto max-w-[1400px]">
        <HeaderCategoryBar activeCategory={activeCategory} />
      </div>

      {/* Gradient bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
    </header>
  );
}
