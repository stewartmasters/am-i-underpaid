import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { generateSeoPages, getSeoPage, getRelatedPages, getLocationContext, getRoleContext } from "@/lib/seo-pages";
import { getMarketRange, getSeniorityBands, formatSalary, getConfidenceLevel, CONFIDENCE_LABELS, ROLES, LOCATIONS } from "@/lib/salary-data";
import SalaryTool from "@/components/SalaryTool";

// Force truly static generation — no ISR, no blob caching needed
export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateSeoPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/salary/${slug}` },
    openGraph: { title: page.title, description: page.description },
  };
}

function faqsRoleLocation(roleLabel: string, locationLabel: string, median: string, low: string, high: string) {
  return [
    { q: `What is the average ${roleLabel} salary in ${locationLabel}?`, a: `The average ${roleLabel} salary in ${locationLabel} in 2026 is around ${median} per year at mid-level (roughly 4–6 years of experience). The full market range runs from approximately ${low} at the junior end to ${high} for senior roles. These are gross annual estimates based on public benchmarks and modelled data.` },
    { q: `Is ${median}/year a good salary for a ${roleLabel} in ${locationLabel}?`, a: `${median} represents the mid-market rate for a ${roleLabel} in ${locationLabel}. Whether it's "good" depends on your experience, company, and industry. If you're earning this at 3–4 years of experience, you're well positioned. Use our tool above to check your specific percentile.` },
    { q: `How can I get a higher salary as a ${roleLabel} in ${locationLabel}?`, a: `The most effective levers are: switching companies (typically a 15–25% increase), using competing offers to negotiate, or taking on greater scope of responsibility at your current employer. Knowing your market rate — which you can check above — is the essential first step before any salary conversation.` },
    { q: `What factors affect ${roleLabel} pay in ${locationLabel}?`, a: `Key factors include years of experience, company size and funding stage (early-stage startups vs. large corporates), the specific industry, whether the company benchmarks pay globally or locally, and specialised skills. Remote-first companies may also pay differently depending on your location.` },
    { q: `Do ${roleLabel} salaries in ${locationLabel} include bonuses?`, a: `The figures on this page represent gross base salary only. Bonuses, equity, and benefits are not included. In roles like sales or finance, total compensation can be 20–50% above base. For tech roles, equity can add significant value at growth-stage companies.` },
  ];
}

function faqsRole(roleLabel: string) {
  return [
    { q: `What is the average ${roleLabel} salary across Europe?`, a: `${roleLabel} salaries vary significantly across Europe. London typically pays the most (often 30–45% above the European average). Amsterdam, Dublin, and Paris follow. Berlin and other German cities sit around the European average. Spain and other southern European markets pay 15–25% below average.` },
    { q: `How do I know if I am underpaid as a ${roleLabel}?`, a: `Compare your current salary against the market range for your exact role, location, and experience level. If you're below the 35th percentile, there's a strong case you're underpaid. Use the tool above to check your percentile instantly.` },
    { q: `What is a good salary for a ${roleLabel}?`, a: `A competitive salary for a ${roleLabel} depends heavily on your city and years of experience. Use the table above to see location-specific ranges, or use our interactive tool to get a personalised estimate based on your exact situation.` },
    { q: `How much does a senior ${roleLabel} earn?`, a: `Senior ${roleLabel} salaries (7+ years of experience) typically run 25–35% higher than mid-level rates. In high-paying markets like London and Amsterdam, senior ${roleLabel}s can earn significantly above the median ranges shown.` },
  ];
}

