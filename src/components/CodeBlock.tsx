import { useState } from "react";
import { Highlight, type Language } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "ts" | "tsx" | "json" | "sh" | "vue" | "svelte" | "html";

const prismLang: Record<Lang, Language> = {
  ts: "tsx",
  tsx: "tsx",
  json: "json",
  sh: "bash",
  vue: "tsx",
  svelte: "tsx",
  html: "markup",
};

const labels: Record<Lang, string> = {
  ts: "TypeScript",
  tsx: "TSX",
  json: "JSON",
  sh: "Shell",
  vue: "Vue",
  svelte: "Svelte",
  html: "HTML",
};

interface Props {
  code: string;
  lang?: Lang;
  title?: string;
  className?: string;
  compact?: boolean;
}

export function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return { copied, copy };
}

function ShellLine({ line }: { line: string }) {
  if (line.trim().startsWith("#")) return <span className="token comment">{line}</span>;
  const m = line.match(/^(\s*)(\S+)(.*)$/);
  if (!m) return <>{line}</>;
  return (
    <>
      {m[1]}
      <span className="text-amber">{m[2]}</span>
      <span>{m[3]}</span>
    </>
  );
}

export function CodeBlock({ code, lang = "ts", title, className, compact }: Props) {
  const { copied, copy } = useCopy(code);
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-code-border bg-code text-left",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-code-border px-3 py-1.5">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted-foreground">
          <span className="flex gap-1">
            <i className="size-2 rounded-full bg-muted-foreground/30" />
            <i className="size-2 rounded-full bg-muted-foreground/30" />
            <i className="size-2 rounded-full bg-muted-foreground/30" />
          </span>
          <span className="uppercase">{labels[lang]}</span>
          {title && <span className="text-muted-foreground/60">· {title}</span>}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="inline-flex cursor-pointer items-center gap-1 rounded px-1.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {copied ? <Check className="size-3.5 text-amber" /> : <Copy className="size-3.5" />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <div className="overflow-x-auto">
        {lang === "sh" ? (
          <pre
            className={cn(
              "min-w-max px-4 font-mono text-[13px] leading-relaxed text-foreground dark:text-foreground",
              compact ? "py-3" : "py-4",
            )}
          >
            {code.split("\n").map((line, i) => (
              <div key={i}>
                <ShellLine line={line} />
              </div>
            ))}
          </pre>
        ) : (
          <Highlight code={code} language={prismLang[lang]} theme={{ plain: {}, styles: [] }}>
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cn(
                  "min-w-max px-4 font-mono text-[13px] leading-relaxed",
                  compact ? "py-3" : "py-4",
                )}
              >
                {tokens.map((line, i) => {
                  const lp = getLineProps({ line });
                  return (
                    <div key={i} {...lp} style={undefined}>
                      {line.map((token, k) => {
                        const tp = getTokenProps({ token });
                        return <span key={k} className={tp.className}>{tp.children}</span>;
                      })}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        )}
      </div>
    </div>
  );
}

/** Single-line terminal command with a prompt and copy button. */
export function InstallCommand({ command, className }: { command: string; className?: string }) {
  const { copied, copy } = useCopy(command);
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group inline-flex max-w-full cursor-pointer items-center gap-3 rounded-lg border border-code-border bg-code px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-amber/50",
        className,
      )}
      aria-label={`Copy ${command}`}
    >
      <span className="text-amber select-none">$</span>
      <span className="truncate">{command}</span>
      <span className="ml-1 text-muted-foreground transition-colors group-hover:text-foreground">
        {copied ? <Check className="size-4 text-amber" /> : <Copy className="size-4" />}
      </span>
    </button>
  );
}
