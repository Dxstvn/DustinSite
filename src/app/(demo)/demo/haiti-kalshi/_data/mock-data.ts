import type { OutcomeSegment } from "../_components/multi-outcome-bar"
import type { TrendingSlideData } from "../_components/trending-carousel/trending-carousel-slide"
import type { GlobalLeaderboardEntry } from "../_types/leaderboard"

// ─── Market Types ────────────────────────────────────────────────────────────

export interface MockMarket {
  id: string
  slug: string
  title: string
  description: string | null
  category: string
  pool_wi: number
  pool_non: number
  implied_prob_wi: number
  total_bettors: number
  close_at: string | null
  market_type: "binary" | "multi"
  total_pool: number
  news_snippet: string | null
  updated_at: string
}

// ─── Helper: dates relative to "now" ────────────────────────────────────────

function futureDate(days: number, hours = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(d.getHours() + hours)
  return d.toISOString()
}

function pastDate(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

// ─── Markets ─────────────────────────────────────────────────────────────────

export const MOCK_MARKETS: MockMarket[] = [
  {
    id: "m1",
    slug: "ayiti-kalifye-mondyal-2026",
    title: "Èske Ayiti ap kalifye pou Mondyal 2026?",
    description: "Ekip nasyonal foutbòl Ayiti gen pou jwe eliminatwa CONCACAF",
    category: "espò",
    pool_wi: 45000000,
    pool_non: 75000000,
    implied_prob_wi: 0.38,
    total_bettors: 567,
    close_at: futureDate(45),
    market_type: "binary",
    total_pool: 120000000,
    news_snippet: "Ayiti ranpòte 2-1 kont Kib nan dènye match eliminatwa a",
    updated_at: pastDate(0),
  },
  {
    id: "m2",
    slug: "btc-depase-150k-2026",
    title: "Bitcoin ap depase $150,000 anvan fen 2026?",
    description: "Pri Bitcoin jan li ye sou mache mondyal la",
    category: "kripto",
    pool_wi: 32000000,
    pool_non: 38000000,
    implied_prob_wi: 0.46,
    total_bettors: 234,
    close_at: futureDate(280),
    market_type: "binary",
    total_pool: 70000000,
    news_snippet: "Bitcoin rive $98K, analys yo prevwa yon pase $100K semèn pwochèn",
    updated_at: pastDate(0),
  },
  {
    id: "m3",
    slug: "premye-minis-ayiti-jiye-2026",
    title: "Èske Ayiti ap gen yon nouvo Premye Minis anvan Jiyè 2026?",
    description: "Sitiyasyon politik Ayiti rete enstab",
    category: "politik",
    pool_wi: 28000000,
    pool_non: 17000000,
    implied_prob_wi: 0.62,
    total_bettors: 89,
    close_at: futureDate(90),
    market_type: "binary",
    total_pool: 45000000,
    news_snippet: "Konsèy tranzisyon an ap rankontre semèn pwochèn pou diskite sou nouvo PM",
    updated_at: pastDate(1),
  },
  {
    id: "m4",
    slug: "kilye-genyen-nba-finals-2026",
    title: "Kilès ki ap genyen NBA Finals 2026?",
    description: "Sezon NBA 2025-2026 ap fini ak final yo",
    category: "espò",
    pool_wi: 0,
    pool_non: 0,
    implied_prob_wi: 0,
    total_bettors: 312,
    close_at: futureDate(60),
    market_type: "multi",
    total_pool: 89000000,
    news_snippet: "Celtics toujou nan premye plas nan Est, Thunder domine Wès",
    updated_at: pastDate(0),
  },
  {
    id: "m5",
    slug: "goud-200-htg-usd-desanm",
    title: "Goud la ap rive 200 HTG pou 1 USD anvan Desanm?",
    description: "To chanj goud la kont dola ameriken an",
    category: "ekonomi",
    pool_wi: 52000000,
    pool_non: 21000000,
    implied_prob_wi: 0.71,
    total_bettors: 156,
    close_at: futureDate(255),
    market_type: "binary",
    total_pool: 73000000,
    news_snippet: "Goud la ap monte — li rive 185 HTG pou $1 USD jodi a",
    updated_at: pastDate(0),
  },
  {
    id: "m6",
    slug: "grammy-best-new-artist-2027",
    title: "Kilès ki ap genyen Grammy Best New Artist 2027?",
    description: "Nòminasyon Grammy Awards pou pi bon nouvo atis",
    category: "divètisman",
    pool_wi: 0,
    pool_non: 0,
    implied_prob_wi: 0,
    total_bettors: 43,
    close_at: futureDate(300),
    market_type: "multi",
    total_pool: 9500000,
    news_snippet: null,
    updated_at: pastDate(2),
  },
  {
    id: "m7",
    slug: "siklòn-kategori-3-ayiti-2026",
    title: "Èske yon siklòn kategori 3+ ap frape Ayiti nan sezon 2026?",
    description: "Sezon siklòn Atlantik kòmanse 1 jen",
    category: "meteo",
    pool_wi: 15000000,
    pool_non: 35000000,
    implied_prob_wi: 0.30,
    total_bettors: 78,
    close_at: futureDate(180),
    market_type: "binary",
    total_pool: 50000000,
    news_snippet: "NOAA prevwa yon sezon siklòn ki pi fò pase nòmal",
    updated_at: pastDate(3),
  },
  {
    id: "m8",
    slug: "eth-depase-5k-2026",
    title: "Ethereum ap depase $5,000 anvan Jwen 2026?",
    description: "Dezyèm kriptomonè nan mond lan ap fè mouvman",
    category: "kripto",
    pool_wi: 18000000,
    pool_non: 22000000,
    implied_prob_wi: 0.45,
    total_bettors: 98,
    close_at: futureDate(90),
    market_type: "binary",
    total_pool: 40000000,
    news_snippet: "ETH touche $4,200 — analys yo wè sipò solid",
    updated_at: pastDate(1),
  },
  {
    id: "m9",
    slug: "dyaspora-transfer-10b-2026",
    title: "Transfè lajan dyaspora ayisyen an ap depase $4.5 milya nan 2026?",
    description: "Rimit dyaspora se yon motè ekonomi Ayiti",
    category: "dyaspora",
    pool_wi: 12000000,
    pool_non: 8000000,
    implied_prob_wi: 0.60,
    total_bettors: 45,
    close_at: futureDate(280),
    market_type: "binary",
    total_pool: 20000000,
    news_snippet: "Bank Mondyal rapòte yon ogmantasyon 8% nan premye trimès 2026",
    updated_at: pastDate(4),
  },
  {
    id: "m10",
    slug: "usd-htg-depase-190-mwa-pwochenn",
    title: "To dola a ap depase 190 HTG nan mwa pwochèn?",
    description: "Fliktiyasyon nan mache chanj Ayiti",
    category: "monn",
    pool_wi: 20000000,
    pool_non: 30000000,
    implied_prob_wi: 0.40,
    total_bettors: 67,
    close_at: futureDate(30),
    market_type: "binary",
    total_pool: 50000000,
    news_snippet: null,
    updated_at: pastDate(1),
  },
  {
    id: "m11",
    slug: "sol-depase-300-2026",
    title: "Solana (SOL) ap depase $300 anvan Septanm 2026?",
    description: "SOL ap monte rapid apre ETF apwouve",
    category: "kripto",
    pool_wi: 10000000,
    pool_non: 14000000,
    implied_prob_wi: 0.42,
    total_bettors: 55,
    close_at: futureDate(170),
    market_type: "binary",
    total_pool: 24000000,
    news_snippet: null,
    updated_at: pastDate(2),
  },
  {
    id: "m12",
    slug: "eleksyon-depite-ayiti-2026",
    title: "Èske Ayiti ap gen eleksyon depite anvan fen 2026?",
    description: "Palman Ayiti pa fonksyonèl depi 2023",
    category: "politik",
    pool_wi: 8000000,
    pool_non: 22000000,
    implied_prob_wi: 0.27,
    total_bettors: 34,
    close_at: futureDate(280),
    market_type: "binary",
    total_pool: 30000000,
    news_snippet: null,
    updated_at: pastDate(5),
  },
  {
    id: "m13",
    slug: "champions-league-2026",
    title: "Kilès ki ap genyen UEFA Champions League 2025-26?",
    description: "Faz final Champions League ap rive",
    category: "espò",
    pool_wi: 0,
    pool_non: 0,
    implied_prob_wi: 0,
    total_bettors: 189,
    close_at: futureDate(75),
    market_type: "multi",
    total_pool: 55000000,
    news_snippet: "Real Madrid ak Man City nan kaz kat",
    updated_at: pastDate(0),
  },
  {
    id: "m14",
    slug: "inflasyon-ayiti-20-pousan",
    title: "Èske enflasyon Ayiti ap desann anba 20% nan 2026?",
    description: "Enflasyon Ayiti rete pami pi wo nan rejyon an",
    category: "ekonomi",
    pool_wi: 6000000,
    pool_non: 18000000,
    implied_prob_wi: 0.25,
    total_bettors: 28,
    close_at: futureDate(280),
    market_type: "binary",
    total_pool: 24000000,
    news_snippet: null,
    updated_at: pastDate(6),
  },
  {
    id: "m15",
    slug: "kanaval-2027-potoprens",
    title: "Èske Kanaval 2027 ap fèt Pòtoprens?",
    description: "Kanaval pa fèt nan kapital la depi plizyè ane",
    category: "divètisman",
    pool_wi: 5000000,
    pool_non: 15000000,
    implied_prob_wi: 0.25,
    total_bettors: 52,
    close_at: futureDate(330),
    market_type: "binary",
    total_pool: 20000000,
    news_snippet: null,
    updated_at: pastDate(7),
  },
]

// ─── Multi-Outcome Data ──────────────────────────────────────────────────────

export const MOCK_OUTCOMES: Record<string, OutcomeSegment[]> = {
  m4: [
    { id: "o4a", label: "Celtics", probability: 0.32, colorKey: "0", sortOrder: 0, iconUrl: null },
    { id: "o4b", label: "Thunder", probability: 0.28, colorKey: "1", sortOrder: 1, iconUrl: null },
    { id: "o4c", label: "Lakers", probability: 0.15, colorKey: "2", sortOrder: 2, iconUrl: null },
    { id: "o4d", label: "Nuggets", probability: 0.13, colorKey: "3", sortOrder: 3, iconUrl: null },
    { id: "o4e", label: "Lòt", probability: 0.12, colorKey: "4", sortOrder: 4, iconUrl: null },
  ],
  m6: [
    { id: "o6a", label: "Chappell Roan", probability: 0.35, colorKey: "0", sortOrder: 0, iconUrl: null },
    { id: "o6b", label: "Tyla", probability: 0.28, colorKey: "1", sortOrder: 1, iconUrl: null },
    { id: "o6c", label: "Teddy Swims", probability: 0.22, colorKey: "2", sortOrder: 2, iconUrl: null },
    { id: "o6d", label: "Lòt", probability: 0.15, colorKey: "3", sortOrder: 3, iconUrl: null },
  ],
  m13: [
    { id: "o13a", label: "Real Madrid", probability: 0.28, colorKey: "0", sortOrder: 0, iconUrl: null },
    { id: "o13b", label: "Man City", probability: 0.22, colorKey: "1", sortOrder: 1, iconUrl: null },
    { id: "o13c", label: "Bayern", probability: 0.18, colorKey: "2", sortOrder: 2, iconUrl: null },
    { id: "o13d", label: "Arsenal", probability: 0.15, colorKey: "3", sortOrder: 3, iconUrl: null },
    { id: "o13e", label: "Inter Milan", probability: 0.10, colorKey: "4", sortOrder: 4, iconUrl: null },
    { id: "o13f", label: "Lòt", probability: 0.07, colorKey: "5", sortOrder: 5, iconUrl: null },
  ],
}

// ─── Snapshots for trending charts ───────────────────────────────────────────

function generateBinarySnapshots(baseProb: number, count = 12): TrendingSlideData["snapshots"] {
  const snapshots: TrendingSlideData["snapshots"] = []
  const now = Date.now()
  let prob = baseProb - 0.08

  for (let i = 0; i < count; i++) {
    const drift = (Math.random() - 0.45) * 0.06
    prob = Math.max(0.05, Math.min(0.95, prob + drift))
    snapshots.push({
      created_at: new Date(now - (count - i) * 86400000).toISOString(),
      implied_prob_wi: prob,
      outcome_probs: null,
    })
  }
  return snapshots
}

function generateMultiSnapshots(
  outcomes: OutcomeSegment[],
  count = 12
): TrendingSlideData["snapshots"] {
  const snapshots: TrendingSlideData["snapshots"] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const probs = outcomes.map((o) => {
      const drift = (Math.random() - 0.5) * 0.04
      return {
        id: o.id,
        prob: Math.max(0.02, Math.min(0.80, o.probability + drift * (count - i) / count)),
      }
    })
    // Normalize
    const total = probs.reduce((s, p) => s + p.prob, 0)
    for (const p of probs) p.prob /= total

    snapshots.push({
      created_at: new Date(now - (count - i) * 86400000).toISOString(),
      implied_prob_wi: null,
      outcome_probs: probs,
    })
  }
  return snapshots
}

