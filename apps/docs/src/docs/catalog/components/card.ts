import { ui } from "../../model";

export default {
  ...ui(
    "card",
    "Card 卡片",
    "组织少量具有独立语义的内容，不为每段文字套卡片。",
    "Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter",
    "<Card>\n  <CardHeader><CardTitle>设计资料</CardTitle><CardDescription>统一的视觉与交互约定。</CardDescription></CardHeader>\n  <CardContent>正文与相关内容。</CardContent>\n</Card>",
  ),
  order: 26,
};
