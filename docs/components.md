# 组件选型与交互

从原 Hutian DESIGN.md 迁入，保留既有选型。本文件中的 Core / Docs Hub 为原产品语境；本项目只实现 UI，不读取业务 API、鉴权或扩展未实现能力。当前实现目录为 src/ui、src/assistant-ui、src/beautiful-ui。

## 6. 组件规则

### 6.0 组件来源顺序

整个项目拒绝在业务页面中手搓已有通用控件。实现顺序固定为：

1. 先按本节固定组件矩阵选型；聊天内容展示与交互组合优先检索并直接采用 Beautiful UI registry 源码，缺项再用 assistant-ui
   和 shadcn/ui 补足；消息、Composer、流式状态接入与滚动仍复用 assistant-ui。其他工作面使用 shadcn/ui registry primitive，只有 Stepper 与
   FileUpload 使用已经裁决的 Dice UI Radix registry；
2. 组件矩阵尚未覆盖且官方 primitive 不足以形成成熟组合时，检索已配置的 Shadcnblocks registry；只按明确 item 使用
   shadcn CLI 引入源码，
   并逐项检查依赖、可访问性、响应式、许可和与本文件的适配，不整页照搬默认主题；
3. 再检查 Docs Hub `3.hutian/9.maintainers/13.reference/` 中的组件参考和其他已批准候选；
4. 以上来源都没有合适组件时，探索期可以先用页面局部、可删除的产品组合验证需求；只有要新增跨页面通用 primitive 或更新
   组件矩阵时，才向 Owner 说明缺口、为什么现有组件不适配以及拟议的最小自定义边界，确认后再沉淀。

Shadcnblocks registry 可以写入 `components.json`，但账号或 Pro API key 只能从环境变量读取，不能提交明文。引入付费组件前
必须确认当前 Standard/Team 许可、协作者范围与仓库分发方式允许使用；不满足许可时只能参考交互机制，不能复制源码或衍生组件。

产品组合组件可以把 primitive 组织成成员目录、工作台、诊断面板等领域界面，但不得重新实现 Button、Input、
Select、Dialog、Sheet、Table、Tabs、Tooltip、Slider 等基础交互。原生 HTML 只用于语义结构，不能为了省略组件检索而
替代已存在的可访问 primitive。

### 6.0.1 固定组件选型

后续页面按下表实现，不再逐页重新猜库。`已持有`、`按需引入` 和 `专项依赖` 的当前清单由 Docs Hub 当前状态维护；
本表只拥有目标选择和组合边界。

