import { ui, prop } from "../../model";

export default {
  ...ui(
    "dropdown-menu",
    "Dropdown Menu 操作菜单",
    "把低频命令按组组织，保持行级主操作清晰。",
    "DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem",
    '<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="outline">更多</Button></DropdownMenuTrigger>\n  <DropdownMenuContent><DropdownMenuGroup>\n    <DropdownMenuItem>复制链接</DropdownMenuItem>\n  </DropdownMenuGroup></DropdownMenuContent>\n</DropdownMenu>',
    [
      prop("open / onOpenChange", "boolean / callback", "菜单的受控状态。"),
      prop("onSelect", "(event) => void", "DropdownMenuItem 被激活时调用。"),
    ],
    ["菜单项放在 DropdownMenuGroup 内；危险命令与普通命令分组。"],
  ),
  order: 19,
};
