import {
  siBun,
  siDeno,
  siGithub,
  siNodedotjs,
  siNpm,
  siReact,
  siStencil,
  siSvelte,
  siVuedotjs,
  siWebcomponentsdotorg,
} from "simple-icons";
import { cn } from "@/lib/utils";

export type BrandKey =
  | "node"
  | "deno"
  | "bun"
  | "react"
  | "vue"
  | "svelte"
  | "webcomponents"
  | "stencil"
  | "github"
  | "npm";

const icons = {
  node: siNodedotjs,
  deno: siDeno,
  bun: siBun,
  react: siReact,
  vue: siVuedotjs,
  svelte: siSvelte,
  webcomponents: siWebcomponentsdotorg,
  stencil: siStencil,
  github: siGithub,
  npm: siNpm,
};

export const brandLabels: Record<BrandKey, string> = {
  node: "Node.js",
  deno: "Deno",
  bun: "Bun",
  react: "React",
  vue: "Vue",
  svelte: "Svelte",
  webcomponents: "Web Components",
  stencil: "Stencil",
  github: "GitHub",
  npm: "npm",
};

export function BrandIcon({ name, className }: { name: BrandKey; className?: string }) {
  const icon = icons[name];
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      className={cn("size-4 fill-current", className)}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline font-mono font-semibold tracking-tight", className)}>
      <span className="text-amber">n</span>
      <span>onna</span>
      <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.12em] bg-amber/80 animate-blink" />
    </span>
  );
}
