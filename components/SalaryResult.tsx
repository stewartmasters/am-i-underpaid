"use client";

import { type SalaryResult, formatSalary, getSeniorityLabel } from "@/lib/salary-data";

interface Props {
  result: SalaryResult;
  yearsOfExp?: number;
  onReset: () => void;
}

const VERDICT_CONFIG = {
  underpaid: { headline: "You're likely underpaid.", sub: "Your salary is below what the market is paying for your role, location, and experience.", bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100 text-red-700", badgeLabel: "Below market", barColor: "bg-red-400", deltaColor: "text-red-600" },
  fair:      { headline: "You're around market rate.", sub: "Your salary is broadly in line with what the market pays for this role.", bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700", badgeLabel: "At market", barColor: "bg-amber-400", deltaColor: "text-amber-600" },
  overpaid:  { headline: "You're above market.", sub: "You're earning more than most people in a comparable role. Well negotiated.", bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", badgeLabel: "Above market", barColor: "bg-emerald-400", deltaColor: "text-emerald-600" },
};

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

export default function SalaryResult({ result, yearsOfExp, onReset }: Props) {
  const config = VERDICT_CONFIG[result.verdict];
  const { currency, low, median, high, percentile, delta } = result;
  const deltaAbs = Math.abs(delta);
  const deltaStr = formatSalary(Math.round(deltaAbs / 500) * 500, currency);
  const barPos = Math.max(5, Math.min(93, percentile));

  const handleShare = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
  };

  const seniorityLabel = yearsOfExp !== undefined ? getSeniorityLabel(yearsOfExp) : null;

  return (
    <div className={`rounded-2xl border ${config.border} ${config.bg} p-6 sm:p-8 space-y-6`}>
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${config.badge}`}>{config.badgeLabel}</span>
          {seniorityLabel && <span className="text-xs text-gray-400 font-medium">{seniorityLabel} level</span>}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{config.headline}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{config.sub}</p>
      </div>

      {result.verdict === "underpaid" && (
        <div className="bg-white/60 rounded-xl p-4 space-y-1">
          <p className="text-sm text-gray-500">You may be missing out on</p>
          <p className={`text-2xl font-extrabold ${config.deltaColor}`}>{deltaStr}<span className="text-base font-semibold text-gray-500">/year</span></p>
          <p className="text-xs text-gray-400">compared to the mid-market rate for your role</p>
        </div>
      )}
      {result.verdict === "overpaid" && (
        <div className="bg-white/60 rounded-xl p-4 space-y-1">
          <p className="text-sm text-gray-500">You&apos;re earning</p>
          <p className={`text-2xl font-extrabold ${config.deltaColor}`}>{deltaStr}<span className="text-base font-semibold text-gray-500">/year</span></p>
          <p className="text-xs text-gray-400">above the mid-market rate for your role</p>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500 font-medium">
          <span>Bottom</span>
          <span className="font-bold text-gray-700">{ordinal(percentile)} percentile</span>
          <span>Top</span>
        </div>
        <div className="relative h-3 bg-gray-200 rounded-full overflow-visible">
          <div className={`absolute left-0 top-0 h-full ${config.barColor} rounded-full transition-all duration-700`} style={{ width: `${barPos}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-md" style={{ left: `calc(${barPos}% - 8px)` }} />
        </div>
        <p className="text-xs text-gray-400 text-center">
          {percentile <= 30 ? "Most people in your role earn more than you do." : percentile >= 70 ? "You're earning more than most people in your role." : "You're earning roughly what most people in your role earn."}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Market range for your role</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Low",    value: formatSalary(low, currency),    sub: "25th pct" },
            { label: "Median", value: formatSalary(median, currency), sub: "50th pct", hl: true },
            { label: "High",   value: formatSalary(high, currency),   sub: "75th pct" },
          ].map(({ label, value, sub, hl }) => (
            <div key={label} className={`rounded-xl p-3 text-center ${hl ? "bg-white shadow-sm ring-1 ring-gray-200" : "bg-white/60"}`}>
              <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
              <div className={`font-bold text-sm sm:text-base ${hl ? "text-gray-900" : "text-gray-700"}`}>{value}</div>
              <div className="text-xs text-gray-400">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button onClick={onReset} className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors">Check another role</button>
        <button onClick={handleShare} className="flex-1 border border-gray-200 bg-white text-gray-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">Copy link</button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Based on modelled benchmarks.{" "}
        <a href="/methodology" className="text-orange-500 hover:underline">How we calculate</a>
      </p>
    </div>
  );
}
