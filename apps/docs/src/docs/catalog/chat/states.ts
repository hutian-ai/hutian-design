import { chat, prop } from "../../model";

export default {
  ...chat(
    "states",
    "States 状态与恢复",
    "区分空等待、进行中、完成、失败、停止和结果未知。",
    "src/chat/types.ts",
    'import type { ExecutionView } from "@hutian-ai/design/chat/types";\n\n// 状态由应用的权威回执提供\nconst view: ExecutionView = {\n  state: "completed", startedAt, finishedAt,\n  historyTruncated: false, interactions: [], commands: [],\n  outputs: [], outputsState: "none"\n};',
    [
      prop("state", "string", "原请求的实际状态，不由动画推断。"),
      prop("finishedAt", "string | null", "未记录时不伪造完成时间。"),
    ],
  ),
  order: 11,
};
