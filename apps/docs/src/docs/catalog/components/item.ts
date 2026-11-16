import { ui, prop } from "../../model";

export default {
  ...ui(
    "item",
    "Item 列表项",
    "以统一的图标、正文、说明和操作排列目录内容。",
    "Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions",
    '<Item variant="outline">\n  <ItemContent><ItemTitle>设计规范</ItemTitle><ItemDescription>主题、组件与交互。</ItemDescription></ItemContent>\n  <ItemActions><Button variant="ghost">查看</Button></ItemActions>\n</Item>',
    [
      prop(
        "variant",
        "default | outline | muted",
        "列表项的边界与背景。",
        "default",
      ),
      prop("size", "default | sm", "列表密度。", "default"),
    ],
  ),
  order: 25,
};
