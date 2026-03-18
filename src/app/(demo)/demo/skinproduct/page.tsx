"use client";

import Image from "next/image";
import Link from "next/link";
import { motion as m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const IMG = "/images/demos/skinproduct";

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background image with Ken Burns — scale 1.05 → 1 */}
      <m.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={`${IMG}/hero-skin.jpg`}
          alt="Dewy luminous skin"
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          priority
          sizes="100vw"
        />
        {/* Layer 1: Warm tint overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(126, 96, 60, 0.06)" }}
          aria-hidden="true"
        />
        {/* Layer 2: Gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(17, 8, 4, 0.2) 0%, rgba(17, 8, 4, 0.1) 40%, rgba(17, 8, 4, 0.35) 100%)",
          }}
          aria-hidden="true"
        />
      </m.div>

      {/* InsetFrame — 5% margin, 0.35 opacity border */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          margin: "5%",
          border: "1px solid rgba(245, 237, 228, 0.35)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center">
        {/* Wordmark — font-semibold + clamp(3rem,7vw,5.5rem) */}
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-semibold text-[#FDF8F3]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
          }}
        >
          Skintuary+
        </m.h1>

        {/* STUDIO — uppercase tracking label */}
        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-2 text-[0.75rem] uppercase tracking-[0.3em] text-[#F5EDE4]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          STUDIO
        </m.p>

        {/* Tagline — text-[1.25rem] italic */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 italic text-[#F5EDE4]/90"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
          }}
        >
          Radiance starts here
        </m.p>

        {/* Scroll indicator — chevron with bounce */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute -bottom-32"
        >
          <m.div
            animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.17, 0.55, 0.55, 1] }}
          >
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              className="text-[#F5EDE4]"
            >
              <path
                d="M1 1L10 10L19 1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

