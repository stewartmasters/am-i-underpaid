import type { Metadata } from "next";
import Link from "next/link";
import SalaryTool from "@/components/SalaryTool";
import TrustSection from "@/components/TrustSection";

export const metadata: Metadata = {
  title: "Check Your Salary — SalaryVerdict",
  description: "Find out if you're underpaid in 30 seconds. Free, no signup required.",
  robots: { index: false, follow: false },
};

const TRUST_FACTS = [
  { value: "8", label: "official data sources" },
  { value: "33", label: "role types covered" },
  { value: "12", label: "European locations" },
];

export default function CheckPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 py-8 sm:py-14 px-4">
      <div className="max-w-lg mx-auto">

        {/* Headline */}
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            Free · No signup · 30 seconds
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Are you being underpaid?
          </h1>
          <p className="text-gray-500 text-base">
            Enter your details and find out exactly where you stand against official government salary data.
          </p>
        </div>

        {/* Tool card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6 sm:p-8 mb-6">
          <SalaryTool />
          <TrustSection />
        </div>

        {/* Factual trust stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {TRUST_FACTS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-xl font-extrabold text-gray-900">{value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <p className="text-center text-xs text-gray-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            ← Back to SalaryVerdict
          </Link>
        </p>
      </div>
    </div>
  );
}
