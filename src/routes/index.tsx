import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Cpu,
  Globe,
  Layers,
  PackageCheck,
  Puzzle,
  Waypoints,
} from "lucide-react";
import { CodeBlock, InstallCommand } from "@/components/CodeBlock";
import { FeatureCard } from "@/components/FeatureCard";
import { FrameworkTabs } from "@/components/FrameworkTabs";
import { BrandIcon, brandLabels, type BrandKey } from "@/components/Icons";
import { Inline } from "@/components/Inline";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { REPO, snippets } from "@/content/snippets";

const TITLE = "JavaScript & TypeScript Dependency Injection — Nonna";
const DESC =
  "Nonna is a fast, zero-reflection dependency injection framework and AOT compiler for JavaScript and TypeScript, built for Node.js, Deno, Bun, browsers, and the edge.";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Nonna",
  description: DESC,
  codeRepository: "https://github.com/nonnajs/nonna",
  license: "https://opensource.org/license/mit",
  programmingLanguage: ["TypeScript", "JavaScript"],
  runtimePlatform: ["Node.js", "Deno", "Bun", "Browser", "Edge runtime"],
  keywords: [
    "dependency injection",
    "JavaScript dependency injection",
    "TypeScript dependency injection",
    "zero reflection",
    "AOT compiler",
    "TypeDI alternative",
    "InversifyJS alternative",
    "tsyringe alternative",
    "NestJS dependency injection alternative",
    "Awilix alternative",
  ],
  author: {
    "@type": "Person",
    name: "Manuel Santos",
    sameAs: [
      "https://github.com/manusant",
      "https://www.linkedin.com/in/manuel-brito-dos-santos-a7a20a6b/",
    ],
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(softwareJsonLd),
      },
    ],
  }),
  component: Home,
});

const badges: BrandKey[] = [
  "node",
  "deno",
  "bun",
  "react",
  "vue",
  "svelte",
  "webcomponents",
  "stencil",
];

