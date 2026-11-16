import { ui, prop } from "../../model";

export default {
  ...ui(
    "command",
    "Command 命令选择",
    "可搜索、可键盘选择的局部目录或命令面板。",
    "Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem",
    '<Command>\n  <CommandInput placeholder="搜索组件…" />\n  <CommandList><CommandEmpty>没有匹配结果</CommandEmpty>\n    <CommandGroup heading="组件"><CommandItem>Button</CommandItem></CommandGroup>\n  </CommandList>\n</Command>',
    [
      prop("value / onValueChange", "string / callback", "当前高亮条目。"),
      prop("onSelect", "(value: string) => void", "CommandItem 选择回调。"),
    ],
  ),
  order: 20,
};
