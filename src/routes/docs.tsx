import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/CodeBlock";
import { FrameworkTabs } from "@/components/FrameworkTabs";
import { Inline } from "@/components/Inline";
import { snippets } from "@/content/snippets";

const TITLE = "JavaScript & TypeScript DI Guide — Nonna";
const DESC =
  "Learn dependency injection in JavaScript and TypeScript with @nonnajs/di: installation, AOT compilation, providers, scopes, lifecycle hooks, testing, and API essentials.";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/docs" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/docs" }],
  }),
  component: Docs,
});

const toc = [
  { id: "installation", label: "Installation" },
  { id: "define-services", label: "Define Services" },
  { id: "aot", label: "AOT Compilation Setup" },
  { id: "bootstrap", label: "Bootstrap & Resolve" },
  { id: "providers", label: "Providers & Registration" },
  { id: "scopes", label: "Scopes" },
  { id: "lazy-eager", label: "Lazy vs. Eager" },
  { id: "lifecycle", label: "Lifecycle Hooks" },
  { id: "testing", label: "Testing" },
  { id: "api", label: "API Reference Summary" },
];

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-12 first:border-t-0 first:pt-0">
      <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
        <span className="font-mono text-sm text-amber">{String(index).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function P({ text }: { text: string }) {
  return (
    <p>
      <Inline text={text} />
    </p>
  );
}

function Callout({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-amber/30 bg-amber-soft px-4 py-3 text-sm text-foreground">
      <span className="mr-2 font-mono text-xs uppercase tracking-wider text-amber">why</span>
      <Inline text={text} />
    </div>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 font-mono text-sm font-semibold text-foreground">{children}</h3>;
}

const apiRows: { group: string; rows: [string, string][] }[] = [
  {
    group: "Nonna (fluent bootstrap)",
    rows: [
      ["Nonna.injector(): InjectorBuilder", "Start a fluent builder for a new injector."],
      [".withContextStorage(storage)", "Plug in a custom ContextStorage for request scopes."],
      [".register(provider)", "Register a class/value/factory/alias/multi provider."],
      [".registerValue(token, value)", "Register a constant value under a token."],
      [".registerFactory(token, inject, factory)", "Register a factory with explicit deps."],
      [".scan()", "Pick up every @Injectable() class + generated dependency map."],
      [".loadBeans(manifest)", "Load a precomputed provider manifest."],
      [".freeze()", "Lock the registry against further registrations."],
      [".build(): Promise<Injector>", "Runs refresh() + initialize(), returns a ready Injector."],
    ],
  },
  {
    group: "Injector (imperative API)",
    rows: [
      ["Injector.create(options?)", "Create an injector without the fluent builder."],
      [".register() / .registerValue() / .registerFactory()", "Imperative registration counterparts."],
      [".refresh()", "Recompute the dependency graph after registrations."],
      [".initialize(options?)", "Validate scopes, boot eager providers, run OnInit."],
      [".get<T>(token)", "Resolve a single instance synchronously."],
      [".getAll<T>(token)", "Resolve every multi-provider for a token."],
      [".getAsync<T>(token)", "Resolve a provider that has async factories/init."],
      [".getAllAsync<T>(token)", "Async variant of getAll()."],
      [".runInScope(fn)", "Run fn inside an isolated request scope."],
      [".destroy()", "Reverse-order teardown, runs OnDestroy hooks."],
      [".inspect(token) / .inspectAll(token)", "Read registration metadata for a token."],
    ],
  },
  {
    group: "Decorators",
    rows: [
      ["@Injectable(options?)", "Mark a class as a provider; options: scope, eager."],
      ["@Service(options?)", "Alias of @Injectable()."],
      ["@Inject(token)", "Override the inferred token for a constructor parameter."],
      ["@Optional(token?)", "Resolve to undefined instead of throwing when missing."],
    ],
  },
];

function Docs() {
  const [active, setActive] = useState(toc[0]?.id ?? "installation");

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-amber">{"// docs"}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Get started</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          From <code className="code-inline">npm install</code> to a running, compiled injector.
          Every snippet below is copied straight from the README — real API calls, nothing
          simplified away.
        </p>
      </div>

      {/* Mobile TOC */}
      <div className="mb-8 lg:hidden">
        <select
          className="w-full rounded-md border border-border bg-card px-3 py-2 font-mono text-sm"
          value={active}
          onChange={(e) => {
            document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label="Jump to section"
        >
          {toc.map((t, i) => (
            <option key={t.id} value={t.id}>
              {String(i + 1).padStart(2, "0")} — {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-12 lg:grid-cols-[200px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-20 space-y-0.5 border-l border-border">
            {toc.map((t, i) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 font-mono text-[12.5px] transition-colors",
                  active === t.id
                    ? "border-amber text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="mr-2 text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                {t.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <Section id="installation" index={1} title="Installation">
            <P text="`@nonnajs/di` is the runtime; `@nonnajs/compiler` is a dev dependency that runs before your build." />
            <FrameworkTabs
              tabs={[
                { id: "npm", label: "npm", content: <CodeBlock lang="sh" code={snippets.installNpm} /> },
                { id: "pnpm", label: "pnpm", content: <CodeBlock lang="sh" code={snippets.installPnpm} /> },
                { id: "yarn", label: "yarn", content: <CodeBlock lang="sh" code={snippets.installYarn} /> },
                { id: "deno", label: "Deno", icon: "deno", content: <CodeBlock lang="json" code={snippets.installDeno} title="deno.json" /> },
                { id: "bun", label: "Bun", icon: "bun", content: <CodeBlock lang="sh" code={snippets.installBun} /> },
              ]}
            />
          </Section>

          <Section id="define-services" index={2} title="Define Services">
            <P text="Mark classes with `@Injectable()` and declare dependencies as constructor parameters. No `emitDecoratorMetadata`, no `reflect-metadata`." />
            <CodeBlock code={snippets.userRepository} title="user.repository.ts" />
            <CodeBlock code={snippets.userService} title="user.service.ts" />
          </Section>

          <Section id="aot" index={3} title="AOT Compilation Setup">
            <P text="Run `nonna-compile` before `tsc`. It walks your project with the TypeScript `TypeChecker` and emits one generated file of `defineDependencies()` calls." />
            <CodeBlock lang="json" code={snippets.aotScripts} title="package.json" />
            <H3>Generated output</H3>
            <CodeBlock code={snippets.aotOutput} title="__generated__/nonna-dependencies.generated.ts" />
            <H3>CLI options</H3>
            <CodeBlock lang="sh" code={snippets.aotCli} compact />
            <Callout text="Because tokens are resolved at build time, the runtime injector never imports `typescript` and never touches `Reflect.getMetadata` — which is exactly what keeps it portable to Deno, Bun, and the edge." />
          </Section>

          <Section id="bootstrap" index={4} title="Bootstrap & Resolve">
            <P text="Import the generated file once at your entry point, then build the injector." />
            <CodeBlock code={snippets.bootstrap} title="index.ts" />
            <Callout text="`Nonna.injector()` is a fluent builder over the imperative `Injector.create()` API. `.build()` runs `refresh()` + `initialize()` for you — including the scope-violation walk that rejects a singleton depending on a request-scoped provider — and hands back a ready `Injector`. The imperative API is always there underneath if you need it." />
          </Section>

          <Section id="providers" index={5} title="Providers & Registration Types">
            <P text="Five registration shapes cover every wiring case. Explicit `register()` calls always win over what `scan()` discovers." />
            <H3>A. Class provider — useClass</H3>
            <CodeBlock code={snippets.providerClass} compact />
            <H3>B. Value provider — useValue</H3>
            <CodeBlock code={snippets.providerValue} compact />
            <H3>C. Factory provider — useFactory (sync or async)</H3>
            <CodeBlock code={snippets.providerFactory} />
            <H3>D. Alias provider — useExisting</H3>
            <CodeBlock code={snippets.providerAlias} compact />
            <H3>E. Multi-providers — multi: true</H3>
            <CodeBlock code={snippets.providerMulti} />
          </Section>

          <Section id="scopes" index={6} title="Scopes">
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-surface font-mono text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Scope</th>
                    <th className="px-4 py-2.5 font-medium">Lifetime</th>
                    <th className="px-4 py-2.5 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["`singleton` (default)", "Container lifetime", "One shared instance per `Injector`."],
                    ["`transient`", "Call lifetime", "A brand new instance every `.get()` call."],
                    ["`request`", "Async flow lifetime", "One shared instance per `injector.runInScope()` chain, isolated via `AsyncLocalStorage`."],
                  ].map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, i) => (
                        <td key={i} className={cn("px-4 py-2.5 align-top", i === 0 && "text-foreground")}>
                          <Inline text={c ?? ""} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <H3>Request scoping in an HTTP handler</H3>
            <CodeBlock code={snippets.requestScope} />
          </Section>

          <Section id="lazy-eager" index={7} title="Lazy vs. Eager">
            <P text="Providers are lazy by default. Mark connection-holding services `eager: true` so they boot concurrently during `initialize()` rather than on the first request." />
            <CodeBlock code={snippets.lazyEager} />
          </Section>

          <Section id="lifecycle" index={8} title="Lifecycle Hooks">
            <P text="Implement `OnInit`/`OnDestroy`. Teardown runs in reverse creation order and aggregates errors instead of stopping at the first one." />
            <CodeBlock code={snippets.lifecycle} />
          </Section>

          <Section id="testing" index={9} title="Testing">
            <P text="Explicit registrations always override decorator defaults, so swapping a real dependency for a fake is one `.register()` call." />
            <CodeBlock code={snippets.testing} />
          </Section>

          <Section id="api" index={10} title="API Reference Summary">
            <P text="A compact map of the surface area. For full signatures, see the repository." />
            {apiRows.map((g) => (
              <div key={g.group} className="overflow-hidden rounded-lg border border-border">
                <div className="border-b border-border bg-surface px-4 py-2 font-mono text-xs font-semibold text-foreground">
                  {g.group}
                </div>
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-border">
                    {g.rows.map(([sig, desc]) => (
                      <tr key={sig}>
                        <td className="w-1/2 px-4 py-2 align-top font-mono text-[12.5px] text-amber">
                          {sig}
                        </td>
                        <td className="px-4 py-2 align-top">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}
