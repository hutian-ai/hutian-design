import { ui, prop } from "../../model";

export default {
  ...ui(
    "sonner",
    "Toast 短反馈",
    "对已确认完成的轻量操作提供短暂反馈。",
    "Toaster",
    '// 在应用根部挂载一次\n<Toaster />\n\n// 动作确认完成后调用\ntoast.success("已复制链接");',
    [
      prop("position", 'ToasterProps["position"]', "通知出现的位置。"),
      prop("duration", "number", "通知保留时间，毫秒。"),
    ],
    ["toast 从 sonner 导入；错误、冲突和结果未知仍使用字段错误或 Alert。"],
  ),
  order: 30,
};
