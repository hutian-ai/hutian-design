"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useScrollLock } from "@assistant-ui/react";
import type { ExecutionView, ChatExecutionProps } from "./types.js";
import { Brain, ChevronDown, FileText, Square, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button.js";
import { Input } from "../ui/input.js";
import { Label } from "../ui/label.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select.js";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.js";
import { Alert, AlertDescription } from "../ui/alert.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible.js";
import ToolChips, { type ToolStep } from "../beautiful-ui/tool-chips.js";
import ThinkingState from "../beautiful-ui/thinking-state.js";
import { ActivityMarkdown } from "../assistant-ui/markdown-text.js";
const record = (value: unknown): Record<string, any> =>
  value && typeof value === "object" ? (value as Record<string, any>) : {};
function commandText(value: unknown): string {
  const text = String(value ?? "");
  try {
    const parsed = JSON.parse(text);
    return typeof parsed === "string" ? parsed : text;
  } catch {
    return text;
  }
}
function OutputPreview({ name, href, loadPreview }: { name: string; href: string; loadPreview?: () => Promise<string> }) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState("");
  const supported = Boolean(loadPreview) && /\.(?:md|txt|json|csv|log|ya?ml|diff|patch)$/i.test(name);
  return (
    <Dialog
      onOpenChange={(open) => {
        if (open && supported && loadPreview && content === null)
          void loadPreview()
            .then((text) => setContent(text.slice(0, 150000)))
            .catch(() => setError("成果暂不可读取，请核对原交付。"));
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto max-w-full justify-start px-0 text-sm"
        >
          <FileText className="size-4" />
          <span className="truncate">{name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="sr-only">
            已收回成果的文本预览，可下载原件。
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[65dvh] overflow-auto">
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : supported ? (
            content === null ? (
              <p className="text-sm text-muted-foreground">正在读取原成果…</p>
            ) : (
              <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                {content}
              </pre>
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              这种文件可下载后使用对应应用查看。
            </p>
          )}
        </div>
        <Button asChild variant="outline">
          <a href={href}>下载原件</a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
function NativeQuestion({
  schema,
  disabled,
  submit,
}: {
  schema: Record<string, unknown>;
  disabled: boolean;
  submit(value: Record<string, unknown>): void;
}) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const prefix = useId();
  const properties = Object.entries(record(schema.properties));
  const required = Array.isArray(schema.required) ? schema.required : [];
  const supported = properties.every(([, f]) =>
    ["string", "integer", "number", "boolean"].includes(String(record(f).type)),
  );
  if (!supported)
    return (
      <p className="text-sm text-muted-foreground">
        这份原生表单暂不支持在当前页面回答，请在执行端处理。
      </p>
    );
  return (
    <form
      className="w-full space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        submit(values);
      }}
    >
      {properties.map(([key, raw]) => {
        const field = record(raw);
        const id = `${prefix}-${key}`;
        return (
          <div key={key} className="space-y-1">
            <Label htmlFor={id}>
              {String(field.title ?? key)}
              {required.includes(key) ? " *" : ""}
            </Label>
            {field.description && (
              <p className="text-xs text-muted-foreground">
                {String(field.description)}
              </p>
            )}
            {field.enum ? (
              <Select
                value={String(values[key] ?? "")}
                onValueChange={(v) =>
                  setValues((p) => ({
                    ...p,
                    [key]: field.enum.find(
                      (entry: unknown) => String(entry) === v,
                    ),
                  }))
                }
                disabled={disabled}
              >
                <SelectTrigger id={id}>
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  {field.enum.map((v: unknown) => (
                    <SelectItem key={String(v)} value={String(v)}>
                      {String(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "boolean" ? (
              <Select
                value={values[key] === undefined ? "" : String(values[key])}
                onValueChange={(v) =>
                  setValues((p) => ({ ...p, [key]: v === "true" }))
                }
                disabled={disabled}
              >
                <SelectTrigger id={id}>
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">是</SelectItem>
                  <SelectItem value="false">否</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={id}
                required={required.includes(key)}
                disabled={disabled}
                type={
                  ["integer", "number"].includes(field.type) ? "number" : "text"
                }
                min={field.minimum}
                max={field.maximum}
                minLength={field.minLength}
                maxLength={field.maxLength}
                value={String(values[key] ?? "")}
                onChange={(e) =>
                  setValues((p) => ({
                    ...p,
                    [key]: ["integer", "number"].includes(field.type)
                      ? Number(e.target.value)
                      : e.target.value,
                  }))
                }
              />
            )}
          </div>
        );
      })}
      <Button
        size="sm"
        disabled={
          disabled || required.some((key) => values[String(key)] === undefined)
        }
        type="submit"
      >
        提交回答
      </Button>
    </form>
  );
}
function ThinkingStatus({ thinking, activity }: {
  thinking: { startedAt?: string; completedAt?: string; summary?: string };
  activity: ExecutionView;
}) {
  const interrupted = ["cancelled", "failed"].includes(activity.state) && !thinking.completedAt;
  const active = !thinking.completedAt && !["completed", "cancelled", "failed", "unknown"].includes(activity.state);
  const start = Date.parse(thinking.startedAt ?? "");
  const end = Date.parse(thinking.completedAt ?? "");
  const duration = Number.isFinite(start) && Number.isFinite(end) && end >= start
    ? Math.floor((end - start) / 1000) : null;
  const description = active ? "正在思考" : interrupted ? "思考已中断" : !thinking.completedAt ? "思考状态待核对" : "思考";
  const status = active ? "running" : interrupted ? "interrupted" : thinking.completedAt ? "completed" : "unknown";
  const label = <>{description}{duration !== null && !active && <span className="font-normal"> · 持续了{duration < 1 ? "不到 1 秒" : ` ${duration} 秒`}</span>}</>;
  if (thinking.summary) return (
    <div data-slot="thinking-status" data-status={status}>
      <ThinkingState label={label} active={active}>
        <ActivityMarkdown text={thinking.summary} />
      </ThinkingState>
    </div>
  );
  return (
    <div data-slot="thinking-status" data-status={status}
      className="flex min-h-6 items-center gap-2 text-sm font-medium leading-5 text-muted-foreground" role={active ? "status" : undefined}
      title={active ? undefined : "执行端未提供可展示的思考摘要"}>
      <Brain aria-hidden="true" className={`size-4 shrink-0 ${active ? "motion-safe:animate-pulse" : ""}`} />
      <span>{label}</span>
    </div>
  );
}

export function ChatExecution({
  activity, projection, runId, onControl, onRetrieveOutputs, showStop = true,
  children, hasAnswer = false, waitingFor, renderBody = (content) => content,
}: ChatExecutionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lockScroll = useScrollLock(rootRef, 250);
  const terminal = ["completed", "failed", "cancelled"].includes(
    activity.state,
  );
  const [manual, setManual] = useState<boolean | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<Record<string, string>>({});
  const operationIds = useRef<Record<string, string>>({});
  useEffect(() => {
    try {
      const value = localStorage.getItem(`hutian:run-open:${runId}`);
      setManual(value === null ? null : value === "true");
    } catch {}
  }, [runId]);
  const [clock, setClock] = useState(Date.now());
  useEffect(() => { if (terminal) return; const timer = setInterval(() => setClock(Date.now()), 1000); return () => clearInterval(timer); }, [terminal]);
  // Match the recorded ZCode turn boundary: final text may stream before the
  // turn completes. Interrupted/empty turns keep their only useful content open.
  const open = !terminal || (manual ?? !(activity.state === "completed" && hasAnswer));
  const interactions = activity.interactions.filter((r) => !["expired", "delivered", "resolved"].includes(r.status));
  const hasContent = terminal || hasAnswer || projection.blocks.length > 0 || interactions.length > 0
    || activity.historyTruncated || activity.outputs.length > 0 || activity.state === "unknown" || Boolean(error)
    || activity.commands.some((command) => command.kind === "steer");
  const groups: Array<{ id: string; steps: ToolStep[] } | (typeof projection.blocks)[number]> = [];
  for (const block of projection.blocks) {
    const previous = groups.at(-1);
    if (block.tool) {
      if (previous && "steps" in previous && ["终端", "搜索网页"].includes(block.tool.label) && previous.steps[0]?.label === block.tool.label) previous.steps.push(block.tool);
      else groups.push({ id: block.id, steps: [block.tool] });
    } else groups.push(block);
  }
  async function act(
    kind: "stop" | "respond",
    requestId?: string,
    response?: unknown,
  ) {
    const key = requestId ?? kind;
    const id = (operationIds.current[
      JSON.stringify([kind, requestId, response])
    ] ??= crypto.randomUUID());
    setPending((p) => ({ ...p, [key]: id }));
    setBusy(key);
    setError("");
    try {
      const result = await onControl({
        operationId: id,
        kind,
        ...(requestId ? { requestId, response } : {}),
      });
      if (!result.ok) {
        setError(result.error);
        setPending((previous) => {
          const next = { ...previous };
          delete next[key];
          return next;
        });
      }
    } catch {
      setError("操作结果未确认，再次提交会核对原操作。");
      setPending((previous) => {
        const next = { ...previous };
        delete next[key];
        return next;
      });
    } finally {
      setBusy("");
    }
  }
  const seconds = Math.max(
    0,
    Math.round(
      ((activity.finishedAt
        ? Date.parse(activity.finishedAt)
        : clock) -
        Date.parse(activity.startedAt)) /
        1000,
    ),
  );
  const label = activity.state === "completed"
    ? `已工作 ${seconds} 秒`
    : activity.state === "cancelled"
      ? "已停止"
      : "未完成";
  return (
    <div ref={rootRef} data-slot="chat-execution" data-run={runId} data-state={activity.state}>
      <Collapsible
        open={Boolean(open)}
        onOpenChange={(value) => {
          lockScroll();
          setManual(value);
          try { localStorage.setItem(`hutian:run-open:${runId}`, String(value)); } catch {}
        }}
      >
        {terminal && (
          projection.blocks.length > 0 ? (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" data-slot="turn-work-header" className="mb-5 h-auto min-h-7 w-full justify-start rounded-none border-b border-border/50 px-0 pb-2 text-sm font-normal text-muted-foreground has-[>svg]:px-0 hover:bg-transparent dark:hover:bg-transparent">
                {label}<ChevronDown className={`size-4 transition-transform ${open ? "" : "-rotate-90"}`} />
              </Button>
            </CollapsibleTrigger>
          ) : <p data-slot="turn-work-header" className="mb-5 border-b border-border/50 pb-2 text-sm text-muted-foreground">{label}</p>
        )}
        {hasContent && renderBody(<div className="space-y-5">
        <CollapsibleContent forceMount hidden={!open || (projection.blocks.length === 0 && !activity.historyTruncated)} className="space-y-5">
          {groups.map((block) =>
            "steps" in block ? (
              <ToolChips key={block.id} steps={block.steps} groupLabel={block.steps.length > 1 ? `${block.steps[0].label} · ${block.steps.length} ${block.steps[0].label === "终端" ? "条命令" : "项"}` : undefined} />
            ) : block.thinking ? (
              <ThinkingStatus key={block.id} thinking={block.thinking} activity={activity} />
            ) : block.diagnostic ? (
              <details key={block.id} className="text-xs text-muted-foreground">
                <summary className="cursor-pointer">{block.diagnostic.label}</summary>
                <pre className="mt-2 whitespace-pre-wrap break-all">{block.diagnostic.detail}</pre>
              </details>
            ) : block.diff ? (
              <details key={block.id}>
                <summary className="cursor-pointer text-xs text-muted-foreground">查看本轮代码差异</summary>
                <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-all font-mono text-xs">{block.diff}</pre>
              </details>
            ) : <ActivityMarkdown key={block.id} text={block.text ?? ""} />
          )}
          {activity.historyTruncated && <p className="text-xs text-muted-foreground">较早过程已超出保留范围，正式回复仍保留。</p>}
        </CollapsibleContent>
      {interactions.map((request) => (
          <div key={request.id} className="space-y-2 rounded-md border p-3">
            <p className="text-sm font-medium">
              {projection.blocks.find(
                (b) => b.tool?.id === record(request.details).toolCallId,
              )?.tool?.label ?? request.title}
            </p>
            {typeof record(record(request.details).rawInput).command ===
              "string" && (
              <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all text-xs">
                {commandText(record(record(request.details).rawInput).command)}
              </pre>
            )}
            {request.form?.message && (
              <p className="text-sm">{request.form.message}</p>
            )}
            <details className="text-xs text-muted-foreground">
              <summary>查看请求详情</summary>
              <pre className="mt-2 whitespace-pre-wrap break-all">
                {JSON.stringify(
                  {
                    ...(request.details ?? request.form?.requestedSchema ?? {}),
                    ...(request.options ? { options: request.options } : {}),
                  },
                  null,
                  2,
                ).slice(0, 20000)}
              </pre>
            </details>
            {request.status !== "pending" || pending[request.id] ? (
              <p className="text-xs text-muted-foreground">
                {request.status === "unknown"
                  ? "决定送达结果待核对"
                  : "已提交，等待执行端确认"}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {request.form?.mode === "form" ? (
                  <>
                    <NativeQuestion
                      schema={request.form.requestedSchema ?? {}}
                      disabled={Boolean(busy)}
                      submit={(content) =>
                        void act("respond", request.id, {
                          action: "accept",
                          content,
                        })
                      }
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        void act("respond", request.id, { action: "decline" })
                      }
                    >
                      拒绝
                    </Button>
                  </>
                ) : request.form?.mode === "url" ? (
                  <>
                    {/^https?:\/\//.test(request.form.url ?? "") && (
                      <a
                        className="text-sm underline"
                        href={request.form.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        打开授权页面
                      </a>
                    )}
                    <Button
                      size="sm"
                      onClick={() =>
                        void act("respond", request.id, { action: "accept" })
                      }
                    >
                      已完成，继续核对
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        void act("respond", request.id, { action: "cancel" })
                      }
                    >
                      取消
                    </Button>
                  </>
                ) : request.options?.length ? (
                  request.options.map((option) => (
                    <Button
                      key={option.optionId}
                      size="sm"
                      variant={
                        option.kind.startsWith("reject") ? "outline" : "default"
                      }
                      disabled={Boolean(busy)}
                      title={option.name}
                      onClick={() =>
                        void act("respond", request.id, {
                          optionId: option.optionId,
                        })
                      }
                    >
                      {option.kind === "allow_once"
                        ? "允许一次"
                        : option.kind === "reject_once"
                          ? "拒绝"
                          : option.kind === "allow_always"
                            ? "始终允许此范围"
                            : option.kind === "reject_always"
                              ? "始终拒绝此范围"
                              : option.name}
                    </Button>
                  ))
                ) : (
                  <>
                    {request.canAllow && (
                      <Button
                        size="sm"
                        onClick={() => void act("respond", request.id, "allow")}
                      >
                        本次允许
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void act("respond", request.id, "deny")}
                    >
                      拒绝
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      {children}
      {!terminal && interactions.length > 0 && showStop && activity.state === "running" && (
        <Button variant="ghost" size="sm" className="h-7 px-0 text-xs text-muted-foreground" disabled={Boolean(busy) || Boolean(pending.stop)} onClick={() => void act("stop")}>
          <Square className="size-3" />{pending.stop ? "停止结果待确认" : "停止"}
        </Button>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {activity.state === "failed" && (
        <p className="text-sm text-destructive">
          本轮未完成，已有过程与输出保留。
        </p>
      )}
      {activity.state === "unknown" && (
        <p className="text-xs text-muted-foreground">
          原运行结果尚未确认，请核对原记录。
        </p>
      )}
      {activity.commands
        .filter((c) => c.kind === "steer")
        .map((c) => (
          <p key={c.id} className="text-xs text-muted-foreground">
            {c.result === "accepted"
              ? "补充要求已接收"
              : c.result === "rejected"
                ? "补充未被接收"
                : "补充结果待确认"}
          </p>
        ))}
      {activity.outputs.map((file) => (
        <OutputPreview
          key={file.id}
          name={file.name}
          href={file.href}
          loadPreview={file.loadPreview}
        />
      ))}
      {terminal &&
        activity.outputsState === "unconfirmed" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>成果文件待核对</span>
            <Button
              size="sm"
              variant="ghost"
              disabled={Boolean(busy)}
              onClick={async () => {
                setBusy("outputs");
                setError("");
                try {
                  const result = await onRetrieveOutputs();
                  if (!result.ok) setError(result.error);
                } catch {
                  setError("成果读取结果未确认，请核对原交付后重试。");
                } finally {
                  setBusy("");
                }
              }}
            >
              {busy === "outputs" ? "取回中" : "补取原成果"}
            </Button>
          </div>
        )}
        </div>)}
      </Collapsible>
      {!terminal && activity.state !== "unknown" && interactions.length === 0 && (
        <div data-slot="turn-working" className={`flex items-center gap-2 text-sm leading-5 text-muted-foreground ${hasContent ? "mt-5" : ""}`} role="status">
          <LoaderCircle aria-hidden="true" className="size-4 shrink-0 motion-safe:animate-spin" />
          <span>{!hasContent && waitingFor && `${waitingFor} · `}工作中{seconds >= 1 ? ` · ${seconds} 秒` : ""}</span>
          {showStop && activity.state === "running" && (
            <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" disabled={Boolean(busy) || Boolean(pending.stop)} onClick={() => void act("stop")}>
              <Square className="size-3" />{pending.stop ? "停止结果待确认" : "停止"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
