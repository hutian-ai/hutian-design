# Hutian Design 开发入口

本项目拥有主题、基础 UI 和 Chat UI。先读 DESIGN.md 的任务索引，再只读目标组件、相关规范与展示场景。不要默认扫描 hutian-world、API、数据库或整个设计规范。

- 基础控件改 src/ui；消息/Composer/附件/滚动改 src/assistant-ui；思考/工具改 src/beautiful-ui；执行过程/审批呈现改 src/chat。
- 业务事件解释、鉴权、API、成员/Runtime 配置留给消费应用。不得导入 @hutian-world/contracts、相邻产品源码或私有配置。
- 保留 assistant-ui、shadcn/Radix、Beautiful UI 和 Dice UI 的既有语义、来源与 notices，不重做底层交互。
- 演示代码和示例数据仅放 apps/docs，不得进入 src。示例必须标明演示，不得调用真实业务 API。
- 用户未要求不新增测试、fixture、框架或 CI；用 pnpm typecheck、pnpm docs:build 和最短浏览器路径验收。
- 修改生产组件后 pnpm build，消费方重建。最新交付保留未提交，不默认 commit、推送、发布或改成公开仓库。

文档站采用按组件拆分的定义：修改文案、用法或属性，读 apps/docs/src/docs/catalog/components/<name>.ts（Chat 对应 catalog/chat/<name>.ts），不要默认加载整个目录。导航/layout 改 docs/app.tsx；交互示例改 ui-demos.tsx / chat-demos.tsx。组件示例直接使用 src 中的真实组件，文档不能另造一份 UI 实现。

本项目现按 MIT 开源维护。README 与文档站使用正式 Pages 地址，不把维护者本机地址当作访问入口。文档部署工作流只负责构建与发布静态站点，不增加测试矩阵；不要默认发布 npm 或其他 Release。
