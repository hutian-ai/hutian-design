import { useState } from "react";
import {
  Check,
  Search,
  Settings,
  FileText,
  MoreHorizontal,
  Plus,
  BookOpen,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../../src/ui/button";
import { Input } from "../../../../src/ui/input";
import { Textarea } from "../../../../src/ui/textarea";
import { Label } from "../../../../src/ui/label";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "../../../../src/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "../../../../src/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../src/ui/select";
import { SelectionBar } from "../../../../src/ui/selection-bar";
import { Checkbox } from "../../../../src/ui/checkbox";
import { Switch } from "../../../../src/ui/switch";
import { Toggle } from "../../../../src/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../../../../src/ui/toggle-group";
import { Calendar } from "../../../../src/ui/calendar";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "../../../../src/ui/file-upload";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../../../src/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../../../src/ui/alert-dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../../../src/ui/sheet";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "../../../../src/ui/drawer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../../src/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../../../src/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../../../src/ui/dropdown-menu";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../../../src/ui/command";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../src/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../../../../src/ui/breadcrumb";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../../../../src/ui/sidebar";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "../../../../src/ui/table";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "../../../../src/ui/item";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../../src/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../src/ui/avatar";
import { Badge } from "../../../../src/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "../../../../src/ui/alert";
import { Skeleton } from "../../../../src/ui/skeleton";
import { Spinner } from "../../../../src/ui/spinner";
import { Progress } from "../../../../src/ui/progress";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "../../../../src/ui/empty";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../../../src/ui/collapsible";
import { Separator } from "../../../../src/ui/separator";
import { ScrollArea } from "../../../../src/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../../../../src/ui/resizable";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import { EventCalendarViews } from "../../../../src/ui/event-calendar-views";

export default function UiDemo({ id }: { id: string }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 16));
  const [files, setFiles] = useState<File[]>([]);
  const [notice, setNotice] = useState("");
  const say = (text: string) => {
    setNotice(text);
  };
  const feedback = notice && (
    <p role="status" className="mt-4 text-xs text-muted-foreground">
      {notice}
    </p>
  );
  switch (id) {
    case "button":
      return (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => say("已点击主要操作（本页演示）")}>
              主要操作
            </Button>
            <Button variant="outline" onClick={() => say("已点击次要操作")}>
              次要操作
            </Button>
            <Button variant="secondary" onClick={() => say("已点击次级操作")}>
              次级
            </Button>
            <Button variant="ghost" onClick={() => say("已点击轻量操作")}>
              轻量
            </Button>
            <Button
              variant="destructive"
              onClick={() => say("已点击危险操作示例")}
            >
              危险操作
            </Button>
            <Button variant="link" asChild>
              <a href="#/installation">了解接入</a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="xs">超小</Button>
            <Button size="sm">小</Button>
            <Button>默认</Button>
            <Button size="lg">大</Button>
            <Button
              size="icon-sm"
              aria-label="添加示例"
              onClick={() => say("添加示例")}
            >
              <Plus />
            </Button>
            <Button disabled>不可用</Button>
            <Button disabled>
              <Spinner />
              保存中
            </Button>
          </div>
          {feedback}
        </div>
      );
    case "input":
      return (
        <div className="grid w-full max-w-sm gap-4">
          <Input
            aria-label="组件示例名称"
            placeholder="输入名称"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Input aria-label="只读示例" value="只读内容" readOnly />
          <Input aria-label="禁用示例" placeholder="当前不可编辑" disabled />
          <Input
            aria-label="错误示例"
            aria-invalid
            placeholder="请补充必填项"
          />
          <p className="text-xs text-muted-foreground">
            当前输入：{value || "尚未输入"}
          </p>
        </div>
      );
    case "textarea":
      return (
        <div className="w-full max-w-md">
          <Label htmlFor="demo-description">补充说明</Label>
          <Textarea
            id="demo-description"
            className="mt-2 min-h-28"
            placeholder="写下你的想法…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {value.length} 个字符
          </p>
        </div>
      );
    case "label":
      return (
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="label-demo">工作名称</Label>
          <Input id="label-demo" placeholder="点击上方标签可聚焦输入" />
        </div>
      );
    case "field":
      return (
        <div className="grid w-full max-w-sm gap-6">
          <Field>
            <FieldLabel htmlFor="field-name">名称</FieldLabel>
            <Input id="field-name" placeholder="设计资料" />
            <FieldDescription>使用便于识别的短名称。</FieldDescription>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="field-email">邮箱</FieldLabel>
            <Input
              id="field-email"
              aria-invalid
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="name@example.com"
            />
            <FieldError>示例：请核对邮箱格式。</FieldError>
          </Field>
        </div>
      );
    case "input-group":
      return (
        <div className="grid w-full max-w-md gap-4">
          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="搜索内容…" aria-label="搜索内容" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput aria-label="网址" placeholder="example.com" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="复制地址"
                onClick={() => say("地址复制操作示例")}
              >
                <Check />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {feedback}
        </div>
      );
    case "select":
      return (
        <div className="w-full max-w-xs">
          <Label>阅读视图</Label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="mt-2" aria-label="阅读视图">
              <SelectValue placeholder="选择一种视图" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list">紧凑列表</SelectItem>
              <SelectItem value="calendar">日历</SelectItem>
              <SelectItem value="timeline" disabled>
                时间线（不可用）
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="mt-3 text-xs text-muted-foreground">
            当前值：{value || "未选择"}
          </p>
        </div>
      );
    case "selection-bar":
      return <SelectionDemo />;
    case "checkbox":
      return (
        <div className="space-y-5">
          <Label className="flex items-center gap-3">
            <Checkbox
              checked={checked}
              onCheckedChange={(v) => setChecked(v === true)}
            />
            接收本页演示提醒
          </Label>
          <Label className="flex items-center gap-3">
            <Checkbox checked="indeterminate" />
            部分选中
          </Label>
          <Label className="flex items-center gap-3 text-muted-foreground">
            <Checkbox disabled />
            当前不可选择
          </Label>
          <p className="text-xs text-muted-foreground">
            {checked ? "已选中" : "未选中"}
          </p>
        </div>
      );
    case "switch":
      return (
        <div className="space-y-5">
          <Label className="flex items-center justify-between gap-10">
            显示补充信息
            <Switch checked={checked} onCheckedChange={setChecked} />
          </Label>
          <Label className="flex items-center justify-between gap-10 text-muted-foreground">
            只读设置
            <Switch checked disabled />
          </Label>
          <p className="text-xs text-muted-foreground">
            {checked ? "补充信息已展开（演示）" : "补充信息已隐藏"}
          </p>
        </div>
      );
    case "toggle":
      return (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Toggle
              variant="outline"
              aria-label="加粗"
              pressed={checked}
              onPressedChange={setChecked}
            >
              <strong>B</strong>
            </Toggle>
            <Toggle aria-label="斜体">
              <em>I</em>
            </Toggle>
            <Toggle aria-label="禁用的下划线" disabled>
              U
            </Toggle>
          </div>
          <p className={checked ? "font-bold" : "text-muted-foreground"}>
            这是一段示例文字。
          </p>
        </div>
      );
    case "toggle-group":
      return (
        <div className="space-y-4">
          <ToggleGroup
            type="single"
            value={value || "all"}
            onValueChange={setValue}
            variant="outline"
          >
            <ToggleGroupItem value="all">全部</ToggleGroupItem>
            <ToggleGroupItem value="active">进行中</ToggleGroupItem>
            <ToggleGroupItem value="done">已完成</ToggleGroupItem>
          </ToggleGroup>
          <p className="text-xs text-muted-foreground">
            当前筛选：{value || "all"}
          </p>
        </div>
      );
    case "calendar":
      return (
        <div className="space-y-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <p className="text-center text-xs text-muted-foreground">
            {date ? date.toLocaleDateString("zh-CN") : "请选择日期"}
          </p>
        </div>
      );
    case "file-upload":
      return (
        <div className="w-full max-w-md">
          <FileUpload value={files} onValueChange={setFiles} multiple>
            <FileUploadDropzone className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-md border border-dashed p-6">
              <FileText className="size-5 text-muted-foreground" />
              <span className="text-sm">拖放文件，或选择本地文件</span>
              <span className="text-xs text-muted-foreground">
                文件仅保留在当前页面
              </span>
              <FileUploadTrigger asChild>
                <Button variant="outline" size="sm">
                  选择文件
                </Button>
              </FileUploadTrigger>
            </FileUploadDropzone>
          </FileUpload>
          {files.map((f, i) => (
            <div
              key={`${f.name}:${i}`}
              className="mt-2 flex items-center gap-2 text-sm"
            >
              <FileText className="size-4" />
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              <Button
                size="icon-xs"
                variant="ghost"
                aria-label={`移除 ${f.name}`}
                onClick={() => setFiles(files.filter((_, n) => n !== i))}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      );
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">编辑资料</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑资料</DialogTitle>
              <DialogDescription>
                这是组件演示，提交只改变本页状态。
              </DialogDescription>
            </DialogHeader>
            <Label htmlFor="dialog-title">名称</Label>
            <Input
              id="dialog-title"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="设计资料"
            />
            <DialogClose asChild>
              <Button onClick={() => say("已保存演示内容")}>保存示例</Button>
            </DialogClose>
          </DialogContent>
          {feedback}
        </Dialog>
      );
    case "alert-dialog":
      return (
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">移除示例</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>移除这个示例？</AlertDialogTitle>
                <AlertDialogDescription>
                  只修改文档演示，不会删除真实资料。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => say("示例已移除；刷新页面可恢复")}
                >
                  移除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {feedback}
        </div>
      );
    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">查看资料详情</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>设计资料</SheetTitle>
              <SheetDescription>
                保留列表上下文，按需查看完整说明。
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 p-4">
              <Badge variant="outline">演示</Badge>
              <p className="text-sm leading-7 text-muted-foreground">
                主题、基础组件与 Chat UI
                由同一份源码维护。关闭后返回原触发入口。
              </p>
            </div>
          </SheetContent>
        </Sheet>
      );
    case "drawer":
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">打开底部面板</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg p-6">
              <DrawerHeader>
                <DrawerTitle>本页任务面板</DrawerTitle>
                <DrawerDescription>
                  用手势、Escape 或下方按钮关闭。
                </DrawerDescription>
              </DrawerHeader>
              <DrawerClose asChild>
                <Button variant="outline" className="mt-4 w-full">
                  关闭面板
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      );
    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Settings />
              调整显示
            </Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-4">
            <h3 className="text-sm font-medium">阅读偏好</h3>
            <Label className="flex items-center justify-between gap-4">
              紧凑模式
              <Switch checked={checked} onCheckedChange={setChecked} />
            </Label>
          </PopoverContent>
        </Popover>
      );
    case "tooltip":
      return (
        <div className="flex gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="添加资料">
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>添加资料</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">悬停或键盘聚焦</Button>
            </TooltipTrigger>
            <TooltipContent>简短说明，不承载错误和操作结果。</TooltipContent>
          </Tooltip>
        </div>
      );
    case "dropdown-menu":
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                更多操作
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => say("已选择复制链接")}>
                  复制链接
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => say("已选择导出")}>
                  导出资料
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => say("已选择归档示例")}>
                  归档示例
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {feedback}
        </div>
      );
    case "command":
      return (
        <div className="w-full max-w-md">
          <Command className="rounded-md border">
            <CommandInput placeholder="搜索示例组件…" />
            <CommandList>
              <CommandEmpty>没有匹配的组件。</CommandEmpty>
              <CommandGroup heading="组件">
                {[
                  "Button 按钮",
                  "Dialog 对话框",
                  "Thread 聊天工作面",
                  "Thinking 思考摘要",
                ].map((n) => (
                  <CommandItem key={n} onSelect={() => say(`已选择 ${n}`)}>
                    {n}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {feedback}
        </div>
      );
    case "tabs":
      return (
        <Tabs defaultValue="overview" className="w-full max-w-md">
          <TabsList variant="line">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="settings">设置</TabsTrigger>
            <TabsTrigger value="history">历史</TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="pt-5 text-sm text-muted-foreground"
          >
            当前对象的概览与主要信息。
          </TabsContent>
          <TabsContent value="settings" className="pt-5">
            <Label htmlFor="tab-name">名称</Label>
            <Input id="tab-name" className="mt-2" placeholder="示例名称" />
          </TabsContent>
          <TabsContent
            value="history"
            className="pt-5 text-sm text-muted-foreground"
          >
            尚无历史记录（演示）。
          </TabsContent>
        </Tabs>
      );
    case "breadcrumb":
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#/introduction">文档</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#/components/button">
                基础组件
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    case "sidebar":
      return (
        <SidebarProvider className="min-h-64 overflow-hidden rounded-md border">
          <Sidebar collapsible="none" className="w-48">
            <SidebarHeader className="border-b px-4 py-4 text-sm font-semibold">
              工作台示例
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>导航</SidebarGroupLabel>
                <SidebarMenu>
                  {["沟通", "资料", "设置"].map((n) => (
                    <SidebarMenuItem key={n}>
                      <SidebarMenuButton
                        isActive={(value || "沟通") === n}
                        onClick={() => setValue(n)}
                      >
                        {n}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
            {value || "沟通"}工作面
          </div>
        </SidebarProvider>
      );
    case "table":
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>组件</TableHead>
              <TableHead>类别</TableHead>
              <TableHead className="text-right">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Button", "基础操作"],
              ["Dialog", "浮层"],
              ["Thread", "Chat UI"],
            ].map(([n, t]) => (
              <TableRow key={n}>
                <TableCell className="font-medium">{n}</TableCell>
                <TableCell>{t}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">已接入</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    case "item":
      return (
        <div className="w-full space-y-3">
          {["设计规范", "组件来源"].map((n) => (
            <Item key={n} variant="outline">
              <ItemMedia>
                <FileText className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{n}</ItemTitle>
                <ItemDescription>按需查看文档与相关说明。</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => say(`打开 ${n}（演示）`)}
                >
                  查看
                </Button>
              </ItemActions>
            </Item>
          ))}
          {feedback}
        </div>
      );
    case "card":
      return (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>设计资料</CardTitle>
            <CardDescription>一份关于组件边界的示例资料。</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            用清晰的层级组织独立内容，并保留必要的下一步。
          </CardContent>
          <CardFooter>
            <Button size="sm" asChild>
              <a href="#/principles">阅读设计原则</a>
            </Button>
          </CardFooter>
        </Card>
      );
    case "avatar":
      return (
        <div className="flex items-center gap-6">
          <Avatar>
            <AvatarFallback>林</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>陈</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="data:," alt="演示加载失败" />
            <AvatarFallback>周</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            名称占位与图片加载失败回退
          </span>
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap gap-3">
          <Badge>已完成</Badge>
          <Badge variant="secondary">等待确认</Badge>
          <Badge variant="outline">已归档</Badge>
          <Badge variant="destructive">未完成</Badge>
        </div>
      );
    case "alert":
      return (
        <div className="w-full space-y-4">
          <Alert>
            <FileText />
            <AlertTitle>本页演示</AlertTitle>
            <AlertDescription>这是一条需要保留的区域说明。</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>保存结果未确认</AlertTitle>
            <AlertDescription>
              请保留当前输入，核对原操作后重试。
            </AlertDescription>
          </Alert>
        </div>
      );
    case "sonner":
      return (
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast.success("示例操作已完成", {
                description: "本条反馈不会写入业务数据。",
              })
            }
          >
            显示完成反馈
          </Button>
          <Button variant="outline" onClick={() => toast("内容没有变化")}>
            显示中性反馈
          </Button>
        </div>
      );
    case "skeleton":
      return (
        <div className="flex w-full max-w-sm gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      );
    case "spinner":
      return (
        <div className="flex gap-8">
          <span
            role="status"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Spinner />
            正在保存
          </span>
          <Button disabled size="sm">
            <Spinner />
            提交中
          </Button>
        </div>
      );
    case "progress":
      return (
        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>演示进度</span>
            <span>{value || 60}%</span>
          </div>
          <Progress value={Number(value || 60)} aria-label="演示进度" />
          <div className="flex gap-2">
            {["25", "60", "100"].map((n) => (
              <Button
                key={n}
                variant="outline"
                size="sm"
                onClick={() => setValue(n)}
              >
                {n}%
              </Button>
            ))}
          </div>
        </div>
      );
    case "empty":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookOpen />
            </EmptyMedia>
            <EmptyTitle>还没有资料</EmptyTitle>
            <EmptyDescription>
              添加第一份可供阅读与引用的资料。
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" onClick={() => say("已点击添加资料（演示）")}>
              添加资料
            </Button>
            {feedback}
          </EmptyContent>
        </Empty>
      );
    case "collapsible":
      return (
        <Collapsible className="w-full max-w-sm">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              展开补充信息
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 rounded-md border p-4 text-sm leading-7 text-muted-foreground">
            补充内容只在需要时展开。折叠不修改已保存的信息或正式回答。
          </CollapsibleContent>
        </Collapsible>
      );
    case "separator":
      return (
        <div className="w-full max-w-sm space-y-4">
          <p className="text-sm">设计资料</p>
          <Separator />
          <div className="flex h-5 items-center gap-4 text-xs text-muted-foreground">
            <span>概览</span>
            <Separator orientation="vertical" />
            <span>来源</span>
            <Separator orientation="vertical" />
            <span>版本</span>
          </div>
        </div>
      );
    case "scroll-area":
      return (
        <ScrollArea className="h-56 w-full max-w-sm rounded-md border">
          <div className="divide-y px-4">
            {Array.from({ length: 15 }, (_, i) => (
              <p key={i} className="py-3 text-sm text-muted-foreground">
                示例记录 {String(i + 1).padStart(2, "0")} · 组件阅读与交互
              </p>
            ))}
          </div>
        </ScrollArea>
      );
    case "resizable":
      return (
        <ResizablePanelGroup
          orientation="horizontal"
          className="min-h-52 w-full rounded-md border"
        >
          <ResizablePanel defaultSize="35%" minSize="20%">
            <div className="flex h-full min-h-52 items-center justify-center text-sm text-muted-foreground">
              目录
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="flex h-full min-h-52 items-center justify-center text-sm">
              拖动分隔线调整阅读比例
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      );
    case "event-calendar-views":
      return (
        <div className="w-full text-sm">
          <EventCalendarViews
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            initialDate="2026-11-16"
            height={400}
            popoverCloseContent="关闭"
            events={[
              {
                id: "review",
                title: "设计评审（演示）",
                start: "2026-11-16",
                color: "var(--primary)",
              },
              {
                id: "docs",
                title: "整理组件文档",
                start: "2026-11-19",
                color: "var(--primary)",
              },
            ]}
          />
        </div>
      );
    default:
      return <p className="text-sm text-muted-foreground">请选择一个组件。</p>;
  }
}

function SelectionDemo() {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <div className="w-full max-w-md overflow-hidden rounded-md border">
      <SelectionBar
        selectedCount={selected.length}
        totalCount={3}
        onSelectAll={(value) => setSelected(value ? [1, 2, 3] : [])}
        onClear={() => setSelected([])}
        description="演示数据，仅展示选择和批量反馈。"
      >
        <Button
          size="sm"
          onClick={() => {
            toast.success(`演示：已处理 ${selected.length} 项`);
            setSelected([]);
          }}
        >
          标为已处理
        </Button>
      </SelectionBar>
      {[1, 2, 3].map((id) => (
        <Label
          key={id}
          className="flex cursor-pointer items-center gap-3 border-b p-3 last:border-0"
        >
          <Checkbox
            checked={selected.includes(id)}
            onCheckedChange={(value) =>
              setSelected((items) =>
                value ? [...items, id] : items.filter((item) => item !== id),
              )
            }
          />
          演示通知 {id}
        </Label>
      ))}
    </div>
  );
}
