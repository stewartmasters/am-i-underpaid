import type { Metadata } from "next";
import Link from "next/link";
import { ROLES, LOCATIONS } from "@/lib/salary-data";

export const metadata: Metadata = {
  title: "Salary Guides — Europe 2026",
  description: "Browse salary guides for 33 roles across 12 European locations. Based on official government wage data. Find out what the market pays for your role.",
  alternates: { canonical: "/salary" },
};

const CATEGORY_ORDER = [
  "Engineering",
  "Product",
  "Data",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "HR & Recruiting",
];

const FEATURED_LOCATIONS = [
  "london", "berlin", "amsterdam", "paris", "dublin", "barcelona",
  "madrid", "zurich", "stockholm", "milan", "warsaw", "lisbon",
];

export default function SalaryIndexPage() {
  // Group roles by category
  const byCategory = CATEGORY_ORDER.reduce<Record<string, typeof ROLES>>((acc, cat) => {
    acc[cat] = ROLES.filter((r) => r.category === cat);
    return acc;
  }, {});

  // Featured locations for the location strip
  const featuredLocations = LOCATIONS.filter((l) => FEATURED_LOCATIONS.includes(l.slug));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Salary guides</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Browse market salary data for 33 roles across 12 European locations — based on official government wage surveys.
        </p>
      </div>

      {/* Roles by category */}
      <div className="space-y-10 mb-16">
        {CATEGORY_ORDER.map((category) => {
          const roles = byCategory[category];
          if (!roles || roles.length === 0) return null;
          return (
            <div key={category}>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{category}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map((role) => (
                  <Link
                    key={role.slug}
                    href={`/salary/${role.slug}`}
                    className="group block p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all"
                  >
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {role.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">View salary guide →</div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* By location */}
      <div className="border-t border-gray-100 pt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by location</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredLocations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/salary/${loc.slug}`}
              className="group block p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all"
            >
              <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {loc.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{loc.country} · View salaries →</div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 bg-orange-50 rounded-2xl p-8 text-center space-y-4 border border-orange-100">
        <h2 className="text-xl font-bold text-gray-900">Check your specific salary</h2>
        <p className="text-gray-500 text-sm">Enter your role, location, and years of experience. Takes 30 seconds.</p>
        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Check my salary →
        </Link>
      </div>
    </div>
  );
}
