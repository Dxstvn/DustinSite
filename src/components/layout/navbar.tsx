"use client";

import { useState } from "react";
import Link from "next/link";
import { motion as m, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, siteConfig, motion as motionPresets } from "@/lib/constants";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function Navbar() {
  const { isScrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop floating pill nav */}
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: motionPresets.duration.slower,
          ease: motionPresets.ease.outExpo,
          delay: 0.2,
        }}
        className="fixed top-6 right-0 left-0 z-50 flex justify-center px-4"
      >
        <nav
          className={cn(
            "flex items-center gap-1 rounded-full border px-2 py-1.5 transition-all duration-500",
            isScrolled
              ? "border-[var(--surface-border)] bg-[var(--surface-primary)]/90 shadow-2xl shadow-black/50 backdrop-blur-xl"
              : "border-white/[0.08] bg-white/[0.04] backdrop-blur-md"
          )}
        >
          {/* Left nav items */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                <span className="relative z-10 font-mono text-xs uppercase tracking-[0.15em]">
                  {item.label}
                </span>
                <span className="absolute inset-0 scale-90 rounded-full bg-white/[0.06] opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link
            href="/"
            className="group relative mx-3 flex items-center px-4 py-2 md:mx-6"
          >
            <span className="text-lg font-bold tracking-tight text-[var(--text-primary)] transition-colors">
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
                className="group relative px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                <span className="relative z-10 font-mono text-xs uppercase tracking-[0.15em]">
                  {item.label}
                </span>
                <span className="absolute inset-0 scale-90 rounded-full bg-white/[0.06] opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-2 flex size-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-white/[0.08] hover:text-[var(--text-primary)] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>
      </m.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--surface-primary)]/95 backdrop-blur-2xl md:hidden"
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
                    className="group flex items-center gap-3 px-6 py-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--primary)]"
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </m.div>
              ))}
            </nav>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 flex flex-col items-center gap-2 text-sm text-[var(--text-tertiary)]"
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-[var(--text-primary)]"
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