| 任务 | 固定组件/组合 |
| --- | --- |
| 应用壳 | shadcn/ui `Sidebar + ScrollArea + Tooltip + Button`；窄屏使用 `Drawer` |
| 上下文与对象菜单 | shadcn/ui `DropdownMenu`；所有 Item 位于 `DropdownMenuGroup` |
| 路由层级与对象分区 | shadcn/ui `Breadcrumb + Tabs`；筛选使用 `ToggleGroup`，不使用 Tabs |
| 小型创建、详情侧栏、危险确认 | shadcn/ui `Dialog`、`Sheet`、`AlertDialog`；都必须有 Title |
| 轻量说明、日期与搜索选择 | shadcn/ui `Tooltip`、`Popover + Calendar`、`Popover + Command` |
| 表单结构 | shadcn/ui `FieldGroup + Field`；相关选项使用 `FieldSet + FieldLegend` |
| 文本和输入内动作 | shadcn/ui `Input`、`Textarea`、`InputGroup + InputGroupAddon` |
| 知识正文编辑 | Tiptap 3 开源编辑器及 Markdown、普通表格、列表扩展；工具栏组合现有 shadcn/ui primitive，源码模式使用 Textarea |
| 固定单选 | shadcn/ui `Select + SelectGroup`；只有极简无搜索表单才使用 `NativeSelect` |
| 搜索单选和多选 | 默认 `Popover + Command`；独立 `Combobox` 必须先用 CLI 验证当前 Radix 产物 |
| 布尔、互斥、多选和范围 | shadcn/ui `Switch`、`RadioGroup`、`Checkbox`、`ToggleGroup`、`Slider` |
| 普通与异步动作 | shadcn/ui `Button`；loading 组合为 `Spinner + disabled`，不存在自造 `isLoading` prop |
| 短反馈、区域错误和全局降级 | shadcn/ui `Sonner`、`Alert`；Banner 是页面级持久 Alert 组合 |
| Loading、空态和长任务 | shadcn/ui `Skeleton`、`Spinner`、`Empty`、`Progress`，长任务另有可恢复 Log/Run 工作面 |
| 目录和复杂表格 | 小目录用 `Item/Table`；复杂表使用 shadcn 官方 Data Table 组合、`@tanstack/react-table` 与 `Pagination` |
| 摘要、状态和分隔 | shadcn/ui `Card`、`Badge`、`Avatar`、`Separator`，不得手写同类视觉 primitive |
| 折叠和分栏 | shadcn/ui `Collapsible`、`Accordion`、`Resizable` |
| 分步配置 | Dice UI Radix `@diceui/stepper` + shadcn/ui `Field`/`Button` |
| 通用文件上传 | Dice UI Radix `@diceui/file-upload` + shadcn/ui `Button`/`Progress`/`Alert` |
| 会话 | assistant-ui `ThreadList`、`Thread`、`Message`、`Composer`、`ActionBar`、`Attachment`、`Error`、`Suggestion` |
| 聊天内容与 Agent 过程 | Beautiful UI `ThinkingState`、`ToolChips`、`ContextCards` 源码优先；过程读取真实 Provider/AG-UI 事件，引用读取 Core 已确认片段 |
| Beautiful UI 未覆盖的聊天能力 | assistant-ui Tool UI/Tool fallback、Reasoning 与 data part；shadcn/ui/Radix 补足基础控件与可访问行为 |
| 指标图 | shadcn/ui `Chart`，底层 Recharts；必须同时提供文字摘要或数据表 |
| 执行拓扑 | `@xyflow/react`，封装为 hutian 产品组合；拖拽只改变本地阅读布局 |
| Trace Tree、Waterfall、Timeline | 稳定实现用 shadcn/ui `Table/Collapsible/Resizable/ScrollArea` 产品组合；`@assistant-ui/react-o11y` 只做 adapter 后的实验 Spike |
| Logs | Data Table 组合 + `ScrollArea + Badge + Input/Combobox`；实时 tail 必须可暂停 |
| JSON 与 Prompt | 短只读内容用 `ScrollArea + pre/code + Button`；可写结构化内容仍先使用现有表单和字段校验 |
| 代码审查与 Diff | 多文件只读审查使用 `@git-diff-view/react`，外层组合 shadcn/ui `Resizable + ScrollArea + Select + ToggleGroup + Button`；MVP 不引入 Monaco |

Dice UI 的 Stepper 与 FileUpload 采用 MIT 源码 registry primitive；Shadcnblocks 对应示例只用于检索和组合参考。若示例仍使用
旧 `Form` API、带入额外主题或违反本文件，直接组合底层 primitive，不复制示例页面。`@assistant-ui/react-o11y` 当前由官方
标记为 experimental：Spike 通过编译、状态映射、大数据量、键盘和降级验收前，不得替换稳定诊断组合，也不得让实验类型
进入 Core Contract 或业务组件。

`@xyflow/react` 与 Recharts 在固定 VoltAgent 仓库的网站或示例中有源码依赖证据，但不能据此声称 VoltOps 私有
Console 使用了相同实现。代码审查改用 MIT 许可的 `@git-diff-view/react`，因为当前需求是服务端权威 patch 的轻量只读
展示，而不是浏览器内完整代码编辑器。以上组件只拥有交互与渲染，不拥有 Graph、Trace、版本、文件、审查状态或执行终态。

