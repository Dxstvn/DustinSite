"use client";

import { useState } from "react";
import { Mail, Calendar, Check, Copy } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { LocationTag } from "@/components/ui/location-tag";
import { siteConfig, motion as motionPresets } from "@/lib/constants";

export function ContactInfo() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section
      data-section-id="contact-info"
      data-theme="dark"
      className="dark relative bg-[var(--background)] pb-24 pt-8 md:pb-32"
    >
      {/* Noise texture */}
      <div className="noise absolute inset-0" />

      {/* Subtle divider line */}
      <div className="mx-auto mb-16 h-px w-full max-w-7xl bg-white/[0.06] md:mb-20" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Kicker */}
        <ScrollReveal>
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Or reach us directly
          </p>
        </ScrollReveal>

        {/* Contact cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {/* Email */}
          <ScrollReveal delay={0}>
            <button
              type="button"
              onClick={copyEmail}
              className="group flex w-full flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-white/[0.06]">
                {copied ? (
                  <Check className="size-4 text-green-400" />
                ) : (
                  <Mail className="size-4 text-[var(--text-secondary)]" />
                )}
              </div>
              <span className="text-sm font-medium text-white">
                {copied ? "Copied!" : siteConfig.email}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                <Copy className="size-3" />
                {copied ? "Email copied" : "Click to copy"}
              </span>
            </button>
          </ScrollReveal>

          {/* Book a Call */}
          <ScrollReveal delay={motionPresets.stagger}>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-white/[0.06]">
                <Calendar className="size-4 text-[var(--text-secondary)]" />
              </div>
              <span className="text-sm font-medium text-white">
                Book a Call
              </span>
              <span className="text-xs text-[var(--text-tertiary)]">
                Google Calendar
              </span>
            </a>
          </ScrollReveal>

          {/* Location */}
          <ScrollReveal delay={motionPresets.stagger * 2}>
            <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/[0.06]">
                <svg
                  className="size-4 text-[var(--text-secondary)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <LocationTag
                city="New York"
                country="NY"
                timezone="America/New_York"
              />
              <span className="text-xs text-[var(--text-tertiary)]">
                Headquarters
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Social links */}
        <ScrollReveal delay={motionPresets.stagger * 3}>
          <div className="mt-12 flex items-center justify-center gap-6">
            {Object.entries(siteConfig.socials).map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm capitalize text-[var(--text-tertiary)] transition-colors duration-300 hover:text-white"
              >
                {name}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
