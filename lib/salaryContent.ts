/**
 * Content reader for SEO salary guide pages in /content/salary/*.md
 * Server-side only — uses Node fs. Do not import in client components.
 *
 * These are AI-generated informational pages published by the Verdict SEO Platform,
 * rendered under /salary/[slug] alongside the existing data-driven salary pages.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { BlogPost } from "@/data/blog-posts";

const CONTENT_DIR = path.join(process.cwd(), "content", "salary");
const CONTENT_DIR_ES = path.join(process.cwd(), "content", "salary", "es");

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function getFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && f !== ".gitkeep");
}

function getEsFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR_ES)) return [];
  return fs
    .readdirSync(CONTENT_DIR_ES)
    .filter((f) => f.endsWith(".md") && f !== ".gitkeep");
}

export function getAllSalaryContentSlugs(): { slug: string }[] {
  const files = getFiles();
  const slugs: { slug: string }[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    const slug = data.slug ?? file.replace(/\.md$/, "");
    if (slug && data.published !== false) slugs.push({ slug });
  }
  return slugs;
}

export function getAllEsSalaryContentSlugs(): { slug: string }[] {
  const slugs: { slug: string }[] = [];
  for (const file of getEsFiles()) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR_ES, file), "utf-8");
    const { data } = matter(raw);
    const slug = data.slug ?? file.replace(/\.md$/, "");
    if (slug && data.published !== false) slugs.push({ slug });
  }
  return slugs;
}

export function getEsSalaryContent(slug: string): BlogPost | null {
  if (!fs.existsSync(CONTENT_DIR_ES)) return null;
  const filePath = path.join(CONTENT_DIR_ES, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  if (data.published === false) return null;

  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(content) as string;

  return {
    slug: data.slug ?? slug,
    title: data.title ?? slug.replace(/-/g, " "),
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    readTime: data.readTime ?? estimateReadTime(content),
    content: html,
    primaryKeyword: data.keyword,
    cluster: data.cluster,
  };
}

export function getSalaryContent(slug: string): BlogPost | null {
  if (!fs.existsSync(CONTENT_DIR)) return null;
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  if (data.published === false) return null;

  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(content) as string;

  return {
    slug: data.slug ?? slug,
    title: data.title ?? slug.replace(/-/g, " "),
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    readTime: data.readTime ?? estimateReadTime(content),
    content: html,
    primaryKeyword: data.keyword,
    cluster: data.cluster,
  };
}
