"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Settings2, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

interface UserMenuProps {
  email: string;
  fullName?: string | null;
}

export function UserMenu({ email, fullName }: UserMenuProps) {
  const router = useRouter();
  const displayName = fullName ?? email;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut({ scope: "local" });
    router.push("/");
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Account menu"
          className="size-8 rounded-full bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          size="icon"
          variant="outline"
        >
          {initials}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-base">{displayName}</DialogTitle>
          <DialogDescription className="text-xs">{email}</DialogDescription>
        </DialogHeader>

        <Separator />

        <nav className="space-y-1">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-token hover:bg-accent"
            href="/app/account/profile"
          >
            <User className="size-4 text-muted-foreground" />
            Profile
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-token hover:bg-accent"
            href="/app/account/settings"
          >
            <Settings2 className="size-4 text-muted-foreground" />
            Settings
          </Link>
        </nav>

        <Separator />

        <DialogFooter>
          <Button
            className="w-full"
            onClick={handleSignOut}
            type="button"
            variant="outline"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
