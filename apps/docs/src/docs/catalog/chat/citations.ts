import { chat, prop } from "../../model";

export default {
  ...chat(
    "citations",
    "Context 引用资料",
    "显示真实引用片段与确切来源，不把检索候选当作引用。",
    "src/beautiful-ui/context-cards.tsx",
    'import ContextCards from "@hutian-ai/design/beautiful-ui/context-cards";\n\n<ContextCards chunks={citations} summary="2 份资料 · 2 个片段" />',
    [
      prop(
        "chunks",
        "readonly ContextChunk[]",
        "每个片段的 id、标题、序号、正文与来源操作。",
      ),
      prop("summary", "string", "由调用方提供的资料和片段摘要。"),
      prop("onExpandedChange", "() => void", "可接入已有滚动保护。"),
    ],
  ),
  order: 7,
};