function faqsLocation(locationLabel: string) {
  return [
    { q: `What are the average salaries in ${locationLabel}?`, a: `Salaries in ${locationLabel} vary widely by role and experience. Tech, product, and finance roles tend to earn the most. See the full breakdown by role in the table above, or use our tool to check your specific salary against market benchmarks.` },
    { q: `Is ${locationLabel} a good place to work in terms of pay?`, a: `It depends on the role and your expectations. ${locationLabel} is competitive for certain professions — particularly in tech and product. Cost of living matters too: a higher gross salary doesn't always mean better take-home pay after tax and living costs.` },
    { q: `How do salaries in ${locationLabel} compare to the rest of Europe?`, a: `Northern European cities (London, Amsterdam, Dublin) generally pay the most. Central European markets like Berlin and Paris sit in the middle. Southern European markets like Spain typically pay 15–25% below the European average for comparable roles.` },
    { q: `Are salaries in ${locationLabel} rising?`, a: `Most European markets have seen salary growth in professional roles over the past few years, driven by competition for talent and inflation. Tech, product, and engineering roles have seen the sharpest increases.` },
  ];
}

function faqsSalaryQuestion(amount: number, locationLabel: string, currency: string, roles: { label: string; median: number }[]) {
  const amountStr = `${currency}${amount.toLocaleString("en-GB")}`;
  const topRole = roles.find(r => Math.abs(r.median - amount) === Math.min(...roles.map(r => Math.abs(r.median - amount))));
  return [
    { q: `Is ${amountStr} a good salary in ${locationLabel}?`, a: `${amountStr} is ${amount >= (roles.reduce((s, r) => s + r.median, 0) / roles.length) ? "above" : "below"} the average salary across professional roles in ${locationLabel}. Whether it's "good" depends heavily on your specific role and years of experience. For most mid-level professional roles in ${locationLabel}, ${amountStr} is ${amount >= (roles.find(r => r.label === "Software Engineer")?.median ?? 0) * 0.85 ? "competitive" : "below market rate"}.` },
    { q: `What jobs pay ${amountStr} in ${locationLabel}?`, a: `In ${locationLabel}, ${amountStr} is broadly in the range for ${topRole?.label ?? "mid-level professional"} roles. Roles that commonly pay around this level include project managers, marketing managers, analysts, and mid-level engineers depending on experience. See the salary guides above for specific role benchmarks.` },
    { q: `Is ${amountStr} enough to live on in ${locationLabel}?`, a: `${amountStr} gross in ${locationLabel} translates to a net take-home that depends on your tax situation. In most European cities, ${amountStr} provides a comfortable standard of living, though London and Amsterdam are more expensive markets where cost of living will consume a larger share.` },
    { q: `How does ${amountStr} compare to average salaries in ${locationLabel}?`, a: `Use the tool above to check how ${amountStr} compares to specific roles. For a software engineer in ${locationLabel}, the median salary is different than for a marketing manager. The percentile you'd be in depends entirely on your specific role and years of experience.` },
  ];
}

