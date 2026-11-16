import { ui, prop } from "../../model";

export default {
  ...ui(
    "select",
    "Select 单选",
    "从有限集合中选择一个值，保留当前项和键盘导航。",
    "Select, SelectTrigger, SelectValue, SelectContent, SelectItem",
    '<Select>\n  <SelectTrigger aria-label="视图"><SelectValue placeholder="选择视图" /></SelectTrigger>\n  <SelectContent><SelectItem value="list">列表</SelectItem></SelectContent>\n</Select>',
    [
      prop(
        "value / onValueChange",
        "string / (value: string) => void",
        "受控选择及变更事件。",
      ),
      prop("disabled", "boolean", "冻结当前选择。"),
    ],
    ["远程搜索或长列表优先使用 Popover + Command。"],
  ),
  order: 6,
};
