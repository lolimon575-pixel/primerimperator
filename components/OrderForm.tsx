"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Copy, LoaderCircle } from "lucide-react";
import { useCart } from "@/components/CartProvider";

type Fulfillment = "delivery" | "pickup";
type TimeMode = "soon" | "scheduled";
type Receipt = { number: string; mode: "demo" | "live"; total: number; items: { name: string; price: number; quantity: number }[] };

export default function OrderForm() {
  const { items, total } = useCart();
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderText, setOrderText] = useState("");
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
  const [timeMode, setTimeMode] = useState<TimeMode>("soon");
  const [mode, setMode] = useState<"demo" | "live">("demo");
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const attempt = useRef<{ key: string; body: string } | null>(null);
  const submitting = useRef(false);
  const submission = useRef<AbortController | null>(null);

  const loadConfig = async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/orders/config", { cache: "no-store" });
      if (!response.ok) throw new Error();
      const config = await response.json();
      if (config.mode !== "demo" && config.mode !== "live") throw new Error();
      setMode(config.mode); setAvailable(config.available === true);
      if (!config.available) setError("Приём заявок ещё не подключён. Попробуйте позже.");
    } catch { setAvailable(false); setError("Не удалось проверить приём заявок. Повторите проверку."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void loadConfig(); return () => submission.current?.abort(); }, []);

  const field = "w-full rounded-2xl border border-black/[0.08] bg-[#f8f8f6] px-4 py-3.5 text-sm text-[#222] outline-none transition placeholder:text-[#aaa] focus:border-[#d83e26] focus:bg-white";

  const copyText = async (text: string) => {
    let success = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch {}
    }

    if (!success) {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        success = document.execCommand("copy");
        document.body.removeChild(area);
      } catch {
        success = false;
      }
    }

    setCopied(success);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current || loading || !available || !items.length) return;
    submitting.current = true; setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    const payload = {
      mode, items: items.map(({ id, quantity }) => ({ id, quantity })), expectedTotal: total, fulfillment,
      pickupPoint: String(data.get("pickupPoint") || ""), payment: String(data.get("payment") || ""), timeMode,
      scheduledTime: String(data.get("scheduledTime") || ""),
      ...(mode === "live" ? { customer: { name: String(data.get("name") || ""), phone: String(data.get("phone") || ""), address: String(data.get("address") || ""), comment: String(data.get("comment") || "") } } : {}),
    };
    const body = JSON.stringify(payload);
    if (!attempt.current || attempt.current.body !== body) attempt.current = { key: crypto.randomUUID(), body };
    const controller = new AbortController(); submission.current = controller;
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, idempotencyKey: attempt.current.key }), signal: controller.signal });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Сохранение не подтверждено. Повторите отправку.");
      const saved = result as Receipt;
      setReceipt(saved);
      setOrderText([
        (saved.mode === "demo" ? "Тестовая заявка " : "Заявка ") + saved.number,
        ...saved.items.map(item => item.name + " × " + item.quantity + " — " + item.price * item.quantity + " ₽"),
        "Итого по меню: " + saved.total + " ₽",
        "Получение: " + (fulfillment === "delivery" ? "Доставка" : "Самовывоз: " + payload.pickupPoint),
        saved.mode === "demo" ? "Демонстрация: ресторану не отправляется, готовить и доставлять не нужно." : "Сохранено. Ожидает подтверждения администратором; стоимость доставки уточняется при подтверждении.",
      ].join("\n"));
      setCopied(false); setReady(true);
    } catch (error) {
      setError(error instanceof Error && error.name !== "AbortError" ? error.message : "Не получили подтверждение сохранения. Повторите отправку: та же попытка не создаст дубль.");
    } finally { clearTimeout(timer); submitting.current = false; setBusy(false); }
  };

  if (ready) {
    return (
      <div aria-live="polite" className="rounded-[24px] bg-white p-6 shadow-sm sm:p-7">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#eaf8ef] text-[#269b57]"><CheckCircle2 size={25} /></div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#d83e26]">{receipt?.number}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em]">{receipt?.mode === "demo" ? "Тестовая заявка сохранена" : "Заявка сохранена"}</h2>
        <p className="mt-2 text-sm leading-6 text-[#777]">
          {receipt?.mode === "demo" ? "Заявка появилась в демо-кабинете. Ресторан её не получает; приготовление, доставка и оплата не выполняются. Контакты тестового гостя вымышлены." : "Заявка появилась в кабинете. Ожидайте подтверждения администратором: до него заказ не считается принятым в работу."}
        </p>
        <textarea
          readOnly
          value={orderText}
          aria-label="Сформированный заказ"
          className="mt-5 h-44 w-full resize-none rounded-2xl border border-black/[0.07] bg-[#f8f8f6] p-4 text-xs leading-5 text-[#555] outline-none"
          onFocus={(event) => event.currentTarget.select()}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => copyText(orderText)} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f3f3f1] px-5 text-sm font-medium text-[#666]">
            <Copy size={15} />{copied ? "Заказ скопирован" : "Скопировать заказ"}
          </button>
          <button type="button" onClick={() => { setReady(false); setCopied(false); setReceipt(null); attempt.current = null; }} className="inline-flex h-12 items-center rounded-full px-4 text-sm font-medium text-[#777] hover:bg-[#f3f3f1]">
            {mode === "demo" ? "Создать новую тестовую заявку" : "Новая заявка"}
          </button>
        </div>
      </div>
    );
  }

  const optionClass = (active: boolean) =>
    "cursor-pointer rounded-2xl border p-3.5 text-sm font-medium transition " +
    (active ? "border-[#d83e26] bg-[#fff3ef] text-[#333]" : "border-black/[0.08] bg-[#f8f8f6] text-[#666]");

  return (
    <form onSubmit={submit} className="rounded-[24px] bg-white p-5 shadow-sm sm:p-6">
      {mode === "demo" && <div className="mb-5 rounded-2xl bg-[#fff3ec] px-4 py-3 text-xs leading-5 text-[#a6472e]"><strong className="block">Проверка демо-кабинета</strong>Используем вымышленные контакты. Тестовая заявка сохраняется в демонстрации, ресторан её не получает.</div>}
      <h2 className="text-xl font-semibold tracking-[-0.02em]">{mode === "demo" ? "Тестовая заявка" : "Контактные данные"}</h2>

      {mode === "live" && <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#777]">
          Имя
          <input name="name" autoComplete="name" maxLength={80} required className={field + " mt-2"} placeholder="Как к вам обращаться" />
        </label>
        <label className="text-xs font-medium text-[#777]">
          Телефон
          <input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={32} inputMode="tel" className={field + " mt-2"} placeholder="+7 (___) ___-__-__" />
        </label>
      </div>}

      <div className="mt-5">
        <p className="text-xs font-medium text-[#777]">Получение заказа</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className={optionClass(fulfillment === "delivery")}>
            <input
              type="radio"
              name="delivery"
              value="Доставка"
              checked={fulfillment === "delivery"}
              onChange={() => setFulfillment("delivery")}
              className="mr-2 accent-[#d83e26]"
            />
            Доставка
          </label>
          <label className={optionClass(fulfillment === "pickup")}>
            <input
              type="radio"
              name="delivery"
              value="Самовывоз"
              checked={fulfillment === "pickup"}
              onChange={() => setFulfillment("pickup")}
              className="mr-2 accent-[#d83e26]"
            />
            Самовывоз
          </label>
        </div>
      </div>

      {fulfillment === "delivery" ? mode === "live" ? (
        <label className="mt-5 block text-xs font-medium text-[#777]">
          Адрес
          <input name="address" autoComplete="street-address" maxLength={200} required className={field + " mt-2"} placeholder="Улица, дом, квартира" />
        </label>
      ) : <div className="mt-4 rounded-2xl bg-[#f8f8f6] p-4 text-xs text-[#888]">Адрес для демонстрации: тестовый адрес</div> : (
        <label className="mt-5 block text-xs font-medium text-[#777]">
          Точка самовывоза
          <select name="pickupPoint" required className={field + " mt-2 appearance-none"} defaultValue="">
            <option value="" disabled>Выберите точку</option>
            <option>ул. Огородная, 140</option>
            <option>ул. Оржевского, 5</option>
            <option>ул. Слонова, 1</option>
          </select>
        </label>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#777]">
          Способ оплаты
          <select name="payment" className={field + " mt-2 appearance-none"} defaultValue="Наличными при получении">
            <option>Наличными при получении</option>
            <option>Картой курьеру</option>
          </select>
        </label>

        <label className="text-xs font-medium text-[#777]">
          Время
          <select
            name="timeMode"
            className={field + " mt-2 appearance-none"}
            value={timeMode}
            onChange={(event) => setTimeMode(event.target.value as TimeMode)}
          >
            <option value="soon">Как можно скорее</option>
            <option value="scheduled">К определённому времени</option>
          </select>
        </label>
      </div>

      {timeMode === "scheduled" && (
        <label className="mt-5 block text-xs font-medium text-[#777]">
          Желаемое время
          <input name="scheduledTime" type="time" min="10:30" max="22:30" required className={field + " mt-2"} />
        </label>
      )}

      {mode === "live" && <label className="mt-5 block text-xs font-medium text-[#777]">
        Комментарий
        <textarea name="comment" rows={4} maxLength={500} className={field + " mt-2 resize-none"} placeholder="Домофон, подъезд, пожелания к заказу" />
      </label>}

      {error && <div role="alert" className="mt-4 rounded-2xl bg-[#fff1ed] p-4 text-sm leading-6 text-[#a6472e]">{error}{!available && !loading && <button type="button" onClick={() => void loadConfig()} className="mt-2 block font-semibold underline underline-offset-4">Повторить проверку</button>}</div>}
      <button type="submit" disabled={busy || loading || !available} className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#d83e26] text-sm font-semibold text-white transition hover:bg-[#d83e26] active:scale-[.99] disabled:cursor-wait disabled:opacity-50">
        {(busy || loading) && <LoaderCircle size={17} className="animate-spin" />}{busy ? "Сохраняем…" : loading ? "Проверяем приём заявок…" : mode === "demo" ? "Сохранить тестовую заявку" : "Отправить заявку"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-[#aaa]">{mode === "demo" ? "Демо-заявки могут очищаться после перезапуска демонстрации." : "Приготовление начинается после подтверждения администратором."}</p>
    </form>
  );
}
