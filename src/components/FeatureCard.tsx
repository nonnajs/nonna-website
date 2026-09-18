import type { LucideIcon } from "lucide-react";
import { Inline } from "./Inline";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon: Icon,
  title,
  body,
  index,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  body: string;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-lift flex flex-col gap-3 rounded-lg border border-border bg-card p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {Icon ? (
          <span className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-amber-soft text-amber">
            <Icon className="size-4" />
          </span>
        ) : (
          <span />
        )}
        {index !== undefined && (
          <span className="font-mono text-xs text-muted-foreground">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        <Inline text={body} />
      </p>
    </div>
  );
}
