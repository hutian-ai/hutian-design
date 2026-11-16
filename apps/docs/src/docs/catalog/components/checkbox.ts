import { ui, prop } from "../../model";

export default {
  ...ui(
    "checkbox",
    "Checkbox 复选框",
    "表达可组合的独立选择。支持未选、已选和不确定态。",
    "Checkbox",
    '<Checkbox id="agree" defaultChecked />',
    [
      prop("checked", "boolean | indeterminate", "受控选中状态。"),
      prop("onCheckedChange", "(checked) => void", "接收用户选择。"),
    ],
  ),
  order: 7,
};
