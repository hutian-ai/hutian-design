import { ui, prop } from "../../model";

export default {
  ...ui(
    "label",
    "Label 标签",
    "为输入提供始终可见、可以点击的名称。",
    "Label",
    '<Label htmlFor="name">名称</Label>\n<Input id="name" />',
    [prop("htmlFor", "string", "指向真实输入元素的 id。")],
  ),
  order: 3,
};
