import { ui } from "../../model";

export default {
  ...ui(
    "input-group",
    "Input Group 输入组合",
    "将输入、图标、前后缀和操作组织为同一输入区域。",
    "InputGroup, InputGroupAddon, InputGroupInput",
    '<InputGroup>\n  <InputGroupAddon>https://</InputGroupAddon>\n  <InputGroupInput aria-label="地址" placeholder="example.com" />\n</InputGroup>',
  ),
  order: 5,
};
