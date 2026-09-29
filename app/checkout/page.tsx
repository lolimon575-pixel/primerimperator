import Link from "next/link";
import { ArrowLeft, Clock3, MapPin, Phone } from "lucide-react";
import OrderForm from "@/components/OrderForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] text-[#1f1f1f]">
      <header className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#666]"><ArrowLeft size={16} />Назад</Link>
          <strong className="text-sm">Оформление</strong>
          <a href="tel:+79272253863" className="inline-flex items-center gap-2 text-xs font-medium text-[#666]"><Phone size={15} /><span className="hidden sm:inline">Позвонить</span></a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ef4b2f]">Последний шаг</p>
            <h1 className="mt-1 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">Оформление заказа</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#777]">Укажите контакты и адрес. Администратор подтвердит заказ по телефону.</p>
            <div className="mt-6"><OrderForm /></div>
          </section>

          <aside className="h-fit rounded-[24px] bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold">Полезно знать</h2>
            <div className="mt-5 space-y-5">
              <div className="flex gap-3"><Clock3 size={18} className="mt-0.5 shrink-0 text-[#ef4b2f]" /><div><strong className="text-sm">10:30—22:30 ежедневно</strong><p className="mt-1 text-xs leading-5 text-[#888]">После 21:40 заказ может потребовать предоплату.</p></div></div>
              <div className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-[#ef4b2f]" /><div><strong className="text-sm">Доставка по Саратову</strong><p className="mt-1 text-xs leading-5 text-[#888]">Минимальная сумма зависит от расстояния.</p></div></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
