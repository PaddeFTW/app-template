import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { MagicLinkForm } from "@/components/auth/magic-link-form";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";

export const metadata: Metadata = {
  title: "Logga in",
};

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string; reset?: string; tab?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const showMagicLink = params.tab === "magic-link";
  const resetSuccess = params.reset === "success";

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {showMagicLink ? "Logga in med e-postlänk" : "Logga in"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {showMagicLink
            ? "Ange din e-post så skickar vi en inloggningslänk."
            : "Ange din e-post och ditt lösenord för att fortsätta."}
        </p>
      </div>

      {showMagicLink ? (
        <MagicLinkForm />
      ) : (
        <>
          <LoginForm
            redirectTo={params.redirectTo}
            resetSuccess={resetSuccess}
          />
          <div className="space-y-2 text-center">
            <Link
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
              href="/auth/login?tab=magic-link"
            >
              Logga in med e-postlänk istället
            </Link>
          </div>
          <SocialLoginButtons />
        </>
      )}
    </div>
  );
}
