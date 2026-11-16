import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../../src/ui/table";
import {
  ArrowRight,
  Layers,
  MessageSquare,
  Palette,
  Check,
  CircleAlert,
  Keyboard,
} from "lucide-react";
import { componentPages, chatPages, type DocPage } from "./catalog";
import { Button } from "../../../../src/ui/button";
import { Badge } from "../../../../src/ui/badge";
import { Alert, AlertDescription } from "../../../../src/ui/alert";
import { CodeBlock } from "./parts";
export default function Guide({ page }: { page: DocPage }) {
  switch (page.id) {
    case "introduction":
      return (
        <>
          <div className="docs-intro-note">
            <span className="docs-status-dot" />
            Hutian Design · MIT 开源项目
          </div>
          <section id="overview">
            <h2>从界面到持续协作</h2>
            <p>
              这里集中维护 Hutian
              的主题、基础控件与聊天交互。文档中的预览直接使用组件源码，可以查看状态、操作控件和复制用法。
            </p>
            <div className="docs-entry-grid">
              {[
                {
                  title: "设计基础",
                  desc: "颜色、排版、密度与可访问性。",
                  href: "foundations/colors",
                  icon: Palette,
                  label: "4 篇规范",
                },
                {
                  title: "基础组件",
                  desc: "输入、导航、浮层与反馈。",
                  href: "components/button",
                  icon: Layers,
                  label: `${componentPages.length} 个组件`,
                },
                {
                  title: "Chat UI",
                  desc: "消息、工具、思考、审批与交付。",
                  href: "chat/thread",
                  icon: MessageSquare,
                  label: `${chatPages.length} 篇组件文档`,
                },
              ].map((c) => (
                <a key={c.href} href={`#/${c.href}`} className="docs-entry">
                  <c.icon className="size-5 text-primary" />
                  <span className="mt-5 text-base font-medium">{c.title}</span>
                  <span className="mt-2 text-sm leading-6 text-muted-foreground">
                    {c.desc}
                  </span>
                  <span className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    {c.label}
                    <ArrowRight className="size-4" />
                  </span>
                </a>
              ))}
            </div>
          </section>
          <section id="usage">
            <h2>如何使用这份文档</h2>
            <ol>
              <li>先了解颜色、排版和密度，再按任务选择组件。</li>
              <li>在组件页操作预览，核对普通、加载、禁用和异常状态。</li>
              <li>
                复制用法，从属性说明定位接口；需要修改时按需打开组件源码。
              </li>
              <li>
                涉及 Matrix、Dock、权限或资源数据时，回到 Hutian 应用接入。
              </li>
            </ol>
            <CodeBlock
              code={
                'import { Button } from "@hutian-ai/design/ui/button";\nimport { Thread } from "@hutian-ai/design/assistant-ui/thread.aui";\n\n<Button variant="outline">查看资料</Button>'
              }
            />
          </section>
          <section id="guidelines">
            <h2>组件与业务各自负责什么</h2>
            <div className="docs-table-wrap">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>设计系统</TableHead>
                    <TableHead>消费应用</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>主题、控件、消息阅读与执行呈现</TableCell>
                    <TableCell>成员、会话、资源、权限与业务动作</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>通过 props、slots 和回调接入</TableCell>
                    <TableCell>提供真实数据、原生回执和授权资源</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>维护通用交互与可访问性</TableCell>
                    <TableCell>验证真实后端与跨设备使用路径</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
        </>
      );
    case "installation":
      return (
        <>
          <section id="overview">
            <h2>准备本地项目</h2>
            <p>
              当前包名为 <code>@hutian-ai/design</code>，尚未发布
              npm。将设计项目与消费应用放在同一父目录，先安装并构建设计项目。
            </p>
            <CodeBlock
              language="Shell"
              code={
                "# 在 hutian-design 目录\npnpm install --frozen-lockfile\npnpm build\n\n# 开发本文档站（先停止占用同一端口的持续预览）\npnpm showcase:stop\npnpm dev"
              }
            />
          </section>
          <section id="usage">
            <h2>接入 React 应用</h2>
            <p>
              Hutian Web 的 package.json
              已通过下列相对路径引用本地项目。其他应用按各自目录调整路径。
            </p>
            <CodeBlock
              language="JSON"
              code={
                '{\n  "dependencies": {\n    "@hutian-ai/design": "link:../../../hutian-design"\n  }\n}'
              }
            />
            <h3>导入主题与工具类</h3>
            <p>
              项目使用 Tailwind 4，组件的扫描目录已声明在共享 CSS
              中。应用继续构建自己的页面样式。
            </p>
            <CodeBlock
              language="CSS"
              code={
                '/* 应用 CSS 入口 */\n@import "@hutian-ai/design/styles.css";'
              }
            />
            <h3>共享 React 与 assistant-ui 上下文</h3>
            <CodeBlock
              language="TypeScript"
              code={
                '// Vite resolve 配置\nresolve: {\n  dedupe: [\n    "react", "react-dom",\n    "@assistant-ui/react",\n    "@assistant-ui/react-lexical",\n    "@assistant-ui/react-markdown"\n  ]\n}'
              }
            />
          </section>
          <section id="guidelines">
            <h2>修改与验证</h2>
            <p>
              修改库组件后运行 <code>pnpm build</code>
              ，再重建消费应用。文档站开发直接加载源码并热更新。纯文档调整不需要重新派发原生执行。
            </p>
            <CodeBlock
              language="Shell"
              code={
                "pnpm typecheck\npnpm build:showcase\n\n# macOS 上保持本地文档站运行\npnpm showcase:start\npnpm showcase:status"
              }
            />
            <Alert>
              <AlertDescription>
                文档预览使用示例数据。真实消息、原生审批和资源权限仍在消费应用中验收。
              </AlertDescription>
            </Alert>
          </section>
        </>
      );
    case "principles":
      return (
        <>
          <section id="overview">
            <h2>清晰、紧凑、可信</h2>
            <p>
              Hutian
              面向长时间阅读与持续协作。以稳定网格、字号、明度和薄边线建立层级，让内容和下一步动作容易找到。
            </p>
            <div className="docs-principles">
              {[
                [
                  "秩序优先",
                  "同类对象保持可预测的阅读顺序，用排版与间距组织信息。",
                ],
                [
                  "状态有来源",
                  "组件呈现应用提供的事实；不从动画、文本或等待时间推测成功。",
                ],
                [
                  "单一强调色",
                  "绿色用于主操作、选中、焦点和真实正常状态，避免大面积装饰。",
                ],
                [
                  "组合已有组件",
                  "基础交互由 Radix / shadcn 提供，聊天上下文与滚动由 assistant-ui 承担。",
                ],
              ].map(([t, b], i) => (
                <div key={t}>
                  <span className="text-xs text-faint">0{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{b}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="guidelines">
            <h2>从进入到获得结果</h2>
            <p>
              每条路径都应覆盖进入、输入或选择、提交、等待、必要介入、结果和继续工作。加载、空态、失败、断开与结果未知分别表达，不能用一个
              spinner 代替所有状态。
            </p>
            <ul>
              <li>高频动作明确，低频选项按需展开。</li>
              <li>保存失败保留输入，提交未知保留原操作身份。</li>
              <li>没有真实能力与数据，不预留虚假按钮和统计。</li>
              <li>图标操作有可访问名称，键盘可完成同样动作。</li>
            </ul>
          </section>
        </>
      );
    case "foundations/colors":
      return (
        <>
          <section id="overview">
            <h2>语义颜色</h2>
            <p>
              组件通过语义变量使用颜色。调整主题时修改共享变量，避免在业务页面散落新的色值。
            </p>
            <div className="docs-swatches">
              {[
                ["background", "画布", "#101010"],
                ["card", "内容表面", "#1a1a1a"],
                ["surface-raised", "抬升表面", "#202124"],
                ["surface-active", "活动表面", "#242927"],
                ["border", "默认边线", "#2b2d2f"],
                ["foreground", "正文", "#f2f2f2"],
                ["muted-foreground", "次要正文", "#bdbdbd"],
                ["faint", "元数据", "#818783"],
                ["primary", "强调", "#00d992"],
                ["warning", "等待", "#f2c94c"],
                ["destructive", "失败", "#ef6b67"],
              ].map(([token, label, hex]) => (
                <div key={token} className="docs-swatch">
                  <div style={{ background: hex }} />
                  <strong>{label}</strong>
                  <code>--{token}</code>
                  <span>{hex}</span>
                </div>
              ))}
            </div>
          </section>
          <section id="usage">
            <h2>在组件中使用</h2>
            <CodeBlock
              language="TSX"
              code={
                '<div className="border bg-card text-foreground">\n  <p className="text-muted-foreground">补充说明</p>\n  <Button>主要操作</Button>\n</div>'
              }
            />
          </section>
          <section id="guidelines">
            <h2>颜色使用约定</h2>
            <ul>
              <li>强调色只服务主要操作、焦点、选中与真实运行信号。</li>
              <li>失败、等待、取消等状态始终同时提供文字。</li>
              <li>分层优先使用表面明度差与 1px 边线，不堆重阴影。</li>
              <li>现有主题是暗色工作面；本次没有新建一套浅色主题。</li>
            </ul>
          </section>
        </>
      );
    case "foundations/typography":
      return (
        <>
          <section id="overview">
            <h2>文字层级</h2>
            <div className="docs-type-specimen">
              <p style={{ fontSize: 30, lineHeight: 1.2, fontWeight: 570 }}>
                持续协作，清晰呈现
              </p>
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                区块标题 / Section heading
              </p>
              <p style={{ fontSize: 15, lineHeight: "28px" }}>
                聊天正文 15px /
                28px。让公开说明、正式回答和引用片段保持舒适的阅读节奏。
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.7 }}>
                界面正文 12–14px，适合目录、配置与长时间工作。
              </p>
              <p className="text-xs text-muted-foreground">
                次要说明与辅助状态
              </p>
              <p className="font-mono text-xs text-faint">
                run_20261116 · 版本与机器标识使用等宽字体
              </p>
            </div>
          </section>
          <section id="api">
            <h2>尺寸参考</h2>
            <div className="docs-table-wrap">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>角色</TableHead>
                    <TableHead>尺寸</TableHead>
                    <TableHead>用途</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["页面标题", "25–34px", "页面主题"],
                    ["区块标题", "14–16px", "内容分组"],
                    ["界面正文", "12–14px", "列表、表单与说明"],
                    ["聊天正文", "15px / 28px", "正式回答与公开说明"],
                    ["过程行", "14px / 20px", "工具与思考状态"],
                    ["元数据", "9–10px", "低强调辅助信息"],
                  ].map((r) => (
                    <TableRow key={r[0]}>
                      {r.map((c) => (
                        <TableCell key={c}>{c}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
          <section id="guidelines">
            <h2>阅读约定</h2>
            <p>
              中文正文不使用等宽字体。完整 ID
              按需读取，长链接和命令允许在容器内换行或滚动，不造成页面溢出。
            </p>
          </section>
        </>
      );
    case "foundations/spacing":
      return (
        <>
          <section id="overview">
            <h2>间距节奏</h2>
            <div className="space-y-5 rounded-md border p-6">
              {[4, 8, 12, 18, 24, 32].map((n) => (
                <div key={n} className="flex items-center gap-5">
                  <span className="w-12 text-right font-mono text-xs text-muted-foreground">
                    {n}px
                  </span>
                  <div
                    className="h-3 rounded-sm bg-primary/70"
                    style={{ width: n * 6 }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {n <= 8 ? "组件内部" : n <= 18 ? "相关内容" : "区块分隔"}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section id="api">
            <h2>工作面尺寸</h2>
            <div className="docs-table-wrap">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>元素</TableHead>
                    <TableHead>约定</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["控件高度", "32–40px"],
                    ["面板内容边距", "14–18px"],
                    ["同类内容间距", "10–12px"],
                    ["页面横向留白", "20–42px"],
                    ["聊天阅读列", "52rem 上限"],
                    ["过程图标 / 图文间距", "16px / 8px"],
                    ["常用圆角", "6–8px"],
                  ].map((r) => (
                    <TableRow key={r[0]}>
                      {r.map((c) => (
                        <TableCell key={c}>{c}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
          <section id="guidelines">
            <h2>布局约定</h2>
            <p>
              常规文档使用自然滚动；聊天和并排工作区才使用有界高度与独立滚动。窄屏改为单列，宽表格和代码只在自身容器内滚动。
            </p>
          </section>
        </>
      );
    default:
      return (
        <>
          <section id="overview">
            <h2>让状态可理解</h2>
            <div className="flex flex-wrap gap-3">
              <Badge>已完成</Badge>
              <Badge variant="secondary">等待确认</Badge>
              <Badge variant="destructive">未完成</Badge>
              <Badge variant="outline">已停止</Badge>
            </div>
            <p>
              文字解释状态，颜色辅助识别。结果未知与失败分别表达，提交中不能提前表现为完成。
            </p>
          </section>
          <section id="usage">
            <h2>键盘与焦点</h2>
            <ul>
              <li>用 Tab 在可操作元素间移动，焦点始终可见。</li>
              <li>菜单与选择控件支持方向键、Enter 与 Escape。</li>
              <li>Dialog / Sheet 必须有标题；关闭后焦点回到触发器。</li>
              <li>图标按钮提供 aria-label；Tooltip 只补充简短说明。</li>
            </ul>
          </section>
          <section id="guidelines">
            <h2>克制的动效</h2>
            <p>
              控件 hover/focus 约 120–160ms；面板展开约 160–220ms。遵守
              prefers-reduced-motion，不用动画推断进度，不用装饰性打字机效果模拟真实响应。
            </p>
            <CodeBlock
              language="CSS"
              code={
                "@media (prefers-reduced-motion: reduce) {\n  * {\n    scroll-behavior: auto !important;\n    transition-duration: 0.01ms !important;\n    animation-duration: 0.01ms !important;\n  }\n}"
              }
            />
          </section>
        </>
      );
  }
}
