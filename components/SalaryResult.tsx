"use client";

import { useState } from "react";
import { type SalaryResult, formatSalary, getSeniorityLabel, type ConfidenceLevel, CONFIDENCE_LABELS } from "@/lib/salary-data";
import { track } from "@/lib/analytics";

interface Props {
  result: SalaryResult;
  yearsOfExp?: number;
  onReset: () => void;
  roleLabel?: string;
  locationLabel?: string;
  confidenceLevel?: ConfidenceLevel;
}

const VERDICT_CONFIG = {
  underpaid: {
    headline: "You're likely underpaid.",
    sub: "Your salary is below what the market is paying for your role, location, and experience.",
    nextStep: "Worth bringing into your next compensation conversation.",
    bg: "bg-red-50", border: "border-red-200",
    badge: "bg-red-100 text-red-700", badgeLabel: "Below market",
    barColor: "bg-red-400", deltaColor: "text-red-600",
  },
  fair: {
    headline: "You're around market rate.",
    sub: "Your salary is broadly in line with what the market pays for this role.",
    nextStep: "You're roughly where the market expects you to be.",
    bg: "bg-amber-50", border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700", badgeLabel: "At market",
    barColor: "bg-amber-400", deltaColor: "text-amber-600",
  },
  overpaid: {
    headline: "You're above market.",
    sub: "You're earning more than most people in a comparable role. Well negotiated.",
    nextStep: "You're ahead of market. Nice place to negotiate from.",
    bg: "bg-emerald-50", border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700", badgeLabel: "Above market",
    barColor: "bg-emerald-400", deltaColor: "text-emerald-600",
  },
};

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

function buildShareText(verdict: SalaryResult["verdict"], percentile: number, deltaStr: string, roleLabel?: string, locationLabel?: string): string {
  const context = roleLabel && locationLabel ? ` (${roleLabel} · ${locationLabel})` : "";
  if (verdict === "underpaid") return `I just found out I might be underpaid by ~${deltaStr}/year${context}. Used this free salary checker to check my percentile.`;
  if (verdict === "overpaid") return `Apparently I'm in the top ${100 - percentile}% for my role${context}. Used this free salary tool to find out.`;
  return `I'm at the ${ordinal(percentile)} percentile for my role${context}. Checked using this free salary benchmarking tool.`;
}

export default function SalaryResult({ result, yearsOfExp, onReset, roleLabel, locationLabel, confidenceLevel }: Props) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const config = VERDICT_CONFIG[result.verdict];
  const { currency, low, median, high, percentile, delta } = result;
  const deltaAbs = Math.abs(delta);
  const deltaStr = formatSalary(Math.round(deltaAbs / 500) * 500, currency);
  const barPos = Math.max(5, Math.min(93, percentile));
  const seniorityLabel = yearsOfExp !== undefined ? getSeniorityLabel(yearsOfExp) : null;
  const shareText = buildShareText(result.verdict, percentile, deltaStr, roleLabel, locationLabel);
  const confidence = confidenceLevel ? CONFIDENCE_LABELS[confidenceLevel] : null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      track("share_link_copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText + " → " + window.location.href);
      setCopiedText(true);
      track("share_text_copied");
      setTimeout(() => setCopiedText(false), 2000);
    } catch {}
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://salaryverdict.com")}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://salaryverdict.com")}`;

  return (
    <div className={`rounded-2xl border ${config.border} ${config.bg} p-6 sm:p-8 space-y-6`}>
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${config.badge}`}>{config.badgeLabel}</span>
          {seniorityLabel && <span className="text-xs text-gray-400 font-medium">{seniorityLabel} level</span>}
          {confidence && (
            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${confidence.color}`} title={confidence.description}>
              {confidence.label}
            </span>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">{config.headline}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{config.sub}</p>
      </div>

      {/* Delta callout */}
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

      {/* Percentile bar */}
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

      {/* Market range */}
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

      {/* Next step */}
      <p className="text-sm text-gray-600 italic border-l-2 border-orange-200 pl-3">{config.nextStep}</p>

      {/* Share section */}
      <div className="bg-white/70 rounded-xl p-4 space-y-3 border border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Share your result</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-gray-900 text-white py-2.5 px-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {copiedText ? "Copied!" : "Copy share text"}
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold border border-gray-200 bg-white text-gray-600 py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {copied ? "Copied!" : "Copy result link"}
          </button>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("share_twitter")}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-black text-white py-2.5 px-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Share on X
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("share_linkedin")}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-blue-600 text-white py-2.5 px-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share on LinkedIn
          </a>
        </div>
        <p className="text-xs text-gray-400 text-center">Compare with a colleague → send them this link</p>
      </div>

      {/* Actions */}
      <button onClick={onReset} className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
        Check another role
      </button>

      <p className="text-xs text-gray-400 text-center">
        Based on public salary benchmarks and structured modelling.{" "}
        <a href="/methodology" className="text-orange-500 hover:underline">How we calculate</a>
      </p>
    </div>
  );
}
