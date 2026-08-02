import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LayoutDashboard, Settings2, User } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export const metadata: Metadata = {
  title: "Dashboard",
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

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name ?? user.email ?? "there";

  return (
    <DashboardLayout
      description="Your personal workspace."
      navigation={navigation}
      title={`Welcome back, ${displayName}`}
    >
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        You are signed in as <span className="font-medium text-foreground">{user.email}</span>.
        This is your protected dashboard — it is only accessible to authenticated users.
      </div>
    </DashboardLayout>
  );
}
