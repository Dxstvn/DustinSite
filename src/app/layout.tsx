import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Jaspire — Premium Digital Agency",
    template: "%s | Jaspire",
  },
  description:
    "We build digital experiences, brands, and growth through web development, SEO, and social media management.",
  metadataBase: new URL("https://jaspire.co"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jaspire.co",
    siteName: "Jaspire",
    title: "Jaspire — Premium Digital Agency",
    description:
      "We build digital experiences, brands, and growth through web development, SEO, and social media management.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaspire — Premium Digital Agency",
    description:
      "We build digital experiences, brands, and growth through web development, SEO, and social media management.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
