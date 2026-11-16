import { ui, prop } from "../../model";

export default {
  ...ui(
    "progress",
    "Progress 进度",
    "展示已经获得的定量进度，不虚构完成比例。",
    "Progress",
    '<Progress value={60} aria-label="文件处理进度" />',
    [prop("value", "number | null", "实际进度数值，使用 0–100 范围。")],
  ),
  order: 33,
};
