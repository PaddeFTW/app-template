import { appConfig } from "@/config/app";

/**
 * siteConfig is derived from appConfig so all product identity
 * stays in one place: config/app.ts.
 */
export const siteConfig = {
  name: appConfig.productName,
  shortName: appConfig.brandName,
  description: appConfig.description,
  links: {
    repository: appConfig.repositoryUrl,
  },
  docs: [
    {
      title: "Project Brief",
      href: "/PROJECT_BRIEF.md",
      description: "Purpose, non-goals, and platform objectives.",
    },
    {
      title: "Design System",
      href: "/DESIGN_SYSTEM.md",
      description: "Token model, visual principles, and component guidance.",
    },
    {
      title: "Architecture",
      href: "/ARCHITECTURE.md",
      description: "Folder structure, layering, and extension rules.",
    },
    {
      title: "Roadmap",
      href: "/ROADMAP.md",
      description: "Planned evolution of the shared starter foundation.",
    },
  ],
} as const;
