import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Salary & Pay Blog",
  description: "Tips on salary negotiation, how to know if you're underpaid, and average salaries across Europe. Practical, no-fluff career finance content.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-500 text-lg">Practical advice on salary, negotiation, and career finance. No fluff.</p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{post.description}</p>
            <span className="inline-block mt-3 text-sm font-semibold text-orange-500 group-hover:underline">Read more →</span>
          </Link>
        ))}
      </div>

      <div className="mt-14 bg-orange-50 rounded-2xl p-8 text-center space-y-4 border border-orange-100">
        <h2 className="text-xl font-bold text-gray-900">Ready to check your salary?</h2>
        <p className="text-gray-500 text-sm">Takes 30 seconds. No signup required.</p>
        <Link href="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">Check my salary →</Link>
      </div>
    </div>
  );
}
