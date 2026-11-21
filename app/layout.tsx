import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sacrament Meeting Planner",
    template: "%s | Sacrament Meeting Planner",
  },
  description:
    "Plan, review, and print sacrament meeting programs for your ward or branch.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${lora.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="no-print sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to main content
        </a>
        <Suspense fallback={<div className="no-print h-24 bg-brand" aria-hidden="true" />}>
          <Header />
        </Suspense>
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
