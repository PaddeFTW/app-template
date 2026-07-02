import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm text-muted-foreground", className)}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={`${item.title}-${index}`}>
              {item.href && !isLast ? (
                <Link className="transition-token hover:text-foreground" href={item.href}>
                  {item.title}
                </Link>
              ) : (
                <span className={cn(isLast && "text-foreground")}>{item.title}</span>
              )}
              {!isLast ? <ChevronRight className="size-4" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
