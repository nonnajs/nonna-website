import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import architectureAsset from "@/assets/nonna-architecture.svg.asset.json";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { REPO } from "@/content/snippets";

const TITLE = "Architecture — Nonna";
const DESC =
  "A visual map of Nonna's zero-reflection dependency injection architecture, from the static AOT compiler to runtime injectors and framework bindings.";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/architecture" },
    ],
    links: [{ rel: "canonical", href: "/architecture" }],
  }),
  component: Architecture,
});

function Architecture() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="architecture"
            title="Static graph, small runtime."
            body="Nonna shifts constructor discovery and dependency graph wiring to build time, then ships a runtime injector that stays portable across Node.js, Deno, Bun, browsers, and edge environments."
          />
          <Button asChild variant="outline" className="w-fit shrink-0">
            <a href={`${REPO}/tree/main/di`} target="_blank" rel="noreferrer">
              View implementation
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <figure className="overflow-hidden rounded-lg border border-border bg-code shadow-sm">
          <div className="overflow-x-auto">
            <img
              src={architectureAsset.url}
              alt="Nonna dependency injection framework architecture diagram showing the build-time compiler, runtime injector, framework integrations, and samples."
              className="block h-auto min-w-[760px] max-w-none md:min-w-0 md:w-full"
              loading="eager"
            />
          </div>
          <figcaption className="border-t border-code-border px-4 py-3 font-mono text-xs text-code-foreground/70">
            Build-time metadata extraction feeds runtime injectors and framework bindings without
            reflection.
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}