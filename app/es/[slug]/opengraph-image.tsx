import { ImageResponse } from "next/og";
import { getEsPage, generateEsPages } from "@/lib/es/seo-pages-es";
import { getMarketRange, formatSalary } from "@/lib/salary-data";

export function generateStaticParams() {
  return generateEsPages().map((p) => ({ slug: p.slug }));
}

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getEsPage(slug);

  const title = page?.h1 ?? "Guía salarial";

  let rangeStr = "";
  let medianStr = "";
  if (page?.type === "role-city" && page.roleDataSlug && page.cityDataSlug) {
    const range = getMarketRange(page.roleDataSlug, page.cityDataSlug);
    rangeStr = `${formatSalary(range.low, range.currency)} – ${formatSalary(range.high, range.currency)}`;
    medianStr = `Mediana: ${formatSalary(range.median, range.currency)}`;
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
            ¿cobro poco<span style={{ color: "#f97316" }}>?</span>
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
              alignSelf: "flex-start",
            }}
          >
            <span style={{ color: "#f97316", fontSize: "16px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Guía Salarial 2026
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 40 ? "52px" : "62px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
              marginBottom: "24px",
            }}
          >
            {title}
          </div>

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
                alignSelf: "flex-start",
              }}
            >
              <span style={{ color: "#6b7280", fontSize: "16px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Horquilla salarial
              </span>
              <span style={{ color: "#f97316", fontSize: "44px", fontWeight: 800, letterSpacing: "-0.01em" }}>
                {rangeStr}
              </span>
              <span style={{ color: "#9ca3af", fontSize: "20px", marginTop: "6px" }}>
                {medianStr} · Salario bruto anual
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
            Comparativa salarial gratuita · Sin registro
          </span>
          <span style={{ color: "#4b5563", fontSize: "18px" }}>
            salaryverdict.com/es
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
