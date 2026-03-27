"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type SalaryResult, formatSalary, type ConfidenceLevel } from "@/lib/salary-data";
import { ES_VERDICT, ES_CONFIDENCE_LABELS } from "@/lib/es/config";
import { track } from "@/lib/analytics";

const SAVE_KEY = "salary_verdict_saved_es";

interface Props {
  result: SalaryResult;
  yearsOfExp?: number;
  onReset: () => void;
  roleLabel?: string;
  cityLabel?: string;
  confidenceLevel?: ConfidenceLevel;
}

function ordinalEs(n: number): string {
  return `percentil ${n}`;
}

function buildShareCardEs(
  verdict: SalaryResult["verdict"],
  percentile: number,
  deltaStr: string,
  roleLabel?: string,
  cityLabel?: string
): string {
  const ctx = roleLabel && cityLabel ? `${roleLabel} · ${cityLabel}` : (roleLabel ?? cityLabel ?? "");
  const pctLine = percentile <= 50
    ? `En el ${100 - percentile}% más bajo para mi puesto`
    : `En el ${100 - percentile}% más alto para mi puesto`;
  const lines: string[] = [];
  if (verdict === "well-below") lines.push(`😬 Probablemente cobro ~${deltaStr} por debajo del mercado`);
  else if (verdict === "slightly-below") lines.push("😐 Mi salario puede estar algo por debajo del mercado");
  else if (verdict === "above") lines.push("😎 Estoy por encima del mercado");
  else lines.push("🙂 Estoy en línea con el mercado");
  lines.push(pctLine);
  if (ctx) lines.push(ctx);
  lines.push("salaryverdict.com/es");
  return lines.join("\n");
}

