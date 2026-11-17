import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Menu,
  ChevronRight,
  Layers,
} from "lucide-react";
import { Button } from "../../../../src/ui/button";
import { Badge } from "../../../../src/ui/badge";
import { TooltipProvider } from "../../../../src/ui/tooltip";
import { Toaster } from "../../../../src/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../../src/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "../../../../src/ui/drawer";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../../../src/ui/command";
import {
  pages,
  groups,
  sections,
  componentPages,
  chatPages,
  type DocPage,
} from "./catalog";
import { ApiTable, CodeBlock, Preview, SourceView } from "./parts";
const Guide = lazy(() => import("./guide"));
const readRoute = () => {
  const [id = "introduction", query = ""] = location.hash
    .replace(/^#\/?/, "")
    .split("?");
  return {
    id: id || "introduction",
    section: new URLSearchParams(query).get("section"),
  };
};
const guideSections = (page: DocPage) =>
  page.id === "principles"
    ? ["overview", "guidelines"]
    : page.id === "installation"
      ? ["overview", "usage", "guidelines"]
      : page.id === "foundations/typography" ||
          page.id === "foundations/spacing"
        ? ["overview", "api", "guidelines"]
        : page.id === "foundations/colors"
          ? ["overview", "usage", "guidelines", "source"]
          : ["overview", "usage", "guidelines"];
function Nav({ id, onNavigate }: { id: string; onNavigate?: () => void }) {
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    nav.current
      ?.querySelector<HTMLElement>('[aria-current="page"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [id]);
  return (
    <nav ref={nav} aria-label="文档目录" className="docs-nav-list">
      {groups.map((group) => (
        <div key={group} className="docs-nav-group">
          <div className="docs-nav-group-label">
            {group}
            <span>{pages.filter((p) => p.group === group).length}</span>
          </div>
          {pages
            .filter((p) => p.group === group)
            .map((p) => (
              <a
                key={p.id}
                href={`#/${p.id}`}
                aria-current={p.id === id ? "page" : undefined}
                onClick={onNavigate}
                className="docs-nav-link"
              >
                {p.title === "Hutian Design" ? "介绍" : p.title}
              </a>
            ))}
        </div>
      ))}
    </nav>
  );
}
export default function DocsApp() {
  const [route, setRoute] = useState(readRoute);
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const previous = useRef(route.id);
  useEffect(() => {
    const listener = () => setRoute(readRoute());
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, []);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((v) => !v);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  const page = pages.find((p) => p.id === route.id);
  const index = pages.findIndex((p) => p.id === route.id);
  useEffect(() => {
    document.title = `${page?.title || "页面不存在"} · Hutian Design`;
    if (previous.current !== route.id) {
      window.scrollTo(0, 0);
      heading.current?.focus({ preventScroll: true });
      previous.current = route.id;
    }
    if (route.section) {
      requestAnimationFrame(() =>
        document
          .getElementById(route.section!)
          ?.scrollIntoView({ behavior: "auto", block: "start" }),
      );
    }
  }, [route.id, route.section, page?.title]);
  const toc = page
    ? page.group === "基础组件" || page.group === "Chat UI"
      ? sections
      : sections.filter((s) => guideSections(page).includes(s.id))
    : [];
  const navigate = (id: string) => {
    location.hash = `/${id}`;
    setSearch(false);
    setMobile(false);
  };
  return (
    <TooltipProvider>
      <a
        href="#main-content"
        className="docs-skip"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        跳转到文档正文
      </a>
      <header className="docs-header">
        <div className="docs-header-inner">
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="打开文档目录"
            className="docs-mobile-button"
            onClick={() => setMobile(true)}
          >
            <Menu />
          </Button>
          <a className="docs-brand" href="#/introduction">
            <span className="docs-brand-mark">
              <img
                src={`${import.meta.env.BASE_URL}brand/hutian-mark.png`}
                width="26"
                height="26"
                alt=""
              />
            </span>
            <span>
              hutian<span className="font-normal text-faint"> / </span>design
            </span>
          </a>
          <nav className="docs-top-nav" aria-label="主导航">
            <a
              href="#/introduction"
              aria-current={
                page?.group === "开始使用" || page?.group === "设计基础"
                  ? "page"
                  : undefined
              }
            >
              文档
            </a>
            <a
              href="#/components/button"
              aria-current={page?.group === "基础组件" ? "page" : undefined}
            >
              组件
            </a>
            <a
              href="#/chat/thread"
              aria-current={page?.group === "Chat UI" ? "page" : undefined}
            >
              Chat UI
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="outline"
              className="docs-search-trigger"
              onClick={() => setSearch(true)}
            >
              <Search className="size-4" />
              <span>搜索文档…</span>
              <kbd>⌘ K</kbd>
            </Button>
            <Badge variant="outline" className="docs-version">
              v0.1.0
            </Badge>
          </div>
        </div>
      </header>
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <Nav id={route.id} />
          <div className="docs-sidebar-footer">
            <span className="docs-status-dot" />
            开源设计系统
          </div>
        </aside>
        <main id="main-content" tabIndex={-1} className="docs-main">
          <div className="docs-main-inner">
            {!page ? (
              <>
                <h1 ref={heading} tabIndex={-1}>
                  没有找到这个文档
                </h1>
                <p>可以从目录选择组件，或搜索现有文档。</p>
                <Button onClick={() => setSearch(true)}>搜索文档</Button>
              </>
            ) : (
              <>
                <div className="docs-breadcrumb">
                  <a href="#/introduction">文档</a>
                  <ChevronRight className="size-3" />
                  <span>{page.group}</span>
                </div>
                <div className="docs-page-header">
                  <h1 ref={heading} tabIndex={-1}>
                    {page.title}
                  </h1>
                  <p className="docs-page-description">{page.description}</p>
                  {page.source && (
                    <div className="docs-page-meta">
                      <Badge variant="outline">
                        {page.group === "Chat UI" ? "Chat UI" : "组件"}
                      </Badge>
                      <span className="font-mono">{page.source}</span>
                    </div>
                  )}
                </div>
                <article className="docs-article" key={page.id}>
                  {page.group === "开始使用" || page.group === "设计基础" ? (
                    <Suspense fallback={<p>正在读取文档…</p>}>
                      <Guide page={page} />
                    </Suspense>
                  ) : (
                    <>
                      <section
                        id="overview"
                        className="docs-component-overview"
                      >
                        <p>
                          下方预览使用当前本地组件。查看代码可以复制最小用法，实际数据与动作由调用方提供。
                        </p>
                      </section>
                      <section id="preview">
                        <Preview page={page} />
                      </section>
                      <section id="usage">
                        <h2>使用方法</h2>
                        <CodeBlock code={page.code || ""} />
                        {page.group === "Chat UI" && (
                          <p>
                            需要消息、Composer 或滚动上下文的组件放在{" "}
                            <code>AssistantRuntimeProvider</code>{" "}
                            内。数据映射与授权动作保留在消费应用。
                          </p>
                        )}
                      </section>
                      {page.props && (
                        <section id="api">
                          <h2>常用属性</h2>
                          <ApiTable rows={page.props} />
                        </section>
                      )}
                      <section id="guidelines">
                        <h2>交互约定</h2>
                        <ul>
                          {(page.notes?.length
                            ? page.notes
                            : [
                                "沿用共享语义颜色、字体与密度，不在页面重造同类基础控件。",
                                "状态有明确文字，键盘焦点可见；受控数据与业务结果由调用方提供。",
                              ]
                          ).map((n) => (
                            <li key={n}>{n}</li>
                          ))}
                        </ul>
                      </section>
                    </>
                  )}
                  {page.source && (
                    <section id="source">
                      <h2>组件源码</h2>
                      <p>
                        按需读取当前设计项目的实际源码，便于确认完整接口与修改归属。
                      </p>
                      <SourceView path={page.source} />
                    </section>
                  )}
                </article>
                <footer className="docs-page-footer">
                  <div className="docs-pagination">
                    {index > 0 ? (
                      <a href={`#/${pages[index - 1].id}`}>
                        <span>
                          <ArrowLeft className="size-3" />
                          上一篇
                        </span>
                        <strong>{pages[index - 1].title}</strong>
                      </a>
                    ) : (
                      <span />
                    )}
                    {index < pages.length - 1 && (
                      <a
                        href={`#/${pages[index + 1].id}`}
                        className="text-right"
                      >
                        <span className="justify-end">
                          下一篇
                          <ArrowRight className="size-3" />
                        </span>
                        <strong>{pages[index + 1].title}</strong>
                      </a>
                    )}
                  </div>
                  <div className="docs-footer-note">
                    <span>Hutian Design · 统一的视觉与交互</span>
                    <span>MIT · 开源项目</span>
                  </div>
                </footer>
              </>
            )}
          </div>
        </main>
        <aside className="docs-toc">
          <p>本页目录</p>
          <nav aria-label="本页目录">
            {toc.map((s) => (
              <a key={s.id} href={`#/${route.id}?section=${s.id}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="docs-toc-note">
            <span>{componentPages.length} 个基础组件</span>
            <span>{chatPages.length} 篇 Chat UI 文档</span>
            <span>预览使用示例数据</span>
          </div>
        </aside>
      </div>
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent
          className="docs-search-dialog p-0"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">搜索设计系统文档</DialogTitle>
          <DialogDescription className="sr-only">
            按组件名称、中文用途搜索，使用方向键选择，Enter 打开。
          </DialogDescription>
          <Command>
            <CommandInput
              placeholder="搜索组件、规范或 Chat UI…"
              aria-label="搜索文档"
            />
            <CommandList className="max-h-[60dvh]">
              <CommandEmpty>
                没有匹配的文档。试试“按钮”“工具”或“颜色”。
              </CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group} heading={group}>
                  {pages
                    .filter((p) => p.group === group)
                    .map((p) => (
                      <CommandItem
                        key={p.id}
                        value={`${p.title} ${p.subtitle} ${p.description}`}
                        onSelect={() => navigate(p.id)}
                      >
                        <span className="flex-1">{p.title}</span>
                        <ChevronRight className="size-3 text-faint" />
                      </CommandItem>
                    ))}
                </CommandGroup>
              ))}
            </CommandList>
            <div className="docs-search-footer">
              <span>↑ ↓ 选择</span>
              <span>↵ 打开</span>
              <span>Esc 关闭</span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
      <Drawer open={mobile} onOpenChange={setMobile} direction="left">
        <DrawerContent className="h-full w-[min(320px,88vw)] rounded-none">
          <DrawerTitle className="px-5 pt-5 text-base font-semibold">
            文档目录
          </DrawerTitle>
          <DrawerDescription className="px-5 pb-3 text-xs">
            Hutian Design
          </DrawerDescription>
          <div className="overflow-y-auto px-4 pb-8">
            <Nav id={route.id} onNavigate={() => setMobile(false)} />
          </div>
        </DrawerContent>
      </Drawer>
      <Toaster />
    </TooltipProvider>
  );
}
