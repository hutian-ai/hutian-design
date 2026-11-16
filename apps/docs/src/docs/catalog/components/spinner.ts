import { ui } from "../../model";

export default {
  ...ui(
    "spinner",
    "Spinner 活动指示",
    "表示当前确实在进行的操作，与状态文字一同使用。",
    "Spinner",
    '<span role="status"><Spinner />正在保存</span>',
  ),
  order: 32,
};
