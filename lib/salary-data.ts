export type RoleSlug = "software-engineer" | "product-manager" | "marketing-manager" | "sales-manager" | "operations-manager" | "designer";
export type LocationSlug = "london" | "madrid" | "barcelona" | "berlin" | "paris" | "amsterdam" | "dublin" | "uk" | "spain" | "germany" | "france" | "europe";
export type Verdict = "underpaid" | "fair" | "overpaid";

export interface Role { slug: RoleSlug; label: string; baseSalary: number; category: string; }
export interface Location { slug: LocationSlug; label: string; country: string; currency: "£" | "€"; multiplier: number; }
export interface SalaryResult { low: number; median: number; high: number; percentile: number; verdict: Verdict; delta: number; currency: string; }
export interface SeniorityBands {
  junior: { low: number; median: number; high: number; label: string };
  mid:    { low: number; median: number; high: number; label: string };
  senior: { low: number; median: number; high: number; label: string };
  currency: string;
}

export const ROLES: Role[] = [
  { slug: "software-engineer",  label: "Software Engineer",  baseSalary: 75000, category: "Engineering" },
  { slug: "product-manager",    label: "Product Manager",    baseSalary: 80000, category: "Product" },
  { slug: "marketing-manager",  label: "Marketing Manager",  baseSalary: 62000, category: "Marketing" },
  { slug: "sales-manager",      label: "Sales Manager",      baseSalary: 68000, category: "Sales" },
  { slug: "operations-manager", label: "Operations Manager", baseSalary: 65000, category: "Operations" },
  { slug: "designer",           label: "Designer",           baseSalary: 63000, category: "Design" },
];

export const LOCATIONS: Location[] = [
  { slug: "london",    label: "London",    country: "UK",             currency: "£", multiplier: 1.45 },
  { slug: "madrid",    label: "Madrid",    country: "Spain",          currency: "€", multiplier: 0.82 },
  { slug: "barcelona", label: "Barcelona", country: "Spain",          currency: "€", multiplier: 0.88 },
  { slug: "berlin",    label: "Berlin",    country: "Germany",        currency: "€", multiplier: 1.05 },
  { slug: "paris",     label: "Paris",     country: "France",         currency: "€", multiplier: 1.18 },
  { slug: "amsterdam", label: "Amsterdam", country: "Netherlands",    currency: "€", multiplier: 1.22 },
  { slug: "dublin",    label: "Dublin",    country: "Ireland",        currency: "€", multiplier: 1.28 },
  { slug: "uk",        label: "UK",        country: "United Kingdom", currency: "£", multiplier: 1.35 },
  { slug: "spain",     label: "Spain",     country: "Spain",          currency: "€", multiplier: 0.80 },
  { slug: "germany",   label: "Germany",   country: "Germany",        currency: "€", multiplier: 1.00 },
  { slug: "france",    label: "France",    country: "France",         currency: "€", multiplier: 1.10 },
  { slug: "europe",    label: "Europe",    country: "",               currency: "€", multiplier: 1.00 },
];

const EXP_CURVE: [number, number][] = [
  [0, 0.58], [1, 0.68], [2, 0.78], [3, 0.87], [4, 0.94],
  [5, 1.00], [6, 1.08], [7, 1.15], [9, 1.24], [10, 1.30],
  [12, 1.38], [15, 1.48], [20, 1.62],
];

function getExperienceMultiplier(years: number): number {
  const clamped = Math.max(0, Math.min(20, years));
  if (clamped <= EXP_CURVE[0][0]) return EXP_CURVE[0][1];
  if (clamped >= EXP_CURVE[EXP_CURVE.length - 1][0]) return EXP_CURVE[EXP_CURVE.length - 1][1];
  for (let i = 0; i < EXP_CURVE.length - 1; i++) {
    const [x0, y0] = EXP_CURVE[i];
    const [x1, y1] = EXP_CURVE[i + 1];
    if (clamped >= x0 && clamped <= x1) {
      const t = (clamped - x0) / (x1 - x0);
      const ease = t * t * (3 - 2 * t);
      return y0 + ease * (y1 - y0);
    }
  }
  return 1.0;
}

