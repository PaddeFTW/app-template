import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LayoutDashboard, Settings2, User } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/common/page-header";
import { ProfileForm } from "@/components/account/profile-form";

export const metadata: Metadata = {
  title: "Profil",
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

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/auth/login");

  return (
    <AppLayout navigation={navigation}>
      <div className="space-y-6">
        <PageHeader
          description="Uppdatera ditt namn, företag och jobbtitel."
          eyebrow="Konto"
          title="Profil"
        />
        <div className="max-w-xl rounded-xl border bg-card p-6">
          <ProfileForm profile={profile} />
        </div>
      </div>
    </AppLayout>
  );
}
