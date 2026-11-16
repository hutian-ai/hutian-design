import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const label = "org.hutian.design.showcase";
const domain = `gui/${process.getuid()}`;
const plist = resolve(homedir(), "Library/LaunchAgents", `${label}.plist`);
const logs = resolve(project, ".local/showcase");
const command = process.argv[2] || "status";
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const launchctl = (...args) =>
  execFileSync("/bin/launchctl", args, { stdio: "pipe" });
if (process.platform !== "darwin")
  throw new Error("Use pnpm dev / pnpm preview on this platform.");
if (command === "start") {
  if (!existsSync(resolve(project, "dist/docs/index.html")))
    throw new Error("Run pnpm docs:build first.");
  await mkdir(logs, { recursive: true, mode: 0o700 });
  await mkdir(dirname(plist), { recursive: true });
  const args = [
    process.execPath,
    resolve(project, "node_modules/vite/bin/vite.js"),
    "preview",
    "--config",
    "apps/docs/vite.config.ts",
    "--host",
    "127.0.0.1",
    "--port",
    "3342",
    "--strictPort",
  ];
  await writeFile(
    plist,
    `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>Label</key><string>${label}</string><key>ProgramArguments</key><array>${args.map((arg) => `<string>${escape(arg)}</string>`).join("")}</array><key>WorkingDirectory</key><string>${escape(project)}</string><key>RunAtLoad</key><true/><key>KeepAlive</key><true/><key>StandardOutPath</key><string>${escape(logs)}/out.log</string><key>StandardErrorPath</key><string>${escape(logs)}/error.log</string></dict></plist>`,
    { mode: 0o600 },
  );
  try {
    launchctl("bootout", `${domain}/${label}`);
  } catch {}
  // launchd removes an existing service asynchronously after bootout.
  for (let attempt = 0; ; attempt++) {
    try {
      launchctl("bootstrap", domain, plist);
      break;
    } catch (error) {
      if (attempt >= 9) throw error;
      await delay(500);
    }
  }
} else if (command === "stop") {
  try {
    launchctl("bootout", `${domain}/${label}`);
  } catch {}
} else if (command !== "status")
  throw new Error("Usage: pnpm showcase:start|status|stop");
let running = false;
try {
  launchctl("print", `${domain}/${label}`);
  running = true;
} catch {}
console.log(
  running
    ? "Documentation service registered: http://127.0.0.1:3342"
    : "Documentation service stopped",
);
if (running) {
  try {
    console.log(`HTTP ${(await fetch("http://127.0.0.1:3342")).status}`);
  } catch {
    console.log(
      "Starting; check .local/showcase/ logs if the page remains unavailable.",
    );
  }
}
