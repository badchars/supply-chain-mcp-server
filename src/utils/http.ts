// Shared HTTP fetch helper with consistent headers and error handling
const USER_AGENT = "supply-chain-mcp-server";

export async function apiFetch(
  url: string,
  opts?: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const headers: Record<string, string> = {
    "User-Agent": USER_AGENT,
    Accept: "application/json",
    ...opts?.headers,
  };

  const init: RequestInit = {
    method: opts?.method ?? "GET",
    headers,
  };

  if (opts?.body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}${body ? `\n${body.substring(0, 500)}` : ""}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

export async function apiFetchText(
  url: string,
  opts?: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  },
): Promise<string> {
  const headers: Record<string, string> = {
    "User-Agent": USER_AGENT,
    ...opts?.headers,
  };

  const init: RequestInit = {
    method: opts?.method ?? "GET",
    headers,
  };

  if (opts?.body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}${body ? `\n${body.substring(0, 500)}` : ""}`);
  }

  return res.text();
}
