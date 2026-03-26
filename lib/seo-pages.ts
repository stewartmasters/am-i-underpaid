import { ROLES, LOCATIONS, type RoleSlug, type LocationSlug } from "./salary-data";

export interface SeoPage {
  slug: string;
  type: "role-location" | "role-only" | "location-only";
  roleSlug?: RoleSlug;
  locationSlug?: LocationSlug;
  roleLabel?: string;
  locationLabel?: string;
  country?: string;
  h1: string;
  title: string;
  description: string;
}

const YEAR = 2026;

const LOCATION_CONTEXT: Record<string, string> = {
  london:    "London is one of Europe's highest-paying markets, driven by a high density of US-headquartered companies, financial institutions, and a competitive talent pool.",
  amsterdam: "Amsterdam has become a top destination for international tech and product talent, with salaries that are among the highest in continental Europe.",
  dublin:    "Dublin's role as the EMEA headquarters for many US tech companies has pushed salaries well above the European average for most professional roles.",
  paris:     "Paris offers strong salaries — particularly in finance, luxury, and tech — backed by France's regulated labour market and a growing startup ecosystem.",
  berlin:    "Berlin is Europe's startup capital, with a maturing salary market that has risen significantly over the past decade as international companies expand there.",
  barcelona: "Barcelona has a vibrant tech and design scene, though salaries remain lower than northern Europe — meaning there's often a gap between market value and what local companies pay.",
  madrid:    "Madrid is Spain's primary business hub with the country's highest salaries, though they still trail northern European markets by a significant margin.",
  uk:        "The UK market varies considerably — London leads, but regional cities like Manchester, Edinburgh, and Bristol have also seen salary growth in professional roles.",
  spain:     "Spain's professional salary market is evolving rapidly, particularly in tech and product, but pay still lags significantly behind northern European averages.",
  germany:   "Germany offers a stable, well-paying labour market with strong protections. Salaries are competitive across the country, with Munich and Frankfurt leading regionally.",
  france:    "France's labour market is characterised by strong regulation and solid base salaries. Benefits and social contributions are generous, though gross pay may appear lower.",
  europe:    "Across Europe, salaries vary dramatically by country, city, company type, and sector. The numbers below represent a broad European market baseline.",
};

const ROLE_CONTEXT: Record<string, string> = {
  "software-engineer":  "Software engineers remain among the highest-earning professionals across Europe, with demand consistently outpacing supply in most markets.",
  "product-manager":    "Product managers command a premium in tech-forward companies, particularly those that are product-led. The role is still relatively new in many European markets, which keeps demand high.",
  "marketing-manager":  "Marketing manager salaries vary widely depending on the industry, company stage, and whether the role is performance-driven. Tech and FMCG typically pay the most.",
  "sales-manager":      "Sales manager compensation often includes a significant variable component. The base salary figures here reflect gross fixed pay, not on-target earnings.",
  "operations-manager": "Operations is a broad function, and salaries reflect that range. Tech and logistics companies tend to pay more than traditional industries for comparable seniority.",
  "designer":           "Design salaries have grown meaningfully as companies invest in product quality. Senior designers at product-led companies can earn close to engineering equivalents.",
};

export function getLocationContext(locationSlug?: string): string {
  return LOCATION_CONTEXT[locationSlug ?? "europe"] ?? LOCATION_CONTEXT.europe;
}

export function getRoleContext(roleSlug?: string): string {
  return ROLE_CONTEXT[roleSlug ?? "software-engineer"] ?? ROLE_CONTEXT["software-engineer"];
}

let _seoPageCache: SeoPage[] | null = null;

export function generateSeoPages(): SeoPage[] {
  if (_seoPageCache) return _seoPageCache;
  const pages: SeoPage[] = [];

  for (const role of ROLES) {
    for (const loc of LOCATIONS) {
      pages.push({
        slug: `${role.slug}-${loc.slug}`,
        type: "role-location",
        roleSlug: role.slug,
        locationSlug: loc.slug,
        roleLabel: role.label,
        locationLabel: loc.label,
        country: loc.country,
        h1: `${role.label} Salary in ${loc.label} (${YEAR})`,
        title: `${role.label} Salary in ${loc.label} ${YEAR} — Am I Underpaid?`,
        description: `What does a ${role.label} earn in ${loc.label}? See junior, mid-level, and senior salary ranges for ${YEAR}. Check your percentile and find out if you're underpaid.`,
      });
    }
  }

  for (const role of ROLES) {
    pages.push({
      slug: role.slug,
      type: "role-only",
      roleSlug: role.slug,
      roleLabel: role.label,
      h1: `${role.label} Salary (${YEAR})`,
      title: `${role.label} Salary ${YEAR} — Average Pay & Market Range`,
      description: `What is the average ${role.label} salary in ${YEAR}? Compare pay across London, Berlin, Amsterdam, and more. Find out if you're underpaid in your market.`,
    });
  }

  for (const loc of LOCATIONS) {
    pages.push({
      slug: loc.slug,
      type: "location-only",
      locationSlug: loc.slug,
      locationLabel: loc.label,
      country: loc.country,
      h1: `Average Salaries in ${loc.label} (${YEAR})`,
      title: `Average Salaries in ${loc.label} ${YEAR} — Am I Underpaid?`,
      description: `What are average salaries in ${loc.label} in ${YEAR}? Explore salary ranges for software engineers, product managers, designers, and more. Check if you're underpaid.`,
    });
  }

  _seoPageCache = pages;
  return pages;
}

export function getSeoPage(slug: string): SeoPage | undefined {
  return generateSeoPages().find((p) => p.slug === slug);
}

export function getRelatedPages(page: SeoPage, limit = 5): SeoPage[] {
  const all = generateSeoPages();
  const related: SeoPage[] = [];

  if (page.type === "role-location") {
    related.push(...all.filter((p) => p.type === "role-location" && p.roleSlug === page.roleSlug && p.slug !== page.slug).slice(0, 3));
    related.push(...all.filter((p) => p.type === "role-location" && p.locationSlug === page.locationSlug && p.slug !== page.slug).slice(0, 2));
  } else if (page.type === "role-only") {
    related.push(...all.filter((p) => p.type === "role-location" && p.roleSlug === page.roleSlug).slice(0, limit));
  } else if (page.type === "location-only") {
    related.push(...all.filter((p) => p.type === "role-location" && p.locationSlug === page.locationSlug).slice(0, limit));
  }

  return related.slice(0, limit);
}
