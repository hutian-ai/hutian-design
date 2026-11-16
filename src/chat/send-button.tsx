"use client";
import { useAui, useAuiState } from "@assistant-ui/react";
import { ArrowUp, Square } from "lucide-react";
import { Button } from "../ui/button.js";

export function ChatSendButton({
  busy,
  stopping,
  stop,
  label,
  attachments,
}: {
  busy: boolean;
  stopping: boolean;
  stop?: () => Promise<void>;
  label: string;
  attachments: boolean;
}) {
  const aui = useAui();
  const empty = useAuiState((s) => s.composer.isEmpty);
  const canSend = useAuiState(
    (s) => s.composer.canSend && !s.thread.isDisabled,
  );
  const isStop = Boolean(stop && empty && !attachments);
  return (
    <Button
      type="button"
      size="icon-sm"
      aria-label={isStop ? (stopping ? "正在停止" : "停止当前工作") : label}
      title={isStop ? "停止当前工作" : label}
      disabled={isStop ? stopping : busy || (!canSend && !attachments)}
      className="size-8 shrink-0"
      onClick={() => {
        if (isStop) {
          void stop?.();
          return;
        }
        if (empty && attachments) aui.composer.setText("请查看所附文件。");
        aui.composer.send();
      }}
    >
      {isStop ? (
        <Square className="size-3 fill-current" />
      ) : (
        <ArrowUp className="size-4" />
      )}
    </Button>
  );
}
