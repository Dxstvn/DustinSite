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
  tagline: string;
  description: string;
  accent: "blue" | "green" | "orange";
  href: string;
}

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    tagline: "From Concept to Code. Built to Scale.",
    description:
      "Custom websites, web apps, and e-commerce solutions built with modern technologies for performance and scale.",
    accent: "blue",
    href: "/services#web-development",
  },
  {
    id: "seo",
    title: "SEO",
    tagline: "Be Found. Be First. Be Unforgettable.",
    description:
      "Technical SEO, content strategy, and analytics to drive organic growth and dominate search rankings.",
    accent: "green",
    href: "/services#seo",
  },
  {
    id: "social-media",
    title: "Social Media",
    tagline: "Build Communities. Drive Conversations.",
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

// ---------------------------------------------------------------------------
// Portfolio Projects (with demo data for interactive previews)
// ---------------------------------------------------------------------------

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  metric: string;
  imageSrc: string;
  accent: string;
  domain: string;
  demoUrl: string;
  liveUrl?: string;
  techStack: string[];
  description: string;
  iconSrc: string;
  imagePosition?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "skinproduct",
    title: "Skintuary+ Studio",
    category: "Web Development",
    metric: "3x more leads",
    imageSrc: "/images/portfolio/skinproduct-preview.jpg",
    accent: "#8B6F47",
    domain: "skintuarystudio.com",
    demoUrl: "/demo/skinproduct",
    techStack: ["Next.js", "Tailwind", "Stripe", "Motion"],
    description: "Luxury skincare e-commerce",
    iconSrc: "/images/portfolio/icons/skinproduct.svg",
  },
  {
    id: "haiti-kalshi",
    title: "Parye.com",
    category: "Full Stack Platform",
    metric: "2,340+ active users",
    imageSrc: "/images/portfolio/haiti-kalshi-preview.jpg",
    accent: "#134E4A",
    domain: "parye.com",
    demoUrl: "/demo/haiti-kalshi",
    techStack: ["Next.js", "Supabase", "React Query", "Tailwind"],
    description: "Haiti's first prediction market",
    iconSrc: "/images/portfolio/icons/haiti-kalshi.svg",
  },
  {
    id: "annpale",
    title: "AnnPale",
    category: "Video Platform",
    metric: "50K+ monthly viewers",
    imageSrc: "/images/portfolio/annpale-preview.jpg",
    accent: "#A855F7",
    domain: "annpale.com",
    demoUrl: "/demo/annpale",
    liveUrl: "https://annpale.com",
    techStack: ["Next.js", "Supabase", "AWS", "Stripe"],
    description: "Haitian video content platform",
    iconSrc: "/images/portfolio/icons/annpale.svg",
  },
  {
    id: "tinuskincare",
    title: "TINU Skincare",
    category: "Web Design",
    metric: "280% organic growth",
    imageSrc: "/images/portfolio/tinuskincare-preview.jpg",
    accent: "#A08060",
    domain: "tinuskincare.com",
    demoUrl: "/demo/tinuskincare",
    liveUrl: "https://tinuskincare.com",
    techStack: ["Squarespace", "Custom CSS", "E-commerce"],
    description: "Premium skincare brand site",
    iconSrc: "/images/portfolio/icons/tinuskincare.svg",
    imagePosition: "top",
  },
  {
    id: "safeharbor",
    title: "Safe Harbor Mission",
    category: "Non-Profit",
    metric: "500+ lives impacted",
    imageSrc: "/images/portfolio/safeharbor-preview.jpg",
    accent: "#5b9ba8",
    domain: "joinsafeharbor.org",
    demoUrl: "/demo/safeharbor",
    liveUrl: "https://joinsafeharbor.org",
    techStack: ["Squarespace", "Custom Design", "Donations"],
    description: "Faith-based mission org",
    iconSrc: "/images/portfolio/icons/safeharbor.svg",
  },
];
