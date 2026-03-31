/**
 * postSocial.ts — SalaryVerdict social media auto-poster
 *
 * Usage:
 *   npx tsx scripts/postSocial.ts [--slot morning|midday|evening] [--dry-run]
 *
 * If --slot is omitted the slot is inferred from the current UTC hour:
 *   morning  → 06:00–11:59 UTC
 *   midday   → 11:00–14:59 UTC
 *   evening  → 15:00–20:59 UTC
 *
 * Env vars required (set as GitHub Secrets):
 *   ANTHROPIC_API_KEY
 *   X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET
 *   LINKEDIN_ACCESS_TOKEN, LINKEDIN_AUTHOR_URN   (format: urn:li:person:XXXXX)
 */

import Anthropic from "@anthropic-ai/sdk";
import { TwitterApi } from "twitter-api-v2";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SITE_URL = "https://www.salaryverdict.com";

/** 14 themes — one per day-of-year modulo 14 */
const THEMES = [
  { id: "underpaid_check",    prompt: "Ask if the reader knows they are underpaid and invite them to check their salary in 30 seconds with a link to SalaryVerdict." },
  { id: "salary_negotiation", prompt: "Share one powerful salary negotiation tip for European professionals and link to our salary negotiation blog post." },
  { id: "eu_salary_fact",     prompt: "Share a surprising fact about salary differences between two European cities (e.g. London vs Berlin, Amsterdam vs Barcelona) and link to SalaryVerdict." },
  { id: "job_hop",            prompt: "Discuss whether it is better to job-hop or stay put for salary growth in Europe, then link to our when-to-job-hop article." },
  { id: "remote_work",        prompt: "Share a tip about negotiating salary for remote roles in Europe and link to our remote-work salary negotiation article." },
  { id: "data_source",        prompt: "Explain that SalaryVerdict uses official government wage data (ONS, Eurostat, Destatis etc.) not crowdsourcing, and why that matters for accuracy." },
  { id: "role_spotlight",     prompt: "Pick one of these roles and share a salary insight for Europe: Software Engineer, Product Manager, Data Scientist, DevOps Engineer. Link to the relevant SalaryVerdict salary guide." },
  { id: "cost_of_living",     prompt: "Compare salary vs cost-of-living in two European cities and explain why gross salary alone is misleading. Link to our salary-vs-cost-of-living article." },
  { id: "competing_offer",    prompt: "Explain how to use a competing job offer to negotiate a raise without burning bridges, then link to our article on the topic." },
  { id: "percentile_explainer", prompt: "Explain what salary percentile means in plain English and why knowing yours is valuable. Invite readers to find their percentile at SalaryVerdict." },
  { id: "good_salary",        prompt: "Discuss what counts as a 'good salary' in London in 2026 and link to our 'What is a good salary in London' article." },
  { id: "avg_europe",         prompt: "Share one insight from average European salaries in 2026 and link to our average salaries in Europe article." },
  { id: "product_manager",    prompt: "Share a salary insight for Product Managers in Europe and link to our Product Manager salary guide." },
  { id: "free_no_signup",     prompt: "Remind followers that SalaryVerdict is completely free, takes 30 seconds, and requires no signup or email. Invite them to check their salary." },
];

/** Blog post URLs for contextual links */
const BLOG_LINKS: Record<string, string> = {
  salary_negotiation: `${SITE_URL}/blog/salary-negotiation-tips`,
  job_hop: `${SITE_URL}/blog/when-to-job-hop-vs-stay`,
  remote_work: `${SITE_URL}/blog/remote-work-salary-negotiation`,
  cost_of_living: `${SITE_URL}/blog/salary-vs-cost-of-living-europe`,
  competing_offer: `${SITE_URL}/blog/how-to-use-a-competing-offer-in-salary-negotiation`,
  good_salary: `${SITE_URL}/blog/what-is-a-good-salary-in-london`,
  avg_europe: `${SITE_URL}/blog/average-salaries-europe-2026`,
  product_manager: `${SITE_URL}/blog/product-manager-salary-europe-2026`,
};

// ---------------------------------------------------------------------------
// Arg parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  let slot: "morning" | "midday" | "evening" | null = null;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dry-run") dryRun = true;
    if (args[i] === "--slot" && args[i + 1]) {
      const s = args[i + 1] as string;
      if (s === "morning" || s === "midday" || s === "evening") slot = s;
      i++;
    }
  }

  if (!slot) {
    const hour = new Date().getUTCHours();
    if (hour < 12) slot = "morning";
    else if (hour < 15) slot = "midday";
    else slot = "evening";
  }

  return { slot, dryRun };
}

