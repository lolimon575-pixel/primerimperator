"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Phone } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function OrderForm() {
  const { items, total } = useCart();
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const field = "w-full rounded-2xl border border-black/[0.08] bg-[#f8f8f6] px-4 py-3.5 text-sm text-[#222] outline-none transition placeholder:text-[#aaa] focus:border-[#ef4b2f] focus:bg-white";

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = items.map((item) => item.name + " × " + item.quantity + " — " + (item.price * item.quantity) + " ₽");
    const message = [
      "Заказ Император64",
      "",
      ...lines,
      "",
      "Итого: " + total + " ₽",
      "Имя: " + String(data.get("name") || ""),
      "Телефон: " + String(data.get("phone") || ""),
      "Получение: " + String(data.get("delivery") || ""),
      "Адрес: " + String(data.get("address") || ""),
      "Оплата: " + String(data.get("payment") || ""),
      "Комментарий: " + String(data.get("comment") || ""),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    setReady(true);
  };

  if (ready) {
    return (
      <div className="rounded-[24px] bg-white p-6 shadow-sm sm:p-7">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#eaf8ef] text-[#269b57]"><CheckCircle2 size={25} /></div>
        <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em]">Заказ сформирован</h2>
        <p className="mt-2 text-sm leading-6 text-[#777]">
          Это демо-сайт, поэтому заказ не отправляется в ресторан автоматически. {copied ? "Данные заказа уже скопированы — их можно передать администратору по телефону." : "Позвоните администратору и подтвердите заказ."}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href="tel:+79272253863" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#ef4b2f] px-5 text-sm font-semibold text-white"><Phone size={16} />Позвонить</a>
          {copied && <span className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f3f3f1] px-5 text-sm font-medium text-[#666]"><Copy size={15} />Заказ скопирован</span>}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[24px] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold tracking-[-0.02em]">Контактные данные</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#777]">Имя<input name="name" required className={field + " mt-2"} placeholder="Как к вам обращаться" /></label>
        <label className="text-xs font-medium text-[#777]">Телефон<input name="phone" required inputMode="tel" className={field + " mt-2"} placeholder="+7 (___) ___-__-__" /></label>
      </div>
      <div className="mt-5">
        <p className="text-xs font-medium text-[#777]">Получение заказа</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="cursor-pointer rounded-2xl border border-[#ef4b2f] bg-[#fff3ef] p-3.5 text-sm font-medium"><input type="radio" name="delivery" value="Доставка" defaultChecked className="mr-2 accent-[#ef4b2f]" />Доставка</label>
          <label className="cursor-pointer rounded-2xl border border-black/[0.08] bg-[#f8f8f6] p-3.5 text-sm font-medium"><input type="radio" name="delivery" value="Самовывоз" className="mr-2 accent-[#ef4b2f]" />Самовывоз</label>
        </div>
      </div>
      <label className="mt-5 block text-xs font-medium text-[#777]">Адрес<input name="address" className={field + " mt-2"} placeholder="Улица, дом, квартира" /></label>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#777]">Способ оплаты<select name="payment" className={field + " mt-2 appearance-none"} defaultValue="Наличными при получении"><option>Наличными при получении</option><option>Картой курьеру</option></select></label>
        <label className="text-xs font-medium text-[#777]">Время<select name="time" className={field + " mt-2 appearance-none"} defaultValue="Как можно скорее"><option>Как можно скорее</option><option>К определённому времени</option></select></label>
      </div>
      <label className="mt-5 block text-xs font-medium text-[#777]">Комментарий<textarea name="comment" rows={4} className={field + " mt-2 resize-none"} placeholder="Домофон, подъезд, пожелания к заказу" /></label>
      <button type="submit" className="mt-6 h-13 w-full rounded-full bg-[#ef4b2f] text-sm font-semibold text-white transition hover:bg-[#d83e26] active:scale-[.99]">Сформировать заказ</button>
      <p className="mt-3 text-center text-xs leading-5 text-[#aaa]">В демо-версии данные заказа не уходят в ресторан автоматически.</p>
    </form>
  );
}
