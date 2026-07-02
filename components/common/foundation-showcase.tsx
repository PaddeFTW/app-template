import {
  ArrowRight,
  Blocks,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
import { DocumentLayout } from "@/components/layout/document-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";

export function FoundationShowcase() {
  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { title: "Foundation", href: "/" },
          { title: "Starter template" },
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            icon: <LayoutDashboard className="size-5" />,
            title: "Reusable shells",
            description:
              "Composable layout patterns for dashboard, document, app shell, and settings surfaces.",
          },
          {
            icon: <Blocks className="size-5" />,
            title: "Neutral primitives",
            description:
              "shadcn-compatible building blocks styled with semantic tokens instead of product assumptions.",
          },
          {
            icon: <Sparkles className="size-5" />,
            title: "Theme-ready system",
            description:
              "Light and dark theme variables for premium SaaS surfaces, spacing, motion, radius, and shadows.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="mb-3 inline-flex w-fit rounded-xl bg-primary/10 p-3 text-primary">
                {item.icon}
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Foundation components</CardTitle>
                <CardDescription>
                  Demonstration only. These elements are intentionally domain-neutral.
                </CardDescription>
              </div>
              <Badge variant="secondary">Preview</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input</label>
                <Input placeholder="Reusable field placeholder" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select</label>
                <Select defaultValue="starter">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter foundation</SelectItem>
                    <SelectItem value="extension">Application extension</SelectItem>
                    <SelectItem value="audit">Design audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Textarea</label>
              <Textarea placeholder="Document conventions, layout rules, or extension guidance." />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Platform readiness</span>
                <span className="text-muted-foreground">78%</span>
              </div>
              <Progress value={78} />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Open reusable dialog
                  <ArrowRight className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reusable dialog shell</DialogTitle>
                  <DialogDescription>
                    Future applications can compose confirmations, forms, or detail views on
                    top of this neutral dialog primitive.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <Input placeholder="Dialog field" />
                  <Textarea placeholder="Dialog content area" />
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token status</CardTitle>
            <CardDescription>
              Shared design tokens prepared for all future Quality WorX products.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Colors", "Semantic light and dark palettes"],
              ["Spacing", "Consistent layout rhythm"],
              ["Radius", "Unified softness scale"],
              ["Shadows", "Premium elevation hierarchy"],
              ["Typography", "Readable SaaS-first defaults"],
              ["Animations", "Subtle system motion"],
            ].map(([title, description]) => (
              <div
                className="flex items-start justify-between gap-3 rounded-xl border bg-background/60 px-4 py-3"
                key={title}
              >
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Badge variant="success">Ready</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Table placeholder</CardTitle>
            <CardDescription>
              Neutral tabular presentation component for future data modules.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artifact</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>AppLayout</TableCell>
                  <TableCell>Global shell orchestration</TableCell>
                  <TableCell>
                    <Badge>Ready</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DocumentLayout</TableCell>
                  <TableCell>Long-form structured content</TableCell>
                  <TableCell>
                    <Badge>Ready</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SettingsLayout</TableCell>
                  <TableCell>Preferences and configuration views</TableCell>
                  <TableCell>
                    <Badge>Ready</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>State placeholders</CardTitle>
            <CardDescription>
              Generic states every application can compose from the start.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LoadingState className="min-h-36" />
            <EmptyState
              actionLabel="Create first module"
              description="Use this for empty collections, missing setup steps, or unconfigured screens."
              title="Nothing has been configured yet"
            />
            <ErrorState className="min-h-36" />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Document layout preview</CardTitle>
            <CardDescription>
              A balanced shell for procedures, manuals, policies, and structured records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentLayout
              meta={
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-primary" />
                    <p className="font-medium">Document metadata</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reserve this region for revision status, approvals, tags, or owner context.
                  </p>
                </div>
              }
              sidebar={
                <div className="space-y-2">
                  <p className="text-sm font-medium">Related blocks</p>
                  <p className="text-sm text-muted-foreground">
                    Optional secondary navigation or contextual actions.
                  </p>
                </div>
              }
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Document shell</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Future applications can inject editors, rendered markdown, or approval history
                  into this neutral document surface.
                </p>
              </div>
            </DocumentLayout>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings layout preview</CardTitle>
            <CardDescription>
              A clean two-column structure for profile, workspace, or module preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsLayout>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="size-4 text-primary" />
                  <p className="font-medium">Settings content region</p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Plug in forms, toggles, audit panels, and configuration groups without changing
                  the shell.
                </p>
              </div>
            </SettingsLayout>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Documentation deliverables</CardTitle>
          <CardDescription>
            The repository includes architecture, design system, roadmap, and agent guidance.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "README.md",
            "PROJECT_BRIEF.md",
            "DESIGN_SYSTEM.md",
            "ARCHITECTURE.md",
            "ROADMAP.md",
            "CHANGELOG.md",
            "AGENTS.md",
            "docs/",
          ].map((item) => (
            <div className="rounded-xl border bg-background/60 px-4 py-3 text-sm font-medium" key={item}>
              {item}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            The result is a foundation repository rather than an application.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
