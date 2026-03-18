/** Single entry in the global leaderboard */
export type GlobalLeaderboardEntry = {
  rank: number
  user_id: string
  display_name: string
  net_pnl: number // centimes
  total_wagered: number // centimes
  total_won: number // centimes
  win_count: number
  loss_count: number
  total_bets: number
  win_rate: number // percentage 0-100
}
