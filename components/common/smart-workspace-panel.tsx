"use client";

import { useState } from "react";
import { Check, ChevronDown, RotateCcw, Sparkles, WandSparkles, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createDemoProposal } from "@/lib/workspace/demo-mapper";
import type { WorkspaceAppContract } from "@/lib/workspace/context";
import type { Proposal } from "@/lib/workspace/proposal";

const sourceLabels = { user_input: "Din text", existing_data: "Befintligt", ai_interpretation: "Tolkning", knowledge: "Kunskap" };

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "Inte ifyllt";
  if (typeof value === "boolean") return value ? "Ja" : "Nej";
  return String(value);
}

export function SmartWorkspacePanel({ contract }: { contract: WorkspaceAppContract }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  if (!contract.workspace_enabled) return null;
  const context = contract.getContext();
  if (!context.permissions.canOpenWorkspace) return null;

  const createProposal = () => {
    const next = createDemoProposal(input, context);
    setProposal(next);
    setSelected(next.changes.map((change) => change.field_id));
    setMessage(null);
  };

  const apply = async () => {
    if (!proposal || !context.record_id || !context.permissions.canApplyWorkspace) return;
    const changes = proposal.changes.filter((change) => selected.includes(change.field_id) && !change.blocked);
    const result = await contract.applyFieldUpdates({ record_id: context.record_id, proposal_id: proposal.proposal_id, changes: changes.map((change) => ({ field_id: change.field_id, new_value: change.new_value })) });
    if (result.ok) {
      setProposal({ ...proposal, status: "applied" });
      setMessage(`${result.applied_field_ids.length} fält uppdaterades.`);
    } else setMessage(result.error ?? "Förslaget kunde inte appliceras.");
  };

  const undo = async () => {
    if (!proposal || !context.record_id) return;
    const changes = proposal.changes.filter((change) => selected.includes(change.field_id));
    const result = await contract.applyFieldUpdates({ record_id: context.record_id, proposal_id: proposal.proposal_id, changes: changes.map((change) => ({ field_id: change.field_id, new_value: change.old_value })) });
    if (result.ok) {
      setProposal({ ...proposal, status: "undone" });
      setMessage("Förslaget ångrades.");
    }
  };

  return (
    <>
      <Button className="fixed bottom-5 right-5 z-40 rounded-full px-5 shadow-lg" onClick={() => setOpen(true)}>
        <WandSparkles data-icon="inline-start" />
        Smart arbetsyta
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary"><Sparkles /></div>
              <div>
                <DialogTitle>Smart arbetsyta</DialogTitle>
                <DialogDescription>Beskriv vad du vill fylla i. Du granskar alltid förslaget innan något ändras.</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {!proposal || proposal.status === "undone" ? (
            <div className="flex flex-col gap-4">
              <Textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Till exempel: Kunden är ABC Bygg. Anna är kontaktperson. De gav 4 av 5 på leveransen och vill att vi följer upp i oktober." rows={5} />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">Demo-mappning · ingen automatisk skrivning</p>
                <Button onClick={createProposal} disabled={!input.trim()}>Skapa förslag</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div><p className="font-medium">Granska förslag</p><p className="text-sm text-muted-foreground">{proposal.changes.length} möjliga ändringar</p></div>
                <Badge variant={proposal.status === "applied" ? "success" : "secondary"}>{proposal.status === "applied" ? "Applicerat" : "Utkast"}</Badge>
              </div>
              <div className="flex flex-col gap-2">
                {proposal.changes.map((change) => {
                  const checked = selected.includes(change.field_id);
                  return <Card key={change.field_id} className={checked ? "border-primary/40" : "opacity-60"}>
                    <CardHeader className="pb-3"><div className="flex items-start justify-between gap-3"><label className="flex cursor-pointer items-start gap-3"><input aria-label={`Välj ${change.label}`} checked={checked} className="mt-1 size-4 accent-primary" onChange={() => setSelected((items) => checked ? items.filter((id) => id !== change.field_id) : [...items, change.field_id])} type="checkbox" /><span><CardTitle className="text-sm">{change.label}</CardTitle><CardDescription>{change.reason}</CardDescription></span></label><Badge variant="outline">{sourceLabels[proposal.sources.find((source) => source.id === change.source_ref)?.level ?? "user_input"]}</Badge></div></CardHeader>
                    <CardContent className="grid gap-2 text-sm sm:grid-cols-2"><div><p className="text-xs text-muted-foreground">Före</p><p className="rounded-md bg-muted px-3 py-2">{formatValue(change.old_value)}</p></div><div><p className="text-xs text-muted-foreground">Efter</p><p className="rounded-md bg-primary/10 px-3 py-2 font-medium">{formatValue(change.new_value)}</p></div></CardContent>
                  </Card>;
                })}
              </div>
              {proposal.warnings.length > 0 && <div className="flex flex-col gap-2 rounded-lg border border-amber-300/60 bg-amber-50/70 p-3 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100"><p className="font-medium">Kontrollera innan du godkänner</p>{proposal.warnings.map((warning) => <p key={warning.id}>{warning.message}</p>)}</div>}
              {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </div>
          )}
          <DialogFooter>
            {proposal && proposal.status === "applied" ? <Button variant="outline" onClick={undo}><RotateCcw data-icon="inline-start" />Ångra</Button> : proposal && proposal.status === "draft" ? <><Button variant="ghost" onClick={() => { setProposal({ ...proposal, status: "rejected" }); setMessage("Förslaget avvisades."); }}><X data-icon="inline-start" />Avvisa</Button><Button onClick={apply} disabled={!selected.length || !context.record_id}><Check data-icon="inline-start" />Godkänn valda</Button></> : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
