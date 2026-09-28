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
