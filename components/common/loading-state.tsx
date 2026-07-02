import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LoadingState({
  title = "Loading foundation state",
  description = "Use this placeholder while future applications prepare data or route context.",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-48 flex-col items-center justify-center rounded-2xl border bg-card px-6 py-10 text-center shadow-token-xs",
        className,
      )}
    >
      <LoaderCircle className="mb-4 size-6 animate-spin text-primary" />
      <div className="space-y-2">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
