import { ui } from "../../model";

export default {
  ...ui(
    "breadcrumb",
    "Breadcrumb 面包屑",
    "表达对象的真实页面层级，避免重复返回导航。",
    "Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage",
    '<Breadcrumb><BreadcrumbList>\n  <BreadcrumbItem><BreadcrumbLink href="#/introduction">文档</BreadcrumbLink></BreadcrumbItem>\n  <BreadcrumbSeparator />\n  <BreadcrumbItem><BreadcrumbPage>组件</BreadcrumbPage></BreadcrumbItem>\n</BreadcrumbList>',
  ),
  order: 22,
};
