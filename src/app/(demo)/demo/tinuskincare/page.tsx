"use client";

import { useState } from "react";
import { motion as m, AnimatePresence } from "motion/react";
import { Plus, Minus, ShoppingBag, Menu, X } from "lucide-react";
import Image from "next/image";

// Recreated from tinuskincare.com (Squarespace)
// Fonts: aktiv-grotesk (body) → Inter, halyard-display/Poppins (headings) → DM Serif Display
// Colors: cream #f9ebcc, dark green #313832, sage #a2b6a2, terracotta #b8693d

const IMAGES = {
  logo: "https://images.squarespace-cdn.com/content/v1/6732c59df406c04c2df538a2/a9375168-498b-414d-9642-a38ba1ea8af5/TINU+%281%29.png?format=1500w",
  hero: "https://images.squarespace-cdn.com/content/v1/65ca4791d8c987735d654f45/43cab9b3-25dc-49c5-b250-000f56cae4f9/Looped-hero.jpg",
  nurture:
    "https://images.squarespace-cdn.com/content/v1/6732c59df406c04c2df538a2/07445701-a580-4dde-82e7-fc6eebe3f3e9/pexels-cottonbro-6635922.jpg",
  services:
    "https://images.squarespace-cdn.com/content/v1/6732c59df406c04c2df538a2/e7e95929-38e5-4f95-af32-e05cc63443c7/pexels-polina-kovaleva-6543620.jpg",
  product:
    "https://images.squarespace-cdn.com/content/v1/6732c59df406c04c2df538a2/1732074832642-XH7T1GLM0JDTXYHO071W/unsplash-image-WdJ4WnLxyDs.jpg",
};

const services = [
  {
    title: "Personalized Glow Facials",
    description:
      "Custom-blended treatments tailored to your unique skin profile. Our estheticians analyze your skin type, concerns, and goals to create a bespoke facial experience that reveals your natural radiance.",
  },
  {
    title: "Advanced Exfoliation and Skin Smoothing",
    description:
      "Professional-grade exfoliation treatments that remove dead skin cells, unclog pores, and promote cellular renewal. Experience smoother, brighter skin after just one session.",
  },
  {
    title: "Lymphatic Sculpting and Revitalization",
    description:
      "Gentle yet effective lymphatic drainage massage techniques that reduce puffiness, improve circulation, and promote natural detoxification for a sculpted, revitalized appearance.",
  },
  {
    title: "Brightening and Renewing Skin Peels",
    description:
      "Carefully formulated chemical peels that address hyperpigmentation, fine lines, and uneven texture. Our progressive approach ensures safe, visible results with minimal downtime.",
  },
];

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* Single row: large centered logo with nav links aligned to its center */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10" style={{ minHeight: '220px' }}>
        {/* Left nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {["Appointments", "Shop", "Membership"].map((item) => (
            <span
              key={item}
              className="cursor-pointer text-[15px] font-medium text-[#f9ebcc]/80 transition-colors hover:text-[#f9ebcc]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Center logo — absolutely positioned, large like tinuskincare.com */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={IMAGES.logo}
            alt="TINU"
            width={250}
            height={250}
            className="h-[180px] w-[180px] object-contain brightness-0 invert md:h-[200px] md:w-[200px]"
          />
        </div>

        {/* Right nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <span
            className="cursor-pointer text-[15px] font-medium text-[#f9ebcc]/80 transition-colors hover:text-[#f9ebcc]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Login
          </span>
          <button className="flex items-center gap-2 text-[15px] font-medium text-[#f9ebcc]/80 transition-colors hover:text-[#f9ebcc]">
            <ShoppingBag className="size-4" />
            <span style={{ fontFamily: "'Inter', sans-serif" }}>Cart (0)</span>
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="ml-auto flex items-center gap-2 text-[#f9ebcc] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-[#313832] px-6 pb-6 md:hidden"
          >
            {["Appointments", "Shop", "Membership", "Login"].map((item) => (
              <span
                key={item}
                className="block cursor-pointer py-3 text-[15px] font-medium text-[#f9ebcc]/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item}
              </span>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen bg-[#313832]">
      {/* Full-bleed hero image */}
      <div className="relative h-screen w-full">
        <Image
          src={IMAGES.hero}
          alt="TINU Skincare products on warm surface"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#313832]/80 via-transparent to-[#313832]/40" />

        {/* Address text overlay at bottom */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute inset-x-0 bottom-16 text-center"
        >
          <p
            className="text-sm leading-relaxed text-[#f9ebcc]/90 md:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            1 Old Country Rd (located in &ldquo;My Salon Suites&rdquo;)
            <br />
            Garden City, NY 11514
            <br />
            info@tinuskincare.com
          </p>
        </m.div>
      </div>
    </section>
  );
}

