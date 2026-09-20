# Nonna: Pure DI

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
- **GitHub:** `github.com/nonnajs/nonna` (use this as the canonical repo link throughout)
- **npm scope:** `@nonna/*` (all packages currently at `1.0.0`)
- **Origin story (use as a small human-interest aside, not the hero):** Nonna was born on vacation
  in Rome, coded during the "cold hours" in a hotel room while the kids watched TV — a tentative
  replacement for TypeDI in an existing project, driven by a deceptively simple question: how
  "pure" (zero-reflection) and fast can a DI framework actually get if you stop assuming
  `reflect-metadata` has to be part of the deal?

---
