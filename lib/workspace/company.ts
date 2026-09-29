export type CompanySizeBand = "1-9" | "10-49" | "50-249" | "250+";

/**
 * Generic company slice for Smart Workspace.
 * Apps own the full profile (including organisation number).
 * Workspace only consumes this mapped subset.
 */
export type CompanyContext = {
  company_id: string;
  display_name: string;
  industry?: string;
  size_band?: CompanySizeBand;
  standard_ids?: string[];
  locale?: "sv" | "en";
  updated_at?: string;
};

export const demoCompanyContext: CompanyContext = {
  company_id: "demo-company",
  display_name: "ABC Bygg AB",
  industry: "bygg",
  size_band: "10-49",
  standard_ids: ["iso-9001", "iso-14001", "iso-45001"],
  locale: "sv",
};