function NurtureSection() {
  return (
    <section className="bg-[#f9ebcc] py-20 md:py-28 lg:py-36">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:gap-16 lg:gap-20">
        {/* Image */}
        <m.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex-1"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.nurture}
              alt="Woman applying skincare"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </m.div>

        {/* Content */}
        <m.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <h2
            className="text-4xl font-bold leading-tight text-[#313832] md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Nurture Your Natural Radiance
          </h2>
          <p
            className="mt-6 text-base leading-relaxed text-[#313832]/70 md:text-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            TINU Skincare offers luxurious, personalized treatments tailored to
            your unique needs. From rejuvenating facials to advanced peels, every
            service leaves you refreshed, confident, and radiant.
          </p>
          <button
            className="mt-8 w-full rounded-full bg-[#a2b6a2] px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#231f1f] transition-colors hover:bg-[#8fa88f] md:w-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Book Now
          </button>
        </m.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#f9ebcc] pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Services heading */}
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-5xl font-bold text-[#313832] md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Services
        </m.h2>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* Accordion */}
          <div className="flex-1">
            <div className="divide-y divide-[#313832]/20">
              {services.map((service, i) => (
                <div key={service.title}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex w-full min-h-11 items-center justify-between py-5 text-left"
                    aria-expanded={openIndex === i}
                  >
                    <span
                      className="text-base font-medium text-[#313832] md:text-lg"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {service.title}
                    </span>
                    {openIndex === i ? (
                      <Minus className="size-4 shrink-0 text-[#313832]/60" />
                    ) : (
                      <Plus className="size-4 shrink-0 text-[#313832]/60" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-5 text-sm leading-relaxed text-[#313832]/60"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {service.description}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait image */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={IMAGES.services}
                alt="Skincare treatment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="bg-[#313832] py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3
            className="text-3xl font-bold italic leading-snug text-[#f9ebcc] md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            &ldquo;True beauty lies within, we help it shine through.&rdquo;
          </h3>
          <p
            className="mt-8 text-sm tracking-wide text-[#f9ebcc]/60"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Tinu Omotade, Founder
          </p>
        </m.div>
      </div>
    </section>
  );
}

function ComeVisitSection() {
  return (
    <section className="bg-[#b8693d] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-5xl font-bold text-[#f9ebcc] md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Come Visit!
          </h2>
          <p
            className="mt-4 text-base text-[#f9ebcc]/80 underline underline-offset-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Visit Us and Experience True Care
          </p>
        </m.div>

        {/* Booking categories */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 rounded-lg bg-white p-8 shadow-lg md:ml-auto md:max-w-xl"
        >
          <p
            className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-[#313832]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Select Appointment Category
          </p>
          <div className="divide-y divide-gray-100">
            {[
              "Body Treatments (Back, Scalp, Hands, Intimate areas)",
              "Diamond Glow Facials",
              "Luxe Facials",
              "Peels",
              "Platinum Facials",
              "Gift Certificates & Subscriptions",
            ].map((category) => (
              <div
                key={category}
                className="flex items-center justify-between py-4"
              >
                <span
                  className="text-sm text-[#313832]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {category}
                </span>
                <button
                  className="rounded bg-black px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#313832]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#f9ebcc] py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-start md:justify-between">
        {/* Newsletter */}
        <div className="flex-1">
          <h2
            className="text-4xl font-bold text-[#313832] md:text-5xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Stay in the loop
          </h2>
          <p
            className="mt-4 text-sm text-[#313832]/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Sign up with your email address to receive news and updates.
          </p>
          <div className="mt-6 flex gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 rounded-full border border-[#313832]/20 bg-transparent px-5 py-3 text-sm text-[#313832] placeholder:text-[#313832]/40 focus:border-[#a2b6a2] focus:outline-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
              aria-label="Email Address"
            />
            <button
              className="rounded-full bg-[#b8693d] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a55d35]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Address */}
        <div className="text-right md:text-right">
          <h3
            className="text-3xl font-bold text-[#313832] md:text-4xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            TINU
          </h3>
          <div
            className="mt-4 space-y-1 text-sm text-[#313832]/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p>1 Old Country</p>
            <p>Garden City, NY 11514</p>
            <p>(Located in My Salon Suites)</p>
            <p>info@tinuskincare.com</p>
            <p className="text-[#b8693d]">(516) 995-1934</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function TinuskincareDemo() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <main
        className="min-h-screen bg-[#f9ebcc] text-[#313832]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <NavBar />
        <Hero />
        <NurtureSection />
        <ServicesSection />
        <QuoteSection />
        <ComeVisitSection />
        <Footer />
      </main>
    </>
  );
}
