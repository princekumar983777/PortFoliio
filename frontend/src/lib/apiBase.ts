const DEFAULT_BASE = "https://portfoliobackend-theta-gold.vercel.app";

function normalizeBase(raw: string): string {
  return raw.trim().replace(/\/+$/, "");
}

/** Backend origin (no trailing slash). Override with `VITE_API_BASE_URL` in `.env`. */
export function getApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const base = (fromEnv && fromEnv.trim() !== ""
    ? fromEnv
    : DEFAULT_BASE
  ).trim();
  return normalizeBase(base);
}

/** Absolute URL for a path under the API base (e.g. `apiPath("chat")` → `…/chat`). */
export function apiPath(path: string): string {
  const p = path.replace(/^\/+/, "");
  return `${getApiBaseUrl()}/${p}`;
}

export const CHAT_API_URL = apiPath("chat");
export const SEND_EMAIL_API_URL = apiPath("send-email");
