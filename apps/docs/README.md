# Hutian Design 文档站

[在线文档](https://hutian-ai.github.io/hutian-design/)

文档站直接使用本仓库的设计系统组件，包含设计基础、40 个基础组件页面和 12 篇 Chat UI 文档。支持组件搜索、交互预览、代码复制、属性说明与实际源码查看。

## 开发

从仓库根目录执行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

使用开发命令输出的预览入口。该应用是静态前端，不需要业务后端；示例数据不会发起真实 Agent 执行。

## 构建与部署

```sh
pnpm docs:build
pnpm preview
```

构建产物位于 `dist/docs`。GitHub Pages 部署通过 `.github/workflows/docs.yml` 完成，部署时将 `DOCS_BASE` 设为仓库子路径；开发默认使用站点根路径。

## 源码导航

- [导航与页面布局](src/docs/app.tsx)
- [基础组件文档](src/docs/catalog/components)
- [Chat UI 文档](src/docs/catalog/chat)
- [基础组件预览](src/docs/ui-demos.tsx)
- [Chat UI 预览](src/docs/chat-demos.tsx)

单个组件的文档定义单独存放，预览复用生产组件；修改说明不需要读取整份组件目录。
