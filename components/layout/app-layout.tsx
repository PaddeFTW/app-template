import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { NavItem } from "@/types";

interface AppLayoutProps {
  children: ReactNode;
  navigation?: NavItem[];
  sidebarFooter?: ReactNode;
  topbarActions?: ReactNode;
  contentClassName?: string;
}

export function AppLayout({
  children,
  navigation,
  sidebarFooter,
  topbarActions,
  contentClassName,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar footer={sidebarFooter} items={navigation} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar actions={topbarActions} />
        <main className={cn("flex-1 px-4 py-6 sm:px-6 lg:px-8", contentClassName)}>
          {children}
        </main>
      </div>
    </div>
  );
}
