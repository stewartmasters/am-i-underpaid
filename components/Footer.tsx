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
              am i underpaid<span className="text-orange-500">?</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Free salary benchmarking tool for European professionals. Check your market rate in 30 seconds.
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
            <div className="pt-2 space-y-1.5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Data</p>
              <p className="text-xs text-gray-400">Eurostat · ONS · Destatis · INE</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {year} salaryverdict.com — Salary estimates are modelled from public benchmarks and do not represent guaranteed earnings.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/methodology" className="hover:text-orange-500 transition-colors">How we calculate</Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-orange-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
