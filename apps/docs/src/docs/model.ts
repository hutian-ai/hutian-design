export type PropRow = {
  name: string;
  type: string;
  default?: string;
  description: string;
};
export type DocPage = {
  id: string;
  title: string;
  subtitle: string;
  group: string;
  description: string;
  source?: string;
  code?: string;
  props?: PropRow[];
  notes?: string[];
};
export const prop = (
  name: string,
  type: string,
  description: string,
  value = "—",
): PropRow => ({ name, type, description, default: value });
export const basic = [
  prop("className", "string", "补充布局样式，沿用共享语义颜色。"),
  prop("children", "ReactNode", "通过组合插入内容与已有子组件。"),
];
const exampleCode = (id: string, names: string, usage: string) => {
  const imports = [`import { ${names} } from "@hutian-ai/design/ui/${id}";`];
  const helpers: Record<string, string> = {
    Button: "button",
    Input: "input",
    Label: "label",
    Spinner: "spinner",
  };
  const declared = names.split(",").map((s) => s.trim());
  const used = new Set(
    [...usage.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)].map((match) => match[1]),
  );
  for (const [name, module] of Object.entries(helpers)) {
    if (used.has(name) && !declared.includes(name))
      imports.push(`import { ${name} } from "@hutian-ai/design/ui/${module}";`);
  }
  let setup = "";
  if (id === "calendar") {
    imports.push('import { useState } from "react";');
    setup =
      "const [date, setDate] = useState<Date | undefined>(new Date());\n\n";
  }
  if (id === "file-upload") {
    imports.push('import { useState } from "react";');
    setup = "const [files, setFiles] = useState<File[]>([]);\n\n";
  }
  if (id === "event-calendar-views")
    imports.push('import dayGridPlugin from "@fullcalendar/react/daygrid";');
  if (id === "sonner") imports.push('import { toast } from "sonner";');
  if (setup)
    return `${imports.join("\n")}\n\nexport function Example() {\n  ${setup.trim()}\n\n  return (\n    ${usage.replaceAll("\n", "\n    ")}\n  );\n}`;
  return `${imports.join("\n")}\n\n${usage}`;
};
export const ui = (
  id: string,
  title: string,
  description: string,
  names: string,
  usage: string,
  props = basic,
  notes: string[] = [],
): DocPage => ({
  id: `components/${id}`,
  title,
  subtitle: id,
  group: "基础组件",
  description,
  source: `src/ui/${id}.tsx`,
  code: exampleCode(id, names, usage),
  props,
  notes,
});
export const chat = (
  id: string,
  title: string,
  description: string,
  source: string,
  code: string,
  props = basic,
  notes: string[] = [],
): DocPage => ({
  id: `chat/${id}`,
  title,
  subtitle: id,
  group: "Chat UI",
  description,
  source,
  code,
  props,
  notes,
});
