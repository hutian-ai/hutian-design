import { chat, prop } from "../../model";

export default {
  ...chat(
    "thinking",
    "Thinking 思考摘要",
    "思考状态与公开摘要分开；有摘要时才提供展开入口。",
    "src/beautiful-ui/thinking-state.tsx",
    'import { ActivityMarkdown } from "@hutian-ai/design/assistant-ui/markdown-text";\nimport ThinkingState from "@hutian-ai/design/beautiful-ui/thinking-state";\n\n<ThinkingState label="思考 · 持续了 2 秒" active={false}>\n  <ActivityMarkdown text={publicSummary} />\n</ThinkingState>',
    [
      prop("label", "ReactNode", "状态与真实时间信息。"),
      prop("active", "boolean", "当前是否有思考事件在进行。"),
      prop(
        "children / summary",
        "ReactNode / string",
        "执行端明确提供的公开摘要。",
      ),
      prop("defaultOpen", "boolean", "初始展开状态。", "false"),
    ],
    [
      "无原生事件不补造思考；无公开摘要不挂载空展开。原始思维流不进入公开记录。",
    ],
  ),
  order: 5,
};
