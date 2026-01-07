import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { moduleManifest } from "@/data/moduleManifest";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "GHL Workflow Mastery",
  description: "Course app + mock workflow builder for automation training"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <AppShell manifest={moduleManifest}>{children}</AppShell>
      </body>
    </html>
  );
}
