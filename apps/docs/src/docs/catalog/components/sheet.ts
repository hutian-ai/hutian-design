import { ui, prop } from "../../model";

export default {
  ...ui(
    "sheet",
    "Sheet 侧边面板",
    "保留列表上下文，按需查看一项的详情。",
    "Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription",
    '<Sheet>\n  <SheetTrigger asChild><Button variant="outline">查看详情</Button></SheetTrigger>\n  <SheetContent><SheetHeader><SheetTitle>详情</SheetTitle>\n    <SheetDescription>补充说明与相关信息。</SheetDescription>\n  </SheetHeader></SheetContent>\n</Sheet>',
    [
      prop(
        "side",
        "top | right | bottom | left",
        "SheetContent 的出现方向。",
        "right",
      ),
      prop("open / onOpenChange", "boolean / callback", "面板的受控状态。"),
    ],
  ),
  order: 15,
};
