import type { CompanyContext } from "@/lib/workspace/company";
import type { CompanyProfile } from "./types";

/** Workspace never receives organisation number. */
export function toCompanyContext(profile: CompanyProfile | null): CompanyContext | undefined {
  if (!profile) return undefined;
  return {
    company_id: profile.company_id,
    display_name: profile.display_name,
    industry: profile.industry,
    size_band: profile.size_band,
    standard_ids: profile.standard_ids,
    locale: profile.locale,
    updated_at: profile.updated_at,
  };
}
