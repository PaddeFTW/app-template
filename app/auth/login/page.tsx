import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { MagicLinkForm } from "@/components/auth/magic-link-form";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";

export const metadata: Metadata = {
  title: "Sign in",
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
          {showMagicLink ? "Sign in with magic link" : "Sign in to your account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {showMagicLink
            ? "Enter your email and we'll send you a sign-in link."
            : "Enter your email and password to continue."}
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
              Sign in with magic link instead
            </Link>
          </div>
          <SocialLoginButtons />
        </>
      )}
    </div>
  );
}
