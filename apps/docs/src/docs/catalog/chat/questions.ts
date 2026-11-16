import { chat, prop } from "../../model";

export default {
  ...chat(
    "questions",
    "Question 结构化问答",
    "用现有表单组件呈现原生问题，保留必填和选项语义。",
    "src/chat/execution.tsx",
    '// 由应用提供到 interaction.form\n{\n  mode: "form",\n  message: "选择本轮范围",\n  requestedSchema: {\n    type: "object", required: ["scope"],\n    properties: { scope: { type: "string", enum: ["基础 UI", "Chat UI"] } }\n  }\n}',
    [
      prop(
        "form.requestedSchema",
        "Record<string, unknown>",
        "当前支持 string、number、integer、boolean 字段。",
      ),
      prop("form.mode", "string", "form 或外部 url 授权流程。"),
    ],
  ),
  order: 10,
};
