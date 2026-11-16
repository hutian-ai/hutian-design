# Chat UI

## 责任与入口

- `src/assistant-ui/thread.aui.tsx`：消息流、组件 slots、输入框、发送/停止入口、底部锚点与滚动跟随。
- `src/assistant-ui/thread-list.aui.tsx`：会话列表；列表数据与创建/归档动作由 assistant-ui adapter 提供。
- `src/assistant-ui/markdown-text.tsx`：MarkdownText（消息上下文）与 ActivityMarkdown（独立正文），代码块、复制、链接。
- `src/assistant-ui/elements/attachment.aui.tsx`：附件上传呈现与移除；文件接入由附件 adapter 负责。
- `src/beautiful-ui/`：思考摘要、工具步骤、引用卡片；上游来源和 MIT 声明随源码保留。
- `src/chat/message.tsx`：消息外框、成员身份、用户正文与空等待；消费方通过 children 注入内容和业务动作。
- `src/chat/send-button.tsx`：assistant-ui 输入上下文中的发送/停止按钮；目标执行与停止回调由应用提供。
- `src/chat/execution.tsx`：执行过程布局、折叠、问答/审批、结果提示、成果预览。只收呈现模型和回调。
- `src/chat/types.ts`：ExecutionView、ExecutionProjection、ExecutionControl 等 UI 接口；不导入 Hutian 业务契约。

## 消费契约

消费方负责提供真实消息和 assistant-ui runtime；通过 Thread components/composer slots 注入成员身份、引用、回复对象和业务操作。不要重新实现消息容器、输入框和滚动器。

ChatExecution 接收：

- `activity`：执行状态、权威开始/结束时间、请求、命令回执、输出展示数据。
- `projection`：有顺序和稳定 id 的文本、工具、思考摘要、诊断与差异块。
- `runId`：展开偏好和 DOM 标识；调用方必须按运行隔离。
- `onControl`：带 operationId 的停止或审批回调。返回 ok 仅表示请求提交；组件继续等待 activity 的权威回执。
- `onRetrieveOutputs`：补取原成果回调；普通成功输出不显示恢复动作。
- `outputs[].href/loadPreview`：调用方授权后的下载地址与按需正文读取；UI 不拼业务 URL。
- `renderBody/children`：成员身份与答案插槽；只折叠过程，保留身份和答案。

Hutian 当前在自己的 `chat-execution-projection.tsx` 中解释 Dock/Matrix 事件，在 `chat-execution.tsx` 中提供 API 回调。调整服务协议只改应用；调整外观和通用阅读交互只改本项目。

## 阅读与交互规则

- 输入、等待、公开说明、工具与答案可以在同一轮自然推进。公开文本即时呈现，不通过演示定时器制造流式效果。
- 运行中不加外层“处理中”标题；唯一“工作中”状态在内容末尾。尚无内容时不预挂空头像；多人等待可带目标成员名称。
- 只有 completed 且有答案才默认收起过程。失败、停止、unknown、无答案时保留过程。用户手动偏好优先，按运行保存。
- 结束标题与细分隔位于身份之前；停止显示“已停止”，不把停止提交回执当作已经停止。
- 工具图标常驻、短命令默认可见；详情箭头在末尾。成功状态不常驻，失败和未知明确显示。连续同类命令可分组，详情独立展开。
- 思考状态与正文分开。只有成对原生时间才展示思考耗时，只有非空公开 summary 才有可展开正文，不用整轮耗时代替思考耗时。
- 工具详情按需完整展开；原始输出限制高度、允许滚动，不能挤走正式正文。
- 审批绑定真实请求，选项保留 optionId 与原语义，等待和结果未知分别显示。普通发送不充当批准。
- 最新位置使用 assistant-ui 跟随；上滚时尊重阅读位置；展开过程使用同一滚动保护，不叠加第二套滚动器。
- Markdown 不执行 HTML；外链安全打开。消息不可变，不对成功回复提供编辑、重生成或答案分支。
- 附件、引用、检索材料与原生权限分别由消费方授权；不把候选资料伪装成回答引用。

## 演示与真实验收

`pnpm dev` 打开文档站。场景位于 `apps/docs/src/chat-showcase.tsx`，与生产源码分开。手动选择等待、流式内容、审批、提问、完成、失败、停止与未知状态；输入消息、附加文件、展开工具和思考、查看成果。展示的数据不是模型实际执行。

文档预览验证组件独立可用；Hutian 中另行验证旧消息、发送、执行回执与真实审批，构建或展示页通过不能替代真实链路。
