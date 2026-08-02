/**
 * config/app.ts
 *
 * Central configuration for product identity and feature flags.
 * All product names, brand names, and feature toggles are defined here.
 * Components, pages, and metadata must read from this file — never hardcode.
 *
 * Replace the placeholder values when building a product on top of this template.
 */

export const appConfig = {
  // ── Product identity ────────────────────────────────────────────────────────
  /** Full product name shown in headings and metadata. */
  productName: "[Product name]",
  /** Short brand name shown in the sidebar header and auth layout. */
  brandName: "[Your brand name]",
  /** Product description used in metadata and the foundation showcase. */
  description:
    "A configurable, production-ready app template with authentication, layouts, and design system.",
  /** Repository URL. */
  repositoryUrl: "https://github.com/PaddeFTW/app-template",

  // ── Feature flags ───────────────────────────────────────────────────────────
  /**
   * Social / OAuth login buttons.
   * Set to true only after configuring OAuth providers in the Supabase Dashboard.
   */
  socialLogin: false,
  /**
   * Smart workspace features (AI-assisted workspace, advanced collaboration, etc.).
   * Reserved for future use — keep false until the feature is implemented.
   */
  smartWorkspace: false,
} as const;

export type AppConfig = typeof appConfig;
