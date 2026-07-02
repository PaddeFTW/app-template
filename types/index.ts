import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";

export interface NavItem {
  title: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface ShellAction {
  label: string;
  href?: string;
  icon?: ReactNode;
}
