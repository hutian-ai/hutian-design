import { chat, prop } from "../../model";

export default {
  ...chat(
    "tools",
    "Tool 工具过程",
    "紧凑工具行、连续命令分组和独立详情，失败与未知保留文字。",
    "src/beautiful-ui/tool-chips.tsx",
    'import ToolChips from "@hutian-ai/design/beautiful-ui/tool-chips";\n\n<ToolChips steps={steps} groupLabel="终端 · 2 条命令" />',
    [
      prop("steps", "ToolStep[]", "稳定调用 id、摘要、状态和详情。"),
      prop("groupLabel", "string", "可选的连续同类工具分组摘要。"),
    ],
  ),
  order: 6,
};