// ---------------------------------------------------------------------------
// Theme selection
// ---------------------------------------------------------------------------

function pickTheme() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getUTCFullYear(), 0, 0).getTime()) / 86_400_000
  );
  return THEMES[dayOfYear % THEMES.length];
}

// ---------------------------------------------------------------------------
// Content generation
// ---------------------------------------------------------------------------

async function generateContent(
  theme: (typeof THEMES)[number],
  slot: string
): Promise<{ xPost: string; linkedinPost: string }> {
  const client = new Anthropic();

  const blogLink = BLOG_LINKS[theme.id] ?? SITE_URL;
  const slotTone =
    slot === "morning"
      ? "energetic and motivating — people are starting their day"
      : slot === "midday"
      ? "informative and punchy — people are on a lunch break"
      : "reflective and action-oriented — people are wrapping up their workday";

  const systemPrompt = `You are the social media voice for SalaryVerdict (${SITE_URL}), a free salary benchmarking tool for European professionals built on official government wage data.

Brand voice: Direct, data-driven, no fluff. We respect our audience's intelligence. We never hype or exaggerate. We're the friend who tells you the truth about your salary.

Tone for this ${slot} post: ${slotTone}.

Always end posts with a clear call to action and relevant URL. Never use hashtags that feel spammy — max 3 relevant hashtags on LinkedIn, 2 on X.`;

  const userPrompt = `Write two versions of a social media post for today's theme:

THEME: ${theme.prompt}

Relevant link to include: ${blogLink}

FORMAT YOUR RESPONSE EXACTLY AS:
===X===
[X post — max 280 characters including the URL. Hook first, value second, CTA + URL last.]
===LINKEDIN===
[LinkedIn post — 150-300 words. Professional tone. Short paragraphs. End with a question to drive comments or a strong CTA. Include 2-3 relevant hashtags at the end.]`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    messages: [{ role: "user", content: userPrompt }],
    system: systemPrompt,
  });

  const raw = (message.content[0] as { type: string; text: string }).text;

  const xMatch = raw.match(/===X===\n([\s\S]*?)===LINKEDIN===/);
  const linkedinMatch = raw.match(/===LINKEDIN===\n([\s\S]*?)$/);

  const xPost = xMatch?.[1]?.trim() ?? raw.slice(0, 280).trim();
  const linkedinPost = linkedinMatch?.[1]?.trim() ?? raw.trim();

  return { xPost, linkedinPost };
}

// ---------------------------------------------------------------------------
// Post to X
// ---------------------------------------------------------------------------

async function postToX(text: string, dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log("\n[DRY RUN] X post:\n" + text);
    return;
  }

  const client = new TwitterApi({
    appKey: requireEnv("X_API_KEY"),
    appSecret: requireEnv("X_API_SECRET"),
    accessToken: requireEnv("X_ACCESS_TOKEN"),
    accessSecret: requireEnv("X_ACCESS_TOKEN_SECRET"),
  });

  const result = await client.v2.tweet(text);
  console.log(`✅ Posted to X: https://x.com/i/web/status/${result.data.id}`);
}

// ---------------------------------------------------------------------------
// Post to LinkedIn
// ---------------------------------------------------------------------------

async function postToLinkedIn(text: string, dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log("\n[DRY RUN] LinkedIn post:\n" + text);
    return;
  }

  const token = requireEnv("LINKEDIN_ACCESS_TOKEN");
  const author = requireEnv("LINKEDIN_AUTHOR_URN"); // e.g. urn:li:person:XXXXX

  const body = {
    author,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text },
        shareMediaCategory: "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LinkedIn API error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as { id: string };
  console.log(`✅ Posted to LinkedIn: ${data.id}`);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { slot, dryRun } = parseArgs();
  const theme = pickTheme();

  console.log(`\n🗓  Date: ${new Date().toISOString()}`);
  console.log(`⏰  Slot: ${slot}`);
  console.log(`🎯  Theme: ${theme.id}`);
  if (dryRun) console.log("🔍  DRY RUN — nothing will be posted\n");

  console.log("\nGenerating content with Claude...");
  const { xPost, linkedinPost } = await generateContent(theme, slot);

  console.log("\n--- X ---\n" + xPost);
  console.log("\n--- LinkedIn ---\n" + linkedinPost);

  await Promise.allSettled([
    postToX(xPost, dryRun).catch((e) => console.error("X error:", e.message)),
    postToLinkedIn(linkedinPost, dryRun).catch((e) =>
      console.error("LinkedIn error:", e.message)
    ),
  ]);

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
