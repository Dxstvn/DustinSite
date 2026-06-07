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
  /** What's included — surfaced on the /services detail sections. */
  capabilities: string[];
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
    capabilities: [
      "Custom websites & web applications",
      "E-commerce & secure payments",
      "Performance & Core Web Vitals tuning",
      "Headless CMS & API integrations",
      "Accessible, SEO-ready builds",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    tagline: "Be Found. Be First. Be Unforgettable.",
    description:
      "Technical SEO, content strategy, and analytics to drive organic growth and dominate search rankings.",
    accent: "green",
    href: "/services#seo",
    capabilities: [
      "Technical SEO audits & fixes",
      "Keyword & competitor research",
      "Content strategy & optimization",
      "On-page & local SEO",
      "Analytics, tracking & reporting",
    ],
  },
  {
    id: "social-media",
    title: "Social Media",
    tagline: "Build Communities. Drive Conversations.",
    description:
      "Content creation, community management, and paid advertising campaigns that build loyal audiences.",
    accent: "orange",
    href: "/services#social-media",
    capabilities: [
      "Content creation & art direction",
      "Community management",
      "Paid social campaigns",
      "Channel & content strategy",
      "Audience growth & reporting",
    ],
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
    ring: "ring-blue-500/30",
    glow: "shadow-blue-500/20",
    hex: "#3b82f6",
  },
  green: {
    text: "text-green-500",
    bg: "bg-green-500",
    bgSubtle: "bg-green-500/10",
    border: "border-green-500/20",
    ring: "ring-green-500/30",
    glow: "shadow-green-500/20",
    hex: "#22c55e",
  },
  orange: {
    text: "text-orange-500",
    bg: "bg-orange-500",
    bgSubtle: "bg-orange-500/10",
    border: "border-orange-500/20",
    ring: "ring-orange-500/30",
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
  // Extended fields for Work page & case studies
  slug?: string;
  year?: string;
  services?: string[];
  heroImageSrc?: string;
  challenge?: string;
  approach?: string;
  results?: { metric: string; value: string }[];
  galleryImages?: string[];
  testimonial?: { quote: string; author: string; role: string };
}

