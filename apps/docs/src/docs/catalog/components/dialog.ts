import { ui, prop } from "../../model";

export default {
  ...ui(
    "dialog",
    "Dialog 对话框",
    "承载小型表单和一次性操作，管理焦点与关闭行为。",
    "Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription",
    "<Dialog>\n  <DialogTrigger asChild><Button>打开详情</Button></DialogTrigger>\n  <DialogContent><DialogHeader>\n    <DialogTitle>详情</DialogTitle>\n    <DialogDescription>这项操作的说明。</DialogDescription>\n  </DialogHeader></DialogContent>\n</Dialog>",
    [
      prop(
        "open / onOpenChange",
        "boolean / (open: boolean) => void",
        "受控显示状态。",
      ),
      prop("modal", "boolean", "是否采用模态交互。"),
    ],
    ["必须有 DialogTitle；关闭后焦点应回到触发器。"],
  ),
  order: 13,
};
