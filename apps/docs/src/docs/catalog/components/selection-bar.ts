import { ui, prop } from "../../model";

export default {
  ...ui(
    "selection-bar",
    "Selection Bar 批量操作栏",
    "以三态全选、选择数量和操作插槽组织列表批量处理。",
    "SelectionBar",
    '<SelectionBar selectedCount={1} totalCount={3} onSelectAll={(selected) => console.log(selected)} onClear={() => console.log("clear")}><Button>标为已处理</Button></SelectionBar>',
    [
      prop(
        "selectedCount / totalCount",
        "number",
        "当前选择数量与当前列表可选数量。",
      ),
      prop(
        "onSelectAll / onClear",
        "callback",
        "由消费方更新选择集合；组件不读取业务数据。",
      ),
      prop("children", "ReactNode", "有选中项时显示的批量操作。"),
      prop("description", "ReactNode", "说明选择范围或操作限制。"),
      prop(
        "disabled",
        "boolean",
        "提交中禁用全选与取消；操作插槽自行传入 disabled。",
      ),
    ],
    ["全选仅作用于明确的当前列表；业务权限、部分失败、撤销由消费方处理。"],
  ),
  order: 26,
};
