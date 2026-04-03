import type { Metadata } from "next";
import Link from "next/link";
import { getAllEsSalaryContentSlugs, getEsSalaryContent } from "@/lib/salaryContent";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";

export const metadata: Metadata = {
  title: "Guías de sueldos por ciudad y puesto — SalaryVerdict",
  description:
    "Sueldos medios por puesto y ciudad en Europa y España. Datos reales para saber si cobras lo que mereces en 2026.",
  alternates: {
    canonical: `${BASE_URL}/es/salario`,
    languages: {
      "en": `${BASE_URL}/salary`,
      "es": `${BASE_URL}/es/salario`,
      "x-default": `${BASE_URL}/salary`,
    },
  },
};

export default function EsSalarioIndex() {
  const slugs = getAllEsSalaryContentSlugs();
  const posts = slugs
    .map(({ slug }) => getEsSalaryContent(slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getEsSalaryContent>>[];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-10">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sueldos</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          ¿Cuánto deberías cobrar?
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Sueldos medios por puesto y ciudad en España y Europa. Benchmarks reales para 2026.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">Próximamente — vuelve pronto.</p>
      ) : (
        <div className="space-y-px">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/es/salario/${post.slug}`}
              className="group block py-5 border-b border-gray-100 hover:border-orange-200 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2 text-xs text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-sm text-gray-500 leading-relaxed">{post.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-14 bg-orange-50 rounded-2xl p-8 text-center space-y-4 border border-orange-100">
        <h2 className="text-xl font-bold text-gray-900">¿Cobras lo que mereces?</h2>
        <p className="text-gray-500 text-sm">Compruébalo en 30 segundos. Sin registro.</p>
        <Link
          href="/es"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Comprobar mi sueldo →
        </Link>
      </div>
    </div>
  );
}
