import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
export default defineConfig({
  base: process.env.DOCS_BASE || "/",
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react()],
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "@assistant-ui/react",
      "@assistant-ui/react-lexical",
      "@assistant-ui/react-markdown",
    ],
  },
  css: { postcss: fileURLToPath(new URL("../..", import.meta.url)) },
  server: { host: "127.0.0.1", port: 3342, strictPort: true },
  build: { outDir: "../../dist/docs", emptyOutDir: true },
});
