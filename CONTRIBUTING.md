# Contributing

欢迎提交问题、文档改进和组件修复。开始之前，先查阅[在线文档](https://hutian-ai.github.io/hutian-design/)以及现有 Issues 和 Pull Requests。

## 开发

```sh
pnpm install --frozen-lockfile
pnpm dev
```

需要 Node.js >= 22.19 与 pnpm 11.24。组件库和文档站都可以独立开发，不需要业务服务或凭据。

## 修改范围

- 主题与基础样式位于 `src/styles`，基础组件位于 `src/ui`。
- 消息和输入组合位于 `src/assistant-ui`，工具、思考与引用位于 `src/beautiful-ui`，执行呈现位于 `src/chat`。
- 单个文档页位于 `apps/docs/src/docs/catalog`；演示数据只放在文档应用中。
- 设计约定以 `DESIGN.md` 为准。业务接口、授权和原生事件解析由消费应用负责。
- 复用已有 primitive，保留第三方 notices。依赖变更同时更新锁文件。

## 提交 Pull Request

说明要解决的问题、用户可见变化和核对方式。UI 变更可附上关键截图或复现步骤；不要提交凭据、私人数据、构建产物或运行日志。

按改动范围运行必要检查：

```sh
pnpm typecheck
pnpm docs:build
```

新增演示应清楚标为示例，使用真实组件覆盖需要的交互。无需为纯文档改动新增测试框架或测试矩阵。

## 报告问题

在 [Issues](https://github.com/hutian-ai/hutian-design/issues) 中提供组件名称、复现步骤、预期与实际行为，以及相关运行环境。提交前移除私人信息。
