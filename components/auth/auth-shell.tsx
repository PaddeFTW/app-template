import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AuthShell({
  title,
  description,
  children,
  contentClassName,
}: {
  title: string;
  description: string;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className={cn("w-full space-y-6", contentClassName ?? "max-w-sm")}>
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-primary">app</p>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </main>
  );
}
