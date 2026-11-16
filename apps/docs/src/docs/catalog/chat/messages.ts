import { chat, prop } from "../../model";

export default {
  ...chat(
    "messages",
    "Message 消息与身份",
    "保持成员身份、用户正文和助手无框正文流的阅读顺序。",
    "src/chat/message.tsx",
    'import { MessagePrimitive } from "@assistant-ui/react";\nimport { Thread } from "@hutian-ai/design/assistant-ui/thread.aui";\nimport { MarkdownText } from "@hutian-ai/design/assistant-ui/markdown-text";\nimport { AssistantMessageBody, ChatMessageRoot } from "@hutian-ai/design/chat/message";\n\nfunction AssistantMessage() {\n  return (\n    <ChatMessageRoot role="assistant">\n      <AssistantMessageBody name="林">\n        <MessagePrimitive.Parts components={{ Text: MarkdownText }} />\n      </AssistantMessageBody>\n    </ChatMessageRoot>\n  );\n}\n\n// 放在应用已有的 AssistantRuntimeProvider 内\n<Thread components={{ AssistantMessage }} />',
    [
      prop("role", "user | assistant", "ChatMessageRoot 的消息角色。"),
      prop(
        "name / status",
        "string",
        "AssistantMessageBody 的成员名称和局部状态。",
      ),
    ],
  ),
  order: 1,
};
