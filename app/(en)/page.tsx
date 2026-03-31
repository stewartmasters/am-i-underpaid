import type { Metadata } from "next";
import SalaryTool from "@/components/SalaryTool";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TrustSection from "@/components/TrustSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Am I Underpaid? — Free Salary Checker",
  description:
    "Find out instantly if you're underpaid. Enter your role, location, and years of experience. Get your market salary range and percentile in seconds. No signup.",
};

const FEATURED_CHECKS = [
  { role: "software-engineer", location: "london",    label: "Software Engineer · London" },
  { role: "product-manager",   location: "berlin",    label: "Product Manager · Berlin" },
  { role: "designer",          location: "amsterdam", label: "Designer · Amsterdam" },
  { role: "marketing-manager", location: "paris",     label: "Marketing Manager · Paris" },
  { role: "sales-manager",     location: "dublin",    label: "Sales Manager · Dublin" },
  { role: "operations-manager",location: "barcelona", label: "Operations Manager · Barcelona" },
];

const CURATED_GUIDES = [
  { role: "software-engineer",          location: "london",    roleLabel: "Software Engineer",          locationLabel: "London" },
  { role: "product-manager",            location: "berlin",    roleLabel: "Product Manager",            locationLabel: "Berlin" },
  { role: "designer",                   location: "amsterdam", roleLabel: "Designer",                   locationLabel: "Amsterdam" },
  { role: "marketing-manager",          location: "paris",     roleLabel: "Marketing Manager",          locationLabel: "Paris" },
  { role: "sales-manager",              location: "dublin",    roleLabel: "Sales Manager",              locationLabel: "Dublin" },
  { role: "operations-manager",         location: "barcelona", roleLabel: "Operations Manager",         locationLabel: "Barcelona" },
  { role: "data-analyst",               location: "london",    roleLabel: "Data Analyst",               locationLabel: "London" },
  { role: "frontend-developer",         location: "london",    roleLabel: "Frontend Developer",         locationLabel: "London" },
  { role: "customer-success-manager",   location: "berlin",    roleLabel: "Customer Success Manager",   locationLabel: "Berlin" },
  { role: "data-scientist",             location: "amsterdam", roleLabel: "Data Scientist",             locationLabel: "Amsterdam" },
  { role: "devops-engineer",            location: "london",    roleLabel: "DevOps Engineer",            locationLabel: "London" },
  { role: "business-analyst",           location: "paris",     roleLabel: "Business Analyst",           locationLabel: "Paris" },
];


export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Copy — first on mobile (top), left on desktop */}
          <div className="space-y-6">
            <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              Free · No signup · Instant result
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Find out if you&apos;re underpaid{" "}
              <span className="text-orange-500">in 30 seconds</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Compare your salary against official government wage data across 12 European locations. Get your verdict in 30 seconds — no signup, no email.
            </p>

            {/* Factual trust stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: "33",   label: "Role types" },
                { value: "12",   label: "Locations" },
                { value: "600+", label: "Salary guides" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-xs text-gray-500 font-medium">Built using official public salary datasets:</p>
              <TrustSection variant="minimal" />
              <p className="text-xs text-gray-400">Coverage varies by role and location.</p>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Popular checks</p>
              <div className="flex flex-wrap gap-2">
                {FEATURED_CHECKS.map(({ role, location, label }) => (
                  <Link
                    key={`${role}-${location}`}
                    href={`/salary/${role}-${location}`}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Tool — second on mobile (below copy), right on desktop */}
          <div id="salary-tool" className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6 sm:p-8 min-w-0">
            <SalaryTool />
            <TrustSection />
          </div>

        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-100 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Enter your details", desc: "Select your role, location, years of experience, and current salary." },
            { step: "02", title: "We model your market rate", desc: "We apply location and experience benchmarks to estimate your salary range." },
            { step: "03", title: "Get a clear verdict", desc: "See your percentile and find out if you're underpaid, at market, or above it." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="space-y-3">
              <div className="text-3xl font-black text-orange-100">{step}</div>
              <h3 className="text-base font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Salary guides grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Salary guides</h2>
          <Link href="/salary/software-engineer" className="text-sm text-orange-500 font-semibold hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURATED_GUIDES.map(({ role, location, roleLabel, locationLabel }) => (
            <Link
              key={`${role}-${location}`}
              href={`/salary/${role}-${location}`}
              className="group block p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all"
            >
              <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {roleLabel}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{locationLabel}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Built on official data */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-100">
        <div className="grid sm:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Built on official data</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">Updated Q1 2026</span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Official national datasets</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Every benchmark comes from national statistics agencies — not crowdsourcing, not estimates.
            </p>
            <Link href="/methodology" className="text-sm font-semibold text-orange-500 hover:underline">
              See methodology →
            </Link>
          </div>
          {/* Right — data source table */}
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {[
              { name: "ONS",      note: "UK Annual Survey of Hours and Earnings (ASHE 2025)" },
              { name: "Eurostat", note: "European earnings statistics — SES 2022" },
              { name: "Destatis", note: "German Federal Statistical Office earnings data" },
              { name: "INE",      note: "Spanish Labour Force Survey 2024" },
              { name: "BFS",      note: "Swiss Federal Statistical Office — LSE 2022" },
              { name: "SCB",      note: "Statistics Sweden earnings survey 2024" },
              { name: "Istat",    note: "Italian national labour market statistics" },
              { name: "GUS",      note: "Polish Central Statistical Office 2024" },
            ].map(({ name, note }) => (
              <div key={name} className="flex items-start gap-4 px-4 py-3 bg-white hover:bg-gray-50 transition-colors">
                <span className="text-sm font-bold text-orange-500 w-24 flex-shrink-0">{name}</span>
                <span className="text-sm text-gray-400 leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">From the blog</h2>
          <Link href="/blog" className="text-sm text-orange-500 font-semibold hover:underline">All articles →</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { href: "/blog/how-to-know-if-you-are-underpaid", title: "How to Know If You Are Underpaid", desc: "Most people suspect they're underpaid but never verify it. Here's how to find out — and what to do about it." },
            { href: "/blog/salary-negotiation-tips", title: "7 Salary Negotiation Tips That Actually Work", desc: "Negotiating your salary is the highest-ROI action you can take. Here are 7 practical tips to get more." },
          ].map(({ href, title, desc }) => (
            <Link key={href} href={href} className="group block p-5 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all">
              <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Still not sure? Check right now.</h2>
          <p className="text-gray-400">30 seconds. No email. No login.</p>
          <ScrollToTopButton />
        </div>
      </section>
    </>
  );
}
