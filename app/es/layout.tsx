import type { Metadata } from "next";
import Link from "next/link";
import FooterES from "@/components/FooterES";
import LanguageSelect from "@/components/LanguageSelect";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: `${BASE_URL}/es`,
    languages: {
      "es": `${BASE_URL}/es`,
      "en": BASE_URL,
      "x-default": BASE_URL,
    },
  },
};

function NavigationES() {
  return (
    <nav className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/es/" className="font-bold text-gray-900 text-lg tracking-tight flex-shrink-0">
          Salary<span className="text-orange-500">Verdict</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/es/"
            className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
          >
            Salarios
          </Link>
          <Link
            href="/blog"
            className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
          >
            Blog
          </Link>
          <Link
            href="/es/metodologia"
            className="text-gray-500 hover:text-gray-900 transition-colors hidden md:block"
          >
            Metodología
          </Link>
          {/* Language toggle */}
          <LanguageSelect current="es" />
          <Link
            href="/es/#calculadora"
            className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors flex-shrink-0"
          >
            Comprobar mi sueldo
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function EsLayout({ children }: { children: React.ReactNode }) {
  const inter = "font-sans"; // inherits from root CSS
  return (
    <>
      <NavigationES />
      <main lang="es">{children}</main>
      <FooterES />
    </>
  );
}
