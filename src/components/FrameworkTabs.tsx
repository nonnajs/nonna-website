import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrandIcon, type BrandKey } from "./Icons";

export interface FrameworkTab {
  id: string;
  label: string;
  icon?: BrandKey;
  intro?: ReactNode;
  content: ReactNode;
}

export function FrameworkTabs({
  tabs,
  className,
  defaultTab,
}: {
  tabs: FrameworkTab[];
  className?: string;
  defaultTab?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? "");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  if (!current) return null;

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-border pb-px [scrollbar-width:none]"
      >
        {tabs.map((t) => {
          const isActive = t.id === current.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative -mb-px inline-flex shrink-0 cursor-pointer items-center gap-2 border-b-2 px-3 py-2 font-mono text-[13px] transition-colors",
                isActive
                  ? "border-amber text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.icon && (
                <BrandIcon
                  name={t.icon}
                  className={cn("size-3.5", isActive ? "text-amber" : "text-muted-foreground")}
                />
              )}
              {t.label}
            </button>
          );
        })}
      </div>
      <div key={current.id} className="mt-5 animate-fade-up">
        {current.intro && (
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{current.intro}</p>
        )}
        {current.content}
      </div>
    </div>
  );
}
