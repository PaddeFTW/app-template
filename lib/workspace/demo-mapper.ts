import type { WorkspaceContext } from "./context";
import type { Proposal, ProposalChange, ProposalWarning, SourceRef } from "./proposal";

export function createDemoProposal(inputText: string, context: WorkspaceContext): Proposal {
  const text = inputText.trim();
  const lower = text.toLocaleLowerCase("sv");
  const sources: SourceRef[] = [
    { id: "src_user", level: "user_input", label: "Din text", excerpt: text },
    { id: "src_ai", level: "ai_interpretation", label: "Tolkning" },
  ];
  const warnings: ProposalWarning[] = [];
  const changes: ProposalChange[] = [];
  const add = (fieldId: string, newValue: unknown, confidence: 0 | 1 | 2 | 3, reason: string, sourceRef: string, warningIds?: string[]) => {
    const field = context.fields.find((item) => item.id === fieldId);
    if (!field || !field.ai_writable || Object.is(field.value, newValue)) return;
    changes.push({ field_id: field.id, label: field.label, old_value: field.value, new_value: newValue, confidence, reason, source_ref: sourceRef, warning_ids: warningIds });
  };

  const customer = text.match(/kunden är\s+([^.!?]+)/i)?.[1]?.trim();
  if (customer) add("customer_name", customer, 3, "Kunden namngavs i texten.", "src_user");
  const contact = text.match(/([A-ZÅÄÖ][\p{L}-]+) är kontaktperson/iu)?.[1];
  if (contact) add("contact_person", contact, 3, "Kontaktperson namngavs i texten.", "src_user");
  const rating = text.match(/(\d)\s*av\s*5/i)?.[1];
  if (rating) add("rating", Number(rating), 3, "Användaren angav ett betyg.", "src_user");
  if (rating && /leverans/i.test(lower)) {
    const warningId = "w_low";
    warnings.push({ id: warningId, field_id: "comment", code: "low_confidence", message: "Kommentaren är en tolkning, inte ett citat." });
    add("comment", `De gav ${rating} av 5 på leveransen.`, 1, "Kort sammanfattning av underlaget.", "src_ai", [warningId]);
  }
  const month = lower.match(/i\s+(januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)/);
  if (month) {
    const months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
    const dateWarning = "w_date";
    warnings.push({ id: dateWarning, field_id: "follow_up_date", code: "ambiguous_date", message: "Ingen dag angavs. Kontrollera datumet innan du godkänner." });
    add("follow_up_date", `2026-${String(months.indexOf(month[1]) + 1).padStart(2, "0")}-01`, 1, "Endast månad angavs. Första dagen föreslås.", "src_ai", [dateWarning]);
  }

  return { proposal_id: `prp_${Date.now()}`, created_at: new Date().toISOString(), app_id: context.app_id, record_id: context.record_id, input_text: text, status: "draft", changes, warnings, sources };
}
