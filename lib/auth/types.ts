import type { CompanySizeBand } from "@/lib/workspace/company";

export type AuthRole = "admin" | "member" | "viewer";

export type AuthSession = {
  userId: string;
  email: string;
  fullName: string;
  organizationId: string;
  organizationName: string;
  role: AuthRole;
};

export type CompanyProfile = {
  company_id: string;
  display_name: string;
  org_number?: string;
  industry?: string;
  size_band?: CompanySizeBand;
  standard_ids?: string[];
  locale?: "sv" | "en";
  updated_at?: string;
};

export type SignUpInput = {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  orgNumber?: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type CreateCompanyInput = {
  companyName: string;
  orgNumber?: string;
  industry?: string;
  size_band?: CompanySizeBand;
};

export type AuthAdapter = {
  getSession: () => Promise<AuthSession | null>;
  getCompany: () => Promise<CompanyProfile | null>;
  signIn: (input: SignInInput) => Promise<AuthSession>;
  signUp: (input: SignUpInput) => Promise<AuthSession>;
  signOut: () => Promise<void>;
  createCompany: (input: CreateCompanyInput) => Promise<CompanyProfile>;
  updateCompany: (input: Partial<CompanyProfile>) => Promise<CompanyProfile>;
};
