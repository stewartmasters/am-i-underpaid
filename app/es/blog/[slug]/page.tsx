import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPostsES, getBlogPostBySlugES, getAllBlogSlugES } from "@/data/blog-posts-es";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugES();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlugES(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/es/blog/${slug}`,
      languages: {
        es: `${BASE_URL}/es/blog/${slug}`,
        "x-default": `${BASE_URL}/blog`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: "es_ES",
    },
  };
}

export default async function EsBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlugES(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPostsES();
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "es",
    url: `${BASE_URL}/es/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/es/blog/${slug}` },
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "SalaryVerdict",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "SalaryVerdict",
      url: BASE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/es` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/es/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/es/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
          <Link href="/es/" className="hover:text-orange-500 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/es/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate">{post.title}</span>
        </nav>

        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3 text-xs text-gray-400">
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
          <p className="text-lg text-gray-500">{post.description}</p>
        </header>

        <article
          className="prose prose-gray prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-ul:space-y-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-10 mb-2" data-ad-slot="blog-post-after-content" aria-hidden="true" />

        <div className="mt-4 bg-orange-50 rounded-2xl p-8 text-center space-y-3 border border-orange-100">
          <h2 className="text-lg font-bold text-gray-900">¿Cobras lo que mereces?</h2>
          <p className="text-sm text-gray-500">Introduce tu puesto, ciudad y salario. Tarda 30 segundos.</p>
          <Link
            href="/es/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Comprobar mi sueldo →
          </Link>
        </div>

        {otherPosts.length > 0 && (
          <div className="mt-14 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Más artículos</h2>
            <div className="space-y-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/es/blog/${p.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-all"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {p.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{p.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
