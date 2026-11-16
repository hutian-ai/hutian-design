# Hutian Design

[文档](https://hutian-ai.github.io/hutian-design/) · [组件](https://hutian-ai.github.io/hutian-design/#/components/button) · [Chat UI](https://hutian-ai.github.io/hutian-design/#/chat/thread) · [参与贡献](CONTRIBUTING.md)

Hutian Design 是面向 Agent 协作应用的开源 React 设计系统。它将主题、基础组件和聊天交互组织在一起，让消息阅读、输入、工具过程与审批使用一致的视觉和行为。

## 包含什么

- **统一主题**：语义颜色、字体、间距、密度、圆角与可访问性约定。
- **40 个基础组件**：按钮、表单、选择、导航、浮层、表格、反馈与布局。
- **Chat UI**：消息、Markdown、Composer、附件、思考摘要、工具过程、引用、执行与审批呈现。
- **交互式文档**：组件预览、使用代码、常用属性、交互约定与按需读取的源码。

基础交互建立在 shadcn/ui 与 Radix UI 上；消息、输入和滚动复用 assistant-ui；思考、工具与引用组合保留 Beautiful UI 的来源与许可。

## 快速开始

需要 Node.js 22.19 或更新版本，以及 pnpm 11.24。

```sh
git clone https://github.com/hutian-ai/hutian-design.git
cd hutian-design
pnpm install --frozen-lockfile
pnpm dev
```

开发服务启动后，使用终端输出的预览入口。正式文档请访问 [hutian-ai.github.io/hutian-design](https://hutian-ai.github.io/hutian-design/)。

## 在应用中使用

包名为 `@hutian-ai/design`。当前通过源码构建使用，尚未发布 npm 包。

```sh
# 在本项目中构建组件与类型声明
pnpm build

# 在消费应用中链接构建后的项目，路径按实际目录调整
pnpm add @hutian-ai/design@link:../hutian-design
```

```tsx
import { Button } from "@hutian-ai/design/ui/button";
import { Thread } from "@hutian-ai/design/assistant-ui/thread.aui";
import { ChatExecution } from "@hutian-ai/design/chat/execution";
```

在应用的 Tailwind CSS 4 入口导入主题：

```css
@import "@hutian-ai/design/styles.css";
```

聊天组件通过应用提供的 assistant-ui runtime、数据和回调工作。业务消息、身份、权限、资源读取和执行协议由消费应用负责。完整接入方式见[文档](https://hutian-ai.github.io/hutian-design/#/installation)与 [Chat UI 契约](docs/chat.md)。

## 项目结构

| 目录 | 内容 |
| --- | --- |
| `src/styles` | 主题与基础样式 |
| `src/ui` | 基础组件 |
| `src/assistant-ui` | 消息、输入、附件与滚动组合 |
| `src/beautiful-ui` | 思考、工具与引用组件 |
| `src/chat` | 消息外框、发送按钮与执行呈现 |
| `apps/docs` | 文档站、单页定义与交互示例 |
| `docs` | 设计规范与接入说明 |

## 开发与构建

```sh
pnpm typecheck
pnpm build
pnpm docs:build
pnpm preview
```

文档站是独立静态前端，不依赖 Hutian Server、Matrix、Dock 或数据库。交互预览使用明确标注的示例数据。推送到 `main` 后，文档由 [GitHub Pages 工作流](.github/workflows/docs.yml)构建和部署。

贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。修改界面时遵守 [DESIGN.md](DESIGN.md)；使用编码助手时可从 [AGENTS.md](AGENTS.md) 按任务定位组件。

## 许可证

[MIT](LICENSE) © Hutian Design contributors。第三方组件保留各自的版权与许可，详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