export const portfolioProjects: PortfolioProject[] = [
  // ---- Existing projects (featured on homepage) ----
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
    slug: "skintuary-studio",
    year: "2025",
    services: ["Web Development", "E-commerce"],
    challenge:
      "Skintuary+ needed a luxury online presence that matched their premium skincare products. Their existing site wasn't converting visitors into customers, and the brand identity didn't reflect the quality of their formulations.",
    approach:
      "We designed and built a high-conversion e-commerce experience with rich product storytelling, smooth animations, and seamless Stripe checkout. Every interaction was crafted to reinforce the brand's premium positioning.",
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
    imagePosition: "top",
    slug: "parye",
    year: "2025",
    services: ["Web Application", "Full Stack Platform"],
    challenge:
      "Haiti lacked any digital prediction market. We needed to build a real-time platform from scratch that could handle concurrent users, live odds updates, and secure wallet transactions — all in Haitian Creole.",
    approach:
      "We built a full-stack prediction market with Supabase real-time subscriptions for live odds, parimutuel betting mechanics, and a custom wallet system with MonCash integration. The UI was designed for mobile-first Haitian users.",
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
    slug: "annpale",
    year: "2025",
    services: ["Web Application", "Video Platform"],
    challenge:
      "Haitian content creators had no dedicated platform. YouTube and social media didn't serve the community's unique needs for Creole-language content discovery, creator monetization, and cultural preservation.",
    approach:
      "We created a purpose-built video platform with AWS-powered streaming, Stripe creator payouts, and a content discovery engine optimized for Haitian Creole content. The platform includes a mobile app via React Native.",
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
    slug: "tinu-skincare",
    year: "2024",
    services: ["Web Design", "SEO"],
    challenge:
      "TINU Skincare had a growing social media following but no web presence to convert followers into customers. They needed a site that matched their brand's warm, natural aesthetic while driving organic search traffic.",
    approach:
      "We designed a Squarespace site with custom CSS that captured TINU's brand essence — warm earth tones, clean typography, and product photography. Combined with SEO optimization, we achieved 280% organic growth in 6 months.",
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
    slug: "safe-harbor",
    year: "2024",
    services: ["Web Design", "Non-Profit"],
    challenge:
      "Safe Harbor Mission needed a digital home that communicated their faith-based mission clearly while making it easy for supporters to donate and learn about their impact in the community.",
    approach:
      "We built a compassionate, accessible website with clear calls-to-action for donations, volunteer sign-ups, and impact stories. The design balances warmth and professionalism to build trust with potential supporters.",
  },

  // ---- New projects (from local directories) ----
  {
    id: "haiti-president",
    title: "Sant Apèl Prezidansyèl",
    category: "Campaign Tech",
    metric: "9 dashboard modules",
    imageSrc: "/images/portfolio/haiti-president-preview.jpg",
    accent: "#0D47A1",
    domain: "santapel.ht",
    demoUrl: "/demo/haiti-president",
    techStack: ["Next.js 16", "Tailwind v4", "Recharts", "D3-Geo", "Zustand"],
    description: "Presidential campaign call center dashboard",
    iconSrc: "/images/portfolio/icons/haiti-president.svg",
    slug: "sant-apel",
    year: "2026",
    services: ["Web Application", "Data Analytics"],
    challenge:
      "A Haitian presidential candidate needed a modern call center platform to manage phone campaigns at scale — tracking voter sentiment, agent performance, and geographic coverage across Haiti's departments. No existing tool served the Haitian political context.",
    approach:
      "We built a comprehensive dark-themed 'war room' dashboard with real-time call analytics, an interactive D3-Geo map of Haiti, voter sentiment tracking, campaign management, and agent leaderboards. The entire UI is in Haitian Creole with 10+ Recharts visualizations.",
  },
  {
    id: "haiti-lottery",
    title: "LEH Lotri Ayiti",
    category: "Digital Platform",
    metric: "2M digital tickets",
    imageSrc: "/images/portfolio/haiti-lottery-preview.jpg",
    accent: "#D4AF37",
    domain: "leh.ht",
    demoUrl: "/demo/haiti-lottery",
    techStack: ["Next.js 16", "Tailwind v4", "GSAP", "Supabase", "MonCash"],
    description: "Haiti's digitized national lottery",
    iconSrc: "/images/portfolio/icons/haiti-lottery.svg",
    slug: "leh-lotri",
    year: "2026",
    services: ["Web Application", "E-commerce"],
    challenge:
      "Haiti's national lottery needed to transition from paper-only ticket sales to a digital platform — serving 2 million digital tickets across two series while preventing duplication with 1 million existing physical tickets. The platform needed MonCash mobile payment integration and multi-language support.",
    approach:
      "We designed the 'Ayiti Grandeur' experience — a premium digital lottery with animated rotating digit drum number pickers, real-time Supabase ticket availability, MonCash checkout, and GSAP-powered cinematic draw reveals. The Drapo pattern system honors Haitian Vodou flag artistry. Supports Creole, French, and English.",
  },
  {
    id: "tutor-site",
    title: "Colibri",
    category: "EdTech Platform",
    metric: "53 interactive lessons",
    imageSrc: "/images/portfolio/colibri-preview.jpg",
    accent: "#22c55e",
    domain: "colibri.ht",
    demoUrl: "/demo/tutor-site",
    techStack: ["Next.js 16", "Tailwind v4", "MediaPipe", "Azure Speech", "Supabase"],
    description: "AI-powered French literacy platform",
    iconSrc: "/images/portfolio/icons/colibri.svg",
    slug: "colibri",
    year: "2025",
    services: ["Web Application", "EdTech"],
    challenge:
      "A 20-year-tested French phonics method (Méthode Colibri) needed to be digitized for children ages 5-6. The platform required real-time hand gesture recognition, pronunciation assessment, and text-to-speech — all while maintaining COPPA/GDPR compliance and working offline.",
    approach:
      "We built a tablet-first PWA with MediaPipe gesture recognition for 36+ Borel-Maisonny hand signs, Azure Speech pronunciation scoring, and Google Cloud TTS with Piper WASM offline fallback. 53 interactive lessons across 7 phases, dual script display (print + cursive), and dual payment systems (Stripe + MonCash).",
  },
  {
    id: "clearhold",
    title: "ClearHold",
    category: "Web3 / FinTech",
    metric: "Multi-chain escrow",
    imageSrc: "/images/portfolio/clearhold-preview.jpg",
    accent: "#1A3C34",
    domain: "clearhold.app",
    demoUrl: "/demo/clearhold",
    techStack: ["Next.js", "Ethers.js", "Hardhat", "Firebase", "LayerZero"],
    description: "Blockchain real estate escrow platform",
    iconSrc: "/images/portfolio/icons/clearhold.svg",
    slug: "clearhold",
    year: "2025",
    services: ["Web Application", "Blockchain"],
    challenge:
      "Real estate escrow transactions are slow, opaque, and expensive. Buyers and sellers need a trustless platform where smart contracts enforce conditions automatically — with multi-chain support and real-time status tracking.",
    approach:
      "We built a full-stack escrow platform with Ethereum smart contracts, multi-wallet support (MetaMask, Coinbase), cross-chain LayerZero bridging, and real-time Firestore synchronization. Features include KYC verification via SumSub, automated dispute resolution with 48-hour windows, and a premium teal/gold fintech aesthetic.",
  },
  {
    id: "bergen-mind",
    title: "Bergen Mind & Wellness",
    category: "Healthcare",
    metric: "5 clinical screenings",
    imageSrc: "/images/portfolio/bergen-mind-preview.jpg",
    accent: "#14b8a6",
    domain: "bergenmindwellness.com",
    demoUrl: "/demo/bergen-mind",
    techStack: ["Next.js 16", "Tailwind v4", "Supabase", "FullCalendar", "i18next"],
    description: "Bilingual mental health platform",
    iconSrc: "/images/portfolio/icons/bergen-mind.svg",
    slug: "bergen-mind",
    year: "2025",
    services: ["Web Development", "Healthcare"],
    challenge:
      "A Bergen County mental health practice needed a modern, bilingual (English/Spanish) platform with validated clinical screening tools, online booking, and full WCAG 2.1 AA accessibility — serving a diverse patient population.",
    approach:
      "We built a calming, accessibility-first platform with 5 validated clinical assessments (PHQ-9, GAD-7, ASRS, MDQ, PCL-5), FullCalendar appointment booking with Zocdoc/Google Calendar integration, and automatic locale detection for seamless bilingual navigation.",
  },
  {
    id: "proplend",
    title: "PropLend",
    category: "Web3 / DeFi",
    metric: "4 smart contracts",
    imageSrc: "/images/portfolio/proplend-preview.jpg",
    accent: "#0A2540",
    domain: "proplend.io",
    demoUrl: "/demo/proplend",
    techStack: ["Next.js 16", "Tailwind v4", "wagmi", "Hardhat", "Three.js", "D3.js"],
    description: "Tokenized real estate lending",
    iconSrc: "/images/portfolio/icons/proplend.svg",
    slug: "proplend",
    year: "2026",
    services: ["Web Application", "Blockchain"],
    challenge:
      "Real estate investment is traditionally illiquid and requires high capital minimums. We needed to tokenize property investments into tradeable tranches — enabling fractional ownership with automated waterfall distributions via smart contracts.",
    approach:
      "We deployed 4 Solidity smart contracts on Polygon Amoy: PropertyFactory, TrancheTokens (ERC-20), SecondaryMarket, and MockUSDC. The frontend features Three.js 3D visuals, D3.js analytics, RainbowKit wallet auth (SIWE), and an 80/20 senior/junior tranche system with real-time portfolio dashboards.",
  },
];

