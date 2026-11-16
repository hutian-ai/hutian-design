import { ui, prop } from "../../model";

export default {
  ...ui(
    "alert-dialog",
    "Alert Dialog 危险确认",
    "提交前说明影响范围，明确区分取消与继续。",
    "AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction",
    '<AlertDialog>\n  <AlertDialogTrigger asChild><Button variant="outline">移除示例</Button></AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader><AlertDialogTitle>移除示例？</AlertDialogTitle>\n      <AlertDialogDescription>此演示只改变本页状态。</AlertDialogDescription></AlertDialogHeader>\n    <AlertDialogFooter><AlertDialogCancel>取消</AlertDialogCancel><AlertDialogAction>移除</AlertDialogAction></AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>',
    [
      prop(
        "open / onOpenChange",
        "boolean / callback",
        "确认对话框的可见状态。",
      ),
    ],
  ),
  order: 14,
};