`ContextMenu`、`Menubar`、`NavigationMenu`、`Carousel` 与 `HoverCard` 不属于默认工作站词汇。assistant-ui 的
`BranchPicker`、已发送消息 `Edit` 和成功消息 `Reload` 不用于不可变 Core Message。任何替换固定组件的决定都必须先更新本表
和 Docs Hub 参考页，再进入页面实现。

### 6.0.2 Beautiful UI 聊天组合（2026-09-20 / 2026-09-22）

Owner 裁决采用“Beautiful UI 优先完善聊天交互，assistant-ui 与 shadcn/ui 补足缺项”的顺序。
优先直接引入并本地持有可用源码，不默认只看外观后自行重写。ThinkingState/ToolChips 固定来源为
`beautiful-ui@ff0f74d62d8be9d89bcb735b3632e31a6ccf88dc`，ContextCards 固定来源为
`beautiful-ui@c99a3586cf4fc093091feb47d3c066da1fb2e342`；各组件的许可与来源证据见 Docs Hub 固定参考中的 Beautiful UI 条目。

- 第一批采用 ThinkingState 与 ToolChips：保留紧凑过程入口、纵向步骤层级、图标/动作/内容 chip 与内联展开详情；
  当前统一过程默认收起、执行结束后收起，正文和成员身份仍由既有 Thread/Message 呈现。
- assistant-ui 继续提供消息与 part context、Core/AG-UI observer、Composer、滚动锚点和展开时的滚动保护；
  Beautiful UI 不另建会话存储、消息生命周期或执行状态机。未覆盖的工具类型继续使用 ToolFallback。
- 上游演示定时器、模拟步骤、默认完成耗时、示例数据和无效操作必须移除，状态/数量/耗时只来自现有 Core/AG-UI 映射；
  失败和结果未确认始终带文字，不能从动画结束推导成功。
- 本地源码位于 `components/beautiful-ui/`，保留 MIT 声明、固定 SHA 和适配说明；通过 shadcn CLI 引入。
  上游 token 映射到本文件的现有语义颜色、密度与圆角，不导入其全局 foundation 来覆盖工作站主题。
- 沿用源组件的结构与交互组合，Button、Badge、Collapsible 等能力由现有 shadcn/ui/Radix 补足，折叠隐藏内容不保留可聚焦操作。
  长命令/输出必须可完整展开读取，不能用截断摘要代替详情；滚动与动效遵守 §7–9。
- ContextCards 保留标题、片段和来源操作的卡片层级，实际数据由已通过 Contract 的 KnowledgeCitations 提供；
  移除原 CHUNKS、固定数量和延时显现，Button/Card/Badge/Collapsible/Sheet 继续使用本地 shadcn/ui/Radix。
  聊天调用方复用 assistant-ui 滚动保护，卡片只改变阅读层级，不拥有引用身份、DocumentVersion 或读取权限。
- Task Rows、Approval Card、Recommendation Card 等是后续同顺序选型的对象，只有真实数据和动作已具备时才接入；
  采用优先级不等于这些能力已实现，也不授权添加新 Core 契约或伪造审批、任务与置信度。

### 6.1 页面标题

页面标题区说明该页面回答什么问题。右侧只保留一个主操作和必要的关键计数。不要在标题区堆多个同等级按钮。

### 6.2 按钮

主要按钮使用 Accent 背景和 On Accent 文字；次要按钮使用 Surface/Raised 与 Line 边线；危险按钮使用 Danger；
Ghost/Icon 只承载行级菜单、复制、折叠、缩放和关闭。每个工作面最多一个视觉主按钮，文案使用“创建成员”“保存版本”
“部署”等动词与对象，不使用无上下文的“确定”。

- 所有按钮必须覆盖 default、hover、focus、pressed、loading 与 disabled；hover 不位移，禁用仍保留轮廓；
- 异步动作点击后立即显示进行中，非幂等请求完成前禁用重复提交；文字变化不能造成布局跳动；
- 图标按钮必须有 accessible name 和 Tooltip；Tooltip 不能代替错误、权限或操作结果；
- 可点击行中的按钮/菜单保持独立焦点并阻止误触发行导航；
- 删除、撤销凭证、取消运行等动作必须进入 AlertDialog；沟通 Composer 的停止使用上述已裁决的直接操作例外。提交后先进入 canceling/deleting，再等待服务端终态。

