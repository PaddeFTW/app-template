"use client";

import { useState } from "react";

import { appConfig } from "@/config/app";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

const PROVIDERS = [
  { id: "google", label: "Google" },
  { id: "azure", label: "Microsoft" },
  { id: "linkedin_oidc", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" },
  { id: "twitter", label: "X / Twitter" },
] as const;

type Provider = (typeof PROVIDERS)[number]["id"];

export function SocialLoginButtons() {
  const [loading, setLoading] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hidden when social login is disabled in config
  if (!appConfig.socialLogin) return null;

  async function handleOAuth(provider: Provider) {
    setLoading(provider);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/app/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(null);
    }
    // On success Supabase redirects the browser — no further action needed
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">eller fortsätt med</span>
        <Separator className="flex-1" />
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PROVIDERS.map((p) => (
          <Button
            disabled={loading !== null}
            key={p.id}
            onClick={() => handleOAuth(p.id)}
            type="button"
            variant="outline"
          >
            {loading === p.id ? "Redirecting…" : p.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
