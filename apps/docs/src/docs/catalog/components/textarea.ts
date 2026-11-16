import { ui, prop } from "../../model";

export default {
  ...ui(
    "textarea",
    "Textarea 多行输入",
    "用于说明、提示和 Markdown 源码等连续文字。",
    "Textarea",
    '<Textarea aria-label="说明" placeholder="补充说明" />',
    [
      prop(
        "value / onChange",
        "string / ChangeEventHandler",
        "由调用方保存输入。",
      ),
      prop("rows", "number", "原生输入区域的行数。"),
    ],
  ),
  order: 2,
};
