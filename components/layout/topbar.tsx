import type { ReactNode } from "react";

import { BellDot, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  /** Rendered to the right of the notification bell (e.g. UserMenu) */
  userSlot?: ReactNode;
  className?: string;
}

export function Topbar({
  title = "Platform shell",
  description = "A reusable top navigation region for future applications.",
  actions,
  userSlot,
  className,
}: TopbarProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search placeholder" />
          </div>
            <div className="flex items-center gap-2">
            {actions}
            <Button size="icon" variant="outline">
              <BellDot className="size-4" />
            </Button>
            <ThemeToggle />
            {userSlot}
          </div>
        </div>
      </div>
    </div>
  );
}
