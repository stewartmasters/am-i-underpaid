import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Am I Underpaid? — Free Salary Checker",
    template: "%s — Am I Underpaid?",
  },
  description:
    "Find out instantly if you're underpaid. Enter your role, location, and salary. Get your market rate and percentile in seconds. No signup required.",
  keywords: [
    "am i underpaid",
    "salary checker",
    "salary calculator",
    "market salary",
    "average salary",
    "salary comparison",
    "underpaid",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Am I Underpaid?",
    title: "Am I Underpaid? — Free Salary Checker",
    description:
      "Find out instantly if you're underpaid. Enter your role, location, and salary. Get your market rate and percentile in seconds.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Am I Underpaid? — Free Salary Checker",
    description: "Find out instantly if you're underpaid. Takes 30 seconds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // Add your Google Search Console verification code here once you have it:
  // verification: { google: "YOUR_GSC_VERIFICATION_CODE" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Am I Underpaid?",
    url: BASE_URL,
    description: "Free salary checker. Find out instantly if you're underpaid.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/salary/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body className="bg-white text-gray-900 min-h-screen font-sans">
        <Navigation />
        <main>{children}</main>
        <footer className="border-t border-gray-100 mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <span>© {new Date().getFullYear()} Am I Underpaid? — Salary data is estimated and for reference only.</span>
            <div className="flex gap-6">
              <a href="/blog" className="hover:text-gray-700 transition-colors">Blog</a>
              <a href="/salary/software-engineer" className="hover:text-gray-700 transition-colors">Salaries</a>
              <a href="/methodology" className="hover:text-gray-700 transition-colors">Methodology</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