function getRoleLocationAdjustment(roleSlug: string, locationSlug: string): number {
  const key = `${roleSlug}|${locationSlug}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = Math.imul(31, hash) + key.charCodeAt(i);
    hash |= 0;
  }
  const steps = ((Math.abs(hash) % 9) - 4);
  return 1 + steps / 100;
}

function roundToNearest(n: number, nearest: number): number {
  return Math.round(n / nearest) * nearest;
}

function computeMedian(roleSlug: string, locationSlug: string, years: number): number {
  const role = ROLES.find((r) => r.slug === roleSlug);
  const location = LOCATIONS.find((l) => l.slug === locationSlug);
  const base = role?.baseSalary ?? 70000;
  const locMult = location?.multiplier ?? 1.0;
  const expMult = getExperienceMultiplier(years);
  const adj = getRoleLocationAdjustment(roleSlug, locationSlug);
  return roundToNearest(base * locMult * expMult * adj, 500);
}

export function calculateSalary(roleSlug: string, locationSlug: string, years: number, currentSalary: number): SalaryResult {
  const location = LOCATIONS.find((l) => l.slug === locationSlug);
  const median = computeMedian(roleSlug, locationSlug, years);
  const low  = roundToNearest(median * 0.78, 500);
  const high = roundToNearest(median * 1.28, 500);

  let percentile: number;
  if (currentSalary <= low) {
    const ratio = Math.max(0, (currentSalary - low * 0.6) / (low - low * 0.6));
    percentile = Math.round(5 + ratio * 20);
  } else if (currentSalary >= high) {
    const ratio = Math.min(1, (currentSalary - high) / (high * 0.3));
    percentile = Math.round(75 + ratio * 24);
  } else {
    percentile = Math.round(25 + ((currentSalary - low) / (high - low)) * 50);
  }
  percentile = Math.max(5, Math.min(99, percentile));

  const delta = currentSalary - median;
  let verdict: Verdict;
  if (delta < -median * 0.08) verdict = "underpaid";
  else if (delta > median * 0.08) verdict = "overpaid";
  else verdict = "fair";

  const currency = location?.currency ?? "€";
  return { low, median, high, percentile, verdict, delta, currency };
}

export function getMarketRange(roleSlug: string, locationSlug: string, years = 5): { low: number; median: number; high: number; currency: string } {
  const location = LOCATIONS.find((l) => l.slug === locationSlug);
  const median = computeMedian(roleSlug, locationSlug, years);
  const low  = roundToNearest(median * 0.78, 500);
  const high = roundToNearest(median * 1.28, 500);
  const currency = location?.currency ?? "€";
  return { low, median, high, currency };
}

export function getSeniorityBands(roleSlug: string, locationSlug: string): SeniorityBands {
  const location = LOCATIONS.find((l) => l.slug === locationSlug);
  const currency = location?.currency ?? "€";
  const jMed = computeMedian(roleSlug, locationSlug, 1.5);
  const mMed = computeMedian(roleSlug, locationSlug, 5);
  const sMed = computeMedian(roleSlug, locationSlug, 10);
  return {
    junior: { low: roundToNearest(jMed * 0.88, 500), median: jMed, high: roundToNearest(jMed * 1.15, 500), label: "Junior (0–2 yrs)" },
    mid:    { low: roundToNearest(mMed * 0.88, 500), median: mMed, high: roundToNearest(mMed * 1.15, 500), label: "Mid-level (3–6 yrs)" },
    senior: { low: roundToNearest(sMed * 0.88, 500), median: sMed, high: roundToNearest(sMed * 1.15, 500), label: "Senior (7+ yrs)" },
    currency,
  };
}

export function getSeniorityLabel(years: number): "Junior" | "Mid-level" | "Senior" | "Lead" {
  if (years <= 2) return "Junior";
  if (years <= 6) return "Mid-level";
  if (years <= 12) return "Senior";
  return "Lead";
}

export function formatSalary(amount: number, currency: string): string {
  return `${currency}${amount.toLocaleString("en-GB")}`;
}
