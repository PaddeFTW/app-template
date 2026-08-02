import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";

export const metadata: Metadata = {
  title: "Skapa konto",
};

export default function RegisterPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Skapa ett konto
        </h1>
        <p className="text-sm text-muted-foreground">
          Kom igång — det tar bara ett ögonblick.
        </p>
      </div>

      <RegisterForm />
      <SocialLoginButtons />
    </div>
  );
}
