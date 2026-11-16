import { Component, lazy, Suspense, useState, type ReactNode } from "react";
import { Check, Copy, ChevronDown, Code2, ExternalLink } from "lucide-react";
import { Button } from "../../../../src/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../src/ui/tabs";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../../../src/ui/collapsible";
import { Skeleton } from "../../../../src/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../../src/ui/table";
import type { DocPage, PropRow } from "./catalog";
const UiDemo = lazy(() => import("./ui-demos"));
const ChatDemo = lazy(() => import("./chat-demos"));
const rawSources = import.meta.glob("../../../../src/**/*.{ts,tsx,css}", {
  query: "?raw",
  import: "default",
});
class PreviewBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div role="alert" className="space-y-2 text-sm text-muted-foreground">
        <p>组件预览暂不可用。</p>
        <p>可以继续阅读使用方法和源码，核对当前组件的参数。</p>
      </div>
    ) : (
      this.props.children
    );
  }
}
export function CodeBlock({
  code,
  language = "TSX",
}: {
  code: string;
  language?: string;
}) {
  const [copy, setCopy] = useState<"idle" | "done" | "failed">("idle");
  return (
    <div className="docs-code">
      <div className="docs-code-header">
        <span>{language}</span>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="复制代码"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopy("done");
            } catch {
              setCopy("failed");
            }
          }}
        >
          {copy === "done" ? <Check /> : <Copy />}
        </Button>
      </div>
      <pre tabIndex={0} aria-label={`${language} 示例代码`}>
        <code>{code}</code>
      </pre>
      {copy !== "idle" && (
        <span
          role="status"
          className={copy === "failed" ? "docs-copy-message" : "sr-only"}
        >
          {copy === "done"
            ? "代码已复制"
            : "无法自动复制，请选择代码手动复制。"}
        </span>
      )}
    </div>
  );
}
export function ApiTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="docs-table-wrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>属性</TableHead>
            <TableHead>类型 / 默认值</TableHead>
            <TableHead>说明</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell>
                <code>{r.name}</code>
              </TableCell>
              <TableCell>
                <code>{r.type}</code>
                <span className="mt-1 block text-xs text-faint">
                  默认：{r.default || "—"}
                </span>
              </TableCell>
              <TableCell>{r.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="docs-table-note">
        列出当前本地实现的常用属性。原生和上游 primitive
        属性继续透传；完整接口可展开组件源码。
      </p>
    </div>
  );
}
export function SourceView({ path }: { path: string }) {
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Collapsible
      onOpenChange={async (open) => {
        if (!open || source || loading) return;
        setLoading(true);
        setError("");
        try {
          const load = rawSources[`../../../../${path}`];
          if (!load) throw new Error();
          setSource(String(await load()));
        } catch {
          setError("源码暂不可读取，请核对本地构建。");
        } finally {
          setLoading(false);
        }
      }}
    >
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2">
            <Code2 className="size-4 shrink-0" />
            <span className="truncate font-mono text-xs">{path}</span>
          </span>
          <ChevronDown className="size-4 shrink-0" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        {loading ? (
          <p role="status" className="text-sm text-muted-foreground">
            正在读取源码…
          </p>
        ) : error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : (
          <CodeBlock
            code={source}
            language={path.endsWith(".css") ? "CSS" : "TSX"}
          />
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
export function Preview({ page }: { page: DocPage }) {
  const chat = page.group === "Chat UI";
  const full =
    chat &&
    [
      "thread",
      "composer",
      "attachments",
      "execution",
      "approval",
      "questions",
      "states",
    ].includes(page.subtitle);
  return (
    <Tabs defaultValue="preview" className="docs-preview">
      <div className="docs-preview-toolbar">
        <TabsList variant="line">
          <TabsTrigger value="preview">预览</TabsTrigger>
          <TabsTrigger value="code">代码</TabsTrigger>
        </TabsList>
        <span className="text-xs text-faint">可交互 · 示例数据</span>
      </div>
      <TabsContent
        value="preview"
        className={full ? "docs-preview-full" : "docs-preview-stage"}
      >
        <PreviewBoundary key={page.id}>
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            {chat ? (
              <ChatDemo id={page.subtitle} />
            ) : (
              <UiDemo id={page.subtitle} />
            )}
          </Suspense>
        </PreviewBoundary>
      </TabsContent>
      <TabsContent value="code" className="docs-preview-code">
        <CodeBlock code={page.code || ""} />
      </TabsContent>
    </Tabs>
  );
}
