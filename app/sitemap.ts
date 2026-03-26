import type { MetadataRoute } from "next";
import { generateSeoPages } from "@/lib/seo-pages";
import { BLOG_POSTS } from "@/data/blog-posts";

const BASE_URL = "https://amiunderpaid.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = generateSeoPages();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const salaryRoutes: MetadataRoute.Sitemap = seoPages.map((p) => ({
    url: `${BASE_URL}/salary/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.type === "role-location" ? 0.9 : 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...salaryRoutes, ...blogRoutes];
}
