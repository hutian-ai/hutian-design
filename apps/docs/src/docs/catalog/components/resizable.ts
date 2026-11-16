import { ui, prop } from "../../model";

export default {
  ...ui(
    "resizable",
    "Resizable 可调分栏",
    "通过拖动或键盘调整连续工作面的阅读比例。",
    "ResizablePanelGroup, ResizablePanel, ResizableHandle",
    '<ResizablePanelGroup orientation="horizontal">\n  <ResizablePanel defaultSize="35%">目录</ResizablePanel>\n  <ResizableHandle withHandle />\n  <ResizablePanel>正文</ResizablePanel>\n</ResizablePanelGroup>',
    [
      prop(
        "orientation",
        "horizontal | vertical",
        "ResizablePanelGroup 的排列方向。",
      ),
      prop("defaultSize", "number | string", "ResizablePanel 初始尺寸。"),
      prop("withHandle", "boolean", "ResizableHandle 显示可见拖动柄。"),
    ],
  ),
  order: 38,
};