// ---------------------------------------------------------------------------
// Portfolio disciplines — curated taxonomy for the /portfolio index filter rail
// and the hero tally. The raw `category` field is near-unique (10 values) and
// `services[0]` collapses to only 3 buckets, so we group the 11 projects into
// 5 honest disciplines. Both the filter and the "N Disciplines" tally read from
// here so the count is always accurate.
// ---------------------------------------------------------------------------
export const portfolioDisciplines = [
  "Web Applications",
  "E-commerce",
  "Web3 & Blockchain",
  "Brand & Web Design",
  "EdTech & Healthcare",
] as const;

export type PortfolioDiscipline = (typeof portfolioDisciplines)[number];

export const disciplineByProjectId: Record<string, PortfolioDiscipline> = {
  skinproduct: "E-commerce",
  "haiti-kalshi": "Web Applications",
  annpale: "Web Applications",
  tinuskincare: "Brand & Web Design",
  safeharbor: "Brand & Web Design",
  "haiti-president": "Web Applications",
  "haiti-lottery": "E-commerce",
  "tutor-site": "EdTech & Healthcare",
  clearhold: "Web3 & Blockchain",
  "bergen-mind": "EdTech & Healthcare",
  proplend: "Web3 & Blockchain",
};

export function getProjectDiscipline(
  project: PortfolioProject
): PortfolioDiscipline {
  return disciplineByProjectId[project.id] ?? "Web Applications";
}
