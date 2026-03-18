import type { LucideIcon } from "lucide-react"
import {
  Trophy,
  Landmark,
  Clapperboard,
  Zap,
  TrendingUp,
  Bitcoin,
  Globe,
  Plane,
  MoreHorizontal,
} from "lucide-react"

export interface CategoryMeta {
  label: string
  icon: LucideIcon
  color: string
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  "espò": { label: "Espò", icon: Trophy, color: "rgb(16,185,129)" },
  politik: { label: "Politik", icon: Landmark, color: "rgb(59,130,246)" },
  "divètisman": { label: "Divètisman", icon: Clapperboard, color: "rgb(168,85,247)" },
  meteo: { label: "Evenman Natir\u00E8l", icon: Zap, color: "rgb(6,182,212)" },
  ekonomi: { label: "Ekonomi", icon: TrendingUp, color: "rgb(245,158,11)" },
  kripto: { label: "Kripto", icon: Bitcoin, color: "rgb(249,115,22)" },
  monn: { label: "Monn", icon: Globe, color: "rgb(244,63,94)" },
  dyaspora: { label: "Dyaspora", icon: Plane, color: "rgb(99,102,241)" },
  "lòt": { label: "Lòt", icon: MoreHorizontal, color: "rgb(148,163,184)" },
}

export const CATEGORY_LABELS: Record<string, string> = {
  espò: "Espò",
  politik: "Politik",
  divètisman: "Divètisman",
  meteo: "Evenman Natir\u00E8l",
  ekonomi: "Ekonomi",
  kripto: "Kripto",
  monn: "Monn",
  dyaspora: "Dyaspora",
  lòt: "Lòt",
}
