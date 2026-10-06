import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

const origin = process.env.ORDER_TEST_ORIGIN || "http://localhost:3000";
const password = process.env.ORDER_TEST_PASSWORD;
assert.ok(password, "ORDER_TEST_PASSWORD is required");
let cookie = "";
async function call(path, method = "GET", body, withCookie = false, customOrigin = origin) {
  const result = await fetch(origin + path, {
    method, signal: AbortSignal.timeout(30000),
    headers: { ...(method !== "GET" ? { Origin: customOrigin, "Content-Type": "application/json" } : {}), ...(withCookie ? { Cookie: cookie } : {}) },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await result.json();
  return { result, data };
}

const config = await call("/api/orders/config");
assert.equal(config.result.status, 200); assert.equal(config.data.mode, "demo", "Smoke test refuses to create a live restaurant request"); assert.equal(config.data.available, true);
assert.equal((await call("/api/admin/orders")).result.status, 401);
const body = { mode: "demo", items: [{ id: "set-premium", quantity: 1, price: 1 }], expectedTotal: 1245, fulfillment: "pickup", pickupPoint: "ул. Огородная, 140", payment: "Наличными при получении", timeMode: "soon", idempotencyKey: randomUUID(), customer: { name: "DO_NOT_STORE_THIS_NAME", phone: "12345678901" } };
assert.equal((await call("/api/orders", "POST", body, false, "https://wrong.example")).result.status, 403);
assert.equal((await call("/api/orders", "POST", { ...body, expectedTotal: 1 })).result.status, 409);
const created = await call("/api/orders", "POST", body);
assert.equal(created.result.status, 201); assert.equal(created.data.total, 1245); assert.equal(created.data.items[0].price, 1245);
assert.ok(created.data.number.startsWith("ДЕМО-")); assert.equal(created.data.customer, undefined);
const repeat = await call("/api/orders", "POST", body);
assert.equal(repeat.result.status, 200); assert.equal(repeat.data.id, created.data.id); assert.equal(repeat.data.repeated, true);
assert.equal((await call("/api/admin/session", "POST", { password: "incorrect" })).result.status, 401);
const login = await call("/api/admin/session", "POST", { password });
assert.equal(login.result.status, 200);
const setCookie = login.result.headers.get("set-cookie");
assert.match(setCookie, /HttpOnly/i); assert.match(setCookie, /SameSite=strict/i); assert.match(setCookie, /Path=\/api\/admin/i);
if (origin.startsWith("https://")) assert.match(setCookie, /Secure/i);
cookie = setCookie.split(";")[0];
const listed = await call("/api/admin/orders", "GET", undefined, true);
assert.equal(listed.result.status, 200);
const row = listed.data.orders.find(row => row.id === created.data.id);
assert.ok(row); assert.equal(row.customer.name, "Тестовый гость"); assert.doesNotMatch(JSON.stringify(row), /DO_NOT_STORE_THIS_NAME|12345678901/);
let version = row.version;
for (const status of ["confirmed", "preparing", "ready", "completed"]) {
  const changed = await call("/api/admin/orders", "PATCH", { id: row.id, status, version }, true);
  assert.equal(changed.result.status, 200); assert.equal(changed.data.status, status); assert.equal(changed.data.version, version + 1);
  if (status === "confirmed") assert.equal((await call("/api/admin/orders", "PATCH", { id: row.id, status: "cancelled", version }, true)).result.status, 409);
  version = changed.data.version;
}
const logout = await call("/api/admin/session", "DELETE", undefined, true);
assert.equal(logout.result.status, 200); assert.match(logout.result.headers.get("set-cookie"), /Max-Age=0/i);
cookie = ""; assert.equal((await call("/api/admin/orders", "GET", undefined, true)).result.status, 401);
console.log(JSON.stringify({ ok: true, mode: "demo", orderNumber: created.data.number, price: "server", retry: "same-order", privateData: "fictional", workflow: "completed", auth: "protected" }));
