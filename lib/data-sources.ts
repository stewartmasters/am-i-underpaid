export const DATA_MODEL_VERSION = "2026-Q1";
export const DATA_UPDATED_AT = "2026-03-01";

export interface DataSource {
  id: string;
  name: string;
  type: "government" | "aggregated" | "community" | "industry";
  coverage: string[];  // location/role categories this applies to
  notes: string;
  url?: string; // public reference URL only
}

export const DATA_SOURCES: DataSource[] = [
  {
    id: "eurostat",
    name: "Eurostat Labour Cost Survey",
    type: "government",
    coverage: ["europe", "germany", "france", "spain", "netherlands", "ireland"],
    notes: "EU-wide wage structure survey covering industry-level gross annual earnings.",
    url: "https://ec.europa.eu/eurostat/web/labour-market/earnings",
  },
  {
    id: "ons-uk",
    name: "UK ONS Annual Survey of Hours and Earnings (ASHE)",
    type: "government",
    coverage: ["london", "uk"],
    notes: "UK government survey covering median gross annual pay by occupation and region.",
    url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours",
  },
  {
    id: "glassdoor",
    name: "Glassdoor Salary Insights",
    type: "aggregated",
    coverage: ["all"],
    notes: "Aggregated self-reported salary data across roles and cities. Used as a market signal for role-level benchmarking.",
  },
  {
    id: "indeed",
    name: "Indeed Salary Insights",
    type: "aggregated",
    coverage: ["all"],
    notes: "Job-posting-derived salary ranges across European markets. Used to calibrate role/location medians.",
  },
  {
    id: "levels-fyi",
    name: "Levels.fyi Compensation Data",
    type: "community",
    coverage: ["software-engineer", "data-scientist", "product-manager", "devops-engineer", "frontend-developer", "backend-developer"],
    notes: "Community-verified compensation data, strongest signal for tech roles in major European cities.",
    url: "https://www.levels.fyi",
  },
];

export function getSourcesForRole(roleSlug: string): DataSource[] {
  return DATA_SOURCES.filter(
    (s) => s.coverage.includes("all") || s.coverage.includes(roleSlug)
  );
}
