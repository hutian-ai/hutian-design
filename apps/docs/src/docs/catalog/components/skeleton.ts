import { ui } from "../../model";

export default {
  ...ui(
    "skeleton",
    "Skeleton 加载骨架",
    "在首次加载时保持内容的空间结构。",
    "Skeleton",
    '<div className="space-y-3">\n  <Skeleton className="h-4 w-48" />\n  <Skeleton className="h-4 w-72" />\n</div>',
  ),
  order: 31,
};
