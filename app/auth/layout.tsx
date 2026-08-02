import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { siteConfig } from "@/lib/site-config";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-sm font-semibold">{siteConfig.shortName}</span>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
