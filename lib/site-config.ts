export const siteConfig = {
  name: "Quality WorX Platform Foundation",
  shortName: "Quality WorX",
  description:
    "Official starter template for future Quality WorX applications, focused on reusable architecture, design tokens, layouts, and UI primitives.",
  links: {
    repository: "https://github.com/PaddeFTW/quality-worx-app-template",
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
