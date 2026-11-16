import { ui, prop } from "../../model";

export default {
  ...ui(
    "toggle-group",
    "Toggle Group 分段选择",
    "单选或多选筛选控件，不代替内容导航 Tabs。",
    "ToggleGroup, ToggleGroupItem",
    '<ToggleGroup type="single" defaultValue="all">\n  <ToggleGroupItem value="all">全部</ToggleGroupItem>\n  <ToggleGroupItem value="active">进行中</ToggleGroupItem>\n</ToggleGroup>',
    [
      prop("type", "single | multiple", "单选或多选行为。"),
      prop(
        "value / onValueChange",
        "string | string[] / callback",
        "由选择模式决定的值。",
      ),
    ],
  ),
  order: 10,
};
