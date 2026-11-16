import { ui, prop } from "../../model";

export default {
  ...ui(
    "popover",
    "Popover 轻量浮层",
    "锚定到触发器的局部编辑、日期和上下文信息。",
    "Popover, PopoverTrigger, PopoverContent",
    '<Popover>\n  <PopoverTrigger asChild><Button variant="outline">显示选项</Button></PopoverTrigger>\n  <PopoverContent>按需展开的补充信息。</PopoverContent>\n</Popover>',
    [
      prop("open / onOpenChange", "boolean / callback", "浮层显示状态。"),
      prop(
        "align / side",
        "start | center | end / side",
        "PopoverContent 对齐与方向。",
      ),
    ],
  ),
  order: 17,
};
