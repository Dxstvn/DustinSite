"use client";

import { motion as m } from "motion/react";
import Image from "next/image";

// Recreated from joinsafeharbor.org (Squarespace)
// Fonts: Poppins (nav/body), Manrope (headings)
// Colors: black #000, white #fff, charcoal #2a2829, light gray #e0e0db

const IMAGES = {
  hero: "https://images.squarespace-cdn.com/content/v1/688b935629991c5a21105f27/1754480309910-MWZE5HAS7L5FYT7HPDHY/unsplash-image-_86u_Y0oAaM.jpg",
  empowering:
    "https://images.squarespace-cdn.com/content/v1/688b935629991c5a21105f27/1bf8f33b-1701-4542-a10a-c59788c7e9c3/IMG_7220.jpeg",
  communities:
    "https://images.squarespace-cdn.com/content/v1/688b935629991c5a21105f27/98144186-d802-4bc6-98f6-42a43b88da11/IMG_1786.jpeg",
  facing:
    "https://images.squarespace-cdn.com/content/v1/688b935629991c5a21105f27/edf73b62-27e0-40ae-9e1e-bf0195bd30a6/Resized_20240915_145004_1726428600276.jpeg",
  donation:
    "https://images.squarespace-cdn.com/content/v1/688b935629991c5a21105f27/1754510257918-0T41XYC0C40V9ZLEZ40I/unsplash-image-X48hkTT1qQc.jpg",
};

function NavBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <span
          className="text-base font-semibold tracking-wide text-white md:text-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Safe Harbor International Mission
        </span>
        <nav className="hidden items-center gap-6 md:flex">
          {["Missions", "Our Vision", "Our Team"].map((item) => (
            <span
              key={item}
              className="cursor-pointer text-sm text-white/80 transition-colors hover:text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {item}
            </span>
          ))}
          <button
            className="ml-2 border border-white/40 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Donate
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Church with distinctive architecture against blue sky"
          fill
          className="object-cover object-bottom"
          priority
          sizes="100vw"
        />
      </div>

      {/* Text overlay at bottom-left */}
      <div className="relative flex min-h-screen items-end">
        <div className="px-6 pb-16 md:pb-20 lg:px-10">
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-4xl font-medium leading-[1.1] text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Uniting the Power of Faith Across the Globe
          </m.h1>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:flex-row md:items-start md:gap-16 lg:px-10">
        {/* Left: heading + button */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2
            className="text-3xl font-medium leading-snug text-black md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Strengthening the World through Christ
          </h2>
          <button
            className="mt-10 border border-[#2a2829] px-8 py-4 text-sm font-medium text-[#2a2829] transition-colors hover:bg-[#2a2829] hover:text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Our Vision
          </button>
        </m.div>

        {/* Right: description */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <p
            className="text-base leading-relaxed text-[#444] md:text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Safe Harbor International Mission lives the Christian call to love
            and serve through outreach, community development, and spiritual
            support in the U.S., Paris, England, Africa, and beyond. They
            address physical and emotional needs, foster hope, education, and
            sustainable growth in underserved communities. Working with local
            partners and volunteers, they ensure culturally sensitive care,
            honoring each community&apos;s dignity. Their commitment reflects
            God&apos;s grace, creating lasting impact worldwide.
          </p>
        </m.div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const programs = [
    {
      heading: "Empowering Lives Through Access to Essential Support",
      text: "At Safe Harbor International Mission, we are dedicated to nurturing healthier, safer communities. Providing nutritious food to children with limited access supports their growth and fosters hope for the future. Our campaigns against domestic violence work to break harmful cycles, creating safe environments where families can thrive. Collaborations with local groups like the Garden of Dreams strengthen our impact by addressing community needs. Together, we empower individuals and families to overcome adversity and build lasting resilience.",
      image: IMAGES.empowering,
      layout: "image-left" as const,
      isH2: true,
    },
    {
      heading:
        "Building Stronger Communities with Global Care and Support",
      text: "Safe Harbor International Mission is committed to sharing the gospel and serving communities across the globe. From the heartlands of the U.S. and the historic cities of England, Paris, Germany, and Italy, to the vibrant cultures of the Bahamas, Costa Maya, Barbados, and Jamaica, Safe Harbor's reach extends far and wide. Our mission further embraces the dynamic landscape of Dubai and numerous nations throughout Africa. Through preaching the gospel and offering practical support, Safe Harbor is dedicated to making a meaningful impact wherever we serve.",
      image: IMAGES.communities,
      layout: "text-left" as const,
      isH2: false,
    },
    {
      heading: "Facing Important Issues Head On",
      text: "Safe Harbor International Mission has completed numerous notable missions reflecting our commitment to serving diverse communities worldwide. We engaged in meaningful dialogue with former NYC Mayor Bill De Blasio on mental illness solutions, conducted impactful food drives in Nigeria to combat hunger, and provided compassionate care for seniors in Italy. Our outreach also included preaching the gospel in Paris, collaborating closely with our sister fellowship in Texas, and honoring Queens Borough President Melinda Katz for her dedicated public service. These efforts underscore our holistic approach and commitment to building strong, caring communities.",
      image: IMAGES.facing,
      layout: "image-left" as const,
      isH2: false,
    },
  ];

  return (
    <section className="bg-[#2a2829] py-20 md:py-28">
      <div className="mx-auto max-w-7xl space-y-24 px-6 md:space-y-32 lg:px-10">
        {programs.map((program, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-16 ${
              program.layout === "text-left" ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {program.isH2 ? (
                <h2
                  className="text-3xl font-medium leading-snug text-white md:text-4xl"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {program.heading}
                </h2>
              ) : (
                <h3
                  className="text-2xl font-medium leading-snug text-white md:text-3xl"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {program.heading}
                </h3>
              )}
              <p
                className="mt-6 text-sm leading-relaxed text-white/70 md:text-base"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {program.text}
              </p>
              <button
                className="mt-8 border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Learn More
              </button>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3
            className="text-3xl font-medium leading-snug text-black md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            &ldquo;True faith is reflected not in words alone, but in the hands
            that serve and the hearts that uplift others.&rdquo;
          </h3>
          <p
            className="mt-8 text-sm text-[#444]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            &mdash; Emma M., Founder of Safe Harbor
          </p>
        </m.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="bg-[#e0e0db] py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:flex-row md:gap-16 lg:px-10">
        {/* Left: contact info */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2
            className="text-3xl font-medium text-black md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Contact
          </h2>
          <p
            className="mt-6 text-base text-[#444]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Feel free to contact us with any questions.
          </p>
          <div
            className="mt-8 space-y-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <div>
              <p className="text-sm font-semibold text-black">Email</p>
              <p className="text-sm text-[#444]">shimforgod@gmail.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-black">Phone</p>
              <p className="text-sm text-[#444]">(516) 492-7432</p>
            </div>
          </div>
        </m.div>

        {/* Right: form */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {/* Name row */}
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex-1">
                <label className="text-xs text-[#444]">
                  Name{" "}
                  <span className="text-[#888]">(required)</span>
                </label>
                <div className="mt-2 flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-[#666]">First Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full border-b border-[#2a2829]/30 bg-transparent py-2 text-sm text-black focus:border-black focus:outline-none"
                      required
                      aria-label="First Name"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-[#666]">Last Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full border-b border-[#2a2829]/30 bg-transparent py-2 text-sm text-black focus:border-black focus:outline-none"
                      required
                      aria-label="Last Name"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-[#444]">
                Email <span className="text-[#888]">(required)</span>
              </label>
              <input
                type="email"
                className="mt-2 w-full border-b border-[#2a2829]/30 bg-transparent py-2 text-sm text-black focus:border-black focus:outline-none"
                required
                aria-label="Email"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-xs text-[#444]">
                Message <span className="text-[#888]">(required)</span>
              </label>
              <textarea
                className="mt-2 w-full resize-y border-b border-[#2a2829]/30 bg-transparent py-2 text-sm text-black focus:border-black focus:outline-none"
                rows={4}
                required
                aria-label="Message"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="border border-[#2a2829] px-6 py-3 text-sm font-medium text-[#2a2829] transition-colors hover:bg-[#2a2829] hover:text-white"
            >
              Submit
            </button>
          </form>
        </m.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#e0e0db] pb-12 pt-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-t border-[#2a2829]/15 pt-10">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            {/* Left: org name + address */}
            <div>
              <h4
                className="text-lg font-semibold text-black md:text-xl"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Safe Harbor International Mission
              </h4>
              <div
                className="mt-4 space-y-1 text-sm text-[#444]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <p>P.O. Box 8272</p>
                <p>Wilson NC 27896</p>
              </div>
            </div>

            {/* Right: link columns */}
            <div
              className="flex gap-16"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <div>
                <p className="text-sm font-semibold text-black">About</p>
                <div className="mt-3 space-y-2">
                  {["Our Vision", "Donate"].map((link) => (
                    <p
                      key={link}
                      className="cursor-pointer text-sm text-[#253551] underline underline-offset-2 transition-colors hover:text-black"
                    >
                      {link}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-black">Projects</p>
                <div className="mt-3 space-y-2">
                  {[
                    "Support Nigerian Families",
                    "Striving for Mental Health Care",
                    "Stop Domestic Violence",
                  ].map((link) => (
                    <p
                      key={link}
                      className="cursor-pointer text-sm text-[#253551] underline underline-offset-2 transition-colors hover:text-black"
                    >
                      {link}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SafeHarborDemo() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <main
        className="min-h-screen bg-white text-black"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <NavBar />
        <Hero />
        <MissionSection />
        <ProgramsSection />
        <QuoteSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
