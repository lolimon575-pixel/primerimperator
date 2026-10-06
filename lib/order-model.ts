import { createHash } from "node:crypto";
import { menu } from "../data/menu.ts";

export const pickupPoints = ["ул. Огородная, 140", "ул. Оржевского, 5", "ул. Слонова, 1"] as const;
export const statuses = ["new", "confirmed", "preparing", "ready", "completed", "cancelled"] as const;
export type OrderStatus = typeof statuses[number];
export type OrderMode = "demo" | "live";
export type OrderLine = { id: string; name: string; price: number; quantity: number };
export type Customer = { name: string; phone: string; address: string; comment: string };
export type ValidatedOrder = {
  mode: OrderMode; items: OrderLine[]; total: number; fulfillment: "delivery" | "pickup";
  pickupPoint: string; payment: string; timeMode: "soon" | "scheduled"; scheduledTime: string;
  customer: Customer;
};
export class OrderError extends Error {
  status: number;
  constructor(message: string, status = 400) { super(message); this.status = status; }
}
const products = new Map(menu.flatMap(section => section.items).map(item => [item.id, item]));
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new OrderError("Проверьте данные заявки.");
  return value as Record<string, unknown>;
}
function text(value: unknown, max: number, required = false): string {
  if (typeof value !== "string") { if (!required && value == null) return ""; throw new OrderError("Проверьте поля заявки."); }
  const cleaned = value.trim();
  if (cleaned.length > max || (required && !cleaned) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(cleaned)) throw new OrderError("Проверьте длину и заполнение полей.");
  return cleaned;
}
export function validateKey(value: unknown): string {
  if (typeof value !== "string" || !/^[a-zA-Z0-9_-]{16,80}$/.test(value)) throw new OrderError("Не удалось определить номер попытки. Обновите страницу.");
  return value;
}
export function validateOrder(raw: unknown, mode: OrderMode): ValidatedOrder {
  const data = object(raw);
  if (data.mode !== mode) throw new OrderError("Режим сайта изменился. Обновите страницу.", 409);
  if (!Array.isArray(data.items) || !data.items.length || data.items.length > 80) throw new OrderError("Добавьте блюда в корзину.");
  const merged = new Map<string, number>();
  for (const rawItem of data.items) {
    const item = object(rawItem);
    if (typeof item.id !== "string" || !products.has(item.id)) throw new OrderError("Блюдо недоступно. Обновите меню.");
    if (typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new OrderError("Проверьте количество блюд.");
    const quantity = (merged.get(item.id) ?? 0) + item.quantity;
    if (quantity > 99) throw new OrderError("Слишком много одинаковых блюд.");
    merged.set(item.id, quantity);
  }
  const items = [...merged].sort(([a], [b]) => a.localeCompare(b)).map(([id, quantity]) => {
    const product = products.get(id)!;
    return { id, name: product.name, price: product.price, quantity };
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (data.expectedTotal !== undefined && data.expectedTotal !== total) throw new OrderError("Стоимость меню изменилась. Обновите страницу и проверьте корзину.", 409);
  if (total > 300000 || items.reduce((sum, item) => sum + item.quantity, 0) > 200) throw new OrderError("Крупный заказ нужно согласовать с администратором.");
  if (data.fulfillment !== "delivery" && data.fulfillment !== "pickup") throw new OrderError("Выберите способ получения.");
  const fulfillment = data.fulfillment;
  if (mode === "live" && fulfillment === "delivery" && total < 600) throw new OrderError("Минимальная сумма доставки — 600 ₽. Можно выбрать самовывоз.");
  const pickupPoint = fulfillment === "pickup" ? text(data.pickupPoint, 100, true) : "";
  if (fulfillment === "pickup" && !pickupPoints.some(point => point === pickupPoint)) throw new OrderError("Выберите точку самовывоза из списка.");
  const payment = text(data.payment, 50, true);
  if (!["Наличными при получении", "Картой курьеру"].includes(payment)) throw new OrderError("Выберите доступный способ оплаты.");
  if (data.timeMode !== "soon" && data.timeMode !== "scheduled") throw new OrderError("Выберите время получения.");
  const timeMode = data.timeMode;
  const scheduledTime = timeMode === "scheduled" ? text(data.scheduledTime, 5, true) : "";
  if (timeMode === "scheduled" && (!/^\d{2}:\d{2}$/.test(scheduledTime) || scheduledTime < "10:30" || scheduledTime > "22:30" || Number(scheduledTime.slice(3)) > 59)) throw new OrderError("Выберите время с 10:30 до 22:30.");
  let customer: Customer;
  if (mode === "demo") {
    // Demonstration requests never retain user-entered contact details.
    customer = { name: "Тестовый гость", phone: "+79990000000", address: fulfillment === "delivery" ? "Тестовый адрес" : "", comment: "Демонстрация — не готовить и не доставлять" };
  } else {
    const rawCustomer = object(data.customer);
    const name = text(rawCustomer.name, 80, true);
    const phone = text(rawCustomer.phone, 32, true).replace(/[\s()+-]/g, "");
    if (!/^\d{10,15}$/.test(phone)) throw new OrderError("Проверьте номер телефона.");
    const address = fulfillment === "delivery" ? text(rawCustomer.address, 200, true) : "";
    customer = { name, phone: "+" + phone, address, comment: text(rawCustomer.comment, 500) };
  }
  return { mode, items, total, fulfillment, pickupPoint, payment, timeMode, scheduledTime, customer };
}
export function orderFingerprint(order: ValidatedOrder): string {
  return createHash("sha256").update(JSON.stringify(order)).digest("hex");
}
const transitions: Record<OrderStatus, readonly OrderStatus[]> = {
  new: ["confirmed", "cancelled"], confirmed: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"], ready: ["completed", "cancelled"], completed: [], cancelled: [],
};
export function canTransition(from: OrderStatus, to: OrderStatus): boolean { return transitions[from]?.includes(to) ?? false; }