export default function SalaryResultES({ result, yearsOfExp, onReset, roleLabel, cityLabel, confidenceLevel }: Props) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCard, setCopiedCard] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(SAVE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed.verdict === result.verdict && parsed.roleSlug === result.roleSlug && parsed.locationSlug === result.locationSlug) setSaved(true);
      }
    } catch { /* ignore */ }
  }, [result]);

  const handleSave = () => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        verdict: result.verdict, percentile: result.percentile, median: result.median,
        delta: result.delta, currency: result.currency, roleSlug: result.roleSlug,
        locationSlug: result.locationSlug, roleLabel, cityLabel, savedAt: new Date().toISOString(),
      }));
      setSaved(true);
      track("result_saved" as Parameters<typeof track>[0]);
    } catch { /* ignore */ }
  };

  const config = ES_VERDICT[result.verdict];
  const { currency, low, median, high, percentile, delta, recordCount, sourceCount } = result;
  const currentSalary = median + delta;
  const deltaAbs = Math.abs(delta);
  const deltaStr = formatSalary(Math.round(deltaAbs / 500) * 500, currency);
  const gapDisplay = Math.round(deltaAbs / 500) * 500 === 0 ? "—" : `${delta > 0 ? "+" : "-"}${deltaStr}`;
  const barPos = Math.max(4, Math.min(94, percentile));
  const isBelow = result.verdict === "well-below" || result.verdict === "slightly-below";
  const showWhyItMatters = isBelow && deltaAbs >= 3000;
  const fiveYearStr = showWhyItMatters ? formatSalary(Math.round((deltaAbs * 5) / 1000) * 1000, currency) : null;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "https://salaryverdict.com/es";
  const shareCard = buildShareCardEs(result.verdict, percentile, deltaStr, roleLabel, cityLabel);
  const pctBelow = 100 - percentile;
  const roleCtx = roleLabel ? `${roleLabel}s` : "este puesto";
  const cityCtx = cityLabel ? ` en ${cityLabel}` : "";
  const percentileHeadline = percentile <= 50
    ? `${pctBelow}% más bajo para ${roleCtx}${cityCtx}`
    : `${100 - percentile}% más alto para ${roleCtx}${cityCtx}`;
  const percentileMicrocopy = isBelow
    ? `Cobras menos que aproximadamente el ${pctBelow}% de personas en roles similares.`
    : result.verdict === "above"
    ? `Cobras más que aproximadamente el ${percentile}% de personas en roles similares.`
    : "Cobras aproximadamente lo mismo que la mayoría de personas en tu puesto.";

  const MONTH_YEAR = new Date().toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const confidence = confidenceLevel ? ES_CONFIDENCE_LABELS[confidenceLevel as keyof typeof ES_CONFIDENCE_LABELS] : null;
  const seniorityLabel = yearsOfExp !== undefined
    ? (yearsOfExp <= 2 ? "Junior" : yearsOfExp <= 6 ? "Mid-level" : yearsOfExp <= 12 ? "Senior" : "Lead")
    : null;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCard + "\n\n")}&url=${encodeURIComponent(pageUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareCard + "\n\n" + pageUrl)}`;

  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(pageUrl); setCopiedLink(true); track("share_link_copied"); setTimeout(() => setCopiedLink(false), 2500); } catch { /* ignore */ }
  };
  const handleCopyCard = async () => {
    try { await navigator.clipboard.writeText(shareCard); setCopiedCard(true); track("share_text_copied"); setTimeout(() => setCopiedCard(false), 2500); } catch { /* ignore */ }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">

      {/* TRUST / STATUS ROW */}
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${config.badge}`}>
            {config.badgeLabel}
          </span>
          {seniorityLabel && <span className="text-xs text-gray-400">Nivel {seniorityLabel}</span>}
        </div>
        <div className="flex items-center gap-2">
          {confidence && (
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${confidence.color}`}>
              {confidence.label}
            </span>
          )}
          <span className="text-xs text-gray-400 capitalize">{MONTH_YEAR}</span>
        </div>
      </div>
      {recordCount != null && recordCount > 0 && (
        <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
          <p className="text-xs text-gray-400">
            {sourceCount != null && sourceCount > 0 ? `Basado en ${sourceCount} fuente${sourceCount !== 1 ? "s" : ""} · ` : ""}
            {recordCount} registros salariales
          </p>
        </div>
      )}

      {/* HERO VERDICT */}
      <div className={`px-5 pt-5 pb-5 ${config.heroBg}`}>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
          Respuesta corta:{" "}
          <span className="text-gray-700 normal-case tracking-normal font-semibold">{config.shortAnswer}</span>
        </p>
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5 flex-shrink-0" role="img" aria-hidden="true">{config.emoji}</span>
          <div className="space-y-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">{config.headline}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{config.heroSub}</p>
          </div>
        </div>

        {/* 3-stat row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/70 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-400 font-medium mb-1">Tu salario</div>
            <div className="font-bold text-gray-900 text-sm sm:text-base leading-tight">{formatSalary(currentSalary, currency)}</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center ring-1 ring-gray-200 shadow-sm">
            <div className="text-xs text-gray-400 font-medium mb-1">Mediana del mercado</div>
            <div className="font-bold text-gray-900 text-sm sm:text-base leading-tight">{formatSalary(median, currency)}</div>
          </div>
          <div className="bg-white/70 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-400 font-medium mb-1">Diferencia</div>
            <div className={`font-bold text-sm sm:text-base leading-tight ${delta > 0 ? "text-emerald-600" : delta < 0 ? config.gapColor : "text-gray-500"}`}>
              {gapDisplay}
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">

        {/* PERCENTILE */}
        <div className="px-5 py-5 space-y-3">
          <h3 className="font-bold text-gray-900 text-base">{percentileHeadline}</h3>
          <div className="space-y-2">
            <div className="relative h-2.5 bg-gray-200 rounded-full overflow-visible">
              <div className={`absolute left-0 top-0 h-full ${config.barColor} rounded-full transition-all duration-700`} style={{ width: `${barPos}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-md" style={{ left: `calc(${barPos}% - 8px)` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 font-medium">
              <span>Más bajo</span>
              <span className="text-gray-700 font-bold">{ordinalEs(percentile)}</span>
              <span>Más alto</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{percentileMicrocopy}</p>
        </div>

        {/* MARKET RANGE */}
        <div className="px-5 py-5 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Horquilla salarial del mercado</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Bajo", value: formatSalary(low, currency), sub: "Percentil 25" },
              { label: "Mediana", value: formatSalary(median, currency), sub: "Percentil 50", hl: true },
              { label: "Alto", value: formatSalary(high, currency), sub: "Percentil 75" },
            ].map(({ label, value, sub, hl }) => (
              <div key={label} className={`rounded-xl p-3 text-center ${hl ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
                <div className={`text-xs font-medium mb-1 ${hl ? "text-gray-400" : "text-gray-400"}`}>{label}</div>
                <div className={`font-bold text-sm sm:text-base ${hl ? "text-white" : "text-gray-700"}`}>{value}</div>
                <div className={`text-xs mt-0.5 ${hl ? "text-gray-500" : "text-gray-400"}`}>{sub}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">Solo salario base bruto. No incluye bonus, variable ni equity.</p>
        </div>

        {/* WHY IT MATTERS */}
        {showWhyItMatters ? (
          <div className="px-5 py-5 space-y-2">
            <h3 className="font-bold text-gray-900 text-base">Por qué importa</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Una diferencia de {deltaStr} hoy suele acumularse con el tiempo. En 5 años, eso equivale a{" "}
              <strong className="text-gray-800">{fiveYearStr}</strong> en retribución bruta — antes de considerar futuras subidas.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-orange-200 pl-3">{config.nextStep}</p>
          </div>
        ) : (
          <div className="px-5 py-4">
            <p className="text-sm text-gray-500 italic border-l-2 border-gray-200 pl-3">{config.nextStep}</p>
          </div>
        )}

        {/* SHARE */}
        <div className="px-5 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">Comparte tu resultado</h3>
            <span className="text-xs text-gray-400">Compara con un amigo →</span>
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-3.5 font-mono text-xs text-gray-200 whitespace-pre leading-relaxed select-all cursor-pointer" onClick={handleCopyCard}>
            {shareCard}
          </div>
          <button onClick={handleCopyCard} className="w-full flex items-center justify-center gap-2 text-sm font-bold bg-gray-900 text-white py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors">
            {copiedCard ? "✓ ¡Copiado!" : "Copiar y compartir"}
          </button>
          <div className="grid grid-cols-3 gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("share_whatsapp")} className="flex items-center justify-center text-xs font-semibold bg-green-500 text-white py-2.5 px-2 rounded-lg hover:bg-green-600 transition-colors">
              WhatsApp
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("share_linkedin")} className="flex items-center justify-center text-xs font-semibold bg-blue-600 text-white py-2.5 px-2 rounded-lg hover:bg-blue-700 transition-colors">
              LinkedIn
            </a>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("share_twitter")} className="flex items-center justify-center text-xs font-semibold bg-black text-white py-2.5 px-2 rounded-lg hover:bg-gray-900 transition-colors">
              X
            </a>
          </div>
          <button onClick={handleCopyLink} className="w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors text-center">
            {copiedLink ? "✓ Enlace copiado" : "o copiar enlace"}
          </button>
        </div>

        {/* EXPLORAR MÁS */}
        <div className="px-5 py-4 bg-gray-50 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Explorar más</p>
          <div className="grid grid-cols-1 gap-2">
            <button onClick={onReset} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors text-sm">
              Comprobar otro salario →
            </button>
            <Link href="/es/" className="flex items-center justify-center text-xs font-medium border border-gray-200 bg-white text-gray-700 py-2.5 px-3 rounded-lg hover:border-orange-200 hover:text-orange-600 transition-colors text-center">
              Ver guías de salario en España
            </Link>
          </div>
          <button onClick={handleSave} disabled={saved} className="w-full text-xs font-medium text-gray-400 hover:text-gray-600 py-1 transition-colors disabled:cursor-default text-center">
            {saved ? "✓ Guardado en este navegador" : "Guardar resultado para revisarlo más tarde"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 bg-gray-50">
          <p className="text-xs text-gray-400">
            Basado en datos oficiales de salarios (Eurostat, INE, Destatis) y benchmarks de mercado verificados.{" "}
            <Link href="/methodology" className="text-orange-500 hover:underline">Metodología →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
