"use client"

/**
 * SVG illustrations for the How It Works modal.
 * Each illustration uses the Ann Pale brand gradient:
 *   Blue (#0038A8) -> Purple (#9333EA) -> Pink (#EC4899)
 * with cultural warmth and premium visual weight.
 */

function IllustrationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-full px-6">
      {children}
    </div>
  )
}

/**
 * Step 1: Browse Creators
 * A magnifying glass sweeping over creator profile cards,
 * with stars and sparkle accents evoking discovery and excitement.
 */
export function BrowseCreatorsIllustration() {
  return (
    <IllustrationWrapper>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 260, height: 'auto' }}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brandGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0038A8" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F3E8FF" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </linearGradient>
          <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EDE9FE" />
            <stop offset="100%" stopColor="#FDF2F8" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <clipPath id="card1Clip">
            <rect x="22" y="38" width="56" height="74" rx="10" />
          </clipPath>
          <clipPath id="card2Clip">
            <rect x="72" y="30" width="56" height="74" rx="10" />
          </clipPath>
          <clipPath id="card3Clip">
            <rect x="122" y="42" width="56" height="74" rx="10" />
          </clipPath>
          <filter id="softShadow1">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#9333EA" floodOpacity="0.18" />
          </filter>
          <filter id="glowPink">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#EC4899" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Subtle background orb */}
        <circle cx="100" cy="80" r="60" fill="url(#brandGrad1)" opacity="0.06" />

        {/* Creator Card 1 (left, slightly behind) */}
        <g filter="url(#softShadow1)" opacity="0.7">
          <rect x="22" y="38" width="56" height="74" rx="10" fill="white" stroke="#E9D5FF" strokeWidth="1" />
          <g clipPath="url(#card1Clip)">
            <rect x="22" y="38" width="56" height="32" fill="url(#cardGrad1)" />
            <circle cx="50" cy="52" r="10" fill="#C084FC" opacity="0.6" />
            <ellipse cx="50" cy="72" rx="14" ry="8" fill="#C084FC" opacity="0.3" />
          </g>
          <rect x="32" y="82" width="36" height="4" rx="2" fill="#DDD6FE" />
          <rect x="36" y="90" width="28" height="3" rx="1.5" fill="#EDE9FE" />
          <g transform="translate(34, 98)">
            <polygon points="4,0 5.2,3 8,3.4 6,5.2 6.4,8 4,6.6 1.6,8 2,5.2 0,3.4 2.8,3" fill="#F59E0B" opacity="0.7" />
            <polygon points="14,0 15.2,3 18,3.4 16,5.2 16.4,8 14,6.6 11.6,8 12,5.2 10,3.4 12.8,3" fill="#F59E0B" opacity="0.7" />
            <polygon points="24,0 25.2,3 28,3.4 26,5.2 26.4,8 24,6.6 21.6,8 22,5.2 20,3.4 22.8,3" fill="#F59E0B" opacity="0.4" />
          </g>
        </g>

        {/* Creator Card 2 (center, prominent) */}
        <g filter="url(#softShadow1)">
          <rect x="72" y="30" width="56" height="74" rx="10" fill="white" stroke="#D8B4FE" strokeWidth="1.5" />
          <g clipPath="url(#card2Clip)">
            <rect x="72" y="30" width="56" height="32" fill="url(#brandGrad1)" opacity="0.15" />
            <circle cx="100" cy="44" r="10" fill="#9333EA" opacity="0.5" />
            <ellipse cx="100" cy="64" rx="14" ry="8" fill="#9333EA" opacity="0.25" />
          </g>
          <rect x="82" y="74" width="36" height="4" rx="2" fill="#C084FC" />
          <rect x="86" y="82" width="28" height="3" rx="1.5" fill="#DDD6FE" />
          <g transform="translate(82, 90)">
            <polygon points="4,0 5.2,3 8,3.4 6,5.2 6.4,8 4,6.6 1.6,8 2,5.2 0,3.4 2.8,3" fill="#F59E0B" />
            <polygon points="14,0 15.2,3 18,3.4 16,5.2 16.4,8 14,6.6 11.6,8 12,5.2 10,3.4 12.8,3" fill="#F59E0B" />
            <polygon points="24,0 25.2,3 28,3.4 26,5.2 26.4,8 24,6.6 21.6,8 22,5.2 20,3.4 22.8,3" fill="#F59E0B" />
          </g>
          <circle cx="120" cy="36" r="7" fill="url(#brandGrad1)" />
          <path d="M117 36l2.5 2.5L123 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Creator Card 3 (right, slightly behind) */}
        <g filter="url(#softShadow1)" opacity="0.7">
          <rect x="122" y="42" width="56" height="74" rx="10" fill="white" stroke="#F9A8D4" strokeWidth="1" />
          <g clipPath="url(#card3Clip)">
            <rect x="122" y="42" width="56" height="32" fill="url(#cardGrad2)" />
            <circle cx="150" cy="56" r="10" fill="#EC4899" opacity="0.5" />
            <ellipse cx="150" cy="76" rx="14" ry="8" fill="#EC4899" opacity="0.25" />
          </g>
          <rect x="132" y="86" width="36" height="4" rx="2" fill="#F9A8D4" />
          <rect x="136" y="94" width="28" height="3" rx="1.5" fill="#FCE7F3" />
          <g transform="translate(134, 102)">
            <polygon points="4,0 5.2,3 8,3.4 6,5.2 6.4,8 4,6.6 1.6,8 2,5.2 0,3.4 2.8,3" fill="#F59E0B" opacity="0.7" />
            <polygon points="14,0 15.2,3 18,3.4 16,5.2 16.4,8 14,6.6 11.6,8 12,5.2 10,3.4 12.8,3" fill="#F59E0B" opacity="0.7" />
          </g>
        </g>

        {/* Magnifying glass */}
        <g filter="url(#glowPink)" transform="translate(130, 4)">
          <circle cx="22" cy="22" r="18" fill="white" fillOpacity="0.9" stroke="url(#glassGrad)" strokeWidth="3" />
          <path d="M14 16 Q18 10 26 14" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          <line x1="36" y1="36" x2="48" y2="48" stroke="url(#glassGrad)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="22" cy="22" r="4" fill="url(#brandGrad1)" opacity="0.2" />
        </g>

        {/* Sparkle accents */}
        <g opacity="0.6">
          <path d="M18 20 L20 16 L22 20 L20 24Z" fill="#9333EA" opacity="0.5" />
          <path d="M90 140 L92 136 L94 140 L92 144Z" fill="#EC4899" opacity="0.4" />
          <circle cx="160" cy="130" r="2" fill="#C084FC" opacity="0.5" />
          <circle cx="40" cy="130" r="1.5" fill="#F9A8D4" opacity="0.5" />
          <circle cx="12" cy="70" r="1.5" fill="#0038A8" opacity="0.3" />
        </g>
      </svg>
    </IllustrationWrapper>
  )
}

