"use client";

import { motion } from "framer-motion";
import { Home, BarChart3, User, Wallet, Store } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  currentPath?: string;
  className?: string;
}

const NAV_ITEMS = [
  { href: "/", label: "Lakay", icon: Home, goldAccent: false },
  { href: "/mache", label: "Mache", icon: Store, goldAccent: false },
  { href: "/bous", label: "Bous", icon: Wallet, goldAccent: true },
  { href: "/paryaj", label: "Paryaj", icon: BarChart3, goldAccent: false },
  { href: "/pwofil", label: "Pwofil", icon: User, goldAccent: false },
] as const;

export function MobileBottomNav({ currentPath, className }: MobileBottomNavProps) {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex h-[72px] items-center justify-around bg-bg-surface/70 backdrop-blur-2xl border-t border-border-divider pb-[env(safe-area-inset-bottom)] md:hidden",
        className
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/"
          ? currentPath === "/"
          : currentPath?.startsWith(item.href);
        const Icon = item.icon;

        return (
          <span
            key={item.href}
            className={cn(
              "relative flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              isActive
                ? item.goldAccent ? "text-accent-gold" : "text-brand-primary"
                : "text-text-muted",
            )}
          >
            <div className={cn(
              "flex items-center justify-center transition-all rounded-xl p-1.5",
              isActive && item.goldAccent && "bg-accent-gold/15 glow-gold",
              isActive && !item.goldAccent && "bottom-nav-active-glow",
            )}>
              <Icon className="size-5" />
            </div>
            <span>{item.label}</span>
            {isActive && (
              <motion.span
                layoutId="bottom-nav-indicator"
                className={cn(
                  "absolute -bottom-0.5 h-[3px] w-5 rounded-full",
                  item.goldAccent ? "bg-accent-gold" : "bg-brand-primary",
                )}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}
