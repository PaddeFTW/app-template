import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/common/page-header";
import type { NavItem } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  navigation?: NavItem[];
  actions?: ReactNode;
}

export function DashboardLayout({
  children,
  title,
  description,
  navigation,
  actions,
}: DashboardLayoutProps) {
  return (
    <AppLayout navigation={navigation} topbarActions={actions}>
      <div className="space-y-6">
        <PageHeader
          actions={actions}
          description={description}
          eyebrow="Dashboard layout"
          title={title}
        />
        {children}
      </div>
    </AppLayout>
  );
}
