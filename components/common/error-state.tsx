import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something needs attention",
  description = "A future product can compose this state for failed requests, missing permissions, or validation blockers.",
  actionLabel = "Try again",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-48 flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-10 text-center",
        className,
      )}
    >
      <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive">
        <AlertTriangle className="size-5" />
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <Button className="mt-6" variant="destructive">
        {actionLabel}
      </Button>
    </div>
  );
}
