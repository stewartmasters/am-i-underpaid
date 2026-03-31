import type { Metadata } from "next";
import Link from "next/link";
import SalaryToolES from "@/components/SalaryToolES";
import TrustSection from "@/components/TrustSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { generateEsPages } from "@/lib/es/seo-pages-es";
import { ES_CITIES, ES_ROLES } from "@/lib/es/config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";

export const metadata: Metadata = {
  title: "¿Cobro poco? — Comprueba tu sueldo gratis",
  description:
    "Descubre si cobras por debajo del mercado. Introduce tu puesto, ciudad y experiencia. Obtén tu horquilla salarial y percentil en 30 segundos. Sin registro.",
  alternates: {
    canonical: `${BASE_URL}/es`,
    languages: {
      "es": `${BASE_URL}/es`,
      "en": BASE_URL,
      "x-default": BASE_URL,
    },
  },
  openGraph: {
    title: "¿Cobro poco? — Comprueba tu sueldo gratis",
    description: "Descubre si cobras por debajo del mercado en 30 segundos. Sin registro, sin email.",
    url: `${BASE_URL}/es`,
    locale: "es_ES",
  },
};

const FEATURED_CHECKS = [
  { slug: "salario-ingeniero-software-madrid",   label: "Ing. Software · Madrid" },
  { slug: "salario-product-manager-barcelona",   label: "Product Manager · Barcelona" },
  { slug: "salario-disenador-ux-barcelona",       label: "Diseñador UX · Barcelona" },
  { slug: "salario-director-marketing-madrid",   label: "Dir. Marketing · Madrid" },
  { slug: "salario-analista-datos-barcelona",    label: "Analista de Datos · Barcelona" },
  { slug: "salario-ingeniero-devops-madrid",     label: "Ing. DevOps · Madrid" },
];

const CURATED_GUIDES = generateEsPages()
  .filter((p) => p.type === "role-city")
  .slice(0, 12);

export default function EsHome() {
  return (
    <>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: copy */}
          <div className="space-y-6">
            <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              Gratis · Sin registro · Resultado inmediato
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Descubre si cobras poco{" "}
              <span className="text-orange-500">en 30 segundos</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Compara tu sueldo con datos oficiales de salarios en España y Europa. Obtén tu veredicto en 30 segundos — sin registro, sin email.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: "12+", label: "Roles" },
                { value: "5",   label: "Ciudades" },
                { value: "100", label: "Guías de salario" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-1">
              <TrustSection variant="minimal" />
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Búsquedas populares</p>
              <div className="flex flex-wrap gap-2">
                {FEATURED_CHECKS.map(({ slug, label }) => (
                  <Link
                    key={slug}
                    href={`/es/${slug}`}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: tool */}
          <div id="calculadora" className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6 sm:p-8">
            <SalaryToolES />
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                Datos actualizados a 2026 · Basado en benchmarks públicos y modelos estructurados ·{" "}
                <Link href="/methodology" className="text-orange-500 hover:underline">Metodología →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-100 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Cómo funciona</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Introduce tus datos", desc: "Selecciona tu puesto, ciudad, años de experiencia y salario actual." },
            { step: "02", title: "Calculamos tu valor de mercado", desc: "Aplicamos benchmarks de salarios oficiales y ajustes por experiencia y ubicación." },
            { step: "03", title: "Obtienes un veredicto claro", desc: "Ves tu percentil y si estás por debajo, en línea o por encima del mercado." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="space-y-3">
              <div className="text-3xl font-black text-orange-100">{step}</div>
              <h3 className="text-base font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guías de salario */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Guías de salario en España</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURATED_GUIDES.map((page) => (
            <Link
              key={page.slug}
              href={`/es/${page.slug}`}
              className="group block p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all"
            >
              <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {page.roleLabel}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{page.cityLabel}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ciudades */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Salarios por ciudad</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ES_CITIES.map((city) => (
            <Link
              key={city.esSlug}
              href={`/es/sueldo-${city.esSlug}-vs-madrid`}
              className="group block p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all"
            >
              <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {city.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Ver salarios →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">¿Tienes dudas? Compruébalo ahora.</h2>
          <p className="text-gray-400">30 segundos. Sin email. Sin registro.</p>
          <ScrollToTopButton />
        </div>
      </section>
    </>
  );
}