### 6.3 面板与卡片

- 面板用于真实分组或连续工作区，不把每段文字装进卡片；
- 默认 8px 圆角、1px Line、无阴影；
- 嵌套层级优先用标题分隔、背景明度和留白；
- 只有主业务对象需要完整 Card，纯元数据使用行或 definition list。

### 6.4 表格与目录

目录型页面优先使用列表或 Table，而不是同尺寸大卡片网格。成员列表至少包含：

- 成员身份；
- 状态；
- 主职业；
- 来自职业的说明摘要或当前工作；
- 当前版本；
- 固定位置的行级操作。

搜索与状态筛选放在表头上方同一工具带。表头低强调，行 hover 使用 Surface Active；当前选择可以使用轻微背景，
不得用高亮白框。空状态说明为什么为空、下一步做什么、从哪里开始。

### 6.5 状态

状态必须同时显示文字，不只依赖颜色：

- 正常、完成、已验收：Accent；
- 排队、等待、待审阅、版本冲突：Warning；
- 失败、阻塞、拒绝：Danger；
- 暂停、取消、归档：Muted。

### 6.6 表单

- 输入区使用 Surface 或 Surface Raised 与 1px Line；
- focus 使用 Accent 边线/ring；
- label 常驻并描述业务含义，占位文案只给例子，不能替代 label；必填、可选、格式和单位明确；
- 版本化对象保存时明确说明“追加新版本”；
- CAS 冲突保留输入，提供重新载入；
- 服务端字段错误与输入建立语义关联，并聚焦第一个错误；表单顶部可以补充错误摘要；
- JSON、Cron、Prompt、代码和 Headers 使用专用编辑区，提供格式化、复制、语法校验和错误行；Secret 默认隐藏且不回显；
- Preview 使用当前草稿并明确“未保存”；Test Connection/Run Test 的结果留在表单附近，显示成功、失败、耗时和下一步；
- 简单创建使用单页表单；存在 Credential、Target、测试或跨步骤依赖时直接对齐 VoltOps Stepper：选择类型/来源 →
  配置 → 测试/预览 → Review → 创建。返回上一步保留输入，不能跳过依赖；
- World 工作区默认不暴露原始 JSON、SQL、堆栈或 Provider 错误；平台工程工作区允许展示，但必须脱敏并提供复制。

### 6.7 操作反馈与通知

- 保存、复制、创建等已由服务端确认且不要求继续处理的短暂结果，使用 shadcn/ui Sonner toast；默认位于顶部居中，
  标题直接说明结果，description 补充对象、关键值或最新 revision，不在表单中长期占用一整行成功 Alert；
- 成功 toast 使用 Accent 状态图标与清晰边界，不把整块通知涂成高饱和品牌色；普通“内容没有变化”使用中性 toast，
  不冒充新版本已创建；默认约 4 秒自动消失，可悬停暂停并可由键盘关闭；
- 表单校验、CAS 冲突、网络结果未知和其他需要用户修复或重试的问题继续使用字段级错误或就地 Alert，不能只用会自动消失的
  toast；危险操作确认使用 AlertDialog，不用 toast 代替确认；
- 异步按钮先明确显示进行中并禁用重复提交，只有读取服务端成功响应后才能展示成功 toast。toast 是交互反馈，不能成为业务
  终态、外部副作用或 revision 的第二事实源。

反馈层级固定为：字段可修复问题用 inline error；当前区域冲突、测试失败和结果未知用 Alert；连接断开、Demo、配额与
全局降级用持久 Banner；上传、导入、Eval、Deploy 和 Run 用可恢复的 Progress/Log 工作面。部分成功必须列出成功、跳过、
冲突与失败数量，并提供查看详情或只重试失败项。动态紧急错误用 `role=alert`，普通结果用 `role=status`。

### 6.8 浮层与持续编辑

