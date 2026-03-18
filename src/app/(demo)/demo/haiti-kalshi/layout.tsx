import { Sora, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./parye-globals.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora-var",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  display: "swap",
  weight: ["400", "500"],
})

export default function HaitiKalshiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${sora.variable} ${jetbrains.variable} font-sans antialiased bg-bg-primary text-text-primary`}
      lang="ht"
      translate="no"
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div className="ambient-mesh" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10">
          {children}
        </div>
      </ThemeProvider>
    </div>
  )
}
