import type { CompanySizeBand } from "./company";
import type { WorkspaceContext } from "./context";

export type KnowledgeQuery = {
  app_id: string;
  locale: string;
  module_id?: string;
  page_id?: string;
  step_id?: string;
  field_ids: string[];
  text?: string;
  allowed_domains: string[];
  allowed_knowledge_ids?: string[];
  kb_version?: string;
  audience?: string;
  industry?: string;
  size_band?: CompanySizeBand;
  standard_ids?: string[];
  company_id?: string;
};

export type KnowledgeHit = {
  knowledge_id: string;
  title: string;
  content_type: string;
  simple_text?: string;
  professional_text?: string;
  source_ids: string[];
  version?: string;
  status: string;
  score?: number;
};

export type KnowledgeAdapter = {
  retrieve: (query: KnowledgeQuery) => Promise<KnowledgeHit[]>;
};

export const NoopAdapter: KnowledgeAdapter = {
  retrieve: async () => [],
};

export function toKnowledgeQuery(
  ctx: WorkspaceContext,
  extra?: Partial<KnowledgeQuery>,
): KnowledgeQuery {
  return {
    app_id: ctx.app_id,
    locale: ctx.locale,
    module_id: ctx.module_id,
    page_id: ctx.page_id,
    step_id: ctx.step_id,
    field_ids: ctx.fields.map((field) => field.id),
    industry: ctx.company?.industry,
    size_band: ctx.company?.size_band,
    standard_ids: ctx.company?.standard_ids,
    company_id: ctx.company?.company_id,
    allowed_domains: extra?.allowed_domains ?? [],
    ...extra,
  };
}

export type ActionContract = {
  id: string;
  label: string;
  type:
    | "create"
    | "update"
    | "delete"
    | "navigate"
    | "createActivity"
    | "addComment"
    | "generateSummary";
  enabled: boolean;
  requires_confirmation: boolean;
  allowed_in_v1: false;
};
