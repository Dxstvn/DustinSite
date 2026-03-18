import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  themeColor: "#f5f3f0",
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
      className={jetbrainsMono.variable}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
