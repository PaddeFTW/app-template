"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { UserProfileUpdate } from "@/lib/supabase/types";

export interface UpdateProfileState {
  error?: string;
  success?: boolean;
}

export async function updateProfile(
  _prev: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unauthorized." };
  }

  const update: UserProfileUpdate = {
    full_name: formData.get("full_name") as string | null,
    company_name: formData.get("company_name") as string | null,
    job_title: formData.get("job_title") as string | null,
    language: (formData.get("language") as string) || "en",
    timezone: (formData.get("timezone") as string) || "UTC",
    marketing_consent: formData.get("marketing_consent") === "on",
  };

  const { error } = await supabase
    .from("user_profiles")
    .update(update)
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/app/account/profile");
  return { success: true };
}
