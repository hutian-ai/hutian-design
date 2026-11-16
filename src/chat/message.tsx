"use client";
import type { ReactNode } from "react";
import { MessagePrimitive } from "@assistant-ui/react";
import { LoaderCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar.js";

export function ChatMessageRoot({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: ReactNode;
}) {
  return (
    <MessagePrimitive.Root
      data-role={role}
      className={
        role === "user"
          ? "mx-auto flex w-full max-w-3xl flex-col items-end gap-2 px-4 py-3"
          : "mx-auto w-full max-w-3xl px-4 py-3 text-[15px] leading-7"
      }
    >
      {children}
    </MessagePrimitive.Root>
  );
}
export function UserMessageBubble({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[90%] rounded-lg border bg-muted/40 px-4 py-2.5">
      {children}
    </div>
  );
}
export function AssistantMessageBody({
  name,
  status,
  children,
}: {
  name?: string;
  status?: string;
  children: ReactNode;
}) {
  return (
    <div data-slot="turn-member-content" className="flex gap-3">
      <Avatar className="mt-0.5 size-7 rounded-md border">
        <AvatarFallback className="rounded-md bg-primary/10 text-xs text-primary">
          {name?.slice(0, 1) || "助"}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="mb-2 text-xs font-medium">{name || "助手"}</div>
        {status && (
          <p role="status" className="text-xs text-muted-foreground">
            {status}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
export function ChatPending({
  label,
  waitingFor,
}: {
  label: string;
  waitingFor?: string;
}) {
  return (
    <div
      data-slot="turn-pending"
      role="status"
      className="flex items-center gap-2 text-sm leading-5 text-muted-foreground"
    >
      {label === "工作中" && (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 shrink-0 motion-safe:animate-spin"
        />
      )}
      <span>
        {waitingFor && `${waitingFor} · `}
        {label}
      </span>
    </div>
  );
}
