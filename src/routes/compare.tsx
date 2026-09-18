import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus, X } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { Inline } from "@/components/Inline";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { comparisonBullets } from "@/content/snippets";

const TITLE = "Compare — Nonna vs TypeDI, InversifyJS, tsyringe";
const DESC =
  "How Nonna's AOT, zero-reflection approach compares with reflect-metadata-based DI frameworks like TypeDI, InversifyJS, and tsyringe.";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/compare" },
    ],
    links: [{ rel: "canonical", href: "/compare" }],
  }),
  component: Compare,
});

type Cell = { kind: "yes" | "no" | "partial"; note?: string | undefined };
const yes = (note?: string): Cell => ({ kind: "yes", note });
const no = (note?: string): Cell => ({ kind: "no", note });
const partial = (note?: string): Cell => ({ kind: "partial", note });

const cols = ["@nonna/di", "TypeDI", "InversifyJS", "tsyringe"];
const rows: { label: string; cells: Cell[] }[] = [
  {
    label: "Zero runtime deps",
    cells: [yes("empty `dependencies`"), no("reflect-metadata"), no("reflect-metadata"), no("reflect-metadata")],
  },
  {
    label: "Needs `reflect-metadata`",
    cells: [yes("never"), no("required"), no("required"), no("required")],
  },
  {
    label: "AOT compilation",
    cells: [yes("`@nonna/compiler`"), no("runtime reflection"), no("runtime reflection"), no("runtime reflection")],
  },
  {
    label: "Deno / Bun / Edge support",
    cells: [yes("unmodified"), partial("polyfill-dependent"), partial("polyfill-dependent"), partial("polyfill-dependent")],
  },
  {
    label: "Bundle size class",
    cells: [yes("~27 KB, no deps"), partial("+ reflect-metadata"), partial("+ reflect-metadata"), partial("+ reflect-metadata")],
  },
];

function CellIcon({ cell }: { cell: Cell }) {
  const Icon = cell.kind === "yes" ? Check : cell.kind === "no" ? X : Minus;
  const color =
    cell.kind === "yes"
      ? "text-amber"
      : cell.kind === "no"
        ? "text-destructive/80"
        : "text-muted-foreground";
  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <Icon className={`size-4 ${color}`} />
      {cell.note && (
        <span className="font-mono text-[11px] text-muted-foreground">
          <Inline text={cell.note} />
        </span>
      )}
    </span>
  );
}

function Compare() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading eyebrow="state of the art" title="Built to not have to choose." />
        <p className="mt-6 max-w-3xl border-l-2 border-amber pl-5 text-base leading-relaxed text-muted-foreground">
          <Inline text="Most JavaScript DI frameworks pick one of two trade-offs: lean on `reflect-metadata` + `emitDecoratorMetadata` for auto-wiring (TypeDI, InversifyJS, tsyringe) and accept the runtime reflection tax and the Deno/Bun/edge compatibility gaps that come with it, or drop auto-wiring altogether and make every dependency a manual, stringly-typed registration. Nonna is built to not have to choose." />
        </p>
      </Reveal>

      <Reveal className="mt-10 overflow-x-auto rounded-lg border border-border" delay={60}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface font-mono text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium" />
              {cols.map((c, i) => (
                <th key={c} className={`px-4 py-3 font-medium ${i === 0 ? "text-amber" : ""}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.label}>
                <td className="px-4 py-3 align-top font-medium">
                  <Inline text={r.label} />
                </td>
                {r.cells.map((c, i) => (
                  <td key={i} className={`px-4 py-3 align-top ${i === 0 ? "bg-amber-soft/40" : ""}`}>
                    <CellIcon cell={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-border px-4 py-2 font-mono text-[11px] text-muted-foreground">
          Competitor columns reflect their documented reflect-metadata dependency and lack of
          built-in AOT; no third-party benchmarks are implied.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {comparisonBullets.map((b, i) => (
          <Reveal key={b.title} delay={i * 40}>
            <FeatureCard title={b.title} body={b.body} index={i + 1} className="h-full" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
