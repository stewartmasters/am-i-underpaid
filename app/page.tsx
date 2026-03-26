import type { Metadata } from "next";
import SalaryTool from "@/components/SalaryTool";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TrustStrip from "@/components/TrustStrip";
import Link from "next/link";
import { ROLES, LOCATIONS } from "@/lib/salary-data";

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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: copy */}
          <div className="space-y-6">
            <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              Free · No signup · Instant result
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Are you being paid{" "}
              <span className="text-orange-500">what you&apos;re worth?</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Most people suspect they&apos;re underpaid. Few ever check the data.
              Enter your role and salary — find out where you actually stand.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: "6",   label: "Role categories" },
                { value: "12",  label: "Locations" },
                { value: "90+", label: "Salary guides" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
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

          {/* Right: tool + trust strip */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6 sm:p-8">
            <SalaryTool />
            <TrustStrip />
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
          {ROLES.map((role) =>
            LOCATIONS.slice(0, 2).map((loc) => (
              <Link
                key={`${role.slug}-${loc.slug}`}
                href={`/salary/${role.slug}-${loc.slug}`}
                className="group block p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all"
              >
                <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {role.label}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{loc.label} · {loc.country}</div>
              </Link>
            ))
          )}
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
