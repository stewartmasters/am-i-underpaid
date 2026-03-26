import { ImageResponse } from "next/og";
import { getSeoPage } from "@/lib/seo-pages";
import { getMarketRange, formatSalary } from "@/lib/salary-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoPage(slug);

  // Fallback for unknown slugs
  const title = page?.h1 ?? "Salary Guide";
  const description = page?.description ?? "Find out if you're underpaid.";

  let rangeStr = "";
  let medianStr = "";
  if (page?.type === "role-location" && page.roleSlug && page.locationSlug) {
    const range = getMarketRange(page.roleSlug, page.locationSlug);
    rangeStr = `${formatSalary(range.low, range.currency)} – ${formatSalary(range.high, range.currency)}`;
    medianStr = `Median: ${formatSalary(range.median, range.currency)}`;
  }

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

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#9ca3af", fontSize: "22px", letterSpacing: "0.04em" }}>
            am i underpaid<span style={{ color: "#f97316" }}>?</span>
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", paddingTop: "24px", paddingBottom: "24px" }}>
          {/* Year badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(249,115,22,0.15)",
              border: "1px solid rgba(249,115,22,0.3)",
              borderRadius: "100px",
              padding: "6px 18px",
              marginBottom: "24px",
              width: "fit-content",
            }}
          >
            <span style={{ color: "#f97316", fontSize: "16px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              2026 Salary Guide
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 40 ? "56px" : "66px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
              marginBottom: "24px",
            }}
          >
            {title}
          </div>

          {/* Description */}
          {!rangeStr && (
            <div style={{ color: "#9ca3af", fontSize: "24px", maxWidth: "700px" }}>
              {description}
            </div>
          )}

          {/* Salary range card */}
          {rangeStr && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "24px 32px",
                marginTop: "8px",
                width: "fit-content",
              }}
            >
              <span style={{ color: "#6b7280", fontSize: "16px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Market range
              </span>
              <span style={{ color: "#f97316", fontSize: "44px", fontWeight: 800, letterSpacing: "-0.01em" }}>
                {rangeStr}
              </span>
              <span style={{ color: "#9ca3af", fontSize: "20px", marginTop: "6px" }}>
                {medianStr} · Gross annual base salary
              </span>
            </div>
          )}
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
            amiunderpaid.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
