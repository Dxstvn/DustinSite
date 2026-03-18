/* =============================================================
   AnnPale Demo -- Mock Data & Types

   Replaces:
   - useTranslations() from next-intl
   - FeaturedCreator type from Supabase actions
   - Server actions (setCTAPrefill, setAuthReturnPath)
   ============================================================= */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FeaturedCreator {
  id: string
  name: string
  category: string
  price: number
  verified: boolean
  avatar: string
  coverImage: string
}

// ---------------------------------------------------------------------------
// Featured Creators (static demo data)
// ---------------------------------------------------------------------------

export const MOCK_CREATORS: FeaturedCreator[] = [
  {
    id: 'wyclef-jean',
    name: 'Wyclef Jean',
    category: 'Mizik',
    price: 75,
    verified: true,
    avatar: '/demo/annpale/creators/wyclef-jean.jpg',
    coverImage: '/demo/annpale/creators/wyclef-jean.jpg',
  },
  {
    id: 'carel-pedre',
    name: 'Carel Pedre',
    category: 'Medya',
    price: 120,
    verified: true,
    avatar: '/demo/annpale/creators/carel-pedre.jpg',
    coverImage: '/demo/annpale/creators/carel-pedre-banner.jpg',
  },
  {
    id: 'tijo-zenny',
    name: 'Tijo Zenny',
    category: 'Komedi',
    price: 60,
    verified: true,
    avatar: '/demo/annpale/creators/tijo-zenny.jpg',
    coverImage: '/demo/annpale/creators/tijo-zenny-banner.jpg',
  },
  {
    id: 'richard-cave',
    name: 'Richard Cave',
    category: 'Mizik',
    price: 50,
    verified: true,
    avatar: '/demo/annpale/creators/richard-cave.jpg',
    coverImage: '/demo/annpale/creators/richard-cave-banner.jpg',
  },
  {
    id: 'rutshelle-guillaume',
    name: 'Rutshelle Guillaume',
    category: 'Mizik',
    price: 45,
    verified: true,
    avatar: '/demo/annpale/creators/rutshelle-guillaume.jpg',
    coverImage: '/demo/annpale/creators/rutshelle-guillaume.jpg',
  },
  {
    id: 'j-perry',
    name: 'J Perry',
    category: 'Mizik',
    price: 55,
    verified: true,
    avatar: '/demo/annpale/creators/j-perry-profile.jpg',
    coverImage: '/demo/annpale/creators/j-perry-cover.jpg',
  },
]

// ---------------------------------------------------------------------------
// Static placeholder creators (for gradient-only cards)
// ---------------------------------------------------------------------------

export const STATIC_CREATORS = [
  {
    name: 'Wyclef Jean',
    category: 'Mizik',
    price: '$75',
    verified: true,
    avatar: '/demo/annpale/creators/wyclef-jean.jpg',
    imagePlaceholder: 'from-purple-200 to-blue-100',
  },
  {
    name: 'Carel Pedre',
    category: 'Medya',
    price: '$120',
    verified: true,
    avatar: '/demo/annpale/creators/carel-pedre.jpg',
    imagePlaceholder: 'from-pink-100 to-purple-100',
  },
  {
    name: 'DJ K9',
    category: 'Mizik',
    price: '$60',
    verified: true,
    avatar: '/demo/annpale/creators/dj-k9-profile.jpg',
    imagePlaceholder: 'from-blue-50 to-purple-100',
  },
  {
    name: 'Richard Cave',
    category: 'Mizik',
    price: '$50',
    verified: true,
    avatar: '/demo/annpale/creators/richard-cave.jpg',
    imagePlaceholder: 'from-purple-100 to-pink-50',
  },
  {
    name: 'Rutshelle Guillaume',
    category: 'Mizik',
    price: '$45',
    verified: true,
    avatar: '/demo/annpale/creators/rutshelle-guillaume.jpg',
    imagePlaceholder: 'from-pink-50 to-purple-50',
  },
  {
    name: 'J Perry',
    category: 'Mizik',
    price: '$55',
    verified: true,
    avatar: '/demo/annpale/creators/j-perry-profile.jpg',
    imagePlaceholder: 'from-purple-50 to-pink-100',
  },
  {
    name: 'Tijo Zenny',
    category: 'Komedi',
    price: '$35',
    verified: true,
    avatar: '/demo/annpale/creators/tijo-zenny.jpg',
    imagePlaceholder: 'from-blue-100 to-pink-50',
  },
  {
    name: 'DJ Bullet',
    category: 'Mizik',
    price: '$40',
    verified: true,
    avatar: '/demo/annpale/creators/dj-bullet-profile.jpg',
    imagePlaceholder: 'from-purple-100 to-purple-50',
  },
] as const

