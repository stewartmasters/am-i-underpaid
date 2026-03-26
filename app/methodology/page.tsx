import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Calculate Salaries — Our Methodology",
  description:
    "We use modelled salary estimates based on public benchmarks, not real-time company data. Here's exactly how our salary ranges are calculated.",
  alternates: { canonical: "/methodology" },
};

const SECTIONS = [
  {
    id: "where-data-comes-from",
    heading: "Where the data comes from",
    content: (
      <>
        <p>We do <strong>not</strong> have access to live company salary databases, proprietary HR platforms, or real-time job posting data. We want to be upfront about that.</p>
        <p>Instead, our salary estimates are built from a combination of:</p>
        <ul>
          <li><strong>Publicly available salary surveys</strong> — including aggregated data published by industry associations, professional bodies, and government statistical agencies across Europe (including Eurostat wage data and national statistics institutes).</li>
          <li><strong>Job market benchmarks</strong> — salary ranges cited in publicly available job listings and compensation guides for European markets.</li>
          <li><strong>Internal modelling</strong> — we apply structured multipliers for location and experience to produce estimates that are consistent and directionally accurate.</li>
        </ul>
        <p>We review and update our model periodically to reflect shifts in the market.</p>
      </>
    ),
  },
  {
    id: "how-we-estimate",
    heading: "How we estimate salaries",
    content: (
      <>
        <p>Every estimate starts with a <strong>base salary</strong> for each role — this is the midpoint we&apos;ve established for a mid-level professional (roughly 4–6 years of experience) working in a typical European market.</p>
        <p>From there, we apply two adjustments:</p>
        <ol>
          <li><strong>Location multiplier.</strong> Salaries vary significantly across Europe. London pays roughly 45% above the European average for comparable roles. Madrid pays roughly 18–20% below. We apply a market multiplier per city and country based on observed salary levels.</li>
          <li><strong>Experience multiplier.</strong> Pay increases as you gain experience, but not linearly. Early-career growth is steep; growth slows as you become more senior. We model this as a smooth curve — from roughly 58% of market rate at entry level to around 145–160% at 15+ years of experience.</li>
        </ol>
        <p>We also apply a small role × location adjustment (±4%) that reflects real-world variation — for example, software engineers in London command a slightly higher premium relative to other roles than the location multiplier alone would suggest.</p>
        <p>The result is a <strong>low / median / high</strong> range and a percentile estimate for where your salary sits within that range.</p>
      </>
    ),
  },
  {
    id: "country-mapping",
    heading: "Country data integrity",
    content: (
      <>
        <p>We apply a strict country-to-source mapping. UK data is never used to estimate EU salaries, and EU data is never used to estimate UK salaries.</p>
        <ul>
          <li><strong>London and UK estimates</strong> are calibrated from ONS ASHE data (UK government survey). Eurostat data is not used for these locations.</li>
          <li><strong>Continental European estimates</strong> (Germany, France, Spain, Netherlands, Ireland) are calibrated from Eurostat Labour Cost Survey data. ONS data is not used for these locations.</li>
          <li><strong>Tech-role estimates</strong> in major cities (London, Berlin, Amsterdam, Paris, Dublin) are additionally cross-referenced with Levels.fyi community compensation data, which has strong European tech coverage.</li>
          <li><strong>Glassdoor and Indeed data</strong> is applied on a per-country basis — UK data from those platforms informs UK estimates only; German data informs German estimates only.</li>
        </ul>
        <p>This mapping is maintained explicitly in our data layer and validated at build time to prevent accidental cross-country mixing.</p>
      </>
    ),
  },
  {
    id: "data-sources",
    heading: "Named data sources",
    content: (
      <>
        <p>Our salary model draws on the following publicly available sources, applied to different geographies and role types:</p>
        <ul>
          <li><strong>Eurostat Labour Cost Survey</strong> — EU-wide wage structure survey covering industry-level gross annual earnings across member states. Used to calibrate location multipliers for continental European markets.</li>
          <li><strong>UK ONS Annual Survey of Hours and Earnings (ASHE)</strong> — the UK government&apos;s primary earnings survey, covering median gross annual pay by occupation and region. Our UK and London estimates are anchored to this data.</li>
          <li><strong>Glassdoor Salary Insights</strong> — aggregated self-reported salary data across roles and cities. Used as a directional market signal, particularly for roles with fewer government survey equivalents.</li>
          <li><strong>Indeed Salary Insights</strong> — job-posting-derived salary ranges across European markets. Used to cross-check and calibrate role/location medians against live market supply.</li>
          <li><strong>Levels.fyi Compensation Data</strong> — community-verified compensation data with the strongest signal for tech roles (software engineering, data science, product management, DevOps) in major European cities. Used specifically for tech role benchmarking.</li>
        </ul>
        <p>No single source is used in isolation. Where sources diverge, we apply judgement and weight towards government survey data for baseline figures and community/aggregated data for role-specific signals.</p>
      </>
    ),
  },
  {
    id: "confidence-scoring",
    heading: "Confidence scoring",
    content: (
      <>
        <p>We assign a confidence level — <strong>High</strong>, <strong>Medium</strong>, or <strong>Lower</strong> — to each role and location combination. This reflects how well-covered that combination is by public benchmark data.</p>
        <ul>
          <li><strong>High confidence</strong> — mainstream role (e.g. software engineer, product manager) in a major, well-documented market (e.g. London, Berlin, Amsterdam). Strong signal from multiple sources.</li>
          <li><strong>Medium confidence</strong> — reasonable coverage, but either the role or location has fewer available references. Estimates are directional and useful for comparison.</li>
          <li><strong>Lower confidence</strong> — niche role (e.g. social media manager, content manager) or a broad market category (e.g. &quot;Europe&quot; as a whole) where public benchmarks are sparse. Treat as a rough guide only.</li>
        </ul>
        <p>Confidence labels are shown on each salary page and in calculator results. They are not a measure of whether the estimate is wrong — they are a measure of how much external evidence supports it.</p>
      </>
    ),
  },
  {
    id: "coverage",
    heading: "Coverage summary",
    content: (
      <>
        <p>We cover 21 role types across 12 locations. Coverage quality varies — here&apos;s an honest breakdown:</p>
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-semibold text-emerald-700 text-sm mb-1">Strong coverage (high confidence)</p>
            <p className="text-gray-600 text-sm">Software Engineer, Frontend Developer, Backend Developer, Product Manager, Designer, Marketing Manager, Sales Manager, Data Analyst — in London, Berlin, Amsterdam, Paris, Dublin. Multiple independent sources available for these combinations.</p>
          </div>
          <div>
            <p className="font-semibold text-amber-700 text-sm mb-1">Medium coverage</p>
            <p className="text-gray-600 text-sm">DevOps Engineer, Data Scientist, Business Analyst, HR Manager, Finance Analyst, Operations Manager, Customer Success Manager, Account Manager, Growth Manager, Performance Marketing Manager — in major cities. Reasonable market signals available but fewer cross-referenced sources.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-500 text-sm mb-1">Lower confidence</p>
            <p className="text-gray-600 text-sm">QA Engineer, Content Manager, Social Media Manager in any location. Any role in the generic &quot;Europe&quot; category. Fewer public benchmarks; use as a rough guide only.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "limitations",
    heading: "Limitations",
    content: (
      <>
        <p>We think transparency here matters. There are real limitations to be aware of:</p>
        <ul>
          <li><strong>Not all industries are well represented.</strong> Our estimates are strongest for tech, product, marketing, sales, and operations roles. Legal, executive, finance advisory, and highly specialised roles are not well modelled.</li>
          <li><strong>We don&apos;t account for company size or stage.</strong> A senior engineer at a Series A startup and one at a FAANG company are not the same. Our estimates reflect a broad market average, not any specific company type.</li>
          <li><strong>We don&apos;t include equity, bonuses, or benefits.</strong> Total compensation can be significantly higher than base salary, especially in tech. Our tool only estimates gross annual base salary.</li>
          <li><strong>Data is not real-time.</strong> We update the model periodically, but salaries can shift quickly in fast-moving markets.</li>
          <li><strong>Currency values are not live FX rates.</strong> UK estimates are in GBP; European estimates are in EUR. We do not apply live exchange rates between them.</li>
        </ul>
      </>
    ),
  },
  {
    id: "why-still-useful",
    heading: "Why this is still useful",
    content: (
      <>
        <p>Despite these limitations, benchmarking your salary is genuinely useful — even with modelled estimates.</p>
        <p>Most people have no external reference point for their salary at all. They accepted an offer, received annual increments, and have no idea whether they&apos;re at the 30th or 80th percentile for their role. That asymmetry favours employers.</p>
        <p>Our tool gives you a directional signal. If our model puts your current salary in the bottom 25% for your role and location, that&apos;s a meaningful data point — even if the exact median is off by a few thousand euros. It tells you there&apos;s a conversation worth having.</p>
        <p>For a more precise view, we recommend combining our estimate with:</p>
        <ul>
          <li>Job listings for similar roles in your location</li>
          <li>Conversations with recruiters who can share live market rates</li>
          <li>Professional network salary discussions</li>
          <li>National salary survey data published by government bodies</li>
        </ul>
        <p>Our goal is to give you enough signal to start the conversation — with your manager, a recruiter, or yourself.</p>
      </>
    ),
  },
];

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Methodology</span>
      </nav>

      <header className="mb-12 space-y-4">
        <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          How we work
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          How we calculate salary estimates
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          We believe in being honest about what we do and don&apos;t know. This page explains where our salary data comes from and how we model it.
        </p>
      </header>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-12 space-y-3">
        <h2 className="font-bold text-gray-900">The short version</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          Our salary estimates are based on <strong>public benchmarks and structured modelling</strong>. We do not use real-time company data feeds or proprietary salary databases. Our numbers are designed to give you a directional signal — not a legally precise figure.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          {["Government wage data", "Industry benchmarks", "Experience modelling", "Location adjustments"].map((tag) => (
            <span key={tag} className="text-xs font-semibold bg-white border border-orange-200 text-orange-700 px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      <nav className="mb-12 space-y-1 border-l-2 border-orange-100 pl-4">
        {SECTIONS.map(({ id, heading }) => (
          <a key={id} href={`#${id}`} className="block text-sm text-gray-500 hover:text-orange-600 py-0.5 transition-colors">{heading}</a>
        ))}
      </nav>

      <div className="space-y-14">
        {SECTIONS.map(({ id, heading, content }) => (
          <section key={id} id={id} className="scroll-mt-20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{heading}</h2>
            <div className="prose prose-gray prose-sm max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-3 prose-li:text-gray-600 prose-li:mb-1 prose-ul:space-y-1 prose-ol:space-y-1 prose-strong:text-gray-800 prose-strong:font-semibold">
              {content}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-gray-900 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Ready to check your salary?</h2>
        <p className="text-gray-400 text-sm">Takes 30 seconds. No email required. No signup.</p>
        <Link href="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          Check my salary →
        </Link>
      </div>
    </div>
  );
}
