import { ui, prop } from "../../model";

export default {
  ...ui(
    "button",
    "Button 按钮",
    "承载页面主操作、行级动作和可访问的图标按钮。",
    "Button",
    '<Button variant="outline" size="sm">保存草稿</Button>',
    [
      prop(
        "variant",
        "default | destructive | outline | secondary | ghost | link",
        "操作的视觉层级。",
        "default",
      ),
      prop(
        "size",
        "default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg",
        "文字与图标控件的尺寸。",
        "default",
      ),
      prop("asChild", "boolean", "将行为和样式合并到单个子元素。", "false"),
      prop("disabled", "boolean", "阻止当前不可用或重复提交的动作。"),
    ],
    [
      "异步操作使用 Spinner 配合 disabled；等待真实回执后再显示成功。",
      "图标按钮必须提供 aria-label，Tooltip 不能代替错误提示。",
    ],
  ),
  order: 0,
};
