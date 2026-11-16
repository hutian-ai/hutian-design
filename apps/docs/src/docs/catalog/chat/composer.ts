import { chat, prop } from "../../model";

export default {
  ...chat(
    "composer",
    "Composer 输入与发送",
    "输入、附件与发送/停止保持同一底部操作区。",
    "src/chat/send-button.tsx",
    'import { ChatSendButton } from "@hutian-ai/design/chat/send-button";\n\n<ChatSendButton\n  busy={sending}\n  stopping={stopping}\n  stop={stopCurrent}\n  attachments={hasFiles}\n  label="发送消息"\n/>',
    [
      prop("busy / stopping", "boolean", "提交中和停止中的交互状态。"),
      prop("stop", "() => Promise<void>", "停止明确目标的当前运行。"),
      prop("attachments", "boolean", "是否存在可发送附件。"),
      prop("label", "string", "发送按钮的可访问名称。"),
    ],
    ["单成员空输入可显示停止；多人控制由消费方放在对应成员旁。"],
  ),
  order: 3,
};
