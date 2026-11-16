import { ui, basic } from "../../model";

export default {
  ...ui(
    "scroll-area",
    "Scroll Area 滚动区",
    "让长列表和技术输出在自身容器内滚动。",
    "ScrollArea",
    '<ScrollArea className="h-48">\n  <div className="p-4">较长的内容…</div>\n</ScrollArea>',
    basic,
    ["调用方提供有界高度；不要让内部内容造成页面级横向溢出。"],
  ),
  order: 37,
};
