import { ui, prop } from "../../model";

export default {
  ...ui(
    "toggle",
    "Toggle 切换按钮",
    "单个按钮表达开启与关闭的局部选择。",
    "Toggle",
    '<Toggle aria-label="加粗">B</Toggle>',
    [
      prop(
        "pressed / onPressedChange",
        "boolean / (pressed: boolean) => void",
        "按钮的选择状态。",
      ),
      prop("variant", "default | outline", "切换按钮的边界样式。", "default"),
    ],
  ),
  order: 9,
};
