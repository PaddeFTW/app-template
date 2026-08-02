import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LayoutDashboard, Settings2, User } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/common/page-header";
import { PasswordChangeForm } from "@/components/account/password-change-form";
import { DeleteAccountDialog } from "@/components/account/delete-account-dialog";

export const metadata: Metadata = {
  title: "Account settings",
};

const navigation = [
  {
    title: "Dashboard",
    href: "/app/dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    title: "Profile",
    href: "/app/account/profile",
    icon: <User className="size-4" />,
  },
  {
    title: "Settings",
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
          description="Manage your password and account settings."
          eyebrow="Account"
          title="Settings"
        />

        <div className="max-w-xl space-y-6">
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold">Change password</h3>
              <p className="text-sm text-muted-foreground">
                Update the password for your account.
              </p>
            </div>
            <PasswordChangeForm />
          </div>

          <div className="rounded-xl border border-destructive/20 bg-card p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-destructive">
                Danger zone
              </h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This
                cannot be undone.
              </p>
            </div>
            <DeleteAccountDialog />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
