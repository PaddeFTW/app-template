"use client";

import type {
  AuthAdapter,
  AuthSession,
  CompanyProfile,
  CreateCompanyInput,
  SignInInput,
  SignUpInput,
} from "./types";

const SESSION_KEY = "app-template.auth.session";
const COMPANY_KEY = "app-template.auth.company";
const USERS_KEY = "app-template.auth.users";

type StoredUser = {
  userId: string;
  email: string;
  fullName: string;
  password: string;
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export const LocalAuthAdapter: AuthAdapter = {
  async getSession() {
    return readJson<AuthSession | null>(SESSION_KEY, null);
  },
  async getCompany() {
    return readJson<CompanyProfile | null>(COMPANY_KEY, null);
  },
  async signIn(input: SignInInput) {
    const users = readJson<StoredUser[]>(USERS_KEY, []);
    const user = users.find(
      (item) => item.email.toLowerCase() === input.email.trim().toLowerCase() && item.password === input.password,
    );
    if (!user) throw new Error("Fel e-post eller lösenord.");
    const company = readJson<CompanyProfile | null>(COMPANY_KEY, null);
    const session: AuthSession = {
      userId: user.userId,
      email: user.email,
      fullName: user.fullName,
      organizationId: company?.company_id ?? "",
      organizationName: company?.display_name ?? "",
      role: "admin",
    };
    writeJson(SESSION_KEY, session);
    return session;
  },
  async signUp(input: SignUpInput) {
    if (input.password.length < 6) throw new Error("Lösenordet ska ha minst 6 tecken.");
    const users = readJson<StoredUser[]>(USERS_KEY, []);
    if (users.some((item) => item.email.toLowerCase() === input.email.trim().toLowerCase())) {
      throw new Error("Den här e-posten finns redan. Logga in i stället.");
    }
    const user: StoredUser = {
      userId: id("user"),
      email: input.email.trim().toLowerCase(),
      fullName: input.fullName.trim(),
      password: input.password,
    };
    writeJson(USERS_KEY, [...users, user]);
    const company: CompanyProfile = {
      company_id: id("org"),
      display_name: input.companyName.trim(),
      org_number: input.orgNumber?.trim() || undefined,
      locale: "sv",
      updated_at: new Date().toISOString(),
    };
    writeJson(COMPANY_KEY, company);
    const session: AuthSession = {
      userId: user.userId,
      email: user.email,
      fullName: user.fullName,
      organizationId: company.company_id,
      organizationName: company.display_name,
      role: "admin",
    };
    writeJson(SESSION_KEY, session);
    return session;
  },
  async signOut() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(SESSION_KEY);
  },
  async createCompany(input: CreateCompanyInput) {
    const session = readJson<AuthSession | null>(SESSION_KEY, null);
    if (!session) throw new Error("Du måste vara inloggad.");
    const company: CompanyProfile = {
      company_id: id("org"),
      display_name: input.companyName.trim(),
      org_number: input.orgNumber?.trim() || undefined,
      industry: input.industry,
      size_band: input.size_band,
      locale: "sv",
      updated_at: new Date().toISOString(),
    };
    writeJson(COMPANY_KEY, company);
    writeJson(SESSION_KEY, {
      ...session,
      organizationId: company.company_id,
      organizationName: company.display_name,
      role: "admin",
    });
    return company;
  },
  async updateCompany(input) {
    const current = readJson<CompanyProfile | null>(COMPANY_KEY, null);
    if (!current) throw new Error("Inget företag än.");
    const next = { ...current, ...input, updated_at: new Date().toISOString() };
    writeJson(COMPANY_KEY, next);
    const session = readJson<AuthSession | null>(SESSION_KEY, null);
    if (session && input.display_name) {
      writeJson(SESSION_KEY, { ...session, organizationName: input.display_name });
    }
    return next;
  },
};
