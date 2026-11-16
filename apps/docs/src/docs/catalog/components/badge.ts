import { ui, prop } from "../../model";

export default {
  ...ui(
    "badge",
    "Badge 标记",
    "表达短状态和分类，状态不能只靠颜色传达。",
    "Badge",
    '<Badge variant="secondary">等待确认</Badge>',
    [
      prop(
        "variant",
        "default | secondary | destructive | outline",
        "标记的语义与视觉层级。",
        "default",
      ),
    ],
  ),
  order: 28,
};
