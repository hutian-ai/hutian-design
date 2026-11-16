import { useState, type ReactNode } from "react";
import {
  AssistantRuntimeProvider,
  useExternalStoreRuntime,
  type ThreadMessageLike,
} from "@assistant-ui/react";
import { Terminal } from "lucide-react";
import { ActivityMarkdown } from "../../../../src/assistant-ui/markdown-text";
import ThinkingState from "../../../../src/beautiful-ui/thinking-state";
import ToolChips, {
  type ToolStep,
} from "../../../../src/beautiful-ui/tool-chips";
import ContextCards from "../../../../src/beautiful-ui/context-cards";
import {
  AssistantMessageBody,
  UserMessageBubble,
} from "../../../../src/chat/message";
import { Button } from "../../../../src/ui/button";
import { ChatShowcase } from "../chat-showcase";

export function RuntimeScope({ children }: { children: ReactNode }) {
  const runtime = useExternalStoreRuntime<ThreadMessageLike>({
    messages: [],
    convertMessage: (m) => m,
    isRunning: false,
    onNew: async () => {},
  });
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
function ToolsDemo() {
  const [state, setState] = useState<
    "complete" | "running" | "failed" | "unconfirmed"
  >("complete");
  const steps: ToolStep[] = [
    {
      id: "read",
      icon: <Terminal className="size-4" />,
      label: "终端",
      chip: "pnpm typecheck",
      mono: false,
      status: "complete",
      statusLabel: "已完成",
      detail: (
        <pre className="font-mono text-xs">
          示例输出：类型检查通过。此处不是实际执行回执。
        </pre>
      ),
    },
    {
      id: "build",
      icon: <Terminal className="size-4" />,
      label: "终端",
      chip: "pnpm build",
      mono: false,
      status: state,
      statusLabel: {
        complete: "已完成",
        running: "处理中",
        failed: "未完成",
        unconfirmed: "结果未记录",
      }[state],
      detail: (
        <pre className="font-mono text-xs">
          {state === "failed"
            ? "示例错误：组件导出无法解析。"
            : state === "unconfirmed"
              ? "未取得执行端的结果回执。"
              : "示例输出：构建产物已生成。"}
        </pre>
      ),
    },
  ];
  return (
    <div className="w-full space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["complete", "running", "failed", "unconfirmed"] as const).map(
          (s, i) => (
            <Button
              key={s}
              variant={s === state ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setState(s)}
            >
              {["完成", "进行中", "失败", "未知"][i]}
            </Button>
          ),
        )}
      </div>
      <ToolChips steps={steps} groupLabel="终端 · 2 条命令" />
    </div>
  );
}
function ThinkingDemo() {
  const [active, setActive] = useState(false);
  return (
    <div className="w-full space-y-5">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={() => setActive(!active)}>
          {active ? "切换为已结束" : "切换为思考中"}
        </Button>
        <span className="text-xs text-muted-foreground">公开摘要示例</span>
      </div>
      <ThinkingState
        label={active ? "正在思考" : "思考 · 持续了 2 秒"}
        active={active}
      >
        <ActivityMarkdown text="先核对组件边界，再检查可访问性与关键异常状态。这里是公开摘要示例，不是原始思维流。" />
      </ThinkingState>
    </div>
  );
}
function CitationsDemo() {
  return (
    <div className="w-full">
      <ContextCards
        summary="2 份资料 · 2 个片段"
        chunks={[
          {
            id: "foundation",
            title: "Hutian 颜色与主题",
            reference: "1",
            body: "颜色来自统一语义变量。绿色用于主操作、选中、焦点和真实的正常状态。",
            source: (
              <a
                className="text-xs text-primary underline"
                href="#/foundations/colors"
              >
                阅读颜色规范
              </a>
            ),
          },
          {
            id: "chat",
            title: "Chat UI 交互约定",
            reference: "2",
            body: "运行中按顺序展开公开内容；只有完成且有答案才默认收起过程，成员身份和正式回答始终保留。",
            source: (
              <a
                className="text-xs text-primary underline"
                href="#/chat/execution"
              >
                阅读执行过程
              </a>
            ),
          },
        ]}
      />
    </div>
  );
}
const markdown =
  '# 组件阅读示例\n\n一套组件支持 **持续协作**，并保留清晰的来源与状态。\n\n## 工作结果\n\n- 基础组件统一视觉与交互。\n- Chat UI 负责消息与执行过程呈现。\n\n> 检索候选不代表回答引用；结果提交不代表执行完成。\n\n| 组件层 | 负责内容 |\n| --- | --- |\n| 基础 UI | 控件与可访问交互 |\n| Chat UI | 阅读、输入和执行呈现 |\n\n```tsx\nimport { Button } from "@hutian-ai/design/ui/button";\n\n<Button variant="outline">查看来源</Button>\n```\n\n[继续阅读接入说明](#/installation)';
export default function ChatDemo({ id }: { id: string }) {
  if (
    [
      "thread",
      "composer",
      "attachments",
      "execution",
      "approval",
      "questions",
      "states",
    ].includes(id)
  )
    return (
      <ChatShowcase
        key={id}
        initialScene={
          id === "approval"
            ? "approval"
            : id === "questions"
              ? "question"
              : id === "states"
                ? "waiting"
                : id === "execution"
                  ? "running"
                  : "completed"
        }
      />
    );
  return (
    <RuntimeScope>
      {id === "thinking" ? (
        <ThinkingDemo />
      ) : id === "tools" ? (
        <ToolsDemo />
      ) : id === "citations" ? (
        <CitationsDemo />
      ) : id === "markdown" ? (
        <ActivityMarkdown text={markdown} />
      ) : id === "messages" ? (
        <div className="w-full space-y-8">
          <div className="flex justify-end">
            <UserMessageBubble>
              帮我整理这份资料，并保留引用来源。
            </UserMessageBubble>
          </div>
          <AssistantMessageBody name="林">
            <ActivityMarkdown text="已整理为三部分：背景、已经确认的约束和下一步行动。\n\n- 核对事实与原始来源。\n- 将待确认项单独说明。\n- 保留后续可执行的动作。" />
          </AssistantMessageBody>
        </div>
      ) : null}
    </RuntimeScope>
  );
}
