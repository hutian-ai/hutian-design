"use client";

// Adapted from Beautiful UI ToolChips, MIT © 2026 Shane Levine.
// Retains compact icon/label/chip rows and inline details; see ./NOTICE.md.
import { useRef, useState, type ReactNode } from "react";
import { useScrollLock } from "@assistant-ui/react";
import { ChevronDown, CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible.js";
import { cn } from "../lib/utils.js";

export type ToolStep = {
  id: string;
  icon: ReactNode;
  label: string;
  chip: string;
  mono: boolean;
  status: "running" | "complete" | "failed" | "unconfirmed";
  statusLabel: string;
  detail: ReactNode;
};

function ToolChipRow({
  row,
  onExpand,
}: {
  row: ToolStep;
  onExpand?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const lockScroll = useScrollLock(rowRef, 200);
  return (
    <Collapsible
      ref={rowRef}
      open={open}
      onOpenChange={(next) => {
        lockScroll();
        setOpen(next);
        if (next) onExpand?.();
      }}
      data-slot="beautiful-tool-row"
      data-status={row.status}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="group/row h-auto min-h-7 max-w-full min-w-0 justify-start gap-2 px-0 py-1 text-left text-muted-foreground has-[>svg]:px-0 hover:bg-transparent dark:hover:bg-transparent hover:text-foreground"
        >
          <span
            aria-hidden="true"
            className="flex size-4 shrink-0 items-center justify-center"
          >
            {row.icon}
          </span>
          <span className="shrink-0 text-sm font-medium leading-5">
            {row.label}
          </span>
          <span
            title={row.chip}
            className={cn(
              "min-w-0 truncate text-sm font-normal leading-5",
              row.mono && "font-mono",
            )}
          >
            {row.chip}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 transition-[opacity,transform] duration-150 group-hover/row:opacity-100 group-focus-visible/row:opacity-100 motion-reduce:transition-none",
              open ? "opacity-100" : "-rotate-90 opacity-0",
            )}
          />
          {row.status !== "complete" && (
            <span
              className={cn(
                "inline-flex max-w-56 shrink-0 items-center gap-1 text-xs font-normal text-muted-foreground",
                row.status === "failed" && "text-destructive",
              )}
            >
              {row.status === "running" ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-3 motion-safe:animate-spin"
                />
              ) : row.status === "failed" || row.status === "unconfirmed" ? (
                <CircleAlert aria-hidden="true" className="size-3" />
              ) : null}
              <span
                className={cn(
                  "truncate",
                  row.status === "running" && "sr-only",
                )}
                title={row.statusLabel}
              >
                {row.statusLabel}
              </span>
            </span>
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
        <div className="mt-0.5 mb-1 ml-2 flex min-w-0 flex-col gap-2 border-l py-1 pl-3.5 text-xs text-muted-foreground [overflow-wrap:anywhere]">
          {row.detail}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function ToolChips({
  steps,
  groupLabel,
}: {
  steps: ToolStep[];
  groupLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const lockScroll = useScrollLock(groupRef, 200);
  const active = steps.some((step) => step.status === "running");
  const failed = steps.some((step) => step.status === "failed");
  const unconfirmed = steps.some((step) => step.status === "unconfirmed");
  return (
    <Collapsible
      ref={groupRef}
      open={!groupLabel || open}
      onOpenChange={(value) => {
        lockScroll();
        setOpen(value);
      }}
      data-slot="beautiful-tool-chips"
      className="flex w-full min-w-0 flex-col gap-1"
    >
      {groupLabel && (
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto min-h-7 self-start justify-start gap-2 px-0 py-1 text-sm leading-5 text-muted-foreground has-[>svg]:px-0 hover:bg-transparent dark:hover:bg-transparent hover:text-foreground"
          >
            {steps[0]?.icon}
            {groupLabel}
            <ChevronDown
              className={cn(
                "size-3 transition-transform",
                !open && "-rotate-90",
              )}
            />
            {failed ? (
              <span className="text-destructive">有未完成项</span>
            ) : unconfirmed ? (
              <span>结果待核对</span>
            ) : active ? (
              <LoaderCircle
                aria-hidden="true"
                className="size-3 motion-safe:animate-spin"
              />
            ) : null}
          </Button>
        </CollapsibleTrigger>
      )}
      <CollapsibleContent
        forceMount
        hidden={Boolean(groupLabel) && !open}
        className="space-y-1"
      >
        {steps.map((row) => (
          <ToolChipRow key={row.id} row={row} onExpand={() => setOpen(true)} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
