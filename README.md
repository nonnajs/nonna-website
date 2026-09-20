# Nonna: Pure DI

build this:

**Nonna** is a high-performance Dependency Injection framework and AOT compiler, engineered to be
completely independent of any specific runtime, server, or web framework. It runs identically on
**Node.js**, **Deno**, **Bun**, and edge platforms (Cloudflare Workers, Fastly Compute), and has
first-class bindings for **React**, **Vue 3**, **Svelte 5**, **vanilla Web Components**, and
**StencilJS**.

Its whole reason to exist: most JS DI frameworks (TypeDI, InversifyJS, tsyringe) lean on
`reflect-metadata` + `emitDecoratorMetadata` for auto-wiring, which taxes runtime performance and
breaks compatibility with Deno/Bun/edge runtimes. Nonna's `@nonna/compiler` statically analyzes
TypeScript at **build time** using the real TypeScript `TypeChecker`, so the runtime injector never
touches `Reflect`, never imports `typescript`, and has **zero runtime dependencies** — enforced by
a guardrail test, not just claimed.

- **License:** MIT
- **Author:** Manuel Santos
- **GitHub:** `github.com/nodejs-boot/nonna` (use this as the canonical repo link throughout)
- **npm scope:** `@nonna/*` (all packages currently at `1.0.0`)
- **Origin story (use as a small human-interest aside, not the hero):** Nonna was born on vacation
  in Rome, coded during the "cold hours" in a hotel room while the kids watched TV — a tentative
  replacement for TypeDI in an existing project, driven by a deceptively simple question: how
  "pure" (zero-reflection) and fast can a DI framework actually get if you stop assuming
  `reflect-metadata` has to be part of the deal?

---

## 2. Goals & Non-Goals

**Goals**
- A polished, fast, developer-facing marketing + "get started" site — the kind of site that makes
  a backend/frontend engineer bookmark the repo and try `npm install @nonna/di` within 60 seconds.
- Show, don't just tell: real, runnable-looking code front and center, not vague feature adjectives.
- Make the "zero-reflection / runtime-agnostic / AOT" positioning immediately legible, including
  *why* it matters versus the reflect-metadata-based incumbents.
- Show the full ecosystem (core + compiler + 5 framework bindings + vite plugin) so visitors from
  any stack (backend Node/Deno/Bun, or frontend React/Vue/Svelte/Web Components/Stencil) see
  themselves represented within a few seconds of landing.

**Non-goals (do not build these)**
- No full searchable API reference / generated TypeDoc site — link out to GitHub for that.
- No authentication, user accounts, or database-backed features. This is a static-content
  marketing site; a Supabase backend is not needed. (Exception: an optional newsletter/email
  capture on the homepage is fine if trivial — do not block on it.)
- No blog/CMS. A single static "Changelog" section pointing at GitHub Releases is enough if
  included at all.
- No i18n/localization.

---

## 3. Audience & Tone

Audience: mid-to-senior TypeScript/JavaScript engineers evaluating or already frustrated with
existing DI solutions, across backend (Node/Deno/Bun) and frontend (React/Vue/Svelte/Web
Components/Stencil) stacks.

Tone: confident, technical, slightly opinionated — like a well-written OSS README, not marketing
fluff. Prefer precise engineering claims over adjectives ("integer-keyed registrations instead of
`Symbol()` allocation" beats "blazing fast"). Dry humor is fine in small doses (e.g. the Rome origin
story), but the primary tone throughout is "here's exactly what this does and why."

---

## 4. Tech Stack Guidance for Lovable

Use Lovable's default stack: **React + TypeScript + Vite + Tailwind CSS + shadcn/ui**. No backend/
Supabase integration required. Client-side routing (React Router) across a handful of static pages.
Ship a dark-mode-first design (this is a developer tool site) with a light-mode toggle.

Required libraries/behaviors:
- A syntax-highlighted code block component (e.g. Shiki or Prism-based) with a **copy to
  clipboard** button on every snippet. This is used constantly throughout the site — get it right
  once as a shared component.
- Tabs component for switching between runtime/framework code examples (Node / Deno / Bun / React /
  Vue / Svelte / Web Components / Stencil).