浮层类型直接对齐 VoltOps 的任务分工：

- Tooltip：图标名称、缩写和短提示；
- Popover：日期、过滤、轻量预览、Combobox；
- DropdownMenu：上下文切换和对象低频命令；
- Sheet/Drawer：保留目录上下文的详情、Source/Target 配置、技术证据和窄屏导航；
- Dialog：1–4 个一次性字段、导入预检、连接引导和居中 JSON/代码查看；
- AlertDialog：删除、撤销、取消和其他危险确认。

既有对象的持续设置优先放详情页；超过一屏的 Sheet/Dialog 固定标题和操作区，中部独立滚动。所有模态使用正确
`role`、标题、描述、遮罩、focus trap 与 Escape；关闭后焦点回触发器。背景不可命中。有 dirty 输入时关闭前确认。
公开 VoltOps Demo 的 JSON Modal 缺少标准 Dialog 语义且背景仍可命中，这是实测缺陷，不得复制。

### 6.9 Tabs 与导航

- 一级 Tabs 表达同一对象的稳定业务分区，采用底部 Accent 指示线，不做成胶囊按钮；
- 左侧二级 Tabs 表达当前业务分区内互斥的聚焦视图，选中态使用 `Surface Active` 与 Accent 左侧信号线；
- 嵌套 Tabs 的方向与指示线只取当前 tablist，不能由外层纵向导航影响内层横向编辑/预览；
- 状态筛选不是内容 Tabs，必须使用 shadcn/ui `ToggleGroup` 或经 registry 组合的分段控件；
- Tab 标签必须对应真实内容或 Owner 明确批准的“尚未接入”占位；占位必须说明缺失的权威所有者，不得伪造配置能力。

Tabs 只表达同一对象的互斥视图，激活状态要可见并写入 URL 时应支持刷新恢复。点击导航和 Tab 必须产生真实路由
或内容变化；不可用项要禁用或说明，不能留下无响应的伪按钮。

状态筛选不是内容 Tabs，优先使用 shadcn/ui ToggleGroup 等分段控件。分段控件必须有完整的低对比外框与统一底色；
选中段使用 `Signal Soft + Accent` 文字，未选中段使用 Muted 文字，不能表现为三段悬空文本或接近纯黑的孤立色块。

URL 必须保存可分享的对象、Tab、搜索、筛选、排序、分页、时间范围和选中执行；刷新、后退和从详情返回时恢复。
临时展开、Drawer 开关、hover 和 Graph 坐标通常留在本地。离开 dirty 表单前提示放弃或继续编辑。

### 6.10 Dropdown、Select、Combobox 与多选

- 少量固定命令使用 DropdownMenu；单选字段使用 Select；可搜索/远程数据使用 Combobox；多选使用带 checkbox 的
  Combobox/Command；
- 菜单与触发器对齐并限制在视口内；当前项同时显示 check 与文字；
- 支持 `ArrowUp/Down`、`Home/End`、`Enter/Space` 与 `Escape`，关闭后焦点回到触发器；
- 异步选项必须有 loading、empty、error 与 retry；级联选择在上游变化后清空无效下游值并解释；
- 长 World、成员、Project、版本、时区列表提供搜索；多选触发器显示“已选 n 项”或有限摘要，不能无限堆 chip；
- 三点菜单只放 Duplicate、Promote、Archive、Export 等低频对象动作；危险项分组并使用 Danger。

### 6.11 搜索、筛选、排序、分页与批量动作

- 搜索、筛选、时间范围和排序位于列表上方同一工具带；显示结果数、活动筛选与 Clear all；
- 搜索防抖但保留 Enter；请求中保留旧结果并显示局部 loading，不整页闪白；
- “从未有数据”和“当前筛选无结果”使用不同空态，分别给创建入口与清除筛选；
- Table 表头显示排序方向，服务端分页保持稳定排序；总数未知时不伪造总页数；
- 选择行后才出现批量操作条；危险批量操作说明对象数量并二次确认；结果报告成功、跳过和失败分项。

