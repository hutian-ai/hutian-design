import { chat, prop } from "../../model";

export default {
  ...chat(
    "markdown",
    "Markdown 正文",
    "统一标题、列表、表格、链接、引用与代码块的阅读排版。",
    "src/assistant-ui/markdown-text.tsx",
    'import { ActivityMarkdown } from "@hutian-ai/design/assistant-ui/markdown-text";\n\n<ActivityMarkdown text={markdown} />',
    [prop("text", "string", "ActivityMarkdown 接收的公开 Markdown。")],
    [
      "MarkdownText 在消息 part 上下文使用；独立文本使用 ActivityMarkdown。",
      "外链安全打开，不执行 HTML。",
    ],
  ),
  order: 2,
};
