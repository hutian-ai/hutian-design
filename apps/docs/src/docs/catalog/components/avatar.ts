import { ui, prop } from "../../model";

export default {
  ...ui(
    "avatar",
    "Avatar 头像",
    "辅助识别成员，加载失败时保留名称占位。",
    "Avatar, AvatarImage, AvatarFallback",
    "<Avatar><AvatarFallback>林</AvatarFallback></Avatar>",
    [
      prop("src", "string", "AvatarImage 的图片来源。"),
      prop("delayMs", "number", "AvatarFallback 显示前的等待时间。"),
    ],
  ),
  order: 27,
};