export const MOCK_SNAPSHOTS: Record<string, TrendingSlideData["snapshots"]> = {
  m1: generateBinarySnapshots(0.38),
  m2: generateBinarySnapshots(0.46),
  m3: generateBinarySnapshots(0.62),
  m4: generateMultiSnapshots(MOCK_OUTCOMES.m4),
  m5: generateBinarySnapshots(0.71),
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export const MOCK_LEADERBOARD: GlobalLeaderboardEntry[] = [
  {
    rank: 1,
    user_id: "u1",
    display_name: "Jean-Pierre Louis",
    net_pnl: 1250000,
    total_wagered: 5000000,
    total_won: 6250000,
    win_count: 42,
    loss_count: 12,
    total_bets: 54,
    win_rate: 78,
  },
  {
    rank: 2,
    user_id: "u2",
    display_name: "Marie-Claire Beaumont",
    net_pnl: 980000,
    total_wagered: 4200000,
    total_won: 5180000,
    win_count: 38,
    loss_count: 15,
    total_bets: 53,
    win_rate: 72,
  },
  {
    rank: 3,
    user_id: "u3",
    display_name: "Jacques Desrosiers",
    net_pnl: 750000,
    total_wagered: 3800000,
    total_won: 4550000,
    win_count: 31,
    loss_count: 18,
    total_bets: 49,
    win_rate: 63,
  },
  {
    rank: 4,
    user_id: "u4",
    display_name: "Nathalie Joseph",
    net_pnl: 620000,
    total_wagered: 2900000,
    total_won: 3520000,
    win_count: 28,
    loss_count: 14,
    total_bets: 42,
    win_rate: 67,
  },
  {
    rank: 5,
    user_id: "u5",
    display_name: "Pierre-Antoine Théodore",
    net_pnl: 480000,
    total_wagered: 2500000,
    total_won: 2980000,
    win_count: 25,
    loss_count: 16,
    total_bets: 41,
    win_rate: 61,
  },
  {
    rank: 6,
    user_id: "u6",
    display_name: "Roseline Auguste",
    net_pnl: 350000,
    total_wagered: 2100000,
    total_won: 2450000,
    win_count: 22,
    loss_count: 19,
    total_bets: 41,
    win_rate: 54,
  },
  {
    rank: 7,
    user_id: "u7",
    display_name: "Frantz Hyppolite",
    net_pnl: 280000,
    total_wagered: 1800000,
    total_won: 2080000,
    win_count: 20,
    loss_count: 15,
    total_bets: 35,
    win_rate: 57,
  },
  {
    rank: 8,
    user_id: "u8",
    display_name: "Claudette Saint-Fleur",
    net_pnl: 190000,
    total_wagered: 1500000,
    total_won: 1690000,
    win_count: 18,
    loss_count: 17,
    total_bets: 35,
    win_rate: 51,
  },
  {
    rank: 9,
    user_id: "u9",
    display_name: "Gérard Estimé",
    net_pnl: 120000,
    total_wagered: 1200000,
    total_won: 1320000,
    win_count: 16,
    loss_count: 18,
    total_bets: 34,
    win_rate: 47,
  },
  {
    rank: 10,
    user_id: "u10",
    display_name: "Yolande Pierre-Louis",
    net_pnl: 85000,
    total_wagered: 900000,
    total_won: 985000,
    win_count: 14,
    loss_count: 16,
    total_bets: 30,
    win_rate: 47,
  },
]
