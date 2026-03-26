import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" className="font-bold text-gray-900 text-lg tracking-tight">
          am i underpaid<span className="text-orange-500">?</span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/salary/software-engineer" className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Salaries</Link>
          <Link href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Blog</Link>
          <Link href="/methodology" className="text-gray-400 hover:text-gray-700 transition-colors hidden md:block text-xs">How we calculate</Link>
          <Link href="/" className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors">Check my salary</Link>
        </div>
      </div>
    </nav>
  );
}
