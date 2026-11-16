"use client";

// Adapted from Beautiful UI ThinkingState, MIT © 2026 Shane Levine.
// Source and changes: ./NOTICE.md. Status/content come from the caller, never a demo timer.
import { useRef, useState, type PropsWithChildren, type ReactNode } from "react";
import { useScrollLock } from "@assistant-ui/react";
import { Brain, ChevronDown } from "lucide-react";
import { Button } from "../ui/button.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible.js";

export default function ThinkingState({
  label,
  active,
  summary,
  defaultOpen = false,
  children,
}: PropsWithChildren<{
  label: ReactNode;
  active: boolean;
  summary?: string;
  defaultOpen?: boolean;
}>) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const traceRef = useRef<HTMLDivElement>(null);
  const lockScroll = useScrollLock(traceRef, 200);

  return (
    <Collapsible
      ref={traceRef}
      open={expanded}
      onOpenChange={(open) => {
        lockScroll();
        setExpanded(open);
      }}
      data-slot="beautiful-thinking"
      className="flex w-full min-w-0 flex-col"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto min-h-6 w-fit max-w-full justify-start gap-2 rounded-none p-0 text-sm font-medium leading-5 text-muted-foreground has-[>svg]:px-0 hover:bg-transparent dark:hover:bg-transparent"
        >
          <Brain aria-hidden="true" className={`size-4 shrink-0 ${active ? "motion-safe:animate-pulse" : ""}`} />
          <span className="min-w-0 text-left tabular-nums [overflow-wrap:anywhere] whitespace-normal">
            <span className="block">{label}</span>
            {summary ? (
              <span className="mt-0.5 block text-foreground/80">{summary}</span>
            ) : null}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-4 transition-transform duration-200 motion-reduce:transition-none"
            style={{ transform: expanded ? "rotate(0)" : "rotate(-90deg)" }}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
        <div className="relative mt-1 ml-2 max-h-80 overflow-y-auto overscroll-contain border-l py-1 pl-4 pr-1 [overflow-wrap:anywhere]">
          <div className="flex min-w-0 flex-col gap-1">{children}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
