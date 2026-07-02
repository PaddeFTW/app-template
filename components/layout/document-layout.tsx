import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DocumentLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  meta?: ReactNode;
  className?: string;
}

export function DocumentLayout({
  children,
  sidebar,
  meta,
  className,
}: DocumentLayoutProps) {
  return (
    <section
      className={cn(
        "grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]",
        className,
      )}
    >
      <article className="rounded-2xl border surface-elevated p-6 shadow-token-sm sm:p-8">
        {children}
      </article>
      <aside className="space-y-6">
        {meta ? (
          <div className="rounded-2xl border surface-elevated p-5 shadow-token-xs">
            {meta}
          </div>
        ) : null}
        {sidebar ? (
          <div className="rounded-2xl border surface-elevated p-5 shadow-token-xs">
            {sidebar}
          </div>
        ) : null}
      </aside>
    </section>
  );
}