/**
 * Step 2: Write Your Story
 * A message bubble with a pen/pencil, heart accents,
 * and text lines suggesting a heartfelt personal message.
 */
export function WriteMessageIllustration() {
  return (
    <IllustrationWrapper>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 260, height: 'auto' }}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brandGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0038A8" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#FDF2F8" />
          </linearGradient>
          <linearGradient id="penGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="bubbleShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#9333EA" floodOpacity="0.12" />
          </filter>
          <filter id="penGlow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#EC4899" floodOpacity="0.3" />
          </filter>
        </defs>

        <ellipse cx="100" cy="75" rx="70" ry="55" fill="url(#brandGrad2)" opacity="0.05" />

        <g filter="url(#bubbleShadow)">
          <path
            d="M30 28 C30 20 36 14 44 14 L156 14 C164 14 170 20 170 28 L170 98 C170 106 164 112 156 112 L80 112 L62 130 L62 112 L44 112 C36 112 30 106 30 98 Z"
            fill="white"
            stroke="#E9D5FF"
            strokeWidth="1.5"
          />
          <path
            d="M30 28 C30 20 36 14 44 14 L156 14 C164 14 170 20 170 28 L170 98 C170 106 164 112 156 112 L80 112 L62 130 L62 112 L44 112 C36 112 30 106 30 98 Z"
            fill="url(#bubbleGrad)"
            opacity="0.5"
          />
        </g>

        <rect x="50" y="32" width="80" height="5" rx="2.5" fill="#C084FC" opacity="0.5" />
        <rect x="50" y="44" width="100" height="5" rx="2.5" fill="#DDD6FE" opacity="0.6" />
        <rect x="50" y="56" width="90" height="5" rx="2.5" fill="#E9D5FF" opacity="0.5" />
        <rect x="50" y="68" width="60" height="5" rx="2.5" fill="#F9A8D4" opacity="0.4" />

        <path
          d="M124 68 C124 65 128 62 131 65 C134 62 138 65 138 68 C138 73 131 78 131 78 C131 78 124 73 124 68Z"
          fill="#EC4899"
          opacity="0.6"
        />

        <rect x="50" y="84" width="56" height="18" rx="9" fill="url(#brandGrad2)" opacity="0.12" />
        <rect x="50" y="84" width="56" height="18" rx="9" stroke="url(#brandGrad2)" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="62" cy="93" r="4" fill="#F59E0B" opacity="0.5" />
        <line x1="62" y1="89" x2="62" y2="86" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <rect x="70" y="91" width="28" height="3" rx="1.5" fill="#9333EA" opacity="0.35" />

        <g filter="url(#penGlow)" transform="translate(140, 90) rotate(-35)">
          <rect x="0" y="0" width="8" height="44" rx="2" fill="url(#penGrad)" />
          <polygon points="0,44 8,44 4,54" fill="#F59E0B" />
          <polygon points="2,48 6,48 4,54" fill="#1F2937" opacity="0.6" />
          <rect x="0" y="6" width="8" height="3" rx="1" fill="white" opacity="0.4" />
          <rect x="0" y="-4" width="8" height="6" rx="2" fill="#F9A8D4" />
        </g>

        <g opacity="0.3">
          <path d="M148 132 Q152 128 156 132" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M154 136 Q158 132 162 136" stroke="#EC4899" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>

        <g opacity="0.5">
          <path d="M26 40 L28 36 L30 40 L28 44Z" fill="#9333EA" opacity="0.4" />
          <path d="M172 30 L174 26 L176 30 L174 34Z" fill="#EC4899" opacity="0.4" />
          <circle cx="180" cy="80" r="2" fill="#C084FC" opacity="0.4" />
          <circle cx="20" cy="100" r="1.5" fill="#F9A8D4" opacity="0.4" />
        </g>
      </svg>
    </IllustrationWrapper>
  )
}