const pillars = [
  {
    icon: PackageCheck,
    title: "Zero Runtime Dependencies",
    body: "`@nonnajs/di` ships an empty `dependencies` object and never requires `reflect-metadata`. Checked by a guardrail test, not just claimed.",
  },
  {
    icon: Globe,
    title: "True Runtime Agnostic",
    body: "Runs unmodified on Node.js, Deno, Bun, and edge/Workers runtimes using standard `node:async_hooks` `AsyncLocalStorage` and Web Standards.",
  },
  {
    icon: Cpu,
    title: "Ahead-of-Time Compilation",
    body: "`@nonnajs/compiler` statically inspects your TypeScript with the real `TypeChecker` at build time — constructor tokens are known before the process even starts.",
  },
  {
    icon: Waypoints,
    title: "First-Class Request Scoping",
    body: "Built-in `request` scope isolates state per async execution flow (`injector.runInScope()`), with strict guardrails preventing request-scoped leaks into singletons.",
  },
  {
    icon: Layers,
    title: "Deterministic Lifecycle",
    body: "Predictable `OnInit`/`OnDestroy` hooks with reverse-order teardown and aggregated error reporting.",
  },
  {
    icon: Puzzle,
    title: "Pluggable & Extensible",
    body: "First-class multi-providers (`multi: true`), sync/async factories, alias tokens, and full container inspection APIs.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:pt-24">
          <div className="min-w-0 animate-fade-up">
            <div className="flex flex-wrap gap-2">
              <span className="pill pill-amber">Zero Dependencies</span>
              <span className="pill">Zero Reflection</span>
              <span className="pill">Runtime Agnostic</span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Dependency injection without the{" "}
              <span className="text-amber">reflection tax</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A lightweight, zero-reflection, runtime-agnostic Dependency Injection framework and
              AOT compiler for modern JavaScript and TypeScript. Runs identically on Node.js, Deno,
              Bun, and the edge.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="font-medium">
                <Link to="/docs">
                  Get Started <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={REPO} target="_blank" rel="noreferrer">
                  <BrandIcon name="github" /> View on GitHub
                </a>
              </Button>
            </div>
            <InstallCommand command={snippets.install} className="mt-6" />
          </div>
          <div className="min-w-0 animate-fade-up [animation-delay:120ms]">
            <CodeBlock code={snippets.heroQuickstart} lang="ts" title="quickstart" />
          </div>
        </div>
      </section>

      {/* Badge strip */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            One core. Every runtime. Every framework.
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {badges.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <BrandIcon name={b} className="size-5" />
                {brandLabels[b]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Nonna */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="why nonna"
            title="Six architectural decisions, no adjectives."
            body="Every pillar below is a concrete engineering constraint the runtime is built around — not a marketing bullet."
          />
        </Reveal>
        <Reveal delay={40}>
          <p className="mt-6 max-w-3xl border-l-2 border-amber pl-5 text-lg font-medium leading-relaxed tracking-tight sm:text-xl">
            <b>Design philosophy:</b> <i>"shift as much DI reasoning as possible into
            compile/initialization time, leaving an extremely small and predictable runtime."</i>
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <FeatureCard {...p} index={i + 1} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* In your stack */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="see it in your stack"
              title="Looks native, because it is."
              body="Same injector, same tokens — resolved through the idiom your framework already uses."
            />
          </Reveal>
          <Reveal className="mt-10" delay={80}>
            <FrameworkTabs
              tabs={[
                {
                  id: "node",
                  label: "Node",
                  icon: "node",
                  content: <CodeBlock code={snippets.bootstrap} lang="ts" title="index.ts" />,
                },
                {
                  id: "bun",
                  label: "Bun",
                  icon: "bun",
                  intro: "Same code, zero changes — just run it with Bun.",
                  content: <CodeBlock code={snippets.bootstrap} lang="ts" title="index.ts" />,
                },
                {
                  id: "deno",
                  label: "Deno",
                  icon: "deno",
                  intro: "Same code, zero changes — just run it with Deno.",
                  content: <CodeBlock code={snippets.bootstrap} lang="ts" title="index.ts" />,
                },
                {
                  id: "react",
                  label: "React",
                  icon: "react",
                  content: (
                    <CodeBlock code={snippets.reactComponent} lang="tsx" title="UserList.tsx" />
                  ),
                },
                {
                  id: "vue",
                  label: "Vue",
                  icon: "vue",
                  content: <CodeBlock code={snippets.vueComponent} lang="vue" title="UserList.vue" />,
                },
                {
                  id: "svelte",
                  label: "Svelte",
                  icon: "svelte",
                  content: (
                    <CodeBlock code={snippets.svelteComponent} lang="svelte" title="UserList.svelte" />
                  ),
                },
              ]}
            />
            <Link
              to="/ecosystem"
              className="link-amber mt-5 inline-flex items-center gap-1 text-sm font-medium"
            >
              See full example <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Performance + origin */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="performance"
            title={"Performance work that goes past \u201cit's fast\u201d."}
          />
          <blockquote className="mt-6 border-l-2 border-amber pl-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <Inline text="Integer-keyed registrations instead of `Symbol()` allocation. Memoized dependency metadata instead of a `WeakMap` hit per resolution. A mutable stack + `Set` for circular-dependency tracking on the hot synchronous path. `AsyncLocalStorage` skipped entirely when nothing is request-scoped. Independent eager providers booting concurrently instead of one at a time." />
          </blockquote>
        </Reveal>
        <Reveal delay={100}>
          <div className="rounded-lg border border-dashed border-amber/40 bg-amber-soft/40 p-5 font-mono text-[13px] leading-relaxed">
            <p className="text-amber">{"/**"}</p>
            <p className="text-muted-foreground">
              {" * "}
              <span className="text-foreground">Origin story.</span> Nonna was born on vacation in
              Rome, coded during the "cold hours" in a hotel room while the kids watched TV — a
              tentative replacement for TypeDI in an existing project, driven by a deceptively
              simple question: how "pure" (zero-reflection) and fast can a DI framework actually
              get if you stop assuming{" "}
              <code className="text-amber">reflect-metadata</code> has to be part of the deal?
            </p>
            <p className="text-amber">{" */"}</p>
          </div>
        </Reveal>
      </section>

      {/* CTA band */}
      <section className="border-t border-border bg-amber-soft">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <Boxes className="size-8 text-amber" />
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop paying the reflection tax.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/docs">
                Get Started <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={REPO} target="_blank" rel="noreferrer">
                <BrandIcon name="github" /> View on GitHub
              </a>
            </Button>
          </div>
          <InstallCommand command={snippets.install} />
        </div>
      </section>
    </>
  );
}
