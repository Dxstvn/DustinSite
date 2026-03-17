"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, navItems, services } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const footerLinks = {
  services: services.map((s) => ({ label: s.title, href: s.href })),
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { label: "Twitter", href: siteConfig.socials.twitter },
    { label: "Instagram", href: siteConfig.socials.instagram },
    { label: "LinkedIn", href: siteConfig.socials.linkedin },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface-primary)]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section — big CTA */}
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-end md:py-24">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                Let&apos;s work together
              </p>
              <h3 className="mt-3 max-w-md text-3xl font-bold tracking-tight md:text-4xl">
                Ready to start your next project?
              </h3>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[var(--primary)]/25"
            >
              Get in touch
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-8 border-t border-[var(--surface-border)] py-12 md:grid-cols-4 md:py-16">
          {/* Brand */}
          <ScrollReveal delay={0}>
            <div>
              <Link href="/" className="text-lg font-bold tracking-tight">
                {siteConfig.name.toLowerCase()}
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {siteConfig.tagline}
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-block text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {siteConfig.email}
              </a>
            </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal delay={0.08}>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Services
              </p>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
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
            </div>
          </ScrollReveal>

          {/* Company */}
          <ScrollReveal delay={0.16}>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Company
              </p>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
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
            </div>
          </ScrollReveal>

          {/* Socials */}
          <ScrollReveal delay={0.24}>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                Connect
              </p>
              <ul className="space-y-3">
                {footerLinks.socials.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--surface-border)] py-6 text-xs text-[var(--text-tertiary)] md:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-[var(--text-secondary)]">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--text-secondary)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
