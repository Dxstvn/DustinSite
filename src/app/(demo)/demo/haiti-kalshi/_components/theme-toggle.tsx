"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

const emptySubscribe = () => () => {}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const { resolvedTheme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <button
        className="size-9 rounded-lg bg-bg-hover/50 flex items-center justify-center text-text-muted"
        aria-hidden
      />
    )
  }

  const isDark = resolvedTheme === "dark"
  const toggle = () => setTheme(isDark ? "light" : "dark")

  return (
    <button
      onClick={toggle}
      className="group relative size-9 rounded-lg bg-bg-hover/50 hover:bg-bg-active/60 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-150 cursor-pointer overflow-hidden"
      title={isDark ? "Mete mòd klè" : "Mete mòd fè nwa"}
      aria-label={isDark ? "Chanje nan mòd klè" : "Chanje nan mòd fè nwa"}
    >
      <Sun
        className="size-4 absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
          opacity: isDark ? 1 : 0,
        }}
      />
      <Moon
        className="size-4 absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: isDark ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)",
          opacity: isDark ? 0 : 1,
        }}
      />
      <span className="sr-only">Chanje tèm</span>
    </button>
  )
}