function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export default async function SalaryPage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const related = getRelatedPages(page);
  const roleSlug     = page.roleSlug     ?? "software-engineer";
  const locationSlug = page.locationSlug ?? "europe";

  const range  = getMarketRange(roleSlug, locationSlug);
  const bands  = getSeniorityBands(roleSlug, locationSlug);
  const { currency } = range;

  const faqs =
    page.type === "role-location"
      ? faqsRoleLocation(page.roleLabel!, page.locationLabel!, formatSalary(range.median, currency), formatSalary(range.low, currency), formatSalary(range.high, currency))
      : page.type === "role-only"
      ? faqsRole(page.roleLabel!)
      : page.type === "salary-question"
      ? faqsSalaryQuestion(
          page.salaryAmount!,
          page.locationLabel!,
          currency,
          ROLES.map(r => ({ label: r.label, median: getMarketRange(r.slug, locationSlug).median }))
        )
      : faqsLocation(page.locationLabel!);

  const faqSchema = buildFaqSchema(faqs);
  const locationCtx = getLocationContext(page.locationSlug);
  const roleCtx     = getRoleContext(page.roleSlug);
  const otherRoles     = ROLES.filter((r) => r.slug !== page.roleSlug).slice(0, 5);
  const otherLocations = LOCATIONS.filter((l) => l.slug !== page.locationSlug).slice(0, 5);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/salary/software-engineer" className="hover:text-orange-500 transition-colors">Salaries</Link>
          <span>/</span>
          <span className="text-gray-600">{page.h1}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          <div className="space-y-10 min-w-0">

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{page.h1}</h1>
              <p className="text-lg text-gray-500 leading-relaxed">
                {page.type === "role-location" && locationCtx}
                {page.type === "role-only"     && roleCtx}
                {page.type === "location-only" && locationCtx}
                {page.type === "salary-question" && locationCtx}
              </p>
              {page.type === "role-location" && (
                <p className="text-gray-500 text-base leading-relaxed">
                  {roleCtx} Below you&apos;ll find junior, mid-level, and senior salary bands, plus a personalised calculator to check your own position.
                </p>
              )}
              <p className="text-xs text-gray-400">
                Estimates based on public benchmarks and modelled data.{" "}
                <Link href="/methodology" className="text-orange-500 hover:underline">How we calculate →</Link>
              </p>
            </div>

            {page.type === "role-location" && (
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-base font-bold text-gray-900">At a glance</h2>
                  {(() => {
                    const conf = getConfidenceLevel(roleSlug, locationSlug);
                    const c = CONFIDENCE_LABELS[conf];
                    return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.color}`} title={c.description}>{c.label}</span>;
                  })()}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-400">Median salary</div>
                    <div className="font-bold text-gray-900 text-sm">{formatSalary(range.median, currency)}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-400">Typical range</div>
                    <div className="font-bold text-gray-900 text-sm">{formatSalary(range.low, currency)} – {formatSalary(range.high, currency)}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-400">Senior median</div>
                    <div className="font-bold text-gray-900 text-sm">{formatSalary(bands.senior.median, currency)}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-400">Likely underpaid below</div>
                    <div className="font-bold text-orange-600 text-sm">{formatSalary(Math.round(range.median * 0.88 / 500) * 500, currency)}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Gross annual base salary estimates · 2026 · Public benchmarks + structured modelling · <a href="/methodology" className="text-orange-500 hover:underline">Methodology &#8594;</a></p>
              </div>
            )}

            {page.type === "role-location" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">{page.roleLabel} salary bands in {page.locationLabel}</h2>
                <div className="space-y-3">
                  {([
                    { key: "junior", data: bands.junior, color: "bg-blue-50 border-blue-100" },
                    { key: "mid",    data: bands.mid,    color: "bg-orange-50 border-orange-200" },
                    { key: "senior", data: bands.senior, color: "bg-emerald-50 border-emerald-100" },
                  ] as const).map(({ key, data, color }) => (
                    <div key={key} className={`flex items-center justify-between p-4 rounded-xl border ${color}`}>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{data.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Typical range</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-gray-900">{formatSalary(data.low, currency)} – {formatSalary(data.high, currency)}</div>
                        <div className="text-xs text-gray-500">Median: <span className="font-semibold">{formatSalary(data.median, currency)}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400">Gross annual base salary estimates for 2026. Bonuses and equity not included.</p>
              </div>
            )}

            {page.type === "salary-question" && page.salaryAmount && (
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    How does {formatSalary(page.salaryAmount, currency)} compare?
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Whether {formatSalary(page.salaryAmount, currency)}/year is a good salary in {page.locationLabel} depends on your role and experience. Here&apos;s how it compares to typical market rates for common roles:
                  </p>
                  <div className="space-y-2">
                    {ROLES.slice(0, 10).map((role) => {
                      const r = getMarketRange(role.slug, locationSlug);
                      const diff = page.salaryAmount! - r.median;
                      const pct = Math.round((diff / r.median) * 100);
                      const isAbove = diff >= 0;
                      return (
                        <Link key={role.slug} href={`/salary/${role.slug}-${locationSlug}`} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-orange-200 bg-white hover:bg-orange-50 transition-all group">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">{role.label}</span>
                          <div className="text-right">
                            <span className={`text-xs font-bold ${isAbove ? "text-emerald-600" : "text-red-500"}`}>
                              {isAbove ? "+" : ""}{pct}% vs median
                            </span>
                            <div className="text-xs text-gray-400">Median: {formatSalary(r.median, r.currency)}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 space-y-3 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Get your personalised verdict</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    The table above shows general market rates. Your actual percentile depends on your specific role and years of experience. Use the calculator to get your exact position.
                  </p>
                </div>
              </div>
            )}

            {page.type === "location-only" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Salary ranges in {page.locationLabel} by role</h2>
                <div className="space-y-2">
                  {ROLES.map((role) => {
                    const r = getMarketRange(role.slug, locationSlug);
                    return (
                      <Link key={role.slug} href={`/salary/${role.slug}-${locationSlug}`} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group">
                        <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">{role.label}</span>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">{formatSalary(r.low, r.currency)} – {formatSalary(r.high, r.currency)}</span>
                          <div className="text-xs text-gray-400">Median: {formatSalary(r.median, r.currency)}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {page.type === "role-only" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">{page.roleLabel} salary by location</h2>
                <div className="space-y-2">
                  {LOCATIONS.map((loc) => {
                    const r = getMarketRange(roleSlug, loc.slug);
                    return (
                      <Link key={loc.slug} href={`/salary/${roleSlug}-${loc.slug}`} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group">
                        <div>
                          <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">{loc.label}</span>
                          {loc.country && <span className="text-gray-400 font-normal text-xs ml-2">{loc.country}</span>}
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">{formatSalary(r.low, r.currency)} – {formatSalary(r.high, r.currency)}</span>
                          <div className="text-xs text-gray-400">Median: {formatSalary(r.median, r.currency)}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-2xl p-6 space-y-3 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Are you underpaid?</h2>
              <p className="text-gray-600 text-sm leading-relaxed">Knowing the market range is step one. The real question is where your specific salary sits within it. If you&apos;re in the bottom 30% for your role and location, there&apos;s a strong case you&apos;re leaving money on the table.</p>
              <p className="text-gray-600 text-sm leading-relaxed">Use the calculator on this page to get your percentile instantly. No signup, no email. Just a straight answer.</p>
              <Link href="/" className="inline-block mt-1 text-sm font-semibold text-orange-500 hover:underline">Back to main tool →</Link>
            </div>

            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
              <div className="space-y-3">
                {faqs.map(({ q, a }) => (
                  <details key={q} className="group border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                      <h3 className="font-semibold text-gray-900 text-sm pr-4">{q}</h3>
                      <span className="text-gray-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-5 pb-5"><p className="text-sm text-gray-500 leading-relaxed">{a}</p></div>
                  </details>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Related salary guides</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/salary/${p.slug}`} className="block p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all text-sm font-medium text-gray-700 hover:text-orange-600">
                      {p.h1}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6 border-t border-gray-100 pt-8">
              {otherRoles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{page.locationLabel ? `Other roles in ${page.locationLabel}` : "Other roles"}</p>
                  <div className="flex flex-wrap gap-2">
                    {otherRoles.map((r) => (
                      <Link key={r.slug} href={page.locationSlug ? `/salary/${r.slug}-${page.locationSlug}` : `/salary/${r.slug}`} className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-3 py-1.5 rounded-full transition-colors">
                        {r.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {otherLocations.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{page.roleLabel ? `${page.roleLabel} salaries elsewhere` : "Other locations"}</p>
                  <div className="flex flex-wrap gap-2">
                    {otherLocations.map((l) => (
                      <Link key={l.slug} href={page.roleSlug ? `/salary/${page.roleSlug}-${l.slug}` : `/salary/${l.slug}`} className="text-xs bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 px-3 py-1.5 rounded-full transition-colors">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
              Salary estimates are based on public benchmarks and modelled data. They represent gross annual base salary and do not include bonuses, equity, or benefits.{" "}
              <Link href="/methodology" className="text-orange-500 hover:underline">Read our methodology →</Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-6">
              <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Check your salary</p>
              <p className="text-xs text-gray-400 mb-4">See where you actually stand.</p>
              <SalaryTool defaultRole={page.roleSlug} defaultLocation={page.locationSlug} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
