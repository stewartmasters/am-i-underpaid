import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
    canonical: BASE_URL,
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
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="bg-white text-gray-900 min-h-screen font-sans">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
