import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Get started — it only takes a moment.
        </p>
      </div>

      <RegisterForm />
      <SocialLoginButtons />
    </div>
  );
}