- Responsive from 375px mobile up through desktop; code blocks must scroll horizontally on mobile
  rather than wrap and break indentation.

---

## 5. Sitemap

1. **`/` — Home** (the main event; see §7.1)
2. **`/docs`** — Get Started / Quick Start (see §7.2)
3. **`/ecosystem`** — Packages table + per-framework code tabs (see §7.3)
4. **`/compare`** — "State of the Art" comparison vs TypeDI/InversifyJS/tsyringe (see §7.4)
5. **`/samples`** — Runtime samples matrix, links out to GitHub sample directories (see §7.5)

Shared on every page: sticky top nav (logo/wordmark, Docs, Ecosystem, Compare, Samples, GitHub star
button with live star count if trivially available, npm version badge) and a footer (see §8).

---

## 6. Global Design System

- **Vibe:** technical, precise, a little bit "terminal aesthetic" — think Vercel/Turborepo/Vite's
  own doc sites, not a generic SaaS landing page. Monospace accents for code, tokens, and package
  names throughout (not just inside code blocks — e.g. `@nonna/di` in body copy should render in a
  monospace/code style).
- **Color direction:** dark background by default (near-black, e.g. `#0a0a0f`–`#111116`), a single
  vivid accent color for CTAs/highlights/links (pick a warm accent — amber/orange works well against
  near-black and nods to the "Rome/cold hours" origin story without being literal about it), neutral
  grays for body text hierarchy. Avoid gradients-as-decoration; use the accent color sparingly and
  purposefully (primary CTA, active tab, inline code highlights, small "AOT" / "zero-deps" badges).
- **Typography:** a clean geometric/grotesk sans for headings and body (e.g. Inter or similar), a
  proper monospace (e.g. JetBrains Mono / Fira Code) for all code and inline identifiers.
- **Motion:** minimal and purposeful — fade/slide-in on scroll for section reveals, a subtle
  hover-lift on cards, smooth tab transitions for the code examples. No auto-playing carousels, no
  gratuitous parallax.
- **Iconography:** simple line icons (e.g. lucide-react, which ships with shadcn/ui) for feature
  bullets; runtime/framework logos (Node.js, Deno, Bun, React, Vue, Svelte, Stencil) for badges and
  the ecosystem tab switcher — use official simple/monochrome marks, not full-color logo soup.

---

## 7. Page-by-Page Spec

### 7.1 Home (`/`)

**Hero section**
- Eyebrow/badge row above the headline: small pills reading `Zero Dependencies`, `Zero Reflection`,
  `Runtime Agnostic`.
- Headline: **"Dependency injection without the reflection tax."**
- Subheadline (use close to verbatim): *"A lightweight, zero-reflection, runtime-agnostic
  Dependency Injection framework and AOT compiler for modern JavaScript and TypeScript. Runs
  identically on Node.js, Deno, Bun, and the edge."*
- Primary CTA button: **"Get Started"** → `/docs`
- Secondary CTA (outline/ghost button): **"View on GitHub"** → repo link, with GitHub star icon.
- Install command shown as a copyable terminal-style snippet directly in the hero:
  ```sh
  npm install @nonna/di
  ```
- Right side (or below on mobile) of the hero: a syntax-highlighted code panel showing the
  quickstart snippet below (§9.1) — this is the single most important piece of content on the page;
  it should be the first full code a visitor sees.

**Runtime/framework badge strip** — directly under the hero, a horizontal row of logos/badges for:
Node.js, Deno, Bun, React, Vue, Svelte, Web Components, Stencil. Caption above it: *"One core.
Every runtime. Every framework."*

