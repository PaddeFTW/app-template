import type { ReactNode } from "react";
import Link from "next/link";
import { PanelLeft } from "lucide-react";

import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { NavItem } from "@/types";

interface SidebarProps {
  title?: string;
  subtitle?: string;
  items?: NavItem[];
  footer?: ReactNode;
  className?: string;
}

export function Sidebar({
  title = appConfig.brandName,
  subtitle = "Navigation",
  items = [],
  footer,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden w-80 shrink-0 border-r bg-sidebar text-sidebar-foreground lg:flex lg:flex-col",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="rounded-xl bg-primary/12 p-2 text-primary">
          <PanelLeft className="size-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="space-y-2 px-4 py-5">
          {items.map((item) => (
            <Link
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-token hover:bg-background/70 hover:text-foreground"
              href={item.href}
              key={item.title}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                <span>{item.title}</span>
              </span>
              {item.badge ? (
                <Badge className="border-transparent" variant="secondary">
                  {item.badge}
                </Badge>
              ) : null}
            </Link>
          ))}
        </div>
      </ScrollArea>
      {footer ? (
        <>
          <Separator />
          <div className="p-4">{footer}</div>
        </>
      ) : null}
    </aside>
  );
}
