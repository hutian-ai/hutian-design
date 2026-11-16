import type { ReactNode } from "react";
import type { ToolStep } from "../beautiful-ui/tool-chips.js";

/** Presentation data only. Native events and endpoint schemas belong to the consumer. */
export type ExecutionBlock = {
  id: string;
  text?: string;
  tool?: ToolStep;
  diff?: string;
  diagnostic?: { label: string; detail: string };
  thinking?: { startedAt?: string; completedAt?: string; summary?: string };
};
export type ExecutionProjection = { final: string; blocks: ExecutionBlock[] };
export type ExecutionInteraction = {
  id: string;
  title: string;
  status: string;
  canAllow: boolean;
  details?: unknown;
  options?: Array<{ optionId: string; name: string; kind: string }>;
  form?: {
    mode: string;
    message: string;
    requestedSchema?: Record<string, unknown>;
    url?: string;
  };
};
export type ExecutionOutput = {
  id: string;
  name: string;
  href: string;
  loadPreview?: () => Promise<string>;
};
export type ExecutionView = {
  state: string;
  startedAt: string;
  finishedAt: string | null;
  historyTruncated: boolean;
  interactions: ExecutionInteraction[];
  commands: Array<{ id: string; kind: string; result?: unknown }>;
  outputs: ExecutionOutput[];
  outputsState: "pending" | "available" | "none" | "unconfirmed";
};
export type ExecutionControl = {
  operationId: string;
  kind: "stop" | "respond";
  requestId?: string;
  response?: unknown;
};
export type ExecutionActionResult = { ok: true } | { ok: false; error: string };
export type ChatExecutionProps = {
  activity: ExecutionView;
  projection: ExecutionProjection;
  runId: string;
  onControl(command: ExecutionControl): Promise<ExecutionActionResult>;
  onRetrieveOutputs(): Promise<ExecutionActionResult>;
  showStop?: boolean;
  children?: ReactNode;
  hasAnswer?: boolean;
  waitingFor?: string;
  renderBody?: (content: ReactNode) => ReactNode;
};
