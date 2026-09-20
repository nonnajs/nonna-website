import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Injector, type ContextStorage, type RequestScopeStore } from "@nonnajs/di";
import {
  NonnaProvider,
  useAllInjections,
  useInjection,
  useInjector,
  useOptionalInjection,
} from "@nonnajs/react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import "@/playground/nonna-dependencies.generated";
import {
  FEATURE_FLAGS,
  FormalGreeter,
  FriendlyGreeter,
  GREETER,
  LoggerService,
  UserRepository,
  UserService,
  type FeatureFlags,
  type Greeter,
} from "@/playground/services";
import { CodeBlock } from "@/components/CodeBlock";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const TITLE = "Live React DI Playground — Nonna";
const DESC =
  "Run @nonnajs/react in the browser: build an injector, register multi and optional providers, and resolve them with useInjection, useAllInjections, useOptionalInjection and useInjector.";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/playground" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/playground" }],
  }),
  component: Playground,
});

interface Config {
  friendly: boolean;
  formal: boolean;
  flags: boolean;
}

/**
 * Browsers have no `node:async_hooks`, so supply a synchronous ContextStorage instead of the
 * default AsyncLocalStorage-backed one — exactly the escape hatch `InjectorOptions` exists for.
 */
class SyncContextStorage<T> implements ContextStorage<T> {
  private current: T | undefined;
  run<R>(store: T, fn: () => R): R {
    const previous = this.current;
    this.current = store;
    try {
      return fn();
    } finally {
      this.current = previous;
    }
  }
  getStore(): T | undefined {
    return this.current;
  }
}

async function buildInjector(config: Config): Promise<Injector> {
  const injector = Injector.create({
    contextStorage: new SyncContextStorage<RequestScopeStore>(),
  });

  injector.register({ provide: UserRepository, useClass: UserRepository });
  injector.register({ provide: LoggerService, useClass: LoggerService });
  injector.register({ provide: UserService, useClass: UserService });

  if (config.friendly) {
    injector.register({ provide: GREETER, useClass: FriendlyGreeter, multi: true });
  }
  if (config.formal) {
    injector.register({ provide: GREETER, useClass: FormalGreeter, multi: true });
  }
  if (config.flags) {
    injector.register({
      provide: FEATURE_FLAGS,
      useValue: { betaBanner: true } satisfies FeatureFlags,
    });
  }

  await injector.initialize();
  return injector;
}

const bootstrapCode = `import { Nonna } from "@nonnajs/di";
import { NonnaProvider } from "@nonnajs/react";

const injector = await Nonna.injector()
  .register({ provide: GREETER, useClass: FriendlyGreeter, multi: true })
  .register({ provide: GREETER, useClass: FormalGreeter, multi: true })
  .scan() // every @Injectable() class
  .build();

createRoot(root).render(
  <NonnaProvider injector={injector}>
    <App />
  </NonnaProvider>,
);`;

const hooksCode = `// one instance, no prop-drilling
const userService = useInjection(UserService);

// every provider for a multi: true token
const greeters = useAllInjections<Greeter>(GREETER);

// undefined instead of ProviderNotFoundError
const flags = useOptionalInjection<FeatureFlags>(FEATURE_FLAGS);

// escape hatch: the raw Injector
const injector = useInjector();`;

