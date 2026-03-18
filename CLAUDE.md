# Jaspire — Premium Media Agency

## Project Overview
Jaspire (jaspire.co) is a premium media agency offering web development, SEO, and social media management. This repo contains the agency website, deployed on Vercel via the `v0-jaspire-v4` project. Every push to `main` auto-deploys to jaspire.co.

## Required Workflow
- **Always invoke `/frontend-design` skill at the start of each conversation** when working on UI/design
- Use `frontend-design-architect` agents for systematic multi-section/multi-page buildout
- Use `/frontend-design` skill for individual creative sections (hero, CTA, key visuals)

## Tech Stack
- **Next.js 16** (App Router) + TypeScript
- **pnpm** — always use pnpm, never npm or yarn
- **Tailwind CSS 4** — config via `@theme` in CSS, no `tailwind.config.js`
- **Motion** (formerly framer-motion) — import from `motion/react`
- **shadcn/ui** — base component library
- **21st.dev components** — downloaded as source, normalized to match our design system
- **Vercel** — hosting + analytics

## Design Direction

### Aesthetic
Light theme with dark zones (hero, CTA, footer). Warm cream (#f5f3f0) base. Motion-heavy, premium agency feel. Dark zones use `data-theme="dark" className="dark"` for CSS var scoping.

### Primary Inspiration: Analogue Agency (analogueagency.com)
- Full-viewport WebGL/animated hero with scroll-driven text animations
- Floating glassmorphism pill navbar that adapts (glass on dark, dark solid on light)
- Hero zoom-out scroll transition (dark hero shrinks into contained card on light background)
- Work-as-proof: services shown through actual project mockups, not abstract icons
- Immersive portfolio cards with branded pill overlays
- Expertise page: massive bold typography filling viewport, then 4-column capability lists
- Left sidebar scroll progress indicator (label + dot tracking position)

### Secondary Inspiration: COLLINS (wearecollins.com)
- Confident single-statement hero copy ("Rewrite your worth.")
- Immediate social proof (award badges below hero)
- Case studies: dark background, horizontal scrolling card carousel, "Shelf"/"Spines" view toggle

### Tertiary Inspiration: Pentagram (pentagram.com)
- Full-bleed hero carousel with massive typography overlaid on project images
- Interactive inline dropdowns in hero text
- Work-first philosophy: let visual output speak

### Key Design Patterns
1. Hero scroll storytelling — text animates/reveals on scroll
2. Floating pill navbar — glassmorphism on dark, solid on light
3. Work-as-proof — show services through project mockups
4. Confident copy — bold, declarative headlines
5. Social proof badges — immediately below hero
6. Immersive portfolio cards — full-bleed images with pill overlays
7. Dark-to-light transitions — hero dark, content sections can alternate

## Design System

### Colors (Light Theme)
- Background: `#f5f3f0` (warm cream), Surface: `#ffffff`, `#f0ede8`
- Brand: `#7c6bf0` (electric purple)
- Text: `#1a1a1a` primary, `#525252` secondary, `#8a8a8a` tertiary
- Borders: `#d4d0c8`
- Accents: Blue (Web Dev), Green (SEO), Orange (Social Media)
- Dark zones override all vars via `[data-theme="dark"]` in CSS

### Typography
- Display: Cabinet Grotesk | Body: Satoshi | Mono: JetBrains Mono

### Motion
- Enter: fade up y:20→0, opacity:0→1, 0.5-0.8s
- Micro-interactions: 0.2-0.3s
- Scroll-triggered via `whileInView`, stagger 0.1s

## 21st.dev Components (bookmarked for integration)
All components are copied as source code and normalized to match our design system:
- `Spline Scene` (serafim/splite) — hero 3D
- `Gooey Text Morphing` (victorwelander) — text animation
- `CardStack` (ruixenui) — stacked cards
- `Feature Section` (ayushmxxn) — services grid
- `Direction Aware Hover` (aceternity) — hover effects
- `Sticky Scroll` (ui-layouts) — scroll reveal
- `Shuffle Number` / `Number Flow` — animated counters
- `Glassmorphism Portfolio` (reapollo) — portfolio section
- `Feature Carousel` (0xUrvish) — case study carousel
- `Bottom Menu` (0xUrvish) — floating nav
- `Link Hover` (Shatlyk1011) — nav link effects
- `Evervault Card` (aceternity) — encrypted card effect
- `Floating Panel` (cult-ui) — contact panel

## Project Structure
```
src/
├── app/           (pages: home, services/*, portfolio/*, about, contact)
├── components/
│   ├── ui/        (shadcn + 21st.dev primitives)
│   ├── layout/    (navbar, footer, mobile-nav)
│   ├── sections/  (hero, services, portfolio, stats, process, testimonials, cta)
│   └── shared/    (section-heading, animated-counter, scroll-reveal)
├── lib/           (utils, constants, fonts, metadata)
├── hooks/         (use-scroll-progress, use-intersection, use-media-query)
└── types/
```

## Vercel Config
- Project: `v0-jaspire-v4` (prj_nXgb81QLieb8lZyKRwzmEWTknAbw)
- Team: `team_4p9AyHR44HPeCcjVTxRs5czr`
- Domain: jaspire.co
