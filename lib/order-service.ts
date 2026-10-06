import { isAbsolute, resolve } from "node:path";
import { tmpdir } from "node:os";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { OrderStore } from "./order-store.ts";
import { OrderError } from "./order-model.ts";
import type { OrderMode } from "./order-model.ts";

export const sessionCookie = "imperator_admin";
export function orderMode(): OrderMode { return process.env.ORDER_MODE === "live" ? "live" : "demo"; }
export function adminPassword(): string {
  const password = process.env.ORDER_ADMIN_PASSWORD ?? "";
  if (password.length < 24) throw new OrderError("Доступ администратора ещё не настроен.", 503);
  return password;
}
function key(): Buffer | null {
  const value = process.env.ORDER_ENCRYPTION_KEY ?? "";
  return /^[a-fA-F0-9]{64}$/.test(value) ? Buffer.from(value, "hex") : null;
}
export function storageConfig(): { path: string; encryptionKey: Buffer | null } {
  if (orderMode() === "demo") return { path: resolve(tmpdir(), "primerimperator-demo.sqlite"), encryptionKey: null };
  const path = process.env.ORDER_DATABASE_PATH ?? "";
  const resolved = resolve(path);
  // This Render-hosted presentation is outside Russia and must stay a fictional demo.
  // A country flag is an operator assertion; deployment location must be verified separately.
  if (process.env.RENDER || process.env.ORDER_STORAGE_COUNTRY !== "RU" || process.env.ORDER_LEGAL_READY !== "1") throw new OrderError("Рабочий приём требует согласованной инфраструктуры в РФ и документов оператора.", 503);
  if (!isAbsolute(path) || process.env.ORDER_STORAGE_DURABLE !== "1" || resolved.startsWith(resolve(tmpdir()) + "/") || resolved === resolve(tmpdir()) || !key()) throw new OrderError("Рабочий приём заявок ещё не подключён.", 503);
  adminPassword();
  return { path: resolved, encryptionKey: key() };
}
let singleton: OrderStore | undefined;
export function store(): OrderStore { singleton ??= new OrderStore(storageConfig().path, storageConfig().encryptionKey); return singleton; }
export function equalSecret(a: string, b: string): boolean { return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest()); }
export function createSession(now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ expires: now + 8 * 3600000 })).toString("base64url");
  const signature = createHmac("sha256", adminPassword()).update(payload).digest("base64url"); return payload + "." + signature;
}
export function validSession(token: string | undefined, now = Date.now()): boolean {
  try {
    if (!token || token.length > 400) return false;
    const [payload, signature, extra] = token.split("."); if (!payload || !signature || extra) return false;
    const expected = createHmac("sha256", adminPassword()).update(payload).digest("base64url");
    if (!equalSecret(signature, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data.expires === "number" && data.expires > now && data.expires <= now + 8 * 3600000;
  } catch { return false; }
}
export function assertOrigin(request: Request) {
  const configured = process.env.ORDER_APP_ORIGIN ?? (process.env.NODE_ENV === "production" ? "https://primerimperator.onrender.com" : new URL(request.url).origin);
  if (request.headers.get("origin") !== configured) throw new OrderError("Обновите страницу и повторите отправку.", 403);
}
export async function readJSON(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new OrderError("Неверный формат запроса.", 415);
  const reader = request.body?.getReader(); if (!reader) throw new OrderError("Данные заявки не получены.");
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const { done, value } = await reader.read(); if(done) break; size += value.byteLength; if(size > 24000) { await reader.cancel(); throw new OrderError("Заявка слишком большая.", 413); } chunks.push(value); }
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    return parsed as Record<string, unknown>;
  } catch { throw new OrderError("Не удалось прочитать данные. Повторите отправку."); }
}
export function limited(request: Request, bucket: string, max: number, seconds: number) {
  // Stored limiter keys do not contain IP addresses or passwords.
  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const salt = process.env.ORDER_RATE_LIMIT_SECRET || adminPassword();
  const hashed = createHmac("sha256", salt).update(address).digest("hex");
  if(!store().consumeLimit(bucket + ":" + hashed, max, seconds)) throw new OrderError("Слишком много попыток. Подождите несколько минут.", 429);
}
export function response(data: unknown, status = 200): Response { return Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } }); }
export function failure(error: unknown): Response {
  if(error instanceof OrderError) return response({ error: error.message }, error.status);
  console.error("Order service error:", error instanceof Error ? error.name : "unknown");
  return response({ error: "Не удалось сохранить заявку. Повторите отправку; успех пока не подтверждён." }, 503);
}
