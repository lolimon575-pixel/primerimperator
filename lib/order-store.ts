import { DatabaseSync } from "node:sqlite";
import { mkdirSync, chmodSync } from "node:fs";
import { dirname } from "node:path";
import { randomUUID, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
import { OrderError, canTransition, orderFingerprint } from "./order-model.ts";
import type { OrderMode, OrderStatus, ValidatedOrder, Customer } from "./order-model.ts";

export type StoredOrder = Omit<ValidatedOrder, "customer"> & {
  id: string; number: string; status: OrderStatus; version: number; createdAt: string; updatedAt: string;
  customer: Customer;
};
type OrderRow = {
  id: string; number: string; fingerprint: string; mode: OrderMode; status: OrderStatus; version: number;
  public_json: string; customer_data: string; created_at: string; updated_at: string;
};
function encrypt(customer: Customer, key: Buffer, id: string): string {
  const iv = randomBytes(12); const cipher = createCipheriv("aes-256-gcm", key, iv); cipher.setAAD(Buffer.from(id));
  const bytes = Buffer.concat([cipher.update(JSON.stringify(customer), "utf8"), cipher.final()]);
  return [iv.toString("base64"), cipher.getAuthTag().toString("base64"), bytes.toString("base64")].join(".");
}
function decrypt(value: string, key: Buffer, id: string): Customer {
  const [iv, tag, bytes] = value.split(".").map(part => Buffer.from(part, "base64"));
  const cipher = createDecipheriv("aes-256-gcm", key, iv); cipher.setAAD(Buffer.from(id)); cipher.setAuthTag(tag);
  return JSON.parse(Buffer.concat([cipher.update(bytes), cipher.final()]).toString("utf8")) as Customer;
}
export class OrderStore {
  db: DatabaseSync;
  encryptionKey: Buffer | null;
  constructor(path: string, encryptionKey: Buffer | null = null) {
    if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    this.db = new DatabaseSync(path, { timeout: 4000 }); this.encryptionKey = encryptionKey;
    if (path !== ":memory:") chmodSync(path, 0o600);
    this.db.exec("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;");
    this.db.exec(`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY, number TEXT NOT NULL UNIQUE, idempotency_key TEXT NOT NULL UNIQUE,
      fingerprint TEXT NOT NULL, mode TEXT NOT NULL, status TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1,
      public_json TEXT NOT NULL, customer_data TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    ); CREATE INDEX IF NOT EXISTS orders_created ON orders(created_at DESC);
    CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);`);
  }
  close() { this.db.close(); }
  consumeLimit(key: string, max: number, seconds: number): boolean {
    const now = Math.floor(Date.now() / 1000);
    this.db.prepare("DELETE FROM limits WHERE expires < ?").run(now);
    const row = this.db.prepare(`INSERT INTO limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=limits.count+1 RETURNING count`).get(key, now + seconds) as { count: number };
    return row.count <= max;
  }
  private read(row: OrderRow): StoredOrder {
    const data = JSON.parse(row.public_json) as Omit<ValidatedOrder, "customer">;
    const customer = row.mode === "live"
      ? this.encryptionKey ? decrypt(row.customer_data, this.encryptionKey, row.id) : (() => { throw new OrderError("Ключ доступа к данным не настроен.", 503); })()
      : JSON.parse(row.customer_data) as Customer;
    return { ...data, customer, id: row.id, number: row.number, status: row.status, version: row.version, createdAt: row.created_at, updatedAt: row.updated_at };
  }
  create(order: ValidatedOrder, key: string): { order: StoredOrder; repeated: boolean } {
    const fingerprint = orderFingerprint(order);
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const previous = this.db.prepare("SELECT * FROM orders WHERE idempotency_key=?").get(key) as OrderRow | undefined;
      if (previous) {
        if (previous.fingerprint !== fingerprint) throw new OrderError("Данные этой попытки изменились. Проверьте заявку перед новой отправкой.", 409);
        this.db.exec("COMMIT"); return { order: this.read(previous), repeated: true };
      }
      if (order.mode === "live" && !this.encryptionKey) throw new OrderError("Хранилище не готово к рабочим заявкам.", 503);
      // Demo contains only fixed fictional data and is intentionally temporary.
      this.db.prepare("DELETE FROM orders WHERE mode='demo' AND created_at < ?").run(new Date(Date.now() - 86400000).toISOString());
      const demoCount = this.db.prepare("SELECT count(*) AS n FROM orders WHERE mode='demo'").get() as { n: number };
      if (order.mode === "demo" && demoCount.n >= 1000) throw new OrderError("Демо-кабинет заполнен. Повторите позже.", 503);
      const id = randomUUID(); const now = new Date().toISOString();
      const number = (order.mode === "demo" ? "ДЕМО-" : "ЗК-") + now.slice(5,10).replace("-", "") + "-" + id.slice(0,8).toUpperCase();
      const { customer, ...publicData } = order;
      const customerData = order.mode === "live" ? encrypt(customer, this.encryptionKey!, id) : JSON.stringify(customer);
      this.db.prepare("INSERT INTO orders(id,number,idempotency_key,fingerprint,mode,status,public_json,customer_data,created_at,updated_at) VALUES(?,?,?,?,?,'new',?,?,?,?)")
        .run(id, number, key, fingerprint, order.mode, JSON.stringify(publicData), customerData, now, now);
      const row = this.db.prepare("SELECT * FROM orders WHERE id=?").get(id) as OrderRow;
      this.db.exec("COMMIT"); return { order: this.read(row), repeated: false };
    } catch(error) { if (this.db.isTransaction) this.db.exec("ROLLBACK"); throw error; }
  }
  list(mode: OrderMode, status: string = "all", limit = 40): { orders: StoredOrder[]; counts: Record<string, number> } {
    const rows = status === "all"
      ? this.db.prepare("SELECT * FROM orders WHERE mode=? ORDER BY created_at DESC LIMIT ?").all(mode, limit)
      : this.db.prepare("SELECT * FROM orders WHERE mode=? AND status=? ORDER BY created_at DESC LIMIT ?").all(mode, status, limit);
    const counts: Record<string, number> = { all: 0 };
    const grouped = this.db.prepare("SELECT status,count(*) AS n FROM orders WHERE mode=? GROUP BY status").all(mode) as { status: string; n: number }[];
    for (const row of grouped) { counts[row.status] = row.n; counts.all += row.n; }
    return { orders: (rows as OrderRow[]).map(row => this.read(row)), counts };
  }
  update(id: string, mode: OrderMode, status: OrderStatus, version: number): StoredOrder {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const row = this.db.prepare("SELECT * FROM orders WHERE id=? AND mode=?").get(id, mode) as OrderRow | undefined;
      if (!row) throw new OrderError("Заявка не найдена.", 404);
      if (row.version !== version) throw new OrderError("Статус уже изменился. Обновите список.", 409);
      if (!canTransition(row.status, status)) throw new OrderError("Этот переход статуса недоступен.", 409);
      this.db.prepare("UPDATE orders SET status=?,version=version+1,updated_at=? WHERE id=? AND version=?").run(status, new Date().toISOString(), id, version);
      const updated = this.db.prepare("SELECT * FROM orders WHERE id=?").get(id) as OrderRow;
      this.db.exec("COMMIT"); return this.read(updated);
    } catch(error) { if(this.db.isTransaction) this.db.exec("ROLLBACK"); throw error; }
  }
}
