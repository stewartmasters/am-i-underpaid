import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blogPosts";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://salaryverdict.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${BASE_URL}/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${slug}` },
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
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-gray-600 truncate">{post.title}</span>
      </nav>

      <header className="mb-10 space-y-4">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</time>
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

      {/* Ad slot: after article content, before CTA — natural break */}
      <div className="mt-10 mb-2" data-ad-slot="blog-post-after-content" aria-hidden="true" />

      <div className="mt-4 bg-orange-50 rounded-2xl p-8 text-center space-y-3 border border-orange-100">
        <h2 className="text-lg font-bold text-gray-900">Find out if you&apos;re underpaid</h2>
        <p className="text-sm text-gray-500">Enter your role, location, and salary. Takes 30 seconds.</p>
        <Link href="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">Check my salary →</Link>
      </div>

      {otherPosts.length > 0 && (
        <div className="mt-14 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">More articles</h2>
          <div className="space-y-3">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-all">
                <div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{p.title}</div>
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
