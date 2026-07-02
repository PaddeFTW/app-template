import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: ReactNode;
  navigation?: ReactNode;
  className?: string;
}

export function SettingsLayout({
  children,
  navigation,
  className,
}: SettingsLayoutProps) {
  return (
    <section
      className={cn(
        "grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]",
        className,
      )}
    >
      <aside className="rounded-2xl border surface-elevated p-4 shadow-token-xs">
        <div className="space-y-2">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Settings nav
          </p>
          {navigation ?? (
            <div className="space-y-1">
              {["Profile", "Appearance", "Notifications", "Security"].map((item) => (
                <div
                  className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-token hover:bg-accent hover:text-accent-foreground"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
      <div className="rounded-2xl border surface-elevated p-6 shadow-token-sm">
        {children}
      </div>
    </section>
  );
}
