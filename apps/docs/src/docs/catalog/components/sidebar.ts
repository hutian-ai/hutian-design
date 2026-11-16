import { ui, prop } from "../../model";

export default {
  ...ui(
    "sidebar",
    "Sidebar 侧栏",
    "应用级单列导航，具备收起、键盘切换和窄屏入口。",
    "SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton",
    "<SidebarProvider>\n  <Sidebar><SidebarContent><SidebarGroup>\n    <SidebarGroupLabel>工作区</SidebarGroupLabel><SidebarMenu>\n      <SidebarMenuItem><SidebarMenuButton>沟通</SidebarMenuButton></SidebarMenuItem>\n    </SidebarMenu>\n  </SidebarGroup></SidebarContent></Sidebar>\n</SidebarProvider>",
    [
      prop(
        "open / onOpenChange",
        "boolean / callback",
        "SidebarProvider 的桌面展开状态。",
      ),
      prop("collapsible", "offcanvas | icon | none", "Sidebar 收起方式。"),
    ],
  ),
  order: 23,
};
