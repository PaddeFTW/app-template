import type { FieldContract, FieldInstance } from "./field-contract";

export type WorkspaceLocale = "sv" | "en";

export type WorkspaceContext = {
  app_id: string;
  app_name: string;
  locale: WorkspaceLocale;
  module_id?: string;
  page_id?: string;
  section_id?: string;
  step_id?: string;
  record_id: string | null;
  user_role?: string;
  permissions: {
    canOpenWorkspace: boolean;
    canApplyWorkspace: boolean;
  };
  fields: FieldInstance[];
};

export type ApplyFieldUpdatesInput = {
  record_id: string;
  proposal_id: string;
  changes: Array<{ field_id: string; new_value: unknown }>;
};

export type ApplyFieldUpdatesResult = {
  ok: boolean;
  applied_field_ids: string[];
  error?: string;
};

export type WorkspaceAppContract = {
  app_id: string;
  app_name: string;
  workspace_enabled: boolean;
  locale: WorkspaceLocale;
  getContext: () => WorkspaceContext;
  applyFieldUpdates: (
    input: ApplyFieldUpdatesInput,
  ) => Promise<ApplyFieldUpdatesResult>;
  knowledge?: import("./adapter").KnowledgeAdapter;
  usage?: import("./usage").UsagePort;
  actions?: import("./adapter").ActionContract[];
};

export type WorkspaceField = FieldContract;
