import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { FrameworkTabs } from "@/components/FrameworkTabs";
import { Inline } from "@/components/Inline";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { REPO, packages, snippets } from "@/content/snippets";

const TITLE = "Ecosystem — Nonna";
const DESC =
  "Every @nonna/* package: the zero-dependency DI core, the AOT compiler, and first-class bindings for React, Vue 3, Svelte 5, Web Components, and StencilJS.";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/ecosystem" },
    ],
    links: [{ rel: "canonical", href: "/ecosystem" }],
  }),
  component: Ecosystem,
});

function Stack({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4">{children}</div>;
}

function Ecosystem() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="ecosystem"
          title="One core, seven packages."
          body={
            <>
              Everything ships under the <code className="code-inline">@nonna/*</code> scope at{" "}
              <code className="code-inline">1.0.0</code>. Install only what your stack needs.
            </>
          }
        />
      </Reveal>

      <Reveal className="mt-10 overflow-hidden rounded-lg border border-border" delay={60}>
        <table className="w-full text-left text-sm">
          <thead className="bg-surface font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Package</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Description</th>
              <th className="px-4 py-3 text-right font-medium">Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {packages.map((p) => (
              <tr key={p.name} className="transition-colors hover:bg-surface">
                <td className="px-4 py-3 align-top">
                  <a
                    href={`${REPO}/tree/main/${p.dir}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[13px] text-amber hover:underline"
                  >
                    {p.name}
                    <ExternalLink className="size-3 opacity-60" />
                  </a>
                  <p className="mt-1 text-muted-foreground sm:hidden">
                    <Inline text={p.description} />
                  </p>
                </td>
                <td className="hidden px-4 py-3 align-top text-muted-foreground sm:table-cell">
                  <Inline text={p.description} />
                </td>
                <td className="px-4 py-3 text-right align-top">
                  <span className="pill">{p.size}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal className="mt-20" delay={40}>
        <SectionHeading
          eyebrow="bindings"
          title="The same injector, in every framework's dialect."
        />
      </Reveal>
      <Reveal className="mt-8" delay={80}>
        <FrameworkTabs
          tabs={[
            {
              id: "node",
              label: "Node",
              icon: "node",
              intro: (
                <Inline text="Import the generated dependency map once, then `Nonna.injector().scan().build()` gives you a ready `Injector` — no decorators metadata, no `reflect-metadata`." />
              ),
              content: (
                <Stack>
                  <CodeBlock code={snippets.userService} title="user.service.ts" />
                  <CodeBlock code={snippets.bootstrap} title="index.ts" />
                </Stack>
              ),
            },
            {
              id: "react",
              label: "React",
              icon: "react",
              intro: (
                <Inline text="Wrap your app once with `<NonnaProvider>`, then resolve services anywhere below it with `useInjection()` — no prop-drilling." />
              ),
              content: (
                <Stack>
                  <CodeBlock code={snippets.reactMain} lang="tsx" title="main.tsx" />
                  <CodeBlock code={snippets.reactComponent} lang="tsx" title="UserList.tsx" />
                </Stack>
              ),
            },
            {
              id: "vue",
              label: "Vue",
              icon: "vue",
              intro: (
                <Inline text="Mount `NonnaProvider` at the root, then call the `useInjection()` composable from any `<script setup>` block." />
              ),
              content: (
                <Stack>
                  <CodeBlock code={snippets.vueMain} title="main.ts" />
                  <CodeBlock code={snippets.vueComponent} lang="vue" title="UserList.vue" />
                </Stack>
              ),
            },
            {
              id: "svelte",
              label: "Svelte",
              icon: "svelte",
              intro: (
                <Inline text="Register the injector with `setInjector()` in a parent, then `useInjection()` reads it from Svelte context — runes-friendly." />
              ),
              content: (
                <CodeBlock code={snippets.svelteComponent} lang="svelte" title="UserList.svelte" />
              ),
            },
            {
              id: "wc",
              label: "Web Components",
              icon: "webcomponents",
              intro: (
                <Inline text="A `<nonna-provider>` element speaks the W3C Context Protocol; `@inject()` fields on any custom element resolve through it." />
              ),
              content: (
                <CodeBlock code={snippets.webComponents} title="user-list.element.ts" />
              ),
            },
            {
              id: "stencil",
              label: "Stencil",
              icon: "stencil",
              intro: (
                <Inline text="`@Inject()`, `@OptionalInject()`, and `@AllInject()` decorators sit alongside Stencil's own `@State()` and `@Prop()`." />
              ),
              content: <CodeBlock code={snippets.stencil} lang="tsx" title="user-list.tsx" />,
            },
            {
              id: "testing",
              label: "Testing",
              intro: (
                <Inline text="Explicit registrations always override decorator defaults — swap any dependency for a fake without touching production code." />
              ),
              content: <CodeBlock code={snippets.testing} title="user.service.test.ts" />,
            },
          ]}
        />
      </Reveal>
    </div>
  );
}
