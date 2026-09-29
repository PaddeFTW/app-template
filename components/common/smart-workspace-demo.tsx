"use client";

import { useState } from "react";

import { SmartWorkspacePanel } from "@/components/common/smart-workspace-panel";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoCompanyContext } from "@/lib/workspace/company";
import type { WorkspaceAppContract } from "@/lib/workspace/context";
import type { FieldInstance } from "@/lib/workspace/field-contract";

const initialFields: FieldInstance[] = [
  { id: "customer_name", label: "Kundnamn", type: "text", required: true, ai_writable: true, value: "" },
  { id: "contact_person", label: "Kontaktperson", type: "text", required: false, ai_writable: true, value: "" },
  { id: "rating", label: "Betyg", type: "rating", required: false, ai_writable: true, min: 1, max: 5, value: null },
  { id: "comment", label: "Kommentar", type: "textarea", required: false, ai_writable: true, value: "" },
  { id: "follow_up_date", label: "Uppföljning", type: "date", required: false, ai_writable: true, value: null },
];

export function SmartWorkspaceDemo() {
  const [fields, setFields] = useState(initialFields);
  const [includeCompany, setIncludeCompany] = useState(true);
  const contract: WorkspaceAppContract = {
    app_id: "template-showcase",
    app_name: "app",
    workspace_enabled: true,
    locale: "sv",
    getContext: () => ({
      app_id: "template-showcase",
      app_name: "app",
      locale: "sv",
      module_id: "workspace-demo",
      page_id: "foundation",
      record_id: "demo-record",
      permissions: { canOpenWorkspace: true, canApplyWorkspace: true },
      fields,
      company: includeCompany ? demoCompanyContext : undefined,
    }),
    applyFieldUpdates: async ({ changes }) => {
      setFields((current) =>
        current.map((field) => {
          const change = changes.find((item) => item.field_id === field.id);
          return change ? { ...field, value: change.new_value } : field;
        }),
      );
      return { ok: true, applied_field_ids: changes.map((change) => change.field_id) };
    },
  };

  return (
    <Card className="border-primary/20 bg-primary/[0.03]">
      <CardHeader>
        <CardTitle>Smart arbetsyta</CardTitle>
        <CardDescription>
          En valfri, granskningsbar panel som mappar fri text till kända fält. Öppna knappen nere till höger för att prova.
          {includeCompany
            ? ` Kontext: ${demoCompanyContext.display_name} (${demoCompanyContext.industry}, ${demoCompanyContext.size_band}).`
            : " Ingen företagskontext."}
        </CardDescription>
        <label className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={includeCompany}
            onChange={(event) => setIncludeCompany(event.target.checked)}
          />
          Inkludera CompanyContext i getContext()
        </label>
      </CardHeader>
      <SmartWorkspacePanel contract={contract} />
    </Card>
  );
}
