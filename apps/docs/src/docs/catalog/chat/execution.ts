import { chat, prop } from "../../model";

export default {
  ...chat(
    "execution",
    "Execution 执行过程",
    "按事件顺序展示公开说明与工具，完成后折叠过程并保留答案。",
    "src/chat/execution.tsx",
    'import { ActivityMarkdown } from "@hutian-ai/design/assistant-ui/markdown-text";\nimport { ChatExecution } from "@hutian-ai/design/chat/execution";\n\n<ChatExecution\n  runId={runId}\n  activity={view}\n  projection={projection}\n  onControl={control}\n  onRetrieveOutputs={retrieve}\n  hasAnswer={Boolean(answer)}\n>\n  <ActivityMarkdown text={answer} />\n</ChatExecution>',
    [
      prop("activity", "ExecutionView", "权威状态、时间、请求和成果。"),
      prop("projection", "ExecutionProjection", "已映射为 UI 的有序过程块。"),
      prop("runId", "string", "隔离展开偏好的运行标识。"),
      prop(
        "onControl / onRetrieveOutputs",
        "async callback",
        "业务动作通过调用方接入。",
      ),
      prop(
        "renderBody",
        "(content: ReactNode) => ReactNode",
        "插入成员身份；不折叠身份与正式答案。",
      ),
    ],
  ),
  order: 8,
};
