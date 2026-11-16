import { ui } from "../../model";

export default {
  ...ui(
    "empty",
    "Empty 空状态",
    "说明为什么为空，以及下一步可以执行的真实动作。",
    "Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent",
    "<Empty>\n  <EmptyHeader><EmptyTitle>还没有资料</EmptyTitle><EmptyDescription>添加第一份可引用的资料。</EmptyDescription></EmptyHeader>\n  <EmptyContent><Button>添加资料</Button></EmptyContent>\n</Empty>",
  ),
  order: 34,
};
