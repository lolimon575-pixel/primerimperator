import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { OrderError, orderFingerprint, validateKey, validateOrder } from "../lib/order-model.ts";
import { OrderStore } from "../lib/order-store.ts";
import { assertOrigin, createSession, readJSON, storageConfig, validSession } from "../lib/order-service.ts";

const payload = {
  mode: "demo", items: [{ id: "set-premium", quantity: 1 }], expectedTotal: 1245,
  fulfillment: "pickup", pickupPoint: "ул. Огородная, 140",
  payment: "Наличными при получении", timeMode: "soon",
};
const demo = () => validateOrder(payload, "demo");
const fails = (status: number) => (error: unknown) => error instanceof OrderError && error.status === status;
const request = (body: unknown, origin = "https://primerimperator.onrender.com") => new Request("https://primerimperator.onrender.com/api/orders", {
  method: "POST", headers: { "Content-Type": "application/json", Origin: origin }, body: JSON.stringify(body),
});

test("prices and names come from the menu; price drift is rejected", () => {
  const order = validateOrder({ ...payload, items: [{ id: "set-premium", quantity: 1, price: 1, name: "Fake" }] }, "demo");
  assert.equal(order.total, 1245); assert.equal(order.items[0].name, "Сет Премиум");
  assert.throws(() => validateOrder({ ...payload, expectedTotal: 1 }, "demo"), fails(409));
});
test("unknown products, fractional counts and merged count overflow fail", () => {
  for (const items of [[{ id: "unknown", quantity: 1 }], [{ id: "set-premium", quantity: 1.5 }], [{ id: "set-premium", quantity: 99 }, { id: "set-premium", quantity: 1 }]]) {
    assert.throws(() => validateOrder({ ...payload, items }, "demo"), fails(400));
  }
});
test("canonical fingerprint is stable for reordered and merged cart rows", () => {
  const a = validateOrder({ ...payload, expectedTotal: undefined, items: [{ id: "set-premium", quantity: 1 }, { id: "imperator", quantity: 2 }] }, "demo");
  const b = validateOrder({ ...payload, expectedTotal: undefined, items: [{ id: "imperator", quantity: 1 }, { id: "set-premium", quantity: 1 }, { id: "imperator", quantity: 1 }] }, "demo");
  assert.equal(orderFingerprint(a), orderFingerprint(b));
});
test("demo discards supplied personal details", () => {
  const order = validateOrder({ ...payload, customer: { name: "PrivateName", phone: "12345678901", address: "PrivateAddress", comment: "PrivateComment" } }, "demo");
  assert.equal(order.customer.name, "Тестовый гость");
  assert.doesNotMatch(JSON.stringify(order), /PrivateName|PrivateAddress|PrivateComment|12345678901/);
});
test("invalid mode, pickup location and time are rejected", () => {
  assert.throws(() => validateOrder(payload, "live"), fails(409));
  assert.throws(() => validateOrder({ ...payload, pickupPoint: "unknown" }, "demo"), fails(400));
  for (const scheduledTime of ["09:30", "22:31", "19:77", "25:00"]) {
    assert.throws(() => validateOrder({ ...payload, timeMode: "scheduled", scheduledTime }, "demo"), fails(400));
  }
});
test("repeat submission returns exactly the existing order; changed payload conflicts", () => {
  const store = new OrderStore(":memory:");
  try {
    const first = store.create(demo(), "same-attempt-key-0001");
    const repeat = store.create(demo(), "same-attempt-key-0001");
    assert.equal(first.repeated, false); assert.equal(repeat.repeated, true);
    assert.equal(first.order.id, repeat.order.id); assert.equal(store.list("demo").counts.all, 1);
    const changed = validateOrder({ ...payload, items: [{ id: "set-premium", quantity: 2 }], expectedTotal: 2490 }, "demo");
    assert.throws(() => store.create(changed, "same-attempt-key-0001"), fails(409));
    assert.equal(store.list("demo").counts.all, 1);
  } finally { store.close(); }
});
test("saved orders and rate limits survive opening a second database connection", () => {
  const dir = mkdtempSync(join(tmpdir(), "imperator-test-"));
  const path = join(dir, "orders.sqlite");
  const first = new OrderStore(path); const second = new OrderStore(path);
  try {
    const saved = first.create(demo(), "persisted-attempt-0001");
    assert.equal(second.create(demo(), "persisted-attempt-0001").order.id, saved.order.id);
    assert.equal(second.list("demo").counts.all, 1);
    assert.equal(first.consumeLimit("test", 1, 60), true);
    assert.equal(second.consumeLimit("test", 1, 60), false);
  } finally { first.close(); second.close(); rmSync(dir, { recursive: true, force: true }); }
});
test("status changes reject stale concurrent edits, backward moves and cross-mode reads", () => {
  const store = new OrderStore(":memory:");
  try {
    const saved = store.create(demo(), "status-attempt-key-0001").order;
    const confirmed = store.update(saved.id, "demo", "confirmed", 1);
    assert.equal(confirmed.version, 2);
    assert.throws(() => store.update(saved.id, "demo", "cancelled", 1), fails(409));
    assert.throws(() => store.update(saved.id, "demo", "new", 2), fails(409));
    assert.throws(() => store.update(saved.id, "live", "preparing", 2), fails(404));
    let current = confirmed;
    for (const status of ["preparing", "ready", "completed"] as const) current = store.update(saved.id, "demo", status, current.version);
    assert.throws(() => store.update(saved.id, "demo", "cancelled", current.version), fails(409));
    assert.equal(store.list("live").counts.all, 0);
  } finally { store.close(); }
});
test("live customer data is encrypted on disk, readable only with the right key", () => {
  const dir = mkdtempSync(join(tmpdir(), "imperator-encryption-test-")); const path = join(dir, "orders.sqlite");
  const key = randomBytes(32); const store = new OrderStore(path, key);
  const order = validateOrder({ ...payload, mode: "live", customer: { name: "PRIVATE_NAME_SENTINEL", phone: "+7 (900) 000-12-34", comment: "PRIVATE_COMMENT_SENTINEL" } }, "live");
  store.create(order, "encrypted-attempt-0001");
  assert.equal(store.list("live").orders[0].customer.name, "PRIVATE_NAME_SENTINEL"); store.close();
  try {
    assert.doesNotMatch(readFileSync(path).toString("utf8"), /PRIVATE_NAME_SENTINEL|PRIVATE_COMMENT_SENTINEL|79000001234/);
    const reopened = new OrderStore(path, key);
    try { assert.equal(reopened.list("live").orders[0].customer.phone, "+79000001234"); } finally { reopened.close(); }
    const wrongKey = new OrderStore(path, randomBytes(32));
    try { assert.throws(() => wrongKey.list("live")); } finally { wrongKey.close(); }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test("live storage without encryption refuses an order and leaves no partial record", () => {
  const store = new OrderStore(":memory:");
  try {
    const live = validateOrder({ ...payload, mode: "live", customer: { name: "Test", phone: "79000000000" } }, "live");
    assert.throws(() => store.create(live, "missing-key-attempt-0001"), fails(503));
    assert.equal(store.list("live").counts.all, 0);
    assert.equal(store.create(demo(), "rollback-test-attempt-0001").repeated, false);
  } finally { store.close(); }
});
test("expired demo requests are removed before accepting new requests", () => {
  const store = new OrderStore(":memory:");
  try {
    const old = store.create(demo(), "expired-demo-attempt-0001").order;
    store.db.prepare("UPDATE orders SET created_at=? WHERE id=?").run("2000-01-01T00:00:00.000Z", old.id);
    store.create(demo(), "fresh-demo-attempt-0001");
    assert.equal(store.list("demo").counts.all, 1);
  } finally { store.close(); }
});
test("attempt keys reject missing and overlong inputs", () => {
  for (const key of [null, "short", "a".repeat(81), "<script>bad-key-0001"]) assert.throws(() => validateKey(key), fails(400));
});
test("request parser rejects non-JSON, malformed and oversized payloads", async () => {
  assert.deepEqual(await readJSON(request({ a: 1 })), { a: 1 });
  await assert.rejects(readJSON(new Request("https://example.com", { method: "POST", body: "{}" })), fails(415));
  await assert.rejects(readJSON(new Request("https://example.com", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" })), fails(400));
  await assert.rejects(readJSON(request({ huge: "x".repeat(24000) })), fails(413));
});
test("origin, signed sessions and live configuration fail closed", () => {
  const names = ["ORDER_APP_ORIGIN", "ORDER_ADMIN_PASSWORD", "ORDER_MODE", "ORDER_DATABASE_PATH", "ORDER_STORAGE_DURABLE", "ORDER_ENCRYPTION_KEY", "ORDER_STORAGE_COUNTRY", "ORDER_LEGAL_READY", "RENDER"] as const;
  const before = Object.fromEntries(names.map(name => [name, process.env[name]]));
  try {
    process.env.ORDER_APP_ORIGIN = "https://primerimperator.onrender.com";
    assertOrigin(request({})); assert.throws(() => assertOrigin(request({}, "https://attacker.example")), fails(403));
    process.env.ORDER_ADMIN_PASSWORD = randomBytes(32).toString("base64url");
    const now = Date.now(); const session = createSession(now);
    assert.equal(validSession(session, now), true); assert.equal(validSession(session + "x", now), false);
    assert.equal(validSession(session, now + 8 * 3600000), false);
    process.env.ORDER_ADMIN_PASSWORD = randomBytes(32).toString("base64url"); assert.equal(validSession(session, now), false);
    process.env.ORDER_MODE = "live"; process.env.ORDER_DATABASE_PATH = "/tmp/unsafe.sqlite";
    process.env.ORDER_STORAGE_DURABLE = "1"; process.env.ORDER_ENCRYPTION_KEY = randomBytes(32).toString("hex");
    assert.throws(() => storageConfig(), fails(503));
    process.env.ORDER_DATABASE_PATH = "/var/data/imperator/orders.sqlite"; process.env.ORDER_STORAGE_DURABLE = "0";
    assert.throws(() => storageConfig(), fails(503));
    process.env.ORDER_STORAGE_DURABLE = "1";
    delete process.env.RENDER;
    process.env.ORDER_STORAGE_COUNTRY = "US"; process.env.ORDER_LEGAL_READY = "1";
    assert.throws(() => storageConfig(), fails(503));
    process.env.ORDER_STORAGE_COUNTRY = "RU"; process.env.ORDER_LEGAL_READY = "0";
    assert.throws(() => storageConfig(), fails(503));
    process.env.ORDER_LEGAL_READY = "1"; process.env.RENDER = "true";
    assert.throws(() => storageConfig(), fails(503));
    delete process.env.RENDER;
    assert.equal(storageConfig().path, "/var/data/imperator/orders.sqlite");
  } finally { for (const name of names) { if (before[name] === undefined) delete process.env[name]; else process.env[name] = before[name]; } }
});
