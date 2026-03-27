import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  generateEsPages,
  getEsPage,
  getRelatedEsPages,
  esIntroVariant,
} from "@/lib/es/seo-pages-es";
import {
  ES_ROLES,
  ES_CITIES,
  getEsRoleByDataSlug,
  getEsCityByDataSlug,
} from "@/lib/es/config";
import {
  getMarketRange,
  getSeniorityBands,
  formatSalary,
  getConfidenceLevel,
  CONFIDENCE_LABELS,
  ROLES,
} from "@/lib/salary-data";
import SalaryToolES from "@/components/SalaryToolES";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";
const YEAR = 2026;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateEsPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getEsPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/es/${slug}`,
      languages: {
        "es": `${BASE_URL}/es/${slug}`,
        "en": BASE_URL,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      locale: "es_ES",
      url: `${BASE_URL}/es/${slug}`,
    },
  };
}

// ─── FAQ generators ──────────────────────────────────────────────────────────

function faqsRoleCity(
  roleLabel: string,
  cityLabel: string,
  median: string,
  low: string,
  high: string
) {
  return [
    {
      q: `¿Cuánto gana un ${roleLabel} en ${cityLabel}?`,
      a: `El salario medio de un ${roleLabel} en ${cityLabel} en ${YEAR} es de aproximadamente ${median} anuales para un perfil de nivel intermedio (4–6 años de experiencia). La horquilla completa va desde ${low} en perfiles junior hasta ${high} en senior. Estas cifras son estimaciones brutas anuales basadas en datos públicos.`,
    },
    {
      q: `¿Es ${median}/año un buen sueldo para un ${roleLabel} en ${cityLabel}?`,
      a: `${median} representa la mediana del mercado para un ${roleLabel} en ${cityLabel}. Si lo ganas con 3–4 años de experiencia, estás bien posicionado. Usa la calculadora de arriba para comprobar tu percentil exacto según tu situación.`,
    },
    {
      q: `¿Cómo puedo ganar más como ${roleLabel} en ${cityLabel}?`,
      a: `Las palancas más efectivas son: cambiar de empresa (normalmente supone un 15–25% de aumento), usar ofertas competidoras para negociar, o asumir mayor responsabilidad en tu empresa actual. Saber tu valor de mercado — que puedes comprobar arriba — es el primer paso antes de cualquier conversación salarial.`,
    },
    {
      q: `¿Qué factores afectan al sueldo de ${roleLabel} en ${cityLabel}?`,
      a: `Los factores clave son: años de experiencia, tamaño y etapa de la empresa, sector, si la empresa referencia sueldos a nivel global o local, y habilidades específicas. Las empresas remote-first también pueden pagar de forma diferente según tu ubicación.`,
    },
    {
      q: `¿El salario de ${roleLabel} en ${cityLabel} incluye bonus o variable?`,
      a: `Las cifras de esta página representan solo el salario base bruto anual. Los bonus, variable, equity y beneficios no están incluidos. En roles de ventas o finanzas, la retribución total puede ser un 20–50% superior al fijo.`,
    },
  ];
}

function faqsSalaryQuestion(amount: number, cityLabel: string, currency: string) {
  const amountStr = `${currency}${amount.toLocaleString("es-ES")}`;
  return [
    {
      q: `¿Es ${amountStr} un buen sueldo en ${cityLabel}?`,
      a: `Si ${amountStr} es un buen sueldo en ${cityLabel} depende mucho de tu puesto y experiencia. Para perfiles técnicos mid-level, ${amountStr} suele estar en la franja media-baja del mercado. Usa la calculadora de arriba para compararlo con tu puesto y años de experiencia específicos.`,
    },
    {
      q: `¿En qué empleos se gana ${amountStr} en ${cityLabel}?`,
      a: `En ${cityLabel}, ${amountStr} es una cifra habitual para perfiles intermedios en marketing, análisis de datos, diseño y gestión de proyectos. Los perfiles técnicos (ingeniería, DevOps) suelen superar este umbral a partir de 3–4 años de experiencia.`,
    },
    {
      q: `¿Alcanza ${amountStr} para vivir en ${cityLabel}?`,
      a: `Con ${amountStr} bruto al año en ${cityLabel}, el neto mensual depende de tu situación fiscal, pero en general permite un nivel de vida cómodo. ${cityLabel} tiene un coste de vida inferior a ciudades como Ámsterdam o Londres, lo que mejora el poder adquisitivo real.`,
    },
    {
      q: `¿Cómo se compara ${amountStr} con la media salarial en ${cityLabel}?`,
      a: `Usa la calculadora de arriba para comparar ${amountStr} con tu puesto específico. La media varía mucho según el rol: un analista de datos y un diseñador senior pueden estar en rangos muy distintos aunque ambos tengan 5 años de experiencia.`,
    },
  ];
}

function faqsExperience(roleLabel: string, cityLabel: string, years: number, median: string) {
  return [
    {
      q: `¿Cuánto gana un ${roleLabel} con ${years} años de experiencia en ${cityLabel}?`,
      a: `Un ${roleLabel} con ${years} años de experiencia en ${cityLabel} gana aproximadamente ${median} brutos al año. En este nivel (perfil mid-level), el mercado paga en torno a esa cifra, aunque la horquilla puede variar según el tamaño de la empresa y el sector.`,
    },
    {
      q: `¿Es ${years} años de experiencia suficiente para negociar un aumento?`,
      a: `Con ${years} años de experiencia, estás en un momento óptimo para negociar. El salto de junior a mid-level es uno de los mayores en términos de incremento salarial. Si llevas más de un año en el mismo salario sin revisión, vale la pena iniciar la conversación.`,
    },
    {
      q: `¿Qué sueldo debería pedir con ${years} años de ${roleLabel} en ${cityLabel}?`,
      a: `Como ${roleLabel} con ${years} años en ${cityLabel}, la mediana del mercado es ${median}. Pide por encima de esa cifra — la negociación inicial suele quedar por debajo de tu objetivo. Comprueba tu percentil exacto con la calculadora de arriba.`,
    },
  ];
}

function faqsCityComparison(city1Label: string, city2Label: string) {
  return [
    {
      q: `¿Qué ciudad paga más, ${city1Label} o ${city2Label}?`,
      a: `En general, ${city1Label} ofrece salarios superiores a ${city2Label} para la mayoría de perfiles profesionales. La diferencia varía según el puesto y el sector, pero para roles tech y producto puede ser de un 10–20%. Consulta la tabla de arriba para comparar por rol específico.`,
    },
    {
      q: `¿Vale la pena cambiar de ${city2Label} a ${city1Label} por el salario?`,
      a: `Depende de la diferencia salarial y del coste de vida. Si el aumento es superior al 15%, suele compensar el cambio en términos económicos. Recuerda que también cambia el IRPF y el coste de la vivienda. Haz los cálculos con tu puesto específico usando la calculadora.`,
    },
    {
      q: `¿Qué puestos pagan más en ${city1Label} comparado con ${city2Label}?`,
      a: `Los puestos donde la diferencia es mayor entre ciudades españolas suelen ser los de mayor demanda: ingeniería de software, product management y DevOps. En estos roles, la diferencia entre ${city1Label} y ${city2Label} puede ser significativa. Consulta los datos en la tabla de arriba.`,
    },
  ];
}

function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ─── Intro copy (3 variants, deterministic by slug) ──────────────────────────
function buildRoleCityIntro(
  slug: string,
  roleLabel: string,
  cityLabel: string,
  low: string,
  median: string,
  high: string,
  cityContext: string
): string {
  const v = esIntroVariant(slug);
  if (v === 0) {
    return `Los ${roleLabel.toLowerCase()}s en ${cityLabel} ganan normalmente entre ${low} y ${high} al año, con una mediana de mercado de ${median}. ${cityContext}`;
  } else if (v === 1) {
    return `El salario mediano de un ${roleLabel.toLowerCase()} en ${cityLabel} es de ${median} — desde ${low} para perfiles junior hasta ${high} a nivel senior. ${cityContext}`;
  } else {
    return `En ${cityLabel}, un ${roleLabel.toLowerCase()} de nivel intermedio cobra alrededor de ${median} al año. La horquilla completa va de ${low} a ${high} según experiencia y empresa. ${cityContext}`;
  }
}

export default async function EsSalaryPage({ params }: Props) {
  const { slug } = await params;
  const page = getEsPage(slug);
  if (!page) notFound();

  const { sameCity, sameRole } = getRelatedEsPages(page);

  // ─── ROLE + CITY ──────────────────────────────────────────────────────────
  if (page.type === "role-city" || page.type === "experience") {
    const roleDataSlug = page.roleDataSlug!;
    const cityDataSlug = page.cityDataSlug!;
    const expYears = page.experienceYears ?? 5;
    const range = getMarketRange(roleDataSlug, cityDataSlug, expYears);
    const bands = getSeniorityBands(roleDataSlug, cityDataSlug);
    const { currency } = range;
    const conf = getConfidenceLevel(roleDataSlug, cityDataSlug);
    const confLabel = CONFIDENCE_LABELS[conf];
    const cityConfig = ES_CITIES.find((c) => c.dataSlug === cityDataSlug);
    const cityContext = cityConfig?.context ?? "";

    const faqs = page.type === "experience"
      ? faqsExperience(page.roleLabel!, page.cityLabel!, expYears, formatSalary(range.median, currency))
      : faqsRoleCity(
          page.roleLabel!, page.cityLabel!,
          formatSalary(range.median, currency),
          formatSalary(range.low, currency),
          formatSalary(range.high, currency)
        );
    const faqSchema = buildFaqSchema(faqs);

    const introText = page.type === "experience"
      ? `Con ${page.experienceLabel}, un ${page.roleLabel!.toLowerCase()} en ${page.cityLabel} se sitúa en el tramo mid-level del mercado, con un salario medio de ${formatSalary(range.median, currency)} anuales. ${cityContext}`
      : buildRoleCityIntro(slug, page.roleLabel!, page.cityLabel!, formatSalary(range.low, currency), formatSalary(range.median, currency), formatSalary(range.high, currency), cityContext);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/es/" className="hover:text-orange-500 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/es/" className="hover:text-orange-500 transition-colors">Salarios</Link>
            <span>/</span>
            <span className="text-gray-600">{page.h1}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            <div className="space-y-10 min-w-0">

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{page.h1}</h1>
                <p className="text-lg text-gray-500 leading-relaxed">{introText}</p>
                <p className="text-xs text-gray-400">
                  Estimaciones basadas en datos públicos y modelos estructurados.{" "}
                  <Link href="/methodology" className="text-orange-500 hover:underline">Metodología →</Link>
                </p>
              </div>

              {/* At a glance */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-base font-bold text-gray-900">De un vistazo</h2>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${confLabel.color}`} title={confLabel.description}>
                    {confLabel.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-400">Salario mediano</div>
                    <div className="font-bold text-gray-900 text-sm">{formatSalary(range.median, currency)}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-400">Horquilla habitual</div>
                    <div className="font-bold text-gray-900 text-sm">{formatSalary(range.low, currency)} – {formatSalary(range.high, currency)}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-400">Senior (mediana)</div>
                    <div className="font-bold text-gray-900 text-sm">{formatSalary(bands.senior.median, currency)}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-400">Probablemente cobras poco si ganas menos de</div>
                    <div className="font-bold text-orange-600 text-sm">{formatSalary(Math.round(range.median * 0.90 / 500) * 500, currency)}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Salario bruto anual estimado · {YEAR} · Benchmarks públicos + modelos estructurados · <Link href="/methodology" className="text-orange-500 hover:underline">Metodología →</Link></p>
              </div>

              {/* Salary bands */}
              {page.type === "role-city" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Tramos salariales de {page.roleLabel} en {page.cityLabel}
                  </h2>
                  <div className="space-y-3">
                    {([
                      { key: "junior", data: bands.junior, color: "bg-blue-50 border-blue-100", labelEs: "Junior (0–2 años)" },
                      { key: "mid",    data: bands.mid,    color: "bg-orange-50 border-orange-200", labelEs: "Mid-level (3–6 años)" },
                      { key: "senior", data: bands.senior, color: "bg-emerald-50 border-emerald-100", labelEs: "Senior (7+ años)" },
                    ] as const).map(({ key, data, color, labelEs }) => (
                      <div key={key} className={`flex items-center justify-between p-4 rounded-xl border ${color}`}>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{labelEs}</div>
                          <div className="text-xs text-gray-500 mt-0.5">Horquilla habitual</div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold text-gray-900">{formatSalary(data.low, currency)} – {formatSalary(data.high, currency)}</div>
                          <div className="text-xs text-gray-500">Mediana: <span className="font-semibold">{formatSalary(data.median, currency)}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">Salario bruto anual estimado para {YEAR}. Sin bonus ni equity.</p>
                </div>
              )}

              {/* Are you underpaid? */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-3 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">¿Cobras poco?</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Conocer la horquilla del mercado es el primer paso. La pregunta real es dónde se sitúa tu salario dentro de ella. Si estás en el 30% inferior para tu puesto y ciudad, hay razones sólidas para que estés dejando dinero encima de la mesa.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Usa la calculadora para conocer tu percentil al instante. Sin registro, sin email. Solo una respuesta directa.
                </p>
              </div>

              {/* FAQ */}
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Preguntas frecuentes</h2>
                <div className="space-y-3">
                  {faqs.map(({ q, a }) => (
                    <details key={q} className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                        <h3 className="font-semibold text-gray-900 text-sm pr-4">{q}</h3>
                        <span className="text-gray-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-5 pb-5"><p className="text-sm text-gray-500 leading-relaxed">{a}</p></div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Internal links */}
              <div className="grid sm:grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                {sameCity.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Otros puestos en {page.cityLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sameCity.map((p) => (
                        <Link key={p.slug} href={`/es/${p.slug}`} className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-3 py-1.5 rounded-full transition-colors">
                          {p.roleLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {sameRole.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {page.roleLabel} en otras ciudades
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sameRole.map((p) => (
                        <Link key={p.slug} href={`/es/${p.slug}`} className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-3 py-1.5 rounded-full transition-colors">
                          {p.cityLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Comparison pages */}
              <div className="space-y-2 border-t border-gray-100 pt-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Comparativas salariales</p>
                <div className="flex flex-wrap gap-2">
                  {[["barcelona", "madrid"], ["madrid", "barcelona"], ["barcelona", "valencia"]].map(([c1, c2]) => {
                    const city1 = ES_CITIES.find((c) => c.esSlug === c1);
                    const city2 = ES_CITIES.find((c) => c.esSlug === c2);
                    if (!city1 || !city2) return null;
                    return (
                      <Link key={`${c1}-${c2}`} href={`/es/sueldo-${c1}-vs-${c2}`} className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-3 py-1.5 rounded-full transition-colors">
                        {city1.label} vs {city2.label}
                      </Link>
                    );
                  })}
                  <Link href="/es/" className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full transition-colors font-medium">
                    → Calculadora de sueldo
                  </Link>
                </div>
              </div>

              <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                Estimaciones basadas en datos públicos de salarios y modelos estructurados. Representan salario bruto anual base sin bonus, equity ni beneficios.{" "}
                <Link href="/methodology" className="text-orange-500 hover:underline">Lee nuestra metodología →</Link>
              </div>
            </div>

            {/* Sidebar: calculator */}
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6">
                <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Comprueba tu sueldo</p>
                <p className="text-xs text-gray-400 mb-4">Ve exactamente dónde te sitúas.</p>
                <SalaryToolES defaultRoleDataSlug={roleDataSlug} defaultCityDataSlug={cityDataSlug} />
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  }

  // ─── SALARY QUESTION ──────────────────────────────────────────────────────
  if (page.type === "salary-question") {
    const cityDataSlug = page.cityDataSlug!;
    const amount = page.salaryAmount!;
    const currency = "€";
    const amountStr = `${currency}${amount.toLocaleString("es-ES")}`;
    const cityConfig = ES_CITIES.find((c) => c.dataSlug === cityDataSlug);
    const faqs = faqsSalaryQuestion(amount, page.cityLabel!, currency);
    const faqSchema = buildFaqSchema(faqs);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/es/" className="hover:text-orange-500 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-600">{page.h1}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            <div className="space-y-10 min-w-0">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{page.h1}</h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                  {cityConfig?.context ?? `${page.cityLabel} es uno de los principales mercados laborales de España.`}
                </p>
                <p className="text-xs text-gray-400">
                  <Link href="/methodology" className="text-orange-500 hover:underline">Metodología →</Link>
                </p>
              </div>

              {/* Comparison table */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  ¿Cómo se compara {amountStr} con el mercado en {page.cityLabel}?
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Si {amountStr} es un buen sueldo en {page.cityLabel} depende de tu puesto y experiencia. Aquí tienes cómo se compara con las medianas de los puestos más habituales:
                </p>
                <div className="space-y-2">
                  {ES_ROLES.slice(0, 8).map((role) => {
                    const r = getMarketRange(role.dataSlug, cityDataSlug);
                    const diff = amount - r.median;
                    const pct = Math.round((diff / r.median) * 100);
                    const isAbove = diff >= 0;
                    return (
                      <Link
                        key={role.esSlug}
                        href={`/es/salario-${role.esSlug}-${cityDataSlug}`}
                        className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-orange-200 bg-white hover:bg-orange-50 transition-all group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">{role.label}</span>
                        <div className="text-right">
                          <span className={`text-xs font-bold ${isAbove ? "text-emerald-600" : "text-red-500"}`}>
                            {isAbove ? "+" : ""}{pct}% vs mediana
                          </span>
                          <div className="text-xs text-gray-400">Mediana: {formatSalary(r.median, currency)}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 space-y-3 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Obtén tu veredicto personalizado</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  La tabla de arriba muestra medias generales. Tu percentil real depende de tu puesto y años de experiencia concretos. Usa la calculadora para obtener tu posición exacta.
                </p>
              </div>

              {/* FAQ */}
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Preguntas frecuentes</h2>
                <div className="space-y-3">
                  {faqs.map(({ q, a }) => (
                    <details key={q} className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                        <h3 className="font-semibold text-gray-900 text-sm pr-4">{q}</h3>
                        <span className="text-gray-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-5 pb-5"><p className="text-sm text-gray-500 leading-relaxed">{a}</p></div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Internal links */}
              <div className="space-y-2 border-t border-gray-100 pt-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guías de salario en {page.cityLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {ES_ROLES.slice(0, 6).map((role) => (
                    <Link key={role.esSlug} href={`/es/salario-${role.esSlug}-${cityDataSlug}`} className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-3 py-1.5 rounded-full transition-colors">
                      {role.label}
                    </Link>
                  ))}
                  <Link href="/es/" className="text-xs bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1.5 rounded-full font-medium transition-colors">
                    → Calculadora
                  </Link>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6">
                <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Comprueba tu sueldo</p>
                <p className="text-xs text-gray-400 mb-4">Ve exactamente dónde te sitúas.</p>
                <SalaryToolES defaultCityDataSlug={cityDataSlug} />
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  }

  // ─── CITY COMPARISON ──────────────────────────────────────────────────────
  if (page.type === "city-comparison") {
    const city1DataSlug = page.city1DataSlug!;
    const city2DataSlug = page.city2DataSlug!;
    const faqs = faqsCityComparison(page.city1Label!, page.city2Label!);
    const faqSchema = buildFaqSchema(faqs);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/es/" className="hover:text-orange-500 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-600">{page.h1}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            <div className="space-y-10 min-w-0">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{page.h1}</h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                  {`Compara los sueldos de ${page.city1Label} y ${page.city2Label} por puesto. En general, ${page.city1Label} ofrece salarios ${page.city1DataSlug === "barcelona" || page.city1DataSlug === "madrid" ? "superiores" : "distintos"} a ${page.city2Label} para la mayoría de perfiles técnicos y de producto.`}
                </p>
              </div>

              {/* Comparison table */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {page.city1Label} vs {page.city2Label}: salarios por puesto
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 pr-4 text-gray-500 font-medium">Puesto</th>
                        <th className="text-right py-3 px-3 text-gray-900 font-bold">{page.city1Label}</th>
                        <th className="text-right py-3 px-3 text-gray-900 font-bold">{page.city2Label}</th>
                        <th className="text-right py-3 pl-3 text-gray-500 font-medium">Diferencia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {ES_ROLES.map((role) => {
                        const r1 = getMarketRange(role.dataSlug, city1DataSlug);
                        const r2 = getMarketRange(role.dataSlug, city2DataSlug);
                        const diff = r1.median - r2.median;
                        const pct = Math.round((diff / r2.median) * 100);
                        return (
                          <tr key={role.esSlug} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 pr-4">
                              <Link href={`/es/salario-${role.esSlug}-${page.city1EsSlug}`} className="font-medium text-gray-800 hover:text-orange-600 transition-colors">
                                {role.label}
                              </Link>
                            </td>
                            <td className="py-3 px-3 text-right font-semibold text-gray-900">{formatSalary(r1.median, "€")}</td>
                            <td className="py-3 px-3 text-right text-gray-600">{formatSalary(r2.median, "€")}</td>
                            <td className={`py-3 pl-3 text-right text-xs font-bold ${diff > 0 ? "text-emerald-600" : diff < 0 ? "text-red-500" : "text-gray-400"}`}>
                              {diff > 0 ? "+" : ""}{pct}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400">Salario bruto anual mediano estimado para perfil mid-level (5 años de experiencia) · {YEAR}</p>
              </div>

              {/* City context */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { city: ES_CITIES.find((c) => c.dataSlug === city1DataSlug), label: page.city1Label },
                  { city: ES_CITIES.find((c) => c.dataSlug === city2DataSlug), label: page.city2Label },
                ].map(({ city, label }) => city ? (
                  <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                    <h3 className="font-bold text-gray-900 text-sm">{label}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{city.context}</p>
                  </div>
                ) : null)}
              </div>

              {/* FAQ */}
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Preguntas frecuentes</h2>
                <div className="space-y-3">
                  {faqs.map(({ q, a }) => (
                    <details key={q} className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                        <h3 className="font-semibold text-gray-900 text-sm pr-4">{q}</h3>
                        <span className="text-gray-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-5 pb-5"><p className="text-sm text-gray-500 leading-relaxed">{a}</p></div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Internal links */}
              <div className="grid sm:grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                {[page.city1EsSlug!, page.city2EsSlug!].map((citySlug) => {
                  const city = ES_CITIES.find((c) => c.esSlug === citySlug);
                  if (!city) return null;
                  return (
                    <div key={citySlug} className="space-y-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guías en {city.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {ES_ROLES.slice(0, 4).map((role) => (
                          <Link key={role.esSlug} href={`/es/salario-${role.esSlug}-${citySlug}`} className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-3 py-1.5 rounded-full transition-colors">
                            {role.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/es/" className="inline-block text-xs bg-orange-50 text-orange-600 hover:bg-orange-100 px-4 py-2 rounded-full font-medium transition-colors">
                → Calculadora de sueldo
              </Link>
            </div>

            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6">
                <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Comprueba tu sueldo</p>
                <p className="text-xs text-gray-400 mb-4">Ve exactamente dónde te sitúas.</p>
                <SalaryToolES />
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  }

  notFound();
}
