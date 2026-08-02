import { Blocks, FileStack, Home, LayoutPanelTop, Settings2 } from "lucide-react";

import { FoundationShowcase } from "@/components/common/foundation-showcase";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const navigation = [
  {
    title: "Foundation overview",
    href: "/",
    icon: <Home className="size-4" />,
  },
  {
    title: "UI primitives",
    href: "/",
    icon: <Blocks className="size-4" />,
    badge: "Core",
  },
  {
    title: "Layout shells",
    href: "/",
    icon: <LayoutPanelTop className="size-4" />,
  },
  {
    title: "Document patterns",
    href: "/",
    icon: <FileStack className="size-4" />,
  },
  {
    title: "Settings patterns",
    href: "/",
    icon: <Settings2 className="size-4" />,
  },
];

export default function HomePage() {
  return (
    <DashboardLayout
      actions={
        <>
          <Button variant="secondary">Review docs</Button>
          <Button>Extend foundation</Button>
        </>
      }
      description={siteConfig.description}
      navigation={navigation}
      title="Official Quality WorX starter foundation"
    >
      <FoundationShowcase />
    </DashboardLayout>
  );
}
