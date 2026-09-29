"use client";

import Link from "next/link";

import { useAuthSession } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authAdapter } from "@/lib/auth/adapter";
import { toCompanyContext } from "@/lib/auth/map-company";

export function AuthSessionCard() {
  const { session, company, loading, refresh } = useAuthSession();
  const workspaceCompany = toCompanyContext(company);

  async function signOut() {
    await authAdapter.signOut();
    await refresh();
  }

  return (
    <Card className="border-primary/20 bg-primary/[0.03]">
      <CardHeader>
        <CardTitle>Konto och företag</CardTitle>
        <CardDescription>
          Generiskt lager för alla appar. Demo använder LocalAuthAdapter i webbläsaren. Produkter byter till Supabase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {loading ? (
          <p className="text-muted-foreground">Laddar session…</p>
        ) : session ? (
          <dl className="grid gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Användare</dt>
              <dd className="font-medium">{session.fullName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">E-post</dt>
              <dd className="font-medium">{session.email}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Företag</dt>
              <dd className="font-medium">{session.organizationName || "Saknas"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Org.nr (profil)</dt>
              <dd className="font-medium">{company?.org_number || "–"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Workspace.company.org_number</dt>
              <dd className="font-medium">{workspaceCompany ? "bortmappat" : "ingen kontext"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Roll</dt>
              <dd className="font-medium">{session.role}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-muted-foreground">Ingen session. Skapa konto eller logga in.</p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href="/skapa-konto">Skapa konto</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/login">Logga in</Link>
          </Button>
          {session ? (
            <Button onClick={() => void signOut()} size="sm" type="button" variant="ghost">
              Logga ut
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