### 6.12 Table、List、Card 与加载状态

- 高密度目录默认 Table/List；Card 用于少量异质对象或指标，不用同尺寸卡片网格代替目录；
- 行先显示名称和主状态，再显示关键上下文与最近活动；行尾操作位置稳定；
- hover、focus、selected 与 checked 是四种独立状态；选中不能只靠 Accent；
- 首次加载用匹配最终结构的 Skeleton；局部刷新保留内容；长任务使用 Progress/Log；不能让一个 spinner 承担全部状态；
- sticky header、列隐藏和内部横向滚动按数据需要启用；操作列不得因正文换行漂移；
- 详情使用对象头 + Tabs + 连续章节；技术元数据使用 definition list、Code 或折叠区。

### 6.13 创建、版本、Diff、提升、归档与删除

Prompt、规则、场景、配置等可版本化对象直接对齐 VoltOps Prompt/Dataset 模式：

1. Create 建立对象与初始版本；
2. Edit/New Version 总是创建新版本并可记录 commit message；
3. Preview 在保存前验证变量或内容，但不冒充已保存版本；
4. Diff 并排显示两个版本，增删同时使用颜色、符号和文字；
5. Promote 把环境/发布标签原子指向一个版本；
6. Duplicate 从历史版本创建新草稿，不改写来源；
7. Archive 后只读并保留历史、Export 和 Restore；
8. Delete 只在领域允许永久删除时出现，必须说明影响并使用 AlertDialog。

列表和详情都展示当前/最新版本、标签与归档状态；从历史版本进入时始终标记只读上下文。

### 6.14 Import、Export、Upload 与文件处理

- Dropzone 支持点击与拖放，显示格式、大小和数量限制，并可键盘访问；
- 写入前先 Preview 文件名、对象数、新增、更新、冲突、跳过与错误；默认不静默覆盖；
- 上传/导入显示单文件和总体进度并允许取消；后台处理在页面刷新后仍可恢复状态；
- 冲突逐项选择跳过、创建新版本或替换领域允许替换的草稿；
- Export 明确范围、格式和版本；大文件生成进入后台任务，完成后提供下载；
- 文档上传区分 uploading、processing、ready、failed；失败项可查看原因并在安全时重试；
- Secret、私聊和受限证据在导出前执行同一可见性与脱敏策略。

### 6.15 长任务与恢复动作

| 状态/动作 | 界面要求 |
| --- | --- |
| queued | 显示等待原因或队列位置；允许时可取消；不伪造开始时间 |
| running | 显示当前步骤、已用时和流式日志；主动作切为停止/取消 |
| waiting | 说明等待谁提供什么；使用继续/批准/提供输入，不显示 Retry |
| completed | 显示结果摘要、耗时与证据；允许比较、复制或新建运行 |
| failed | 定位首个失败步骤并说明外部影响；仅安全时提供 Retry |
| canceled | 保留已完成步骤、取消者和时间；重新开始创建新运行 |
| outcome_unknown | 提供 Reconcile/等待回执；禁止盲目 Retry |
| disconnected | 保留最后确认状态；重连/刷新，不伪造实时进度 |

Retry 创建新执行；Resume 延续原持久 owner；Replay 只重建读视图；Reconcile 追加外部效果对账事实。四种动作不得
混用。TaskExecution 详情只对当前管理员在最新 ActorTurn 为 queued/running 时显示“停止执行”，并以 AlertDialog 二次确认；
提交成功只表示 Core 接受停止请求，页面必须回源等待权威终态。Task 重试、停止、Deliverable 验收和文档沉淀若在传输中断后
结果未知，同一对象与表单内容必须继续复用原幂等键，并明确提示用户是在确认同一次命令。Deliverable 验收 Dialog 必须同时
展示该 Task 的验收标准和交付原始结果，不能要求用户关闭 Dialog 后凭记忆判断。Runtime 长任务按最后确认进度维持服务端租约，不能只用浏览器是否仍在观察判断是否运行：排队不计入启动期限；Runtime 领取后超过 60 秒仍无
Provider `started` 证据时直接失败；开始后连续 10 分钟没有任何确认事件时请求取消，再等待 30 秒仍无终态则停止执行中展示并
进入 `outcome_unknown`。持续产生真实进度的长任务不受绝对总时长限制。Run Test 必须与生产 Run 在环境、样例数据和影响范围上明确区分。

