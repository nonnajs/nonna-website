import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import architectureAsset from "@/assets/nonna-architecture.svg";
import architectureLightAsset from "@/assets/nonna-architecture-light.svg";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { REPO } from "@/content/snippets";

const TITLE = "Zero-Reflection DI Architecture — Nonna";
const DESC =
  "See how Nonna compiles JavaScript and TypeScript dependency graphs ahead of time, avoiding runtime reflection across Node.js, Deno, Bun, browsers, and edge runtimes.";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/architecture" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <figure className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <img
              src={architectureAsset}
              alt="Nonna dependency injection framework architecture diagram showing the build-time compiler, runtime injector, framework integrations, and samples."
              className="hidden h-auto min-w-[760px] max-w-none dark:block md:min-w-0 md:w-full"
              loading="eager"
            />
            <img
              src={architectureLightAsset}
              alt="Nonna dependency injection framework architecture diagram showing the build-time compiler, runtime injector, framework integrations, and samples."
              className="block h-auto min-w-[760px] max-w-none dark:hidden md:min-w-0 md:w-full"
              loading="eager"
            />
          </div>
          <figcaption className="border-t border-border px-4 py-3 font-mono text-xs text-muted-foreground">
            Build-time metadata extraction feeds runtime injectors and framework bindings without
            reflection.
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}