import type { ReactNode } from "react";

/** Renders text where `backtick` spans become inline code. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  const out: ReactNode[] = parts.map((p, i) =>
    p.startsWith("`") && p.endsWith("`") ? (
      <code key={i} className="code-inline">
        {p.slice(1, -1)}
      </code>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
  return <>{out}</>;
}
