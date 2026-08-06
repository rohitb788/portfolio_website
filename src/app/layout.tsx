import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getSite } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const site = getSite();

const siteUrl = "https://portfolio-website-blond-omega-44.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} — Controls / GNC Engineer`,
  description: site.positioning,
  openGraph: {
    title: site.name,
    description: site.positioning,
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.positioning,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
