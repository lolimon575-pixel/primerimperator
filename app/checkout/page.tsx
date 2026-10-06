"use client";

import Link from "next/link";
import { ArrowLeft, Clock3, MapPin, Phone, ShoppingBag } from "lucide-react";
import OrderForm from "@/components/OrderForm";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const { items, total, hydrated } = useCart();

  return (
    <main className="min-h-screen bg-[#f6f6f4] text-[#1f1f1f]">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/menu" className="inline-flex items-center gap-2 text-xs font-semibold text-[#666]"><ArrowLeft size={16} />К меню</Link>
          <strong className="text-sm">Оформление</strong>
          <a href="tel:+79272253863" className="inline-flex items-center gap-2 text-xs font-medium text-[#666]"><Phone size={15} /><span className="hidden sm:inline">Позвонить</span></a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {!hydrated ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="h-[560px] animate-pulse rounded-[24px] bg-white" />
            <div className="h-[360px] animate-pulse rounded-[24px] bg-white" />
          </div>
        ) : items.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[28px] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#fff0ec] text-[#d83e26]"><ShoppingBag size={26} /></div>
            <h1 className="mt-5 text-2xl font-bold">Корзина пустая</h1>
            <p className="mt-2 text-sm text-[#888]">Сначала добавьте блюда, а затем возвращайтесь к оформлению.</p>
            <Link href="/menu" className="mt-6 inline-flex h-12 items-center rounded-full bg-[#d83e26] px-6 text-sm font-semibold text-white">Открыть меню</Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#d83e26]">Последний шаг</p>
              <h1 className="mt-1 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">Оформление заказа</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#777]">Проверьте блюда и выберите способ получения. В демонстрации сохраняются только тестовые заявки с вымышленными контактами.</p>
              <div className="mt-6"><OrderForm /></div>
            </section>

            <aside className="h-fit rounded-[24px] bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Ваш заказ</h2>
                <Link href="/menu" className="text-xs font-medium text-[#d83e26]">Изменить</Link>
              </div>

              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{item.name}</div>
                      <div className="text-xs text-[#999]">{item.quantity} × {item.price.toLocaleString("ru-RU")} ₽</div>
                    </div>
                    <strong className="whitespace-nowrap">{(item.quantity * item.price).toLocaleString("ru-RU")} ₽</strong>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/[0.07] pt-4">
                <span className="text-sm text-[#777]">Итого</span>
                <strong className="text-xl">{total.toLocaleString("ru-RU")} ₽</strong>
              </div>

              <div className="mt-6 space-y-5 border-t border-black/[0.07] pt-5">
                <div className="flex gap-3">
                  <Clock3 size={18} className="mt-0.5 shrink-0 text-[#d83e26]" />
                  <div><strong className="text-sm">10:30—22:30 ежедневно</strong><p className="mt-1 text-xs leading-5 text-[#888]">Доставка вместе с приготовлением обычно занимает от 60 минут.</p></div>
                </div>
                <div className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#d83e26]" />
                  <div><strong className="text-sm">Доставка по Саратову</strong><p className="mt-1 text-xs leading-5 text-[#888]">Минимальная сумма зависит от расстояния и подтверждается администратором.</p></div>
                </div>
                <div className="rounded-2xl bg-[#fff4f1] p-3 text-xs leading-5 text-[#9c3f2d]">
                  После 21:40 заказ принимается с предоплатой не менее 50%. Для заказов свыше 2 000 ₽ также предусмотрена предоплата.
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
