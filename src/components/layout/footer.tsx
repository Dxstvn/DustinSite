"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Twitter", href: siteConfig.socials.twitter },
  { label: "Instagram", href: siteConfig.socials.instagram },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
];

export function Footer() {
  const pathname = usePathname();
  const hideFooterCTA = pathname === "/contact";

  return (
    <>
      {/* ================================================================
          8A — Full-viewport CTA section (light cream, NOT dark)
          ================================================================ */}
      {!hideFooterCTA && (
        <section
          data-section-id="footer-cta"
          className="relative flex min-h-[80vh] flex-col justify-between bg-[#f5f3f0] px-6 py-12 sm:px-10 md:min-h-[85vh] md:px-16 lg:px-20"
        >
          {/* Top-left: wordmark */}
          <div>
            <span className="text-sm font-bold tracking-tight text-[#1a1a1a]/80">
              jaspire
            </span>
          </div>

          {/* Bottom-left: heading + link */}
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold tracking-tight text-[#1a1a1a] md:text-6xl lg:text-7xl">
              Ready when you are
            </h2>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-2xl text-[#8a8a8a] transition-colors hover:text-[#1a1a1a] md:text-3xl"
            >
              Get in touch
              <ArrowUpRight className="size-6" />
            </Link>
          </div>
        </section>
      )}

      {/* ================================================================
          8B — Minimal dark footer
          ================================================================ */}
      <footer
        data-section-id="footer"
        data-theme="dark"
        className="dark border-t border-[var(--surface-border)] bg-[var(--surface-primary)]"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Row 1: Wordmark + nav links */}
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-[var(--text-primary)]"
            >
              jaspire
            </Link>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Row 2: Copyright + legal + socials */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-[var(--surface-border)] pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-[var(--text-tertiary)]">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="text-xs text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
                >
                  Terms
                </Link>
              </div>

              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
