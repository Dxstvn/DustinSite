"use client";

import { cn } from "@/lib/utils";

const HEADER_CATEGORIES = [
  { id: "tout", label: "Tout" },
  { id: "espò", label: "Espò" },
  { id: "politik", label: "Politik" },
  { id: "divètisman", label: "Divètisman" },
  { id: "meteo", label: "Evenman Natirèl" },
  { id: "ekonomi", label: "Ekonomi" },
  { id: "kripto", label: "Kripto" },
  { id: "monn", label: "Monn" },
  { id: "dyaspora", label: "Dyaspora" },
  { id: "lòt", label: "Lòt" },
] as const;

interface HeaderCategoryBarProps {
  activeCategory?: string;
}

export function HeaderCategoryBar({ activeCategory }: HeaderCategoryBarProps) {
  return (
    <nav
      className="flex items-center gap-1 overflow-x-auto scrollbar-none fade-edges px-4 md:px-6 pb-2"
      aria-label="Kategori yo"
    >
      {HEADER_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <span
            key={cat.id}
            className={cn(
              "relative shrink-0 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
              isActive
                ? "text-brand-primary"
                : "text-text-muted hover:text-text-primary"
            )}
          >
            {cat.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-primary shadow-[0_0_6px_var(--color-brand-primary-glow)]" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
