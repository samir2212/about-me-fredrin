import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.title,
  description: profile.description,
  openGraph: {
    type: "website",
    title: profile.title,
    description: profile.description,
    siteName: profile.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.title,
    description: profile.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#070b16",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
