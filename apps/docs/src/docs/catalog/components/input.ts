import { ui, prop } from "../../model";

export default {
  ...ui(
    "input",
    "Input 输入框",
    "单行文本输入，覆盖普通、只读、禁用与错误状态。",
    "Input",
    '<Input aria-label="名称" placeholder="输入名称" />',
    [
      prop(
        "value / onChange",
        "string / ChangeEventHandler",
        "受控输入及变更事件。",
      ),
      prop("aria-invalid", "boolean", "与字段错误共同表达校验结果。"),
      prop("disabled / readOnly", "boolean", "区分暂不可编辑与只读内容。"),
    ],
  ),
  order: 1,
};
