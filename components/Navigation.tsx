"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelect from "./LanguageSelect";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" className="font-bold text-gray-900 text-lg tracking-tight flex-shrink-0">
          Salary<span className="text-orange-500">Verdict</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/salary/software-engineer"
            className={`transition-colors hidden sm:block ${pathname?.startsWith("/salary") ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900"}`}
          >
            Salaries
          </Link>
          <Link
            href="/blog"
            className={`transition-colors hidden sm:block ${pathname?.startsWith("/blog") ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900"}`}
          >
            Blog
          </Link>
          <Link
            href="/methodology"
            className={`transition-colors hidden md:block ${pathname === "/methodology" ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900"}`}
          >
            Methodology
          </Link>
          <LanguageSelect current="en" />
          <Link
            href="/#salary-tool"
            className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors flex-shrink-0"
          >
            Check my salary
          </Link>
        </div>
      </div>
    </nav>
  );
}