// ─── Product Showcase ────────────────────────────────────────────────────────
function ProductShowcase({
  label,
  title,
  subtitle,
  description,
  image,
  bgColor,
  reversed,
  cta,
  badge,
}: {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor: string;
  reversed?: boolean;
  cta: string;
  badge?: string;
}) {
  return (
    <section style={{ backgroundColor: bgColor }}>
      <div
        className={`grid min-h-screen grid-cols-1 lg:grid-cols-2 ${
          reversed ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* Image side — full-bleed */}
        <div
          className={`relative min-h-[50vh] overflow-hidden lg:min-h-screen ${
            reversed ? "lg:[direction:ltr]" : ""
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Warm overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(126, 96, 60, 0.04)" }}
            aria-hidden="true"
          />
        </div>

        {/* Text side */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }}
          className={`flex flex-col justify-center gap-6 px-8 py-16 sm:px-12 md:px-16 lg:px-20 lg:py-24 ${
            reversed ? "lg:[direction:ltr]" : ""
          }`}
        >
          {/* Label */}
          <p
            className="text-[11px] uppercase tracking-[0.25em] text-[#7E603C]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {label}
          </p>

          {/* Title */}
          <h2>
            <span
              className="block text-[#261607]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              {title}
            </span>
            <span
              className="block italic text-[#7E603C]/80"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              }}
            >
              {subtitle}
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-md text-[1.0625rem] leading-[1.75] text-[#261607]/85">
            {description}
          </p>

          {/* Badge */}
          {badge && (
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-[#7E603C]/70"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {badge}
            </span>
          )}

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-[#7E603C] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[#FDF8F3] transition-colors hover:bg-[#5a4428]">
              {cta}
            </button>
          </div>
        </m.div>
      </div>
    </section>
  );
}

// ─── Collection Cards ────────────────────────────────────────────────────────
function CollectionCards() {
  return (
    <section className="grid grid-cols-1 gap-[2px] md:grid-cols-2">
      {[
        {
          img: `${IMG}/mood-flatlay.jpg`,
          title: "Skincare Rituals",
          subtitle: "Luxury serums & elixirs",
        },
        {
          img: `${IMG}/product-guide-new.jpg`,
          title: "Digital Guides",
          subtitle: "Your radiance companion",
        },
      ].map((card) => (
        <m.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative aspect-[3/4] cursor-pointer overflow-hidden"
        >
          <Image
            src={card.img}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay — darkens on hover */}
          <div
            className="absolute inset-0 bg-[#110804]/30 transition-colors duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-[#110804]/50"
            aria-hidden="true"
          />
          {/* Text overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
            <p
              className="text-[11px] text-[#7E603C] sm:text-xs"
              style={{ fontFamily: "'Bebas Neue', sans-serif", textTransform: "uppercase", letterSpacing: "0.15em" }}
            >
              {card.subtitle}
            </p>
            <h3
              className="mt-2 text-[#FDF8F3]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              }}
            >
              {card.title}
            </h3>
          </div>
        </m.div>
      ))}
    </section>
  );
}

// ─── Fixed Background Section ────────────────────────────────────────────────
function Commitment() {
  return (
    <section className="relative flex h-[85vh] items-start justify-start overflow-hidden p-8 sm:p-12 lg:p-20">
      <div className="absolute inset-0">
        <Image
          src={`${IMG}/mood-water-drops.jpg`}
          alt="Water drops"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Warm tint */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(126, 96, 60, 0.06)" }}
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#261607]/20" aria-hidden="true" />
      </div>

      {/* InsetFrame — 5% margin, 0.35 opacity */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          margin: "5%",
          border: "1px solid rgba(245, 237, 228, 0.35)",
        }}
        aria-hidden="true"
      />

      {/* Headline — top-left */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <span
          className="mb-4 flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#F5EDE4]/60"
          style={{ fontFamily: "'Bebas Neue', sans-serif", textTransform: "uppercase" }}
        >
          <span className="inline-block size-1.5 rounded-full bg-[#7E603C]" aria-hidden="true" />
          OUR COMMITMENT
        </span>
        <h2
          className="max-w-2xl leading-[1.05] text-[#FDF8F3]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
          }}
        >
          Pure & natural radiance.
        </h2>
      </m.div>

      {/* Content card — bottom-right */}
      <div className="absolute bottom-10 right-8 z-10 max-w-sm bg-[#FAF6F1]/95 p-8 sm:right-12 lg:bottom-20 lg:right-20 lg:p-10">
        <p
          className="mb-3 text-[1.25rem] leading-snug text-[#261607]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          radiance from within.
        </p>
        <p className="text-[0.875rem] leading-relaxed text-[#261607]/70">
          We believe in rituals, not routines. Every drop, every touch, every
          moment is a meditation on your own beauty.
        </p>
      </div>
    </section>
  );
}

// ─── Brand Essence (Scroll Text Reveal) ──────────────────────────────────────
function BrandEssence() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0.15, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={`${IMG}/mood-gold-tray.jpg`}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(38, 22, 7, 0.85)" }}
          aria-hidden="true"
        />
        {/* Warm radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(126, 96, 60, 0.12) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* InsetFrame */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          margin: "5%",
          border: "1px solid rgba(245, 237, 228, 0.35)",
        }}
        aria-hidden="true"
      />

      <m.div
        style={{ opacity }}
        className="relative z-20 mx-auto max-w-4xl px-6 text-center"
      >
        <p
          className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#F5EDE4]/60"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          OUR PHILOSOPHY
        </p>
        <p
          className="text-2xl leading-relaxed text-[#F5EDE4] md:text-3xl lg:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your skin tells a story. We believe in rituals, not routines — in
          radiance that comes from within. Skintuary+ Studio was born from the
          belief that skincare is an act of reverence.
        </p>
      </m.div>
    </section>
  );
}

