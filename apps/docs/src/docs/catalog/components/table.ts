import { ui } from "../../model";

export default {
  ...ui(
    "table",
    "Table 表格",
    "连续扫描结构化内容，用行分隔组织信息。",
    "Table, TableHeader, TableRow, TableHead, TableBody, TableCell",
    "<Table>\n  <TableHeader><TableRow><TableHead>组件</TableHead><TableHead>职责</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>Button</TableCell><TableCell>用户操作</TableCell></TableRow></TableBody>\n</Table>",
  ),
  order: 24,
};
