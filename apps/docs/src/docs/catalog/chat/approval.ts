import { chat, prop } from "../../model";

export default {
  ...chat(
    "approval",
    "Approval 原生审批",
    "围绕具体请求提供真实选项，提交后等待执行端确认。",
    "src/chat/execution.tsx",
    '// 由应用提供到 ChatExecution.activity.interactions\n{\n  id: "approval-id",\n  title: "运行构建命令",\n  status: "pending",\n  canAllow: true,\n  options: [{ optionId: "once", name: "Allow once", kind: "allow_once" }]\n}',
    [
      prop(
        "interactions[].status",
        "string",
        "pending、unknown、delivered 等权威状态。",
      ),
      prop(
        "options[].optionId",
        "string",
        "按原生选项身份提交，不按界面文案猜测。",
      ),
    ],
    ["点击允许只表示决定提交，不表示工具已经执行成功。"],
  ),
  order: 9,
};
