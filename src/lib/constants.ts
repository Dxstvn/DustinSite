/* ==========================================================================
   Jaspire — Site Constants & Configuration
   ========================================================================== */

// ---------------------------------------------------------------------------
// Site Config
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "Jaspire",
  tagline: "Premium Digital Agency",
  description:
    "We build digital experiences, brands, and growth through web development, SEO, and social media management.",
  url: "https://jaspire.co",
  email: "hello@jaspire.co",
  socials: {
    twitter: "https://twitter.com/jaspire",
    instagram: "https://instagram.com/jaspire",
    linkedin: "https://linkedin.com/company/jaspire",
  },
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export interface Service {
  id: string;
  title: string;
  description: string;
  accent: "blue" | "green" | "orange";
  href: string;
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Custom websites, web apps, and e-commerce solutions built with modern technologies for performance and scale.",
    accent: "blue",
    href: "/services#web-development",
  },
  {
    id: "seo",
    title: "SEO",
    description:
      "Technical SEO, content strategy, and analytics to drive organic growth and dominate search rankings.",
    accent: "green",
    href: "/services#seo",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    description:
      "Content creation, community management, and paid advertising campaigns that build loyal audiences.",
    accent: "orange",
    href: "/services#social-media",
  },
];

// ---------------------------------------------------------------------------
// Service Accent Color Map
// ---------------------------------------------------------------------------

export const accentColorMap = {
  blue: {
    text: "text-blue-500",
    bg: "bg-blue-500",
    bgSubtle: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
    hex: "#3b82f6",
  },
  green: {
    text: "text-green-500",
    bg: "bg-green-500",
    bgSubtle: "bg-green-500/10",
    border: "border-green-500/20",
    glow: "shadow-green-500/20",
    hex: "#22c55e",
  },
  orange: {
    text: "text-orange-500",
    bg: "bg-orange-500",
    bgSubtle: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "shadow-orange-500/20",
    hex: "#f97316",
  },
} as const;

// ---------------------------------------------------------------------------
// Motion Presets (for use with Motion library)
// ---------------------------------------------------------------------------

export const motion = {
  duration: {
    fast: 0.2,
    base: 0.3,
    slow: 0.5,
    slower: 0.8,
  },
  ease: {
    outExpo: [0.19, 1, 0.22, 1] as const,
    inOutExpo: [0.87, 0, 0.13, 1] as const,
  },
  /** Stagger children by this delay (seconds) */
  stagger: 0.08,
} as const;

// ---------------------------------------------------------------------------
// Section Padding (consistent spacing across all page sections)
// ---------------------------------------------------------------------------

export const sectionPadding = "py-24 md:py-32 lg:py-40" as const;
export const containerWidth = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" as const;
