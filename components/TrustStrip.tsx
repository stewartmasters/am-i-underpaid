import Link from "next/link";

export default function TrustStrip() {
  const MONTH_YEAR = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-xs text-gray-400 leading-relaxed">
          Based on public salary benchmarks and structured market modelling.{" "}
          <span className="text-gray-300">·</span>{" "}
          <span className="text-gray-400">Government wage data · industry reports · location-adjusted estimates</span>
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400 whitespace-nowrap">
          <span>Updated {MONTH_YEAR}</span>
          <span className="text-gray-200">·</span>
          <Link href="/methodology" className="text-orange-500 hover:underline font-medium">How we calculate →</Link>
        </div>
      </div>
    </div>
  );
}
