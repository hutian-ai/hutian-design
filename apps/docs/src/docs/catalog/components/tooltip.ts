import { ui, prop } from "../../model";

export default {
  ...ui(
    "tooltip",
    "Tooltip 提示",
    "为图标和缩写提供简短说明，不承担错误或操作结果。",
    "Tooltip, TooltipTrigger, TooltipContent",
    '<Tooltip>\n  <TooltipTrigger asChild><Button aria-label="帮助" variant="outline">?</Button></TooltipTrigger>\n  <TooltipContent>查看帮助</TooltipContent>\n</Tooltip>',
    [
      prop(
        "side",
        "top | right | bottom | left",
        "TooltipContent 的出现方向。",
      ),
      prop("delayDuration", "number", "TooltipProvider 的等待时间。"),
    ],
  ),
  order: 18,
};
