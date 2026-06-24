import type { z } from "zod";

// ─── MCP Tool Infrastructure ───

export interface ToolDef {
  name: string;
  description: string;
  schema: z.ZodRawShape | z.AnyZodObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (args: any, ctx: ToolContext) => Promise<ToolResult>;
}

export interface ToolContext {
  config: {
    githubToken?: string;
    librariesApiKey?: string;
    nvdApiKey?: string;
  };
}

export interface ToolResult {
  [key: string]: unknown;
  content: { type: "text"; text: string }[];
}

// ─── Response Helpers ───

export function text(msg: string): ToolResult {
  return { content: [{ type: "text", text: msg }] };
}

export function json(data: unknown): ToolResult {
  return text(JSON.stringify(data, null, 2));
}
