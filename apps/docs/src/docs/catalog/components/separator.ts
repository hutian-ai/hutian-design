import { ui, prop } from "../../model";

export default {
  ...ui(
    "separator",
    "Separator 分隔线",
    "用克制边线表达内容之间的结构关系。",
    "Separator",
    "<Separator />",
    [
      prop("orientation", "horizontal | vertical", "分隔方向。", "horizontal"),
      prop("decorative", "boolean", "是否仅为视觉装饰。"),
    ],
  ),
  order: 36,
};