**"Why Nonna" feature grid** — 6 cards, one per pillar, icon + short title + 1–2 sentence body.
Use this content exactly (condensed from the README's "Key Architectural Pillars"):

1. **Zero Runtime Dependencies** — `@nonna/di` ships an empty `dependencies` object and never
   requires `reflect-metadata`. Checked by a guardrail test, not just claimed.
2. **True Runtime Agnostic** — Runs unmodified on Node.js, Deno, Bun, and edge/Workers runtimes
   using standard `node:async_hooks` `AsyncLocalStorage` and Web Standards.
3. **Ahead-of-Time Compilation** — `@nonna/compiler` statically inspects your TypeScript with the
   real `TypeChecker` at build time — constructor tokens are known before the process even starts.
4. **First-Class Request Scoping** — Built-in `request` scope isolates state per async execution
   flow (`injector.runInScope()`), with strict guardrails preventing request-scoped leaks into
   singletons.
5. **Deterministic Lifecycle** — Predictable `OnInit`/`OnDestroy` hooks with reverse-order teardown
   and aggregated error reporting.
6. **Pluggable & Extensible** — First-class multi-providers (`multi: true`), sync/async factories,
   alias tokens, and full container inspection APIs.

**"See it in your stack" section** — a tabbed code panel (reuse the same tab component as the
Ecosystem page, see §7.3) letting visitors pick Node / React / Vue / Svelte and see a short,
real injection example for each, pulled from §9.2–§9.6. Keep this shorter than the full Ecosystem
page version — just enough to prove "this looks native to my stack," with a "See full example →"
link to `/ecosystem`.

**"Performance work that goes past 'it's fast'" section** — a short prose block (this is a direct,
near-verbatim README quote, keep the engineering specificity):

> Integer-keyed registrations instead of `Symbol()` allocation. Memoized dependency metadata
> instead of a `WeakMap` hit per resolution. A mutable stack + `Set` for circular-dependency
> tracking on the hot synchronous path. `AsyncLocalStorage` skipped entirely when nothing is
> request-scoped. Independent eager providers booting concurrently instead of one at a time.

**Origin story callout** — small, visually distinct aside box (not a full section) with the Rome
fun-fact text from §1, maybe styled like a code comment or a small "fun fact" card.

**Closing CTA band** — full-width, accent-tinted band: headline **"Stop paying the reflection tax."**,
`Get Started` + `View on GitHub` buttons again, npm install snippet repeated.

---

### 7.2 Docs / Get Started (`/docs`)

This is a single long-form page (not a multi-page docs engine), organized as an in-page table of
contents with anchor links down the left side on desktop (collapsing to a top dropdown on mobile).
Reproduce the following sections using the exact code from the README (do not simplify away real
API calls):

1. **Installation** — npm/pnpm/yarn, Deno (`deno.json` imports map), Bun tabs. Content: §9.7.
2. **Define Services** — the `UserRepository`/`UserService` constructor-injection example, §9.1.
3. **AOT Compilation Setup** — `package.json` `prebuild`/`build` scripts + the generated output
   example. Content: §9.8.
4. **Bootstrap & Resolve** — the `Nonna.injector().scan().build()` + `injector.get()` example,
   §9.1 (bootstrap half).
5. **Providers & Registration Types** — five sub-blocks: Class (`useClass`), Value (`useValue`),
   Factory sync+async (`useFactory`), Alias (`useExisting`), Multi-providers (`multi: true`).
   Content: §9.9.
6. **Scopes** — a 3-row table (`singleton` / `transient` / `request`) exactly as in §9.10, plus the
   request-scoping HTTP-handler example.
7. **Lazy vs. Eager** — both code examples from §9.11.
8. **Lifecycle Hooks** — `OnInit`/`OnDestroy` example, §9.12.
9. **Testing** — the "explicit registrations always override decorator defaults" mock-override
   example, §9.13.
10. **API Reference Summary** — reproduce the method-signature lists from §9.14 as a compact
    two-column reference table (method signature | one-line description), not prose.

Each code block needs a language label and copy button. Where the README shows a "why" callout
(e.g. why `Nonna.injector()` vs. the imperative `Injector.create()` API), keep that explanatory
sentence — it's part of what makes this useful over a bare API dump.

---

### 7.3 Ecosystem (`/ecosystem`)

**Packages table** — reproduce this table exactly (content in §9.15), each package name linking to
its GitHub subdirectory:

| Package | Description | Size |
|---|---|---|
| `@nonna/di` | Micro runtime DI container (zero deps, zero reflection) | ~27 KB |
| `@nonna/compiler` | Build-time TypeScript TypeChecker AOT compiler (`nonna-compile`) | Build tool |
| `@nonna/react` | React bindings — `<NonnaProvider>` + `useInjection()` hooks | ~1.5 KB |
| `@nonna/vue` | Vue 3 bindings — `<NonnaProvider>` + `useInjection()` composables | ~1.5 KB |
| `@nonna/svelte` | Svelte bindings — `setInjector()` + `useInjection()` context | ~1.5 KB |
| `@nonna/web-components` | W3C Context Protocol — `<nonna-provider>` + `@inject()`/`@optionalInject()`/`@allInject()` | ~1.5 KB |
| `@nonna/stencil` | StencilJS bindings — `@Inject()`/`@OptionalInject()`/`@AllInject()` decorators | ~0.5 KB |
| `@nonna/vite-plugin` | Vite plugin providing browser-safe shims for Node builtins | ~1.8 KB |

**Framework code tabs** — the centerpiece of this page. A tab bar with 7 tabs: **Node**, **React**,
**Vue**, **Svelte**, **Web Components**, **Stencil**, **Testing**. Each tab shows a real,
complete-feeling code panel using the snippets in §9.2–§9.6 (and §9.1/§9.13 for Node/Testing).
Above the tab panel, one sentence of framework-specific framing per tab (e.g. for React: *"Wrap
your app once with `<NonnaProvider>`, then resolve services anywhere below it with
`useInjection()` — no prop-drilling."*).

---

### 7.4 Compare (`/compare`)

Reproduce the README's "State of the Art" section (§9.16) as a structured comparison, not a wall of
text. Suggested layout: a short intro paragraph (the "most JS DI frameworks pick one of two
trade-offs..." framing), then each bullet from §9.16 as its own row/card with a bolded lead phrase
(already bolded in the source) as the card title and the rest as the body. Optionally add a compact
comparison table at the top: columns `@nonna/di`, `TypeDI`, `InversifyJS`, `tsyringe`; rows `Zero
runtime deps`, `Needs reflect-metadata`, `AOT compilation`, `Deno/Bun/Edge support`, `Bundle size
class` — fill Nonna's column from the facts above; mark competitor columns honestly (reflect-
metadata-based, no built-in AOT, partial/no edge support) rather than inventing precise numbers for
frameworks we don't have benchmarks for.

---

### 7.5 Samples (`/samples`)

Explain: *"11 runnable sample applications in the repo prove full compatibility across every
runtime and framework Nonna supports."* Then a grid/table of all 11 samples, each card showing:
sample name, runtime badge, one-line feature description, and a "View source →" link to its GitHub
directory. Content (reproduce exactly, content in §9.17):

`sample-node`, `sample-node-http`, `sample-deno`, `sample-deno-http`, `sample-bun`,
`sample-bun-http`, `sample-react`, `sample-vue`, `sample-svelte`, `sample-web-components`,
`sample-stencil`.

---

## 8. Shared Components

- **Navbar** — logo/wordmark "nonna", nav links (Docs, Ecosystem, Compare, Samples), GitHub icon
  link with star count, npm version badge (`v1.0.0`), light/dark toggle. Sticky, subtle
  blur-backdrop on scroll.
- **CodeBlock** — language label top-left, copy button top-right, syntax highlighting matching the
  dark theme. Used everywhere; build it once, reuse everywhere.
- **FrameworkTabs** — the tab switcher used on Home and Ecosystem; tab labels paired with small
  runtime/framework icons.
- **FeatureCard** — icon + title + body, used in the "Why Nonna" grid and the Compare page cards.
- **PackageCard/Row** — package name (monospace), description, size badge, GitHub link.
- **Footer** — three columns: (1) logo + one-line tagline + license/author, (2) site nav links
  repeated, (3) "Ecosystem" links to each `@nonna/*` package's npm page. Bottom bar: `© Nonna. MIT
  Licensed. Built by Manuel Santos.`

---

## 9. Content Library (exact copy & code)

Use these verbatim. Do not invent alternate APIs, method names, or import paths.

### 9.1 Quickstart (services + bootstrap)

```ts
// src/user.repository.ts
import {Injectable} from "@nonna/di";

export interface User {
    id: string;
    name: string;
}

@Injectable()
export class UserRepository {
    private users = new Map<string, User>([["u1", {id: "u1", name: "Alice"}]]);

    findById(id: string): User | undefined {
        return this.users.get(id);
    }
}
```

```ts
// src/user.service.ts
import {Injectable} from "@nonna/di";
import {UserRepository, User} from "./user.repository";

@Injectable()
export class UserService {
    // When using @nonna/compiler, UserRepository is automatically inferred as DI token.
    constructor(private readonly userRepo: UserRepository) {}

    getUser(id: string): User | undefined {
        return this.userRepo.findById(id);
    }
}
```

```ts
// src/index.ts
import "./__generated__/nonna-dependencies.generated";
import {Nonna} from "@nonna/di";
import {UserService} from "./user.service";

async function bootstrap() {
    const injector = await Nonna.injector().scan().build();

    const userService = injector.get(UserService);
    console.log(userService.getUser("u1")); // { id: 'u1', name: 'Alice' }

    await injector.destroy();
}

bootstrap();
```

### 9.2 React example

```tsx
// main.tsx
const injector = await Nonna.injector()
    .register({provide: GREETER, useClass: FriendlyGreeter, multi: true})
    .scan()
    .build();

createRoot(document.getElementById("root")!).render(
    
        
    ,
);
```

```tsx
// UserList.tsx
export function UserList() {
    const userService = useInjection(UserService);
    const users = userService.getUsers();
    return (
        


            {users.map(user => 

{user.name}

)}
        


    );
}
```

### 9.3 Vue example

```ts
// main.ts
const injector = await Nonna.injector().scan().build();
const Root = {render: () => h(NonnaProvider, {injector}, {default: () => h(App)})};
createApp(Root).mount("#app");
```

```vue
@nonna/vue";
import {UserService} from "../services/user.service";

const userService = useInjection(UserService);
const users = userService.getUsers();
</script>

<template>
    <ul>
        <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
</template>
```

### 9.4 Svelte example

```svelte
<!-- UserList.svelte -->
<script lang="ts">
import {useInjection} from "@nonna/svelte";
import {UserService} from "../services/user.service";

const userService = useInjection(UserService);
let users = $derived.by(() => userService.getUsers());





    {#each users as user (user.id)}
        

{user.name}


    {/each}



```

### 9.5 Web Components example

```ts
export class UserListElement extends HTMLElement {
    @inject(UserService)
    private declare readonly userService: UserService;

    connectedCallback(): void {
        const users = this.userService.getUsers();
        this.innerHTML = `

${users.map(u => `

${u.name}

`).join("")}

`;
    }
}
customElements.define("user-list", UserListElement);
```

### 9.6 Stencil example

```tsx
@Component({tag: "user-list"})
export class UserList {
    @Inject(UserService)
    private declare readonly userService: UserService;

    @State() users: User[] = [];

    componentWillLoad() {
        this.users = this.userService.getUsers();
    }

    render() {
        return 

{this.users.map(u => 

{u.name}

)}

;
    }
}
```

### 9.7 Installation tabs

```sh
# npm
npm install @nonna/di
npm install --save-dev @nonna/compiler
```

```json
// Deno — deno.json
{
    "imports": {
        "@nonna/di": "npm:@nonna/di@^1.0.0"
    }
}
```

```sh
# Bun
bun add @nonna/di
bun add -d @nonna/compiler
```

### 9.8 AOT compiler setup + output

```json
{
    "scripts": {
        "prebuild": "nonna-compile",
        "build": "tsc -p tsconfig.json"
    }
}
```

```ts
// AUTO-GENERATED by @nonna/compiler - do not edit by hand.
import {defineDependencies} from "@nonna/di";
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {LoggerService} from "./logger.service";

defineDependencies(UserService, [UserRepository, LoggerService, {token: NotificationService, optional: true}]);
```

CLI usage line to show inline: `npx nonna-compile --project tsconfig.build.json --output custom/output/deps.generated.ts`

### 9.9 Provider types

```ts
// A. Class Provider
injector.register({provide: UserRepository, useClass: SqlUserRepository, scope: "singleton"});

// B. Value Provider
injector.registerValue(APP_CONFIG, {port: 3000, host: "localhost"});

// C. Factory Provider (async)
injector.register({
    provide: DATABASE_CONNECTION,
    useFactory: async (config: AppConfig) => {
        const db = new Database();
        await db.connect(config.dbUrl);
        return db;
    },
    inject: [APP_CONFIG],
    async: true,
    eager: true,
});
const db = await injector.getAsync(DATABASE_CONNECTION);

// D. Alias Provider
injector.register({provide: AuditLogger, useExisting: LoggerService});

// E. Multi-Providers
injector.register({provide: PLUGIN_TOKEN, useClass: AuthPlugin, multi: true});
injector.register({provide: PLUGIN_TOKEN, useClass: MetricsPlugin, multi: true});
const plugins = injector.getAll<Plugin>(PLUGIN_TOKEN); // [AuthPlugin, MetricsPlugin]
```

### 9.10 Scopes table + example

| Scope | Lifetime | Description |
|---|---|---|
| `singleton` (default) | Container lifetime | One shared instance per `Injector`. |
| `transient` | Call lifetime | A brand new instance every `.get()` call. |
| `request` | Async flow lifetime | One shared instance per `injector.runInScope()` chain, isolated via `AsyncLocalStorage`. |

```ts
@Injectable({scope: "request"})
export class RequestContext {
    public requestId = `req-${Math.random().toString(36).slice(2, 9)}`;
}

async function handleHttpRequest(req: Request) {
    return injector.runInScope(async () => {
        const ctx = injector.get(RequestContext);
        const orderService = injector.get(OrderService);
        return orderService.processOrder(100);
    });
}
```

### 9.11 Lazy vs eager

```ts
@Injectable() // lazy by default - only created when first requested
export class ReportGenerator {}

@Injectable({eager: true})
export class RedisService implements OnInit {
    async onInit() {
        await this.connect(); // Pre-warmed at bootstrap, not on first request
    }
}
```

### 9.12 Lifecycle hooks

```ts
@Injectable()
export class DatabasePool implements OnInit, OnDestroy {
    async onInit(): Promise<void> {
        this.pool = await createPool();
    }

    async onDestroy(): Promise<void> {
        await this.pool.drain();
    }
}
```

### 9.13 Testing

```ts
class FakeUserRepository {
    findById(id: string) {
        return {id, name: "Mock User"};
    }
}

const injector = await Nonna.injector()
    // Override repository with a mock - explicit register() always wins over scan()
    .register({provide: UserRepository, useClass: FakeUserRepository})
    .scan()
    .build();

const service = injector.get(UserService);
assert.equal(service.getUser("123")?.name, "Mock User");
```

### 9.14 API reference summary

**`Nonna` (fluent bootstrap)**
- `Nonna.injector(): InjectorBuilder`
- `.withContextStorage(storage)`, `.register(provider)`, `.registerValue(token, value)`,
  `.registerFactory(token, inject, factory)`, `.scan()`, `.loadBeans(manifest)`, `.freeze()`
- `.build(): Promise<Injector>` — runs `refresh()` + `initialize()`, returns a ready `Injector`

**`Injector` (imperative API)**
- `Injector.create(options?)`, `.register()`, `.registerValue()`, `.registerFactory()`, `.refresh()`
- `.initialize(options?)`, `.get<T>(token)`, `.getAll<T>(token)`, `.getAsync<T>(token)`,
  `.getAllAsync<T>(token)`, `.runInScope(fn)`, `.destroy()`, `.inspect(token)`, `.inspectAll(token)`

**Decorators**
- `@Injectable(options?)`, `@Service(options?)` (alias), `@Inject(token)`, `@Optional(token?)`

### 9.15 Packages table

(See §7.3 — same table, reused here as the content source.)

### 9.16 State of the Art (comparison content)

> Most JavaScript DI frameworks pick one of two trade-offs: lean on `reflect-metadata` +
> `emitDecoratorMetadata` for auto-wiring (TypeDI, InversifyJS, tsyringe) and accept the runtime
> reflection tax and the Deno/Bun/edge compatibility gaps that come with it, or drop auto-wiring
> altogether and make every dependency a manual, stringly-typed registration. Nonna is built to not
> have to choose.

- **AOT, not reflection.** `@nonna/compiler` statically analyzes your TypeScript at build time,
  using the real TypeScript `TypeChecker`, and generates plain `defineDependencies(Target, [...])`
  calls. `@nonna/di`'s runtime injector never imports `typescript`, never touches
  `Reflect.getMetadata`, and never needs `emitDecoratorMetadata` turned on.
- **Genuinely runtime-agnostic.** The same injector code runs unmodified on Node.js 18+, Deno, Bun,
  and edge/Workers runtimes — the one platform-specific piece (request-scope propagation) is
  abstracted behind a one-method `ContextStorage` interface.
- **Zero runtime dependencies, full stop.** `@nonna/di`'s `package.json` ships an empty
  `dependencies` object.
- **Statically-known async, everywhere.** Whether a factory or `onInit()` is async is decided once,
  at registration/compile time — never by sniffing whether a call happened to return a `Promise`.
- **Scope violations are a build-time-shaped error, not a 3am incident.** `initialize()` walks the
  whole graph and rejects a singleton that transitively depends on a request-scoped provider before
  your app ever accepts traffic.
- **Performance work that goes past "it's fast":** integer-keyed registrations instead of
  `Symbol()` allocation, memoized dependency metadata instead of a `WeakMap` hit per resolution, a
  mutable stack + `Set` for circular-dependency tracking on the hot path, `AsyncLocalStorage`
  skipped entirely when nothing is request-scoped, independent eager providers booting concurrently.
- **A fluent bootstrap without hiding the machine.** `Nonna.injector()...build()` reads like a
  config DSL, but it's a thin, inspectable wrapper — the imperative API is always there underneath.
- **Small enough to actually read.** The entire runtime is a handful of files with no hidden
  metadata layer or proxy magic.

### 9.17 Samples matrix

| Sample | Runtime | Highlights |
|---|---|---|
| `sample-node` | Node.js (18+) | `@nonna/compiler` AOT, request scopes, optional deps, `OnDestroy` |
| `sample-node-http` | Node.js native `node:http` | Zero-framework HTTP server, request scoping per request, router |
| `sample-deno` | Deno (1.40+, 2.x) | Deno ESM, async database factory provider, task runner scopes |
| `sample-deno-http` | Deno + Hono | Web Standards HTTP, middleware-driven request scopes, controllers |
| `sample-bun` | Bun (1.0+) | Multi-provider plugin architecture, request scoping, `Bun.test` |
| `sample-bun-http` | Bun native `Bun.serve` | Native Web Standards HTTP server, request-scoped controller & router |
| `sample-react` | React 18 + Vite | `<NonnaProvider>`, all four hooks, field injection, multi-providers |
| `sample-vue` | Vue 3 + Vite | `<NonnaProvider>`, composables, field injection, multi-providers |
| `sample-svelte` | Svelte 5 + Vite | `setInjector()`, context functions, field injection, multi-providers |
| `sample-web-components` | Custom Elements + Vite | W3C Context Protocol, `<nonna-provider>`, decorators, field injection |
| `sample-stencil` | StencilJS | `@Inject()`/`@OptionalInject()`/`@AllInject()` decorators, `` interop |

---

## 10. SEO & Meta

- Page title pattern: `Nonna — Dependency Injection Without the Reflection Tax` (home);
  `

 — Nonna` elsewhere.
- Meta description (home): "A lightweight, zero-reflection, runtime-agnostic Dependency Injection
  framework and AOT compiler for modern JavaScript and TypeScript. Runs on Node.js, Deno, Bun, and
  the edge."
- Open Graph / Twitter card image: a dark card with the wordmark + tagline + the runtime/framework
  badge row.
- Favicon/wordmark: simple monospace "n" or "nonna" lettermark is fine if no logo asset is supplied.

---

## 11. Assets

No existing brand assets beyond an architecture diagram (`nonna-architecture.svg`, available in the
repo at `di/nonna-architecture.svg`) — feel free to reference it as an optional "Architecture"
illustration on the Home or Docs page if it fits, but don't block the build on it; generate a
reasonable wordmark/lettermark if no logo is provided.

---

## 12. Out of Scope (reiterated)

No auth, no database, no CMS, no full API doc generator, no i18n, no blog. Keep this a fast,
static, five-page marketing + get-started site that makes the framework's actual engineering
decisions legible at a glance.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8e707591-c587-4b79-8a3b-b111c64667ac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
