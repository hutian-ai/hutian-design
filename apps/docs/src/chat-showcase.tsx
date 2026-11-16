import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AssistantRuntimeProvider,
  MessagePrimitive,
  useAuiState,
  useExternalStoreRuntime,
  type ThreadMessageLike,
} from "@assistant-ui/react";
import { Terminal } from "lucide-react";
import { Thread } from "../../../src/assistant-ui/thread.aui";
import {
  AssistantMessageBody,
  ChatMessageRoot,
  UserMessageBubble,
} from "../../../src/chat/message";
import {
  ComposerAddAttachment,
  UserMessageAttachments,
} from "../../../src/assistant-ui/elements/attachment.aui";
import { ChatSendButton } from "../../../src/chat/send-button";
import {
  MarkdownText,
  ActivityMarkdown,
} from "../../../src/assistant-ui/markdown-text";
import { ChatExecution } from "../../../src/chat/execution";
import type {
  ExecutionProjection,
  ExecutionView,
} from "../../../src/chat/types";
import { Button } from "../../../src/ui/button";
import { Badge } from "../../../src/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../src/ui/select";

type Scene =
  | "waiting"
  | "running"
  | "approval"
  | "question"
  | "completed"
  | "failed"
  | "cancelled"
  | "unknown";
const labels: Record<Scene, string> = {
  waiting: "等待首条内容",
  running: "流式回复与工具",
  approval: "原生审批",
  question: "结构化提问",
  completed: "完成与过程折叠",
  failed: "失败",
  cancelled: "停止",
  unknown: "结果待核对",
};
const SceneContext = createContext<{
  scene: Scene;
  setScene: (s: Scene) => void;
}>({ scene: "completed", setScene: () => {} });
const answer =
  '基础 UI 和聊天 UI 已拆分。\n\n- 消息、输入框与工具过程使用同一套组件。\n- 业务数据和权限由调用方提供。\n\n```tsx\nimport { Button } from "@hutian-ai/design/ui/button";\n```'.replaceAll(
    '\"',
    '"',
  );