// ---------------------------------------------------------------------------
// English translations (replaces next-intl useTranslations)
// ---------------------------------------------------------------------------

export const translations = {
  homepage: {
    overlines: {
      phrase1: 'The First Haitian Celebrity Video Platform',
      phrase2: 'Personalized Videos from Your Favorite Stars',
      phrase3: 'Connect with Haitian Culture',
      phrase4: 'Made in Haiti, For the World',
    },
    hero: {
      headline: 'Personal Videos from Haitian Celebrities',
      accentWord: 'Celebrities',
      subtitle: 'Yon mesaj psonalizis pou ou.',
      description:
        'Book personalized video messages from Haiti\'s most beloved entertainers, athletes, and public figures.',
      worldCupPrefix: 'Haiti is going to the',
      worldCupHighlight: 'World Cup 2026',
      worldCupSuffix: '-- celebrate with a personalized video!',
      primaryCTA: 'Find a Creator',
      secondaryCTA: 'How It Works',
      trustJoin: 'Join',
      trustFans: '& 12,000 fans',
      trustRating: '4.9 from 2,000+ reviews',
    },
    creators: {
      heading: 'Discover Your Favorite Creators',
      overline: 'Featured Creators',
      featured: 'Featured',
      startingAt: 'Starting at',
      seeAll: 'See all creators',
      scrollLeft: 'Scroll left',
      scrollRight: 'Scroll right',
      endorsement: 'and other top creators are on',
      teamName: 'Ann Pale',
      categories: {
        all: 'All',
        music: 'Mizik',
        comedy: 'Komedi',
        sports: 'Esp\u00f2',
        acting: 'Akt\u00e8',
        politics: 'Politik',
      },
    },
    steps: {
      step1Action: 'Browse Creators',
      step1Desc: 'Explore our collection of Haitian celebrities and find the perfect creator for your occasion.',
      step2Action: 'Write Your Story',
      step2Desc: 'Tell your creator what makes this video special. Share the occasion and any personal details.',
      step3Action: 'Receive Your Video',
      step3Desc: 'Your creator records a personalized video within 7 days. Download, share, and enjoy the reaction!',
    },
    testimonials: {
      heading: 'Real Stories, Real Connections',
      overline: 'Testimonials',
      quote1: '"The video Wyclef made for my mom\'s birthday brought her to tears. She couldn\'t believe it was really him."',
      quote2: '"I surprised my wife with a video from Rutshelle. She watches it every week. Best gift ever."',
      quote3: '"Carel recorded a message for my son who dreams of being on radio. It changed his whole perspective."',
    },
    cta: {
      headline: 'Ready to Create Something Special?',
      subheadline: 'Sign up and send your first personalized video request today.',
      firstNamePlaceholder: 'First name',
      lastNamePlaceholder: 'Last name',
      emailPlaceholder: 'Email address',
      submitButton: 'Get Started',
      submittingButton: 'Processing...',
      noSpam: 'No spam. Cancel anytime.',
      sectionAriaLabel: 'Sign up section',
      ariaLabel: 'Sign up form',
    },
  },
} as const

/** Simple translation lookup. */
export function t(key: string, params?: Record<string, string | number>): string {
  const parts = key.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations
  for (const part of parts) {
    value = value?.[part]
  }
  if (typeof value !== 'string') return key
  if (params) {
    let result = value
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(`{${k}}`, String(v))
    }
    return result
  }
  return value
}

// ---------------------------------------------------------------------------
// No-op server actions
// ---------------------------------------------------------------------------

export async function setCTAPrefill(_data: { firstName: string; lastName: string; email: string }): Promise<void> {
  // No-op in demo
}

export async function setAuthReturnPath(_path: string): Promise<void> {
  // No-op in demo
}
