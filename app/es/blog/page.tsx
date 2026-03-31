import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPostsES } from "@/data/blog-posts-es";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";

export const metadata: Metadata = {
  title: "Blog de salarios en España",
  description: "Consejos sobre negociación salarial, cómo saber si cobras poco y salarios medios en España. Contenido práctico y sin relleno sobre finanzas laborales.",
  alternates: {
    canonical: `${BASE_URL}/es/blog`,
    languages: {
      es: `${BASE_URL}/es/blog`,
      en: `${BASE_URL}/blog`,
      "x-default": `${BASE_URL}/blog`,
    },
  },
};

export default function EsBlogPage() {
  const posts = getAllBlogPostsES();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-500 text-lg">Consejos prácticos sobre salarios, negociación y finanzas laborales. Sin relleno.</p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/es/blog/${post.slug}`}
            className="group block p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">{post.description}</p>
            <span className="inline-block mt-3 text-sm font-semibold text-orange-500 group-hover:underline">
              Leer más →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14 bg-orange-50 rounded-2xl p-8 text-center space-y-4 border border-orange-100">
        <h2 className="text-xl font-bold text-gray-900">¿Cobras lo que mereces?</h2>
        <p className="text-gray-500 text-sm">Compruébalo en 30 segundos. Sin registro.</p>
        <Link
          href="/es/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Comprobar mi sueldo →
        </Link>
      </div>
    </div>
  );
}
