import Link from "next/link";
import Image from "next/image";
import { TRUST_SOURCES } from "@/data/trustSources";

interface Props {
  /** "full" shows copy, logos, footnotes, and update date (default).
   *  "minimal" shows logos only with a single footnote line. */
  variant?: "full" | "minimal";
  locale?: "en" | "es";
}

export default function TrustSection({ variant = "full", locale = "en" }: Props) {
  const MONTH_YEAR = new Date().toLocaleDateString(locale === "es" ? "es-ES" : "en-GB", {
    month: "long",
    year: "numeric",
  });

  // Shared logo element — fixed 28px height, max 76px wide, grayscale
  // mix-blend-mode: multiply removes white padding without editing source files
  const LogoList = () => (
    <>
      {TRUST_SOURCES.map(({ src, alt }) => (
        <div key={alt} className="h-[33px] w-[88px] flex items-center justify-center flex-shrink-0">
          <Image
            src={src}
            alt={alt}
            width={88}
            height={33}
            className="opacity-50 grayscale hover:opacity-70 transition-opacity"
            style={{ maxHeight: "100%", maxWidth: "100%", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
          />
        </div>
      ))}
    </>
  );

  if (variant === "minimal") {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <LogoList />
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-xs font-medium text-gray-500 mb-3">
        {locale === "es"
          ? "Basado en estadísticas salariales oficiales y referencias verificadas del mercado"
          : "Built using official public salary datasets and verified market benchmarks"}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
        <LogoList />
        <span className="text-xs text-gray-400 font-medium">
          {locale === "es" ? "+ institutos nacionales de estadística" : "+ national statistical offices"}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-2.5">
        {locale === "es" ? "La cobertura varía según el rol y la ciudad." : "Coverage varies by role and location."}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-300">
          {locale === "es"
            ? `Actualizado ${MONTH_YEAR} · Basado en datos públicos y modelado estructurado`
            : `Updated ${MONTH_YEAR} · Based on public benchmarks & structured modelling`}
        </p>
        <Link
          href={locale === "es" ? "/es/metodologia" : "/methodology"}
          className="text-xs text-orange-500 hover:underline font-medium whitespace-nowrap ml-3"
        >
          {locale === "es" ? "Cómo calculamos →" : "How we calculate →"}
        </Link>
      </div>
    </div>
  );
}
