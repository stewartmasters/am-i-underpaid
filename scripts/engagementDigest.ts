/**
 * engagementDigest.ts — LinkedIn engagement summary emailer
 *
 * Fetches likes and comments on the most recent LinkedIn posts and sends
 * a daily digest email via Resend so you can reply manually.
 *
 * Usage:
 *   npx tsx scripts/engagementDigest.ts [--dry-run]
 *
 * Env vars required:
 *   LINKEDIN_ACCESS_TOKEN
 *   LINKEDIN_AUTHOR_URN      (urn:li:person:XXXXX)
 *   RESEND_API_KEY
 *   DIGEST_EMAIL             (email address to send the digest to)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LinkedInPost {
  id: string;
  text: string;
  created: number;
}

interface LinkedInLike {
  actor: string;
  name?: string;
}

interface LinkedInComment {
  actor: string;
  name?: string;
  text: string;
  created: number;
}

// ---------------------------------------------------------------------------
// LinkedIn helpers
// ---------------------------------------------------------------------------

async function getRecentPosts(token: string, authorUrn: string): Promise<LinkedInPost[]> {
  const encoded = encodeURIComponent(authorUrn);
  const url = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encoded})&count=5&sortBy=LAST_MODIFIED`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Restli-Protocol-Version": "2.0.0",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch posts (${res.status}): ${err}`);
  }

  const data = (await res.json()) as {
    elements: Array<{
      id: string;
      created: { time: number };
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: string };
        };
      };
    }>;
  };

  return (data.elements ?? []).map((el) => ({
    id: el.id,
    text: el.specificContent?.["com.linkedin.ugc.ShareContent"]?.shareCommentary?.text ?? "",
    created: el.created?.time ?? 0,
  }));
}

async function getLikes(token: string, postId: string): Promise<LinkedInLike[]> {
  const encoded = encodeURIComponent(postId);
  const url = `https://api.linkedin.com/v2/socialActions/${encoded}/likes?count=50`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Restli-Protocol-Version": "2.0.0",
    },
  });

  if (!res.ok) return []; // silently skip if no permission

  const data = (await res.json()) as {
    elements: Array<{ actor: string }>;
  };

  return (data.elements ?? []).map((el) => ({ actor: el.actor }));
}

async function getComments(token: string, postId: string): Promise<LinkedInComment[]> {
  const encoded = encodeURIComponent(postId);
  const url = `https://api.linkedin.com/v2/socialActions/${encoded}/comments?count=50`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Restli-Protocol-Version": "2.0.0",
    },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as {
    elements: Array<{
      actor: string;
      message: { text: string };
      created: { time: number };
    }>;
  };

  return (data.elements ?? []).map((el) => ({
    actor: el.actor,
    text: el.message?.text ?? "",
    created: el.created?.time ?? 0,
  }));
}

// ---------------------------------------------------------------------------
// Email via Resend
// ---------------------------------------------------------------------------

async function sendDigestEmail(subject: string, html: string, dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log("\n[DRY RUN] Email subject:", subject);
    console.log("[DRY RUN] Email body (HTML):\n", html.replace(/<[^>]+>/g, "").trim());
    return;
  }

  const apiKey = requireEnv("RESEND_API_KEY");
  const to = requireEnv("DIGEST_EMAIL");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "SalaryVerdict <digest@salaryverdict.com>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err}`);
  }

  console.log(`✅ Digest email sent to ${to}`);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function buildHtml(posts: Array<{ post: LinkedInPost; likes: LinkedInLike[]; comments: LinkedInComment[] }>): string {
  const postHtml = posts.map(({ post, likes, comments }) => {
    const postUrl = `https://www.linkedin.com/feed/update/${encodeURIComponent(post.id)}/`;
    const preview = post.text.slice(0, 200) + (post.text.length > 200 ? "…" : "");

    const likesHtml = likes.length === 0
      ? "<p style='color:#888;font-size:13px'>No likes yet</p>"
      : `<p style='font-size:13px'><strong>${likes.length} like${likes.length !== 1 ? "s" : ""}</strong></p>`;

    const commentsHtml = comments.length === 0
      ? "<p style='color:#888;font-size:13px'>No comments yet</p>"
      : comments.map((c) => `
          <div style='background:#f9f9f9;border-left:3px solid #0077b5;padding:8px 12px;margin:6px 0;font-size:13px'>
            <strong>${c.actor}</strong><br/>
            ${c.text}<br/>
            <span style='color:#888;font-size:11px'>${formatDate(c.created)}</span>
          </div>`).join("");

    return `
      <div style='border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:20px'>
        <p style='font-size:12px;color:#888;margin:0 0 8px'>${formatDate(post.created)}</p>
        <p style='font-size:14px;margin:0 0 12px'>${preview}</p>
        <a href='${postUrl}' style='font-size:12px;color:#0077b5'>View on LinkedIn →</a>
        <hr style='border:none;border-top:1px solid #f0f0f0;margin:12px 0'/>
        ${likesHtml}
        ${commentsHtml}
      </div>`;
  }).join("");

  return `
    <div style='font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px'>
      <h2 style='color:#111;margin-bottom:4px'>SalaryVerdict LinkedIn Digest</h2>
      <p style='color:#666;font-size:13px;margin-bottom:24px'>${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      ${postHtml}
      <p style='font-size:12px;color:#aaa;margin-top:24px'>Reply to comments directly on LinkedIn. This digest is sent daily at 18:00 UTC.</p>
    </div>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) console.log("🔍 DRY RUN — no email will be sent\n");

  const token = requireEnv("LINKEDIN_ACCESS_TOKEN");
  const authorUrn = requireEnv("LINKEDIN_AUTHOR_URN");

  console.log("Fetching recent LinkedIn posts...");
  const posts = await getRecentPosts(token, authorUrn);

  if (posts.length === 0) {
    console.log("No posts found — nothing to digest.");
    return;
  }

  console.log(`Found ${posts.length} post(s). Fetching engagement...`);

  const enriched = await Promise.all(
    posts.map(async (post) => ({
      post,
      likes: await getLikes(token, post.id),
      comments: await getComments(token, post.id),
    }))
  );

  const totalLikes = enriched.reduce((n, e) => n + e.likes.length, 0);
  const totalComments = enriched.reduce((n, e) => n + e.comments.length, 0);

  console.log(`Total: ${totalLikes} likes, ${totalComments} comments across ${posts.length} posts`);

  const subject = `LinkedIn digest — ${totalLikes} likes, ${totalComments} comments`;
  const html = buildHtml(enriched);

  await sendDigestEmail(subject, html, dryRun);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
