import { chat, basic } from "../../model";

export default {
  ...chat(
    "attachments",
    "Attachment 聊天附件",
    "通过 assistant-ui 附件 adapter 选择、展示和移除本地文件。",
    "src/assistant-ui/elements/attachment.aui.tsx",
    'import { ComposerAddAttachment, ComposerAttachments } from "@hutian-ai/design/assistant-ui/elements/attachment.aui";\n\n<ComposerAttachments />\n<ComposerAddAttachment />',
    basic,
    [
      "本页文件仅保留在浏览器内，不向 Hutian 上传。生产上传与资源授权由应用提供。",
    ],
  ),
  order: 4,
};