### 6.16 Graph、Timeline、Waterfall、Logs、Code 与 Diff

- Graph 表达拓扑，Timeline 表达事件和历史时刻，Waterfall 表达父子关系与耗时，Logs 表达结构化证据；
- 选择执行、节点或事件时其余视图同步；selected 同时使用位置、边线和文字；
- Zoom in/out、Fit View、Toggle Interactivity、Collapse/Expand 可键盘访问并有 Tooltip；拖拽只改变阅读布局；
- Auto-zoom 可开关，用户手动移动、滚动或聚焦后暂停接管；遵守 reduced motion；
- First/Play/Pause/Last 与事件序号重建历史 snapshot，不重新调用 Agent、Tool 或外部系统；
- Show More/Collapse 暴露 `aria-expanded` 并切换对应文案；JSON、Prompt 与 payload 提供格式化、搜索、复制和脱敏；
- Logs 支持级别、时间、实体、Turn/Trace、全文和结构化字段筛选；实时 tail 可暂停并保留位置；
- Code/Diff 使用 Mono、行号、复制、换行开关与独立滚动；Diff 增删不能只靠红绿。

Conversation 中的代码审查使用一个统一工作面，不按 Codex、DeepSeek Harness、Lobi 分叉：

- 正式 Agent 回复或其 Runtime 活动只在 Core 返回含文件证据的 `CodeChangeSet` 时显示“审查代码/查看代码变更”入口；入口展示增删统计，文件数在面板头展示；
- 桌面点击后，在当前会话右侧增加可调整宽度的审查栏，默认占沟通工作面约 `40%`、最窄 `360px`，左侧会话目录和中间
  Thread 合计保留约 `60%` 并保持可用；用户仍可拖拽调整，审查栏关闭后恢复原双栏，不导航到另一套任务或日志页面；
- 审查栏顶部只保留关闭、整份 Diff 的 `统一/并排`、换行和文件导航；多目录变化先按 Runtime 返回的安全根标签分组，主体
  使用 `@git-diff-view/react` 渲染服务端返回的 patch，文件目录与 Diff 各自滚动，不做逐 hunk 接受、行评论或浏览器内编辑；
- 窄屏使用带 Title 的全屏 Sheet 承载同一审查内容，不把三栏横向压缩成不可读布局；
- “要求修改”通过继续发送一条 Human Message 完成；本轮不建立独立审查状态机，也不把关闭、展开、统一/并排或看过某文件
  写成 Core 业务事实；
- 云端 Web 不显示“打开本机编辑器 / Finder / 终端”等 OS 动作。以后只有 Runtime Host 明确报告可用能力且用户正在该 Host
  上操作时才逐项出现，缺少能力时直接省略；
- `ready` 才渲染完整 Diff；`coverage=partial` 必须在面板持续提示“仅包含 Runtime 已报告的文件变化”；`empty` 仍持久化供
  诊断与审计，但不为普通无改动回复增加入口；`unavailable`、`failed` 或 `truncated` 显示已保存的文件统计和原因，不伪造
  可审查正文。只有 `empty/complete` 可写“确认无修改”，`empty/partial` 只能写“Runtime 未报告文件变化”。

### 6.17 空态、错误、权限与只读

每个模块必须设计首次空态、筛选无结果、首次 loading、局部刷新、失败、权限不足、配额受限、归档只读、连接断开和
部分能力不可用。权限不足时不泄漏无权对象存在性；归档对象保留历史与 Restore/Export；连接断开显示最后更新时间；
没有权威数据时不画零值趋势或假统计。平台工程页面可以显示工程错误与证据，World 页面使用自然语言摘要并提供受控详情。
