import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell description="Samma inloggning ska kunna återanvändas i alla appar som byggs på mallen." title="Logga in">
      <LoginForm />
    </AuthShell>
  );
}
