import { ui, prop } from "../../model";

export default {
  ...ui(
    "alert",
    "Alert 区域反馈",
    "持续呈现需要理解或处理的问题，不用短暂 toast 掩盖错误。",
    "Alert, AlertTitle, AlertDescription",
    '<Alert variant="destructive">\n  <AlertTitle>保存未确认</AlertTitle>\n  <AlertDescription>请保留输入，核对原操作后重试。</AlertDescription>\n</Alert>',
    [
      prop(
        "variant",
        "default | destructive",
        "普通提示与错误反馈。",
        "default",
      ),
    ],
  ),
  order: 29,
};
