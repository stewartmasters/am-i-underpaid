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
  { id: "underpaid_check",    prompt: "Ask if the reader actually knows whether they are underpaid. Explain that SalaryVerdict lets you enter your role, location, and years of experience and instantly see how your salary compares against official government wage data — telling you whether you are underpaid, at market, or above it. It takes 30 seconds and is free with no signup.", link: SITE_URL },
  { id: "salary_negotiation", prompt: "Share one practical salary negotiation tip for European professionals. Keep it specific and actionable. Link to the salary negotiation blog post.", link: `${SITE_URL}/blog/salary-negotiation-tips` },
  { id: "eu_salary_fact",     prompt: "Share a thought-provoking question or observation about how salaries vary between two European cities (e.g. London vs Berlin, Amsterdam vs Barcelona). Do NOT invent specific numbers. Invite people to check their own salary against official data using SalaryVerdict.", link: SITE_URL },
  { id: "job_hop",            prompt: "Discuss the trade-offs between job-hopping and staying put for salary growth in Europe. Keep it balanced and practical. Link to the when-to-job-hop article.", link: `${SITE_URL}/blog/when-to-job-hop-vs-stay` },
  { id: "remote_work",        prompt: "Share a practical tip about negotiating salary for remote roles in Europe. Link to the remote work salary negotiation article.", link: `${SITE_URL}/blog/remote-work-salary-negotiation` },
  { id: "data_source",        prompt: "Explain that SalaryVerdict is built on official government wage data from sources like ONS, Eurostat, and Destatis — not crowdsourcing or self-reported surveys. Explain why this matters for getting an accurate picture. Invite people to check their salary.", link: SITE_URL },
  { id: "signs_underpaid",    prompt: "Share two or three signs that someone might be underpaid, without inventing salary figures. Link to the signs-you-are-underpaid blog post and invite people to verify using SalaryVerdict.", link: `${SITE_URL}/blog/signs-you-are-underpaid` },
  { id: "cost_of_living",     prompt: "Explain why comparing salaries across European cities without accounting for cost of living can be misleading. Keep it conceptual — do not invent specific numbers. Invite people to check their salary against official government data using SalaryVerdict.", link: SITE_URL },
  { id: "competing_offer",    prompt: "Explain how professionals can use a competing job offer as leverage in salary negotiations, and the risks to avoid. Link to the competing offer article.", link: `${SITE_URL}/blog/how-to-use-a-competing-offer-in-salary-negotiation` },
  { id: "percentile_explainer", prompt: "Explain in plain English what a salary percentile means and why knowing where you sit relative to others in your role and location is more useful than just knowing the average. Invite readers to find their percentile free at SalaryVerdict.", link: SITE_URL },
  { id: "good_salary_london", prompt: "Pose the question of what counts as a good salary in London in 2026 — without making up figures. Acknowledge it depends on role, experience, and lifestyle. Invite readers to check how their salary compares using SalaryVerdict. Link to the what-is-a-good-salary-in-london article.", link: `${SITE_URL}/blog/what-is-a-good-salary-in-london` },
  { id: "how_to_increase",    prompt: "Share one concrete strategy for increasing your salary — whether through negotiation, career moves, or upskilling. Link to the how-to-increase-your-salary article.", link: `${SITE_URL}/blog/how-to-increase-your-salary` },
  { id: "product_manager",    prompt: "Share a thought or question about Product Manager salaries in Europe — without inventing specific figures. Invite readers to see how their PM salary compares using SalaryVerdict. Link to the PM salary article.", link: `${SITE_URL}/blog/product-manager-salary-europe-2026` },
  { id: "free_no_signup",     prompt: "Remind followers that SalaryVerdict is completely free, takes 30 seconds, and requires no signup or email. You enter your role, location, and years of experience and instantly see whether you are underpaid, at market, or above it — based on official government data.", link: SITE_URL },
];

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

  const blogLink = theme.link;
  const slotTone =
    slot === "morning"
      ? "energetic and motivating — people are starting their day"
      : slot === "midday"
      ? "informative and punchy — people are on a lunch break"
      : "reflective and action-oriented — people are wrapping up their workday";

  const systemPrompt = `You are the social media voice for SalaryVerdict (${SITE_URL}), a free tool that tells European professionals whether they are underpaid, at market, or above market — based on official government wage data from sources like ONS, Eurostat, and Destatis.

How it works: you enter your role, location, and years of experience, and in 30 seconds you get a verdict on where your salary sits relative to the market. No signup, no email, completely free.

IMPORTANT rules:
- Never invent or state specific salary figures. The tool gives a personalised verdict — you don't publish salary tables.
- Never imply we crowdsource data or use self-reported surveys. We use official government datasets.
- Do not overstate what we do. We benchmark — we don't guarantee or promise earnings.
- Brand voice: direct, honest, data-driven. No hype. We're the friend who gives you a straight answer about your pay.

Tone for this ${slot} post: ${slotTone}.

Always end posts with a clear call to action and the relevant URL. Max 2 hashtags on X, max 3 on LinkedIn. No spammy hashtags.`;

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

async function getLinkedInAuthorURN(token: string): Promise<string> {
  // LINKEDIN_AUTHOR_URN can be set explicitly, or we fetch it via userinfo
  const explicit = process.env.LINKEDIN_AUTHOR_URN;
  if (explicit) return explicit;

  // Try userinfo endpoint (requires openid + profile scopes)
  const res = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const data = (await res.json()) as { sub: string };
    return `urn:li:person:${data.sub}`;
  }

  throw new Error(
    "Could not determine LinkedIn author URN. Please set LINKEDIN_AUTHOR_URN secret as urn:li:person:YOUR_ID"
  );
}

async function postToLinkedIn(text: string, dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log("\n[DRY RUN] LinkedIn post:\n" + text);
    return;
  }

  const token = requireEnv("LINKEDIN_ACCESS_TOKEN");
  const author = await getLinkedInAuthorURN(token);

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

  const hasXCreds =
    process.env.X_API_KEY &&
    process.env.X_API_SECRET &&
    process.env.X_ACCESS_TOKEN &&
    process.env.X_ACCESS_TOKEN_SECRET;

  await Promise.allSettled([
    hasXCreds
      ? postToX(xPost, dryRun).catch((e) => console.error("X error:", e.message))
      : Promise.resolve(console.log("⏭  X credentials not set — skipping")),
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
