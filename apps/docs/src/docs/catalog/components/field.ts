import { ui, prop } from "../../model";

export default {
  ...ui(
    "field",
    "Field 表单结构",
    "组织标签、说明、错误和关联输入，减少页面重复布局。",
    "Field, FieldLabel, FieldDescription, FieldError",
    '<Field>\n  <FieldLabel htmlFor="name">名称</FieldLabel>\n  <Input id="name" />\n  <FieldDescription>用于识别这项内容。</FieldDescription>\n</Field>',
    [
      prop(
        "orientation",
        "vertical | horizontal | responsive",
        "字段内容的布局方向。",
        "vertical",
      ),
      prop("data-invalid", "boolean", "给整个字段表达错误状态。"),
    ],
  ),
  order: 4,
};
