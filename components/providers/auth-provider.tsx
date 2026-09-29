"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { authAdapter } from "@/lib/auth/adapter";
import type { AuthSession, CompanyProfile } from "@/lib/auth/types";

type AuthContextValue = {
  session: AuthSession | null;
  company: CompanyProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  company: null,
  loading: true,
  refresh: async () => undefined,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const nextSession = await authAdapter.getSession();
    const nextCompany = await authAdapter.getCompany();
    setSession(nextSession);
    setCompany(nextCompany);
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
  }, []);

  return <AuthContext.Provider value={{ session, company, loading, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuthSession() {
  return useContext(AuthContext);
}
