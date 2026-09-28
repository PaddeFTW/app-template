export type SourceLevel =
  | "user_input"
  | "existing_data"
  | "knowledge"
  | "ai_interpretation";

export type SourceRef = {
  id: string;
  level: SourceLevel;
  label: string;
  excerpt?: string;
  knowledge_id?: string;
  source_id?: string;
  version?: string;
  status?: string;
};

export type ProposalWarning = {
  id: string;
  field_id?: string;
  code:
    | "ambiguous_date"
    | "missing_required"
    | "value_not_in_allowed"
    | "low_confidence"
    | "conflict_with_existing"
    | "unmapped_input";
  message: string;
};

export type ProposalChange = {
  field_id: string;
  label: string;
  old_value: unknown;
  new_value: unknown;
  confidence: 0 | 1 | 2 | 3;
  reason: string;
  source_ref: string;
  blocked?: boolean;
  warning_ids?: string[];
};

export type ProposalStatus = "draft" | "approved" | "rejected" | "applied" | "undone";

export type Proposal = {
  proposal_id: string;
  created_at: string;
  app_id: string;
  record_id: string | null;
  input_text: string;
  status: ProposalStatus;
  changes: ProposalChange[];
  warnings: ProposalWarning[];
  sources: SourceRef[];
};
