"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Phone } from "lucide-react";
import { useCart } from "@/components/CartProvider";

type Fulfillment = "delivery" | "pickup";
type TimeMode = "soon" | "scheduled";

export default function OrderForm() {
  const { items, total } = useCart();
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderText, setOrderText] = useState("");
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
  const [timeMode, setTimeMode] = useState<TimeMode>("soon");

  const field = "w-full rounded-2xl border border-black/[0.08] bg-[#f8f8f6] px-4 py-3.5 text-sm text-[#222] outline-none transition placeholder:text-[#aaa] focus:border-[#ef4b2f] focus:bg-white";

  const copyText = async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        return;
      }

      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const success = document.execCommand("copy");
      document.body.removeChild(area);
      setCopied(success);
    } catch {
      setCopied(false);
    }
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = items.map((item) => item.name + " × " + item.quantity + " — " + (item.price * item.quantity) + " ₽");
    const destination = fulfillment === "delivery"
      ? "Адрес: " + String(data.get("address") || "")
      : "Самовывоз: " + String(data.get("pickupPoint") || "");
    const time = timeMode === "scheduled"
      ? "Ко времени: " + String(data.get("scheduledTime") || "")
      : "Время: как можно скорее";

    const message = [
      "Заказ Император64",
      "",
      ...lines,
      "",
      "Итого: " + total + " ₽",
      "Имя: " + String(data.get("name") || ""),
      "Телефон: " + String(data.get("phone") || ""),
      "Получение: " + (fulfillment === "delivery" ? "Доставка" : "Самовывоз"),
      destination,
      "Оплата: " + String(data.get("payment") || ""),
      time,
      "Комментарий: " + String(data.get("comment") || ""),
    ].join("\n");

    setOrderText(message);
    await copyText(message);
    setReady(true);
  };

  if (ready) {
    return (
      <div className="rounded-[24px] bg-white p-6 shadow-sm sm:p-7">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#eaf8ef] text-[#269b57]"><CheckCircle2 size={25} /></div>
        <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em]">Заказ сформирован</h2>
        <p className="mt-2 text-sm leading-6 text-[#777]">
          Это демо-сайт, поэтому заказ не отправляется в ресторан автоматически. {copied ? "Данные заказа скопированы — их можно передать администратору." : "Можно скопировать заказ вручную и передать администратору."}
        </p>
        <textarea
          readOnly
          value={orderText}
          aria-label="Сформированный заказ"
          className="mt-5 h-44 w-full resize-none rounded-2xl border border-black/[0.07] bg-[#f8f8f6] p-4 text-xs leading-5 text-[#555] outline-none"
          onFocus={(event) => event.currentTarget.select()}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="tel:+79272253863" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#ef4b2f] px-5 text-sm font-semibold text-white"><Phone size={16} />Позвонить</a>
          <button type="button" onClick={() => copyText(orderText)} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f3f3f1] px-5 text-sm font-medium text-[#666]">
            <Copy size={15} />{copied ? "Заказ скопирован" : "Скопировать заказ"}
          </button>
          <button type="button" onClick={() => { setReady(false); setCopied(false); }} className="inline-flex h-12 items-center rounded-full px-4 text-sm font-medium text-[#777] hover:bg-[#f3f3f1]">
            Изменить данные
          </button>
        </div>
      </div>
    );
  }

  const optionClass = (active: boolean) =>
    "cursor-pointer rounded-2xl border p-3.5 text-sm font-medium transition " +
    (active ? "border-[#ef4b2f] bg-[#fff3ef] text-[#333]" : "border-black/[0.08] bg-[#f8f8f6] text-[#666]");

  return (
    <form onSubmit={submit} className="rounded-[24px] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold tracking-[-0.02em]">Контактные данные</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#777]">
          Имя
          <input name="name" autoComplete="name" required className={field + " mt-2"} placeholder="Как к вам обращаться" />
        </label>
        <label className="text-xs font-medium text-[#777]">
          Телефон
          <input name="phone" autoComplete="tel" required minLength={7} inputMode="tel" className={field + " mt-2"} placeholder="+7 (___) ___-__-__" />
        </label>
      </div>

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
              className="mr-2 accent-[#ef4b2f]"
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
              className="mr-2 accent-[#ef4b2f]"
            />
            Самовывоз
          </label>
        </div>
      </div>

      {fulfillment === "delivery" ? (
        <label className="mt-5 block text-xs font-medium text-[#777]">
          Адрес
          <input name="address" autoComplete="street-address" required className={field + " mt-2"} placeholder="Улица, дом, квартира" />
        </label>
      ) : (
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

      <label className="mt-5 block text-xs font-medium text-[#777]">
        Комментарий
        <textarea name="comment" rows={4} className={field + " mt-2 resize-none"} placeholder="Домофон, подъезд, пожелания к заказу" />
      </label>

      <button type="submit" className="mt-6 h-13 w-full rounded-full bg-[#ef4b2f] text-sm font-semibold text-white transition hover:bg-[#d83e26] active:scale-[.99]">
        Сформировать заказ
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-[#aaa]">В демо-версии данные заказа не уходят в ресторан автоматически.</p>
    </form>
  );
}
