import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LayoutDashboard, Settings2, User } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/common/page-header";
import { PasswordChangeForm } from "@/components/account/password-change-form";
import { DeleteAccountDialog } from "@/components/account/delete-account-dialog";

export const metadata: Metadata = {
  title: "Kontoinställningar",
};

const navigation = [
  {
    title: "Dashboard",
    href: "/app/dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    title: "Profil",
    href: "/app/account/profile",
    icon: <User className="size-4" />,
  },
  {
    title: "Kontoinställningar",
    href: "/app/account/settings",
    icon: <Settings2 className="size-4" />,
  },
];

export default async function AccountSettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <AppLayout navigation={navigation}>
      <div className="space-y-8">
        <PageHeader
          description="Hantera ditt lösenord och kontoinställningar."
          eyebrow="Konto"
          title="Kontoinställningar"
        />

        <div className="max-w-xl space-y-6">
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold">Byt lösenord</h3>
              <p className="text-sm text-muted-foreground">
                Uppdatera lösenordet för ditt konto.
              </p>
            </div>
            <PasswordChangeForm />
          </div>

          <div className="rounded-xl border border-destructive/20 bg-card p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-destructive">
                Farlig zon
              </h3>
              <p className="text-sm text-muted-foreground">
                Radera ditt konto och all tillhörande data permanent. Detta går
                inte att ångra.
              </p>
            </div>
            <DeleteAccountDialog />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
