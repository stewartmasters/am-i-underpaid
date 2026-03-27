import type { Metadata } from "next";
import Link from "next/link";
import SalaryTool from "@/components/SalaryTool";
import TrustSection from "@/components/TrustSection";

export const metadata: Metadata = {
  title: "Check Your Salary — Am I Underpaid?",
  description: "Find out if you're underpaid in 30 seconds. Free, no signup required.",
  robots: { index: false, follow: false },
};

const TESTIMONIALS = [
  {
    quote: "Found out I was €12k below market. Had the conversation two weeks later. Got the raise.",
    name: "Software Engineer, London",
  },
  {
    quote: "Brought the result to my annual review. My manager couldn't argue with the data.",
    name: "Product Manager, Berlin",
  },
  {
    quote: "The fastest way I've found to know if it's worth pushing for more.",
    name: "Data Analyst, Amsterdam",
  },
];

export default function CheckPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 py-8 sm:py-14 px-4">
      <div className="max-w-lg mx-auto">

        {/* Headline */}
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            Free · No signup · Instant
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Are you being underpaid?
          </h1>
          <p className="text-gray-500 text-base">
            Enter your details below and find out exactly where you stand in 30 seconds.
          </p>
        </div>

        {/* Tool card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6 sm:p-8 mb-6">
          <SalaryTool />
          <TrustSection />
        </div>

        {/* Social proof */}
        <div className="text-center text-xs text-gray-400 mb-6">
          Used by <strong className="text-gray-500">50,000+</strong> professionals across Europe
        </div>

        {/* Testimonials */}
        <div className="space-y-3 mb-8">
          {TESTIMONIALS.map(({ quote, name }) => (
            <div key={name} className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{quote}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-2 font-medium">— {name}</p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <p className="text-center text-xs text-gray-400">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            ← Back to salaryverdict.com
          </Link>
        </p>
      </div>
    </div>
  );
}
