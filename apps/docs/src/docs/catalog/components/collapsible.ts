import { ui, prop } from "../../model";

export default {
  ...ui(
    "collapsible",
    "Collapsible 折叠",
    "局部展开辅助信息，保留主内容与清晰的触发入口。",
    "Collapsible, CollapsibleTrigger, CollapsibleContent",
    '<Collapsible>\n  <CollapsibleTrigger asChild><Button variant="ghost">更多信息</Button></CollapsibleTrigger>\n  <CollapsibleContent>按需读取的补充信息。</CollapsibleContent>\n</Collapsible>',
    [
      prop("open / onOpenChange", "boolean / callback", "受控展开状态。"),
      prop("defaultOpen", "boolean", "非受控初始展开状态。"),
    ],
  ),
  order: 35,
};
