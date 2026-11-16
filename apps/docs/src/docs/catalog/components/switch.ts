import { ui, prop } from "../../model";

export default {
  ...ui(
    "switch",
    "Switch 开关",
    "切换明确的布尔偏好，保存状态由调用方确认。",
    "Switch",
    '<Switch aria-label="显示补充信息" defaultChecked />',
    [
      prop(
        "checked / onCheckedChange",
        "boolean / (checked: boolean) => void",
        "开关的受控状态。",
      ),
      prop("disabled", "boolean", "当前不能修改。"),
    ],
  ),
  order: 8,
};
