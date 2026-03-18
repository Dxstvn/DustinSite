import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Isolated layout — no Jaspire navbar/footer
  // Demo pages render in iframes and handle their own styling
  return <>{children}</>;
}