function AssistantPreview() {
  const { scene, setScene } = useContext(SceneContext);
  const running = ["waiting", "running", "approval", "question"].includes(
    scene,
  );
  const activity: ExecutionView = {
    state: running ? "running" : scene,
    startedAt: "2026-11-16T00:00:00Z",
    finishedAt: running ? null : "2026-11-16T00:00:12Z",
    historyTruncated: false,
    outputsState:
      scene === "unknown"
        ? "unconfirmed"
        : scene === "completed"
          ? "available"
          : "none",
    commands: [],
    outputs:
      scene === "completed"
        ? [
            {
              id: "demo-output",
              name: "design-notes.md",
              href: "data:text/plain;charset=utf-8,Hutian%20Design%20demo",
              loadPreview: async () =>
                "# 展示数据\n这是一份演示成果，不会请求 Hutian API。",
            },
          ]
        : [],
    interactions:
      scene === "approval"
        ? [
            {
              id: "demo-approval",
              title: "运行构建命令",
              status: "pending",
              canAllow: true,
              details: { rawInput: { command: "pnpm build" } },
              options: [
                { optionId: "once", name: "Allow once", kind: "allow_once" },
                { optionId: "deny", name: "Reject once", kind: "reject_once" },
              ],
            },
          ]
        : scene === "question"
          ? [
              {
                id: "demo-question",
                title: "选择展示范围",
                status: "pending",
                canAllow: false,
                form: {
                  mode: "form",
                  message: "演示结构化问答，不会保存业务配置。",
                  requestedSchema: {
                    type: "object",
                    required: ["scope"],
                    properties: {
                      scope: {
                        type: "string",
                        title: "展示范围",
                        enum: ["基础组件", "聊天组件"],
                      },
                    },
                  },
                },
              },
            ]
          : [],
  };
  // Running scenes show elapsed time from opening this preview, not a fabricated result.
  const [openedAt] = useState(() => new Date().toISOString());
  if (running) activity.startedAt = openedAt;
  const projection: ExecutionProjection = {
    final: scene === "completed" ? answer : "",
    blocks:
      scene === "waiting"
        ? []
        : [
            {
              id: "thinking",
              thinking: {
                startedAt: "2026-11-16T00:00:00Z",
                completedAt: "2026-11-16T00:00:02Z",
                summary:
                  "先确认通用呈现与业务数据的边界，再检查组件引用。此内容为公开摘要的展示示例。",
              },
            },
            {
              id: "commentary",
              text: "我正在核对组件依赖，并检查聊天输入与执行过程。",
            },
            ...[1, 2].map((n) => ({
              id: `tool-${n}`,
              tool: {
                id: `tool-${n}`,
                icon: <Terminal className="size-4" />,
                label: "终端",
                chip: n === 1 ? "pnpm typecheck" : "pnpm build",
                mono: false,
                status: (scene === "failed" && n === 2
                  ? "failed"
                  : scene === "running" && n === 2
                    ? "running"
                    : scene === "unknown"
                      ? "unconfirmed"
                      : "complete") as
                  "failed" | "running" | "unconfirmed" | "complete",
                statusLabel:
                  scene === "failed" && n === 2
                    ? "未完成"
                    : scene === "unknown"
                      ? "结果未记录"
                      : scene === "running" && n === 2
                        ? "处理中"
                        : "已完成",
                detail: (
                  <pre className="font-mono">
                    {n === 2 && scene === "failed"
                      ? "示例错误：无法解析组件导出。"
                      : "此处为演示输出，不是实际构建回执。"}
                  </pre>
                ),
              },
            })),
          ],
  };
  const body =
    scene === "completed"
      ? answer
      : scene === "running"
        ? "基础组件已经完成分离，正在检查聊天组合的"
        : "";
  return (
    <ChatMessageRoot role="assistant">
      <ChatExecution
        key={scene}
        runId={`design-showcase-${scene}`}
        activity={activity}
        projection={projection}
        hasAnswer={Boolean(body)}
        onControl={async (command) => {
          if (command.kind === "stop") setScene("cancelled");
          return { ok: true };
        }}
        onRetrieveOutputs={async () => ({
          ok: false,
          error: "这是成果未确认的演示状态，没有连接执行端。",
        })}
        renderBody={(content) => (
          <AssistantMessageBody name="演示助手">{content}</AssistantMessageBody>
        )}
      >
        {body && <ActivityMarkdown text={body} />}
      </ChatExecution>
    </ChatMessageRoot>
  );
}
function UserPreview() {
  return (
    <ChatMessageRoot role="user">
      <UserMessageBubble>
        <MessagePrimitive.Parts components={{ Text: MarkdownText }} />
      </UserMessageBubble>
      <UserMessageAttachments />
    </ChatMessageRoot>
  );
}
function PreviewComposerActions() {
  const attachments = useAuiState((s) => s.composer.attachments.length > 0);
  return (
    <div className="flex items-center justify-between">
      <ComposerAddAttachment />
      <ChatSendButton
        busy={false}
        stopping={false}
        attachments={attachments}
        label="发送消息"
      />
    </div>
  );
}
export function ChatShowcase({
  initialScene = "completed",
}: { initialScene?: Scene } = {}) {
  const [scene, setScene] = useState<Scene>(initialScene);
  const [messages, setMessages] = useState<ThreadMessageLike[]>([
    {
      id: "demo-user",
      role: "user",
      content: [{ type: "text", text: "帮我把设计系统拆分出来，并说明结果。" }],
    },
    {
      id: "demo-assistant",
      role: "assistant",
      content: [{ type: "text", text: "展示回复" }],
    },
  ]);
  const runtime = useExternalStoreRuntime<ThreadMessageLike>({
    messages,
    convertMessage: (message) => message,
    isRunning: false,
    onNew: async (message) => {
      setMessages((previous) => [
        ...previous,
        { ...message, id: crypto.randomUUID() },
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: [{ type: "text", text: "展示回复" }],
        },
      ]);
      setScene("completed");
    },
    adapters: {
      attachments: {
        accept: "*",
        add: async ({ file }) => ({
          id: crypto.randomUUID(),
          type: "file",
          name: file.name,
          contentType: file.type || "application/octet-stream",
          file,
          status: { type: "requires-action", reason: "composer-send" },
        }),
        send: async (attachment) => ({
          ...attachment,
          status: { type: "complete" },
          content: [
            {
              type: "file",
              data: "",
              mimeType: attachment.contentType || "application/octet-stream",
            },
          ],
        }),
        remove: async () => {},
      },
    },
  });
  const components = useMemo(
    () => ({ AssistantMessage: AssistantPreview, UserMessage: UserPreview }),
    [],
  );
  return (
    <SceneContext.Provider value={{ scene, setScene }}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
        <div>
          <h2 className="text-sm font-semibold">聊天工作面</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            可输入、附加文件、展开过程与审批；所有内容仅用于本页演示。
          </p>
        </div>
        <Select
          value={scene}
          onValueChange={(value) => setScene(value as Scene)}
        >
          <SelectTrigger className="w-52" aria-label="聊天展示状态">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(labels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={() => setMessages([])}>
          空会话
        </Button>
      </div>
      <div className="h-[min(760px,76dvh)] min-h-[500px]">
        <AssistantRuntimeProvider runtime={runtime}>
          <Thread
            autoFocus={false}
            components={components}
            composer={{
              placeholder: "输入消息，体验同一套聊天组件…",
              actions: <PreviewComposerActions />,
            }}
          />
        </AssistantRuntimeProvider>
      </div>
    </SceneContext.Provider>
  );
}
