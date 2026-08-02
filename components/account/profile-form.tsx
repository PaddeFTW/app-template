"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/actions/account/update-profile";
import type { UserProfile } from "@/lib/supabase/types";

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, action, isPending] = useActionState(updateProfile, {});

  return (
    <div className="space-y-6">
      {state.error && (
        <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
          Profile updated successfully.
        </p>
      )}

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="full_name">
              Full name
            </label>
            <Input
              defaultValue={profile.full_name ?? ""}
              id="full_name"
              name="full_name"
              placeholder="Jane Smith"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="job_title">
              Job title
            </label>
            <Input
              defaultValue={profile.job_title ?? ""}
              id="job_title"
              name="job_title"
              placeholder="Product Manager"
              type="text"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium" htmlFor="company_name">
              Company
            </label>
            <Input
              defaultValue={profile.company_name ?? ""}
              id="company_name"
              name="company_name"
              placeholder="Acme Corp"
              type="text"
            />
          </div>
        </div>

        <Button disabled={isPending} type="submit">
          {isPending ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
