import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BrandIcon } from "@/components/Icons";
import { Inline } from "@/components/Inline";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { REPO, samples } from "@/content/snippets";

const TITLE = "Samples — Nonna";
const DESC =
  "11 runnable sample applications covering Node.js, Deno, Bun, React, Vue, Svelte, Web Components, and StencilJS — proof of full cross-runtime compatibility.";

export const Route = createFileRoute("/samples")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/samples" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/samples" }],
  }),
  component: Samples,
});

function Samples() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="samples"
          title="Proof, not promises."
          body="11 runnable sample applications in the repo prove full compatibility across every runtime and framework Nonna supports."
        />
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {samples.map((s, i) => (
          <Reveal key={s.name} delay={(i % 3) * 60}>
            <a
              href={`${REPO}/tree/main/samples/${s.name}`}
              target="_blank"
              rel="noreferrer"
              className="card-lift group flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="pill">
                  <BrandIcon name={s.icon} className="size-3" />
                  <Inline text={s.runtime} />
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-amber" />
              </div>
              <h3 className="font-mono text-[15px] font-semibold text-foreground">{s.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <Inline text={s.highlights} />
              </p>
              <span className="mt-auto pt-2 text-sm font-medium text-amber">View source →</span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