function GreetingBanner() {
  const greeters = useAllInjections<Greeter>(GREETER);
  const flags = useOptionalInjection<FeatureFlags>(FEATURE_FLAGS);

  return (
    <section>
      <Label>useAllInjections(GREETER)</Label>
      {flags?.betaBanner && (
        <p className="mt-2 rounded-md border border-amber/40 bg-amber/10 px-3 py-2 text-sm text-foreground">
          🚧 Beta features enabled — resolved from an optional provider.
        </p>
      )}
      {greeters.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          No greeter registered — <code className="code-inline">useAllInjections</code> returns an
          empty array instead of throwing.
        </p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm text-foreground">
          {greeters.map((g, i) => (
            <li key={i} className="font-mono">
              {g.greet("Nonna")}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        useOptionalInjection(FEATURE_FLAGS) → {flags ? "{ betaBanner: true }" : "undefined"}
      </p>
    </section>
  );
}

function UserPanel() {
  const userService = useInjection(UserService);
  const logger = useInjection(LoggerService);
  const [tick, setTick] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const users = userService.getUsers();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name || !email) return;
    userService.addUser(name, email);
    setName("");
    setEmail("");
    setTick((t) => t + 1);
  }

  return (
    <section key={tick}>
      <Label>useInjection(UserService)</Label>
      <ul className="mt-2 space-y-1 font-mono text-sm text-foreground">
        {users.map((u) => (
          <li key={u.id}>
            {u.name} &lt;{u.email}&gt;
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-amber"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-amber"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add user
        </button>
      </form>
      {logger.logs.length > 0 && (
        <pre className="mt-3 overflow-x-auto rounded-md border border-code-border bg-code px-3 py-2 font-mono text-[12px] leading-relaxed text-code-foreground">
          {logger.logs.join("\n")}
        </pre>
      )}
      <p className="mt-2 text-xs text-muted-foreground">
        The form and the list resolve the same singleton <code className="code-inline">UserService</code>
        , which logs through the injected <code className="code-inline">LoggerService</code>.
      </p>
    </section>
  );
}

function InspectPanel() {
  const injector = useInjector();
  const inspection = injector.inspect(UserService);
  if (!inspection) return null;
  return (
    <section>
      <Label>useInjector().inspect(UserService)</Label>
      <pre className="mt-2 overflow-x-auto rounded-md border border-code-border bg-code px-3 py-2 font-mono text-[12px] leading-relaxed text-code-foreground">
        {JSON.stringify(
          {
            scope: inspection.scope,
            kind: inspection.kind,
            multi: inspection.multi,
            eager: inspection.eager,
            instantiated: inspection.instantiated,
          },
          null,
          2,
        )}
      </pre>
    </section>
  );
}

function Label({ children }: { children: string }) {
  return (
    <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{children}</h3>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "cursor-pointer rounded-md border px-3 py-1.5 font-mono text-[12px] transition-colors",
        checked
          ? "border-amber bg-amber/10 text-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
      aria-pressed={checked}
    >
      {checked ? "✓ " : "  "}
      {label}
    </button>
  );
}

function Playground() {
  const [config, setConfig] = useState<Config>({ friendly: true, formal: true, flags: false });
  const [injector, setInjector] = useState<Injector | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    let built: Injector | undefined;
    setInjector(null);
    setError(null);
    buildInjector(config)
      .then((i) => {
        built = i;
        if (active) setInjector(i);
        else void i.destroy();
      })
      .catch((e: unknown) => {
        if (active) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      active = false;
      void built?.destroy();
    };
  }, [config, nonce]);

  const set = useCallback(
    (key: keyof Config) => (v: boolean) => setConfig((c) => ({ ...c, [key]: v })),
    [],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="playground"
          title="A real injector, running in this page."
          body="This page boots an actual @nonnajs/di injector in your browser and resolves it through @nonnajs/react hooks — the same wiring as the sample-react repo. Toggle providers and the container is rebuilt live."
        />
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <Toggle label="GREETER → FriendlyGreeter" checked={config.friendly} onChange={set("friendly")} />
          <Toggle label="GREETER → FormalGreeter" checked={config.formal} onChange={set("formal")} />
          <Toggle label="FEATURE_FLAGS provider" checked={config.flags} onChange={set("flags")} />
          <button
            type="button"
            onClick={() => setNonce((n) => n + 1)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            rebuild injector
          </button>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-lg border border-border bg-card p-5">
            {error ? (
              <p className="font-mono text-sm text-destructive">{error}</p>
            ) : !injector ? (
              <p className="font-mono text-sm text-muted-foreground">building injector…</p>
            ) : (
              <NonnaProvider injector={injector}>
                <div className="space-y-6">
                  <GreetingBanner />
                  <UserPanel />
                  <InspectPanel />
                </div>
              </NonnaProvider>
            )}
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={60}>
            <CodeBlock code={bootstrapCode} lang="tsx" title="main.tsx" />
          </Reveal>
          <Reveal delay={120}>
            <CodeBlock code={hooksCode} lang="tsx" title="components" />
          </Reveal>
          <Reveal delay={180}>
            <a
              href="https://github.com/nonnajs/sample-react"
              target="_blank"
              rel="noreferrer"
              className="card-lift group flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-5"
            >
              <div>
                <h3 className="font-mono text-[15px] font-semibold text-foreground">sample-react</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  The full runnable Vite app this playground is built from, including the AOT
                  compile step.
                </p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-amber" />
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
