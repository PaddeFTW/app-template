export type FieldTypeV1 =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "checkbox"
  | "rating";

export type FieldContract = {
  id: string;
  label: string;
  type: FieldTypeV1;
  required: boolean;
  ai_writable: boolean;
  description?: string;
  placeholder?: string;
  example?: string;
  allowed_values?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  multiline?: boolean;
};

export type FieldInstance = FieldContract & {
  value: unknown;
  disabled?: boolean;
};
