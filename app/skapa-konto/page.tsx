import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export default function SkapaKontoPage() {
  return (
    <AuthShell description="Du blir administratör för företaget. Andra bjuder du in i produkten senare." title="Skapa konto">
      <SignupForm />
    </AuthShell>
  );
}