// ─── Ingredients — espresso background (#261607) ─────────────────────────────
function Ingredients() {
  return (
    <section className="bg-[#261607] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            className="text-[11px] uppercase tracking-[0.25em] text-[#7E603C]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sourced with intention
          </span>
          <h2
            className="mt-4 max-w-md text-3xl leading-snug text-[#FDF8F3] md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Precious ingredients sourcing
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#F5EDE4]/70">
            Every ingredient is hand-selected for purity and potency. Botanical
            oils, plant extracts, and time-honored essences — each chosen to
            honor your skin.
          </p>
        </m.div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            { img: `${IMG}/ingredient-aloe.jpg`, name: "Aloe Vera" },
            { img: `${IMG}/ingredient-rosehip.jpg`, name: "Rosehip Oil" },
            { img: `${IMG}/mood-amber-bottles.jpg`, name: "Botanical Oils" },
          ].map((item) => (
            <m.div
              key={item.name}
              whileHover={{ y: -4 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(126, 96, 60, 0.04)" }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#261607]/50 to-transparent p-4">
                <p className="text-sm text-[#FDF8F3]">{item.name}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mood Grid ───────────────────────────────────────────────────────────────
function MoodGridSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Marquee strip — small uppercase text */}
      <div className="overflow-hidden border-y border-[#D9CCBE]/40 bg-[#FAF6F1] py-4">
        <div
          className="flex w-max gap-0"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-[0.875rem] uppercase tracking-[0.25em] text-[#261607]/40"
            >
              RADIANCE &middot; RITUAL &middot; REVERENCE &middot; GLOW
              &middot;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Image grid — left large + right 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — large image with @SKINTUARYSTUDIO overlay */}
        <m.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square md:aspect-auto"
        >
          <Image
            src={`${IMG}/mood-hand.jpg`}
            alt="Hand with golden serum oil"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Warm overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(126, 96, 60, 0.05)" }}
            aria-hidden="true"
          />
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pb-12 md:pb-16">
            <a
              href="https://instagram.com/skintuarystudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.25em] text-[#F5EDE4]/80 transition-colors duration-300 hover:text-[#F5EDE4]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              @SKINTUARYSTUDIO
            </a>
            <p
              className="mt-2 text-lg italic text-[#F5EDE4]/70"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Radiance starts here
            </p>
          </div>
        </m.div>

        {/* Right — 2x2 sub-grid */}
        <div className="grid grid-cols-2 gap-[2px]">
          {[
            {
              src: `${IMG}/mood-amber-bottles.jpg`,
              alt: "Amber skincare bottles with dried floral accents",
            },
            {
              src: `${IMG}/mood-water-drops.jpg`,
              alt: "Water droplets on warm amber surface",
            },
            {
              src: `${IMG}/mood-flatlay.jpg`,
              alt: "Curated skincare ritual flatlay",
            },
            {
              src: `${IMG}/product-serum.jpg`,
              alt: "The Radiance Serum in amber glass bottle",
            },
          ].map((media) => (
            <m.div
              key={media.src}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square"
            >
              <Image
                src={media.src}
                alt={media.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(126, 96, 60, 0.04)" }}
                aria-hidden="true"
              />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Closing CTA ─────────────────────────────────────────────────────────────
function ClosingCTA() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#110804] py-28 md:py-36 lg:py-44">
      {/* Ambient background texture */}
      <div className="absolute inset-0 opacity-[0.18]">
        <Image
          src={`${IMG}/cta-dried-flowers.jpg`}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      {/* Warm ember radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 50%, rgba(73, 41, 18, 0.30) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* InsetFrame */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          margin: "5%",
          border: "1px solid rgba(245, 237, 228, 0.35)",
        }}
        aria-hidden="true"
      />

      {/* S+ watermark */}
      <span
        className="pointer-events-none absolute text-[20vw] font-semibold leading-none text-[#FDF8F3]/[0.03]"
        style={{ fontFamily: "'Playfair Display', serif" }}
        aria-hidden="true"
      >
        S+
      </span>

      {/* Content */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <p
          className="text-[11px] tracking-[0.3em] text-[#7E603C]/70"
          style={{ fontFamily: "'Bebas Neue', sans-serif", textTransform: "uppercase" }}
        >
          SKINTUARY+ STUDIO
        </p>

        {/* Horizontal rule */}
        <div
          className="mb-10 mt-4 h-px w-16 bg-[#7E603C]/30"
          aria-hidden="true"
        />

        {/* Headline line 1 — "ritual" */}
        <span
          className="block text-[#FDF8F3]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          Your ritual
        </span>

        {/* Headline line 2 — amber + italic */}
        <span
          className="block italic text-[#7E603C]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          awaits.
        </span>

        {/* Supporting line */}
        <p
          className="mt-6 hidden italic text-[#F5EDE4]/55 sm:block"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          A ritual for your skin. A gift for yourself.
        </p>

        {/* CTA button */}
        <button className="mt-10 bg-[#7E603C] px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#FDF8F3] transition-colors hover:bg-[#5a4428]">
          SHOP THE COLLECTION
        </button>
      </m.div>
    </section>
  );
}

// ─── Footer — obsidian #110804 ───────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#110804] py-16 md:py-20">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-5 md:px-8 lg:px-12">
        {/* S+ mark with warm glow */}
        <div className="relative">
          <span
            className="text-4xl font-semibold text-[#F5EDE4]"
            style={{ fontFamily: "'Playfair Display', serif" }}
            aria-hidden="true"
          >
            S<span className="font-normal">+</span>
          </span>
          <div
            className="absolute inset-0 bg-[#7E603C] opacity-20 blur-xl"
            aria-hidden="true"
          />
        </div>

        {/* Navigation links */}
        <nav
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          aria-label="Footer navigation"
        >
          {["PRIVACY", "TERMS", "CONTACT"].map((label) => (
            <Link
              key={label}
              href={`/${label.toLowerCase()}`}
              className="flex min-h-11 items-center text-[11px] uppercase tracking-[0.2em] text-[#F5EDE4]/60 transition-colors duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#F5EDE4]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Wordmark */}
        <p
          className="text-[11px] tracking-[0.3em] text-[#F5EDE4]/40"
          style={{ fontFamily: "'Bebas Neue', sans-serif", textTransform: "uppercase" }}
          aria-hidden="true"
        >
          SKINTUARY STUDIO
        </p>

        {/* Bottom line */}
        <div className="flex flex-col items-center gap-2 text-[#F5EDE4]/30">
          <a
            href="https://instagram.com/skintuarystudio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center text-xs transition-colors duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#F5EDE4]/60"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            @SKINTUARYSTUDIO
          </a>
          <p
            className="text-[11px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            &copy; {new Date().getFullYear()} Skintuary+ Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function SkinproductDemo() {
  return (
    <>
      {/* Load Playfair Display + Bebas Neue (High Tide substitute) */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <main
        className="bg-[#FAF6F1] text-[#261607]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        <Hero />
        <ProductShowcase
          label="THE RADIANCE SERUM"
          title="Luminous"
          subtitle="Restoration"
          description="A golden elixir of botanical oils that melts into skin like warm honey. Squalane, jojoba, and rosehip seed oil work in harmony to restore your natural radiance — one ritual at a time."
          image={`${IMG}/product-serum.jpg`}
          bgColor="#FAF6F1"
          cta="SHOP NOW"
        />
        <ProductShowcase
          label="THE GLOW GUIDE"
          title="Your Complete"
          subtitle="Radiance Ritual"
          description="Everything you need to unlock your skin's natural luminosity. A comprehensive digital guide to building rituals that honor your skin — morning and night."
          image={`${IMG}/product-guide-new.jpg`}
          bgColor="#EDE3D7"
          reversed
          cta="GET INSTANT ACCESS"
          badge="INSTANT DIGITAL DELIVERY"
        />
        <CollectionCards />
        <Commitment />
        <BrandEssence />
        <Ingredients />
        <MoodGridSection />
        <ClosingCTA />
        <Footer />
      </main>
    </>
  );
}
