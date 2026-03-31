import Link from "next/link";

const SALARY_LINKS = [
  { href: "/es/salario-ingeniero-software-madrid", label: "Ingeniero de Software · Madrid" },
  { href: "/es/salario-product-manager-barcelona", label: "Product Manager · Barcelona" },
  { href: "/es/salario-cientifico-datos-madrid", label: "Científico de Datos · Madrid" },
  { href: "/es/salario-desarrollador-frontend-barcelona", label: "Desarrollador Frontend · Barcelona" },
  { href: "/es/salario-ingeniero-devops-madrid", label: "Ingeniero DevOps · Madrid" },
  { href: "/es/salario-disenador-ux-barcelona", label: "Diseñador UX/UI · Barcelona" },
  { href: "/es/salario-director-marketing-madrid", label: "Director de Marketing · Madrid" },
  { href: "/es/salario-director-ventas-barcelona", label: "Director de Ventas · Barcelona" },
];

const LOCATION_LINKS = [
  { href: "/es/salario-ingeniero-software-madrid", label: "Madrid" },
  { href: "/es/salario-ingeniero-software-barcelona", label: "Barcelona" },
  { href: "/es/salario-ingeniero-software-valencia", label: "Valencia" },
  { href: "/es/salario-ingeniero-software-sevilla", label: "Sevilla" },
  { href: "/es/salario-ingeniero-software-bilbao", label: "Bilbao" },
];

export default function FooterES() {
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
              Comparativa salarial gratuita para profesionales en España. Descubre si estás cobrando por debajo del mercado en 30 segundos.
            </p>
            <p className="text-xs text-gray-400">
              Basado en estadísticas oficiales, datos del INE y modelado estructurado del mercado.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guías populares</p>
            <ul className="space-y-1.5">
              {SALARY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Por ciudad</p>
            <ul className="space-y-1.5">
              {LOCATION_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Salarios en {label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sitio</p>
            <ul className="space-y-1.5">
              {[
                { href: "/es/", label: "Comprobar mi sueldo" },
                { href: "/es/blog", label: "Blog" },
                { href: "/es/metodologia", label: "Metodología" },
                { href: "/es/salario-ingeniero-software-madrid", label: "Todas las guías" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
            <div className="pt-1 space-y-1.5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Datos</p>
              <p className="text-xs text-gray-400">INE · Eurostat · Destatis · ONS</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Consejos salariales</p>
          <form name="newsletter-es" data-netlify="true" method="POST" className="flex gap-2 max-w-sm">
            <input type="hidden" name="form-name" value="newsletter-es" />
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              required
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 text-gray-700 bg-white"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
            >
              Suscribirse
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2">Análisis salarial mensual. Sin spam, cancela cuando quieras.</p>
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
            © {year} SalaryVerdict — Las estimaciones salariales se basan en referencias públicas y no representan ingresos garantizados.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/es/metodologia" className="hover:text-orange-500 transition-colors">Cómo calculamos</Link>
            <span>·</span>
            <Link href="/es/privacidad" className="hover:text-orange-500 transition-colors">Política de privacidad</Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-orange-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
