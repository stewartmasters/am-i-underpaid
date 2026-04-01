import { ImageResponse } from "next/og";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blogPosts";

export function generateStaticParams() {
  return getAllBlogSlugs();
}

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const title = post?.title ?? "SalaryVerdict Blog";
  const description = post?.description ?? "Salary tips and career finance advice.";
  const readTime = post?.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#111827",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "64px 90px",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #f97316, #ea580c)",
          }}
        />

        {/* Brand + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#9ca3af", fontSize: "22px", letterSpacing: "0.04em" }}>
            Salary<span style={{ color: "#f97316" }}>Verdict</span>
          </span>
          <span style={{ color: "#374151", fontSize: "22px" }}>·</span>
          <span style={{ color: "#6b7280", fontSize: "20px" }}>Blog</span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", paddingTop: "32px", paddingBottom: "32px" }}>
          {/* Read time badge */}
          {readTime && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(249,115,22,0.15)",
                border: "1px solid rgba(249,115,22,0.3)",
                borderRadius: "100px",
                padding: "6px 18px",
                marginBottom: "28px",
                alignSelf: "flex-start",
              }}
            >
              <span style={{ color: "#f97316", fontSize: "16px", fontWeight: 600, letterSpacing: "0.04em" }}>
                {readTime}
              </span>
            </div>
          )}

          {/* Title */}
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 50 ? "48px" : title.length > 35 ? "58px" : "68px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "960px",
              marginBottom: "28px",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              color: "#9ca3af",
              fontSize: "24px",
              lineHeight: 1.4,
              maxWidth: "820px",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ color: "#4b5563", fontSize: "18px" }}>
            Free salary checker · No signup required
          </span>
          <span style={{ color: "#4b5563", fontSize: "18px" }}>
            salaryverdict.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
