import Link from "next/link";

const SALARY_LINKS = [
  { href: "/salary/software-engineer-london", label: "Software Engineer · London" },
  { href: "/salary/product-manager-berlin", label: "Product Manager · Berlin" },
  { href: "/salary/data-scientist-amsterdam", label: "Data Scientist · Amsterdam" },
  { href: "/salary/frontend-developer-london", label: "Frontend Developer · London" },
  { href: "/salary/devops-engineer-london", label: "DevOps Engineer · London" },
  { href: "/salary/designer-amsterdam", label: "Designer · Amsterdam" },
  { href: "/salary/marketing-manager-paris", label: "Marketing Manager · Paris" },
  { href: "/salary/sales-manager-dublin", label: "Sales Manager · Dublin" },
];

const LOCATION_LINKS = [
  { href: "/salary/london", label: "London" },
  { href: "/salary/berlin", label: "Berlin" },
  { href: "/salary/amsterdam", label: "Amsterdam" },
  { href: "/salary/paris", label: "Paris" },
  { href: "/salary/dublin", label: "Dublin" },
  { href: "/salary/barcelona", label: "Barcelona" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="font-bold text-gray-900 text-base">
              Salary<span className="text-orange-500">Verdict</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Free salary benchmarking for European professionals. Find out if you&apos;re underpaid in 30 seconds.
            </p>
            <p className="text-xs text-gray-400">
              Based on public benchmarks, government wage data, and structured market modelling.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Popular guides</p>
            <ul className="space-y-1.5">
              {SALARY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">By location</p>
            <ul className="space-y-1.5">
              {LOCATION_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">{label} salaries</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Site</p>
            <ul className="space-y-1.5">
              {[
                { href: "/", label: "Salary checker" },
                { href: "/blog", label: "Blog" },
                { href: "/methodology", label: "Methodology" },
                { href: "/salary/software-engineer", label: "All salary guides" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
            <div className="pt-1 space-y-1.5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data</p>
              <p className="text-xs text-gray-400">Eurostat · ONS · Destatis · INE</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Get salary tips</p>
          <form name="newsletter" data-netlify="true" method="POST" className="flex gap-2 max-w-sm">
            <input type="hidden" name="form-name" value="newsletter" />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 text-gray-700 bg-white"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2">Monthly salary insights. No spam, unsubscribe anytime.</p>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400">
            <span className="font-medium text-gray-500">The Verdict network:</span>
            <a href="https://www.salaryverdict.com" className="font-bold text-gray-700 hover:text-gray-900 transition-colors">Salary<span className="text-orange-500">Verdict</span></a>
            <span>·</span>
            <a href="https://www.spendverdict.com" className="font-bold text-gray-700 hover:text-gray-900 transition-colors">Spend<span style={{ color: "#a78bfa" }}>Verdict</span></a>
            <span>·</span>
            <a href="https://compverdict.com" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-700 hover:text-gray-900 transition-colors">Comp<span style={{ color: "#2563EB" }}>Verdict</span></a>
            <span>·</span>
            <a href="https://pathverdict.com" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-700 hover:text-gray-900 transition-colors">Path<span style={{ color: "#0D9488" }}>Verdict</span></a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {year} SalaryVerdict — Salary estimates are modelled from public benchmarks and do not represent guaranteed earnings.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/methodology" className="hover:text-orange-500 transition-colors">How we calculate</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy policy</Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-orange-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
