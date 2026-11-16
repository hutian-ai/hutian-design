import type { DocPage } from "./model";
export type { DocPage, PropRow } from "./model";
const read = (modules: Record<string, DocPage & { order: number }>) =>
  Object.values(modules).sort((a, b) => a.order - b.order);
export const componentPages = read(
  import.meta.glob<DocPage & { order: number }>("./catalog/components/*.ts", {
    eager: true,
    import: "default",
  }),
);
export const chatPages = read(
  import.meta.glob<DocPage & { order: number }>("./catalog/chat/*.ts", {
    eager: true,
    import: "default",
  }),
);
export const guidePages: DocPage[] = [
  {
    id: "introduction",
    title: "Hutian Design",
    subtitle: "设计系统",
    group: "开始使用",
    description:
      "为持续协作统一视觉与交互。基础组件、聊天阅读与执行呈现，共用一份源码和一套设计约定。",
  },
  {
    id: "installation",
    title: "安装与接入",
    subtitle: "Getting started",
    group: "开始使用",
    description:
      "从本地包开始，将设计系统接入现有 React 应用。当前没有发布 npm 包。",
  },
  {
    id: "principles",
    title: "设计原则",
    subtitle: "Principles",
    group: "开始使用",
    description:
      "紧凑、清晰、可信。用稳定结构支持持续工作，让每个动作和状态都有明确含义。",
  },
  {
    id: "foundations/colors",
    title: "颜色与主题",
    subtitle: "Color",
    group: "设计基础",
    description: "近黑画布、低对比边线与单一绿色强调，颜色表达语义而非装饰。",
    source: "src/styles/index.css",
  },
  {
    id: "foundations/typography",
    title: "字体与排版",
    subtitle: "Typography",
    group: "设计基础",
    description:
      "界面采用中等偏紧凑密度，中文使用系统字体，机器标识与代码使用等宽字体。",
  },
  {
    id: "foundations/spacing",
    title: "间距与布局",
    subtitle: "Layout",
    group: "设计基础",
    description:
      "通过一致的间距、阅读列和内容层级建立秩序，避免为每块内容重复套卡片。",
  },
  {
    id: "foundations/motion",
    title: "状态、动效与可访问性",
    subtitle: "Accessibility",
    group: "设计基础",
    description:
      "动效解释状态变化；状态同时提供文字，键盘与减少动态效果偏好始终有效。",
  },
];
export const pages = [...guidePages, ...componentPages, ...chatPages];
export const groups = ["开始使用", "设计基础", "基础组件", "Chat UI"];
export const sections = [
  { id: "overview", label: "概览" },
  { id: "preview", label: "交互预览" },
  { id: "usage", label: "使用方法" },
  { id: "api", label: "常用属性" },
  { id: "guidelines", label: "交互约定" },
  { id: "source", label: "组件源码" },
];
