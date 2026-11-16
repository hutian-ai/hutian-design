import { ui, prop } from "../../model";

export default {
  ...ui(
    "drawer",
    "Drawer 抽屉",
    "用于窄屏导航或底部任务面板，沿用 Vaul 的手势能力。",
    "Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription",
    '<Drawer>\n  <DrawerTrigger asChild><Button variant="outline">打开抽屉</Button></DrawerTrigger>\n  <DrawerContent><DrawerHeader><DrawerTitle>任务面板</DrawerTitle>\n    <DrawerDescription>向下拖动或按 Escape 关闭。</DrawerDescription>\n  </DrawerHeader></DrawerContent>\n</Drawer>',
    [
      prop("direction", "top | right | bottom | left", "抽屉展开方向。"),
      prop("open / onOpenChange", "boolean / callback", "受控可见状态。"),
    ],
  ),
  order: 16,
};
