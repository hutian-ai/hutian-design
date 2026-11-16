import { chat, prop } from "../../model";

export default {
  ...chat(
    "thread",
    "Thread 聊天工作面",
    "消息、输入框、附件、滚动锚点与执行过程的完整组合。",
    "src/assistant-ui/thread.aui.tsx",
    'import { AssistantRuntimeProvider } from "@assistant-ui/react";\nimport { Thread } from "@hutian-ai/design/assistant-ui/thread.aui";\n\n<AssistantRuntimeProvider runtime={runtime}>\n  <Thread autoFocus={false} />\n</AssistantRuntimeProvider>',
    [
      prop("components", "ThreadComponents", "覆盖消息、工具和组合 slots。"),
      prop(
        "composer",
        "ThreadComposerConfiguration",
        "插入资料、输入操作和 Mention 入口。",
      ),
      prop("autoFocus", "boolean", "是否自动聚焦输入框。", "true"),
    ],
    ["先由应用提供真实 runtime；组件不创建另一份消息账本。"],
  ),
  order: 0,
};
