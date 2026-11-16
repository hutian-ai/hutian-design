# Hutian Design

通用视觉与聊天组件的唯一实现规范。产品导航、成员配置、权限和原生事件映射由消费应用定义。

## 默认只读相关部分

| 任务 | 读取 | 修改 |
| --- | --- | --- |
| 颜色、字体、密度 | docs/foundations.md | src/styles/index.css |
| 按钮、表单、弹窗、列表 | docs/components.md 对应章节 | src/ui/<component>.tsx |
| 消息、输入、附件、滚动 | docs/chat.md | src/assistant-ui/ |
| 思考、工具、执行过程、审批呈现 | docs/chat.md | src/chat/、src/beautiful-ui/ |
| 查看与演示 | apps/docs/src/docs/app.tsx（文档站）、catalog/（单页定义）、ui-demos.tsx / chat-demos.tsx（示例） | 对应场景文件 |
| Matrix / Dock 事件、API、权限 | 回到 Hutian 应用 | 不在本项目实现 |

## 共同约束

- 延续 VoltAgent/VoltOps 固定基线 `44b4c8e4998ce56095b2f0e4eaf1a988f5e6d0de`：近黑画布、绿色强调、薄边线、紧凑密度；本次分离不改版。
- 颜色与主题变量集中在 `src/styles/index.css`；禁止业务页另造基础控件或第二套主题。
- shadcn/Radix 提供基础交互；assistant-ui 提供消息、Composer 与滚动；Beautiful UI 提供已适配的 ThinkingState、ToolChips、ContextCards。
- 界面状态来自 props / assistant-ui context；UI 不创建业务消息账本、不发起执行、不猜测授权或终态。
- 过程行 14px/20px、图标 16px、间距 8px；正文 15px/28px；正文与输入共享 52rem 阅读列。
- 运行时按顺序展开；“工作中”置于内容尾部；完成且有答案才默认收起过程，身份与答案始终保留。失败、停止、未知保留过程；手动展开优先。
- 无公开思考摘要不显示空展开；无原生思考事件不补造思考；不存储或展示原始思维流。
- 所有状态有文字，图标操作有可访问名称，Dialog 有标题，键盘可操作，遵守 reduced motion。
- `apps/docs` 的数据明确标为演示；演示不会连接 Hutian API 或伪装真实执行结果。生产组件不包含演示计时器或示例数据。

详细规范按上表定向读取，不要求每次加载整个产品仓库或所有设计文档。