/**
 * Step 3: Receive Your Video
 * A video player frame with a large play button, gift ribbon accent,
 * and celebration particles suggesting the joy of receiving.
 */
export function ReceiveVideoIllustration() {
  return (
    <IllustrationWrapper>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 260, height: 'auto' }}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brandGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0038A8" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="playGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D21034" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="videoShadow">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#9333EA" floodOpacity="0.2" />
          </filter>
          <filter id="playGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#EC4899" floodOpacity="0.4" />
          </filter>
          <clipPath id="screenClip">
            <rect x="34" y="22" width="132" height="88" rx="8" />
          </clipPath>
        </defs>

        <circle cx="100" cy="70" r="65" fill="url(#brandGrad3)" opacity="0.05" />

        <g filter="url(#videoShadow)">
          <rect x="30" y="18" width="140" height="96" rx="12" fill="white" stroke="#E9D5FF" strokeWidth="1.5" />
          <rect x="34" y="22" width="132" height="88" rx="8" fill="url(#screenGrad)" />
          <g clipPath="url(#screenClip)">
            <ellipse cx="100" cy="90" rx="35" ry="20" fill="#7C3AED" opacity="0.3" />
            <circle cx="100" cy="52" r="16" fill="#8B5CF6" opacity="0.4" />
            <ellipse cx="100" cy="78" rx="22" ry="14" fill="#8B5CF6" opacity="0.3" />
            <g opacity="0.25">
              <rect x="40" y="98" width="3" height="8" rx="1.5" fill="#C084FC" />
              <rect x="47" y="94" width="3" height="12" rx="1.5" fill="#C084FC" />
              <rect x="54" y="96" width="3" height="10" rx="1.5" fill="#C084FC" />
              <rect x="61" y="92" width="3" height="14" rx="1.5" fill="#D8B4FE" />
              <rect x="68" y="95" width="3" height="11" rx="1.5" fill="#D8B4FE" />
              <rect x="75" y="93" width="3" height="13" rx="1.5" fill="#D8B4FE" />
              <rect x="82" y="97" width="3" height="9" rx="1.5" fill="#E9D5FF" />
              <rect x="118" y="97" width="3" height="9" rx="1.5" fill="#E9D5FF" />
              <rect x="125" y="93" width="3" height="13" rx="1.5" fill="#D8B4FE" />
              <rect x="132" y="95" width="3" height="11" rx="1.5" fill="#D8B4FE" />
              <rect x="139" y="92" width="3" height="14" rx="1.5" fill="#C084FC" />
              <rect x="146" y="96" width="3" height="10" rx="1.5" fill="#C084FC" />
              <rect x="153" y="94" width="3" height="12" rx="1.5" fill="#C084FC" />
              <rect x="160" y="98" width="3" height="8" rx="1.5" fill="#C084FC" />
            </g>
          </g>
        </g>

        <g filter="url(#playGlow)">
          <circle cx="100" cy="62" r="18" fill="url(#playGrad)" opacity="0.9" />
          <polygon points="94,52 94,72 112,62" fill="white" />
        </g>

        <g transform="translate(150, 14)">
          <rect x="4" y="0" width="10" height="24" fill="url(#ribbonGrad)" opacity="0.8" rx="1" />
          <rect x="-6" y="6" width="26" height="10" fill="url(#ribbonGrad)" opacity="0.8" rx="1" />
          <circle cx="9" cy="11" r="5" fill="#EC4899" />
          <circle cx="9" cy="11" r="3" fill="#D21034" opacity="0.6" />
          <ellipse cx="3" cy="7" rx="5" ry="3.5" fill="#EC4899" opacity="0.7" transform="rotate(-20, 3, 7)" />
          <ellipse cx="15" cy="7" rx="5" ry="3.5" fill="#EC4899" opacity="0.7" transform="rotate(20, 15, 7)" />
        </g>

        <g opacity="0.6">
          <rect x="18" y="30" width="6" height="3" rx="1" fill="#0038A8" opacity="0.5" transform="rotate(25, 21, 31)" />
          <rect x="175" y="45" width="5" height="3" rx="1" fill="#EC4899" opacity="0.5" transform="rotate(-15, 177, 46)" />
          <rect x="25" y="95" width="5" height="3" rx="1" fill="#9333EA" opacity="0.4" transform="rotate(40, 27, 96)" />
          <rect x="178" y="100" width="6" height="3" rx="1" fill="#D21034" opacity="0.4" transform="rotate(-30, 181, 101)" />
          <path d="M20 60 L22 56 L24 60 L22 64Z" fill="#F59E0B" opacity="0.5" />
          <path d="M182 70 L184 66 L186 70 L184 74Z" fill="#F59E0B" opacity="0.4" />
          <circle cx="15" cy="45" r="2" fill="#C084FC" opacity="0.4" />
          <circle cx="188" cy="30" r="2.5" fill="#F9A8D4" opacity="0.5" />
          <circle cx="30" cy="130" r="2" fill="#0038A8" opacity="0.3" />
          <circle cx="170" cy="128" r="1.5" fill="#EC4899" opacity="0.4" />
        </g>

        <g transform="translate(30, 118)">
          <rect x="0" y="0" width="44" height="22" rx="11" fill="url(#brandGrad3)" opacity="0.1" />
          <rect x="0" y="0" width="44" height="22" rx="11" stroke="url(#brandGrad3)" strokeWidth="1" fill="none" opacity="0.25" />
          <circle cx="14" cy="11" r="5" stroke="#9333EA" strokeWidth="1.2" fill="none" opacity="0.5" />
          <line x1="14" y1="8" x2="14" y2="11" stroke="#9333EA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          <line x1="14" y1="11" x2="16.5" y2="12" stroke="#9333EA" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          <rect x="23" y="9" width="14" height="3" rx="1.5" fill="#9333EA" opacity="0.35" />
        </g>

        <g transform="translate(128, 120)" opacity="0.4">
          <path d="M8 6 L14 0 L14 4 L20 4 L20 8 L14 8 L14 12 Z" fill="url(#brandGrad3)" opacity="0.5" />
        </g>
      </svg>
    </IllustrationWrapper>
  )
}

export const STEP_ILLUSTRATIONS = [
  BrowseCreatorsIllustration,
  WriteMessageIllustration,
  ReceiveVideoIllustration,
] as const
