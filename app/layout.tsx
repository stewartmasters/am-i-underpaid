import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SalaryVerdict — Find Out If You're Underpaid",
    template: "%s — SalaryVerdict",
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
    "salary verdict",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "SalaryVerdict",
    title: "SalaryVerdict — Find Out If You're Underpaid",
    description:
      "Find out instantly if you're underpaid. Enter your role, location, and salary. Get your market rate and percentile in seconds.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "SalaryVerdict — Find Out If You're Underpaid",
    description: "Find out if you're underpaid in 30 seconds. Free, no signup.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        name: "SalaryVerdict",
        url: BASE_URL,
        description: "Free salary checker. Find out instantly if you're underpaid.",
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/salary/{search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "SalaryVerdict",
        url: BASE_URL,
        description: "SalaryVerdict helps professionals across Europe find out if they are underpaid. Free salary checker — no signup, instant results based on official government wage data.",
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <link rel="icon" href="/logos/logo-a1.png" />
        <link rel="apple-touch-icon" href="/logos/logo-a1.png" />
      </head>
      <body className="bg-white text-gray-900 min-h-screen font-sans">
        {children}
        <CookieConsent />
        {/* Netlify Forms registration — scanned at deploy time */}
        <form name="salary-leads" data-netlify="true" hidden aria-hidden="true">
          <input type="email" name="email" />
          <input type="hidden" name="verdict" />
          <input type="hidden" name="role" />
          <input type="hidden" name="location" />
        </form>
        <form name="newsletter" data-netlify="true" hidden aria-hidden="true">
          <input type="email" name="email" />
        </form>
        <form name="newsletter-es" data-netlify="true" hidden aria-hidden="true">
          <input type="email" name="email" />
        </form>
        {/* Google Analytics 4 — Consent Mode v2 */}
        {/* analytics_storage defaults to denied until user accepts the cookie banner */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H8XR1C8DXG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', 'G-H8XR1C8DXG');
        `}</Script>
      </body>
    </html>
  );
}
