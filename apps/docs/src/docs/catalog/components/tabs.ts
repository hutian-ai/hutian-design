import { ui, prop } from "../../model";

export default {
  ...ui(
    "tabs",
    "Tabs 内容导航",
    "切换同一对象的稳定内容分区。筛选条件使用 ToggleGroup。",
    "Tabs, TabsList, TabsTrigger, TabsContent",
    '<Tabs defaultValue="preview">\n  <TabsList variant="line"><TabsTrigger value="preview">预览</TabsTrigger><TabsTrigger value="code">代码</TabsTrigger></TabsList>\n  <TabsContent value="preview">组件预览</TabsContent>\n  <TabsContent value="code">使用代码</TabsContent>\n</Tabs>',
    [
      prop("value / onValueChange", "string / callback", "当前内容分区。"),
      prop(
        "orientation",
        "horizontal | vertical",
        "布局和键盘导航方向。",
        "horizontal",
      ),
      prop("variant", "default | line", "TabsList 样式。", "default"),
    ],
  ),
  order: 21,
};
