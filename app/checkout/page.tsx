import Link from "next/link";
import { ArrowLeft, Clock3, MapPin, ShieldCheck } from "lucide-react";
import OrderForm from "@/components/OrderForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#080807] px-4 py-6 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"><ArrowLeft size={17} />Вернуться в меню</Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e7b45b]">Император64</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Оформление заказа</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/45">Оставьте контакты и адрес. Администратор подтвердит заказ и условия доставки.</p>
            <div className="mt-8"><OrderForm /></div>
          </section>
          <aside className="h-fit rounded-[28px] border border-white/10 bg-white/[0.035] p-6 lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold">Перед оформлением</h2>
            <div className="mt-5 space-y-5 text-sm text-white/50">
              <div className="flex gap-3"><Clock3 className="mt-0.5 shrink-0 text-[#e7b45b]" size={19} /><div><strong className="block text-white">Ежедневно 10:30—22:30</strong><span>Заказы после 21:40 могут требовать предоплату.</span></div></div>
              <div className="flex gap-3"><MapPin className="mt-0.5 shrink-0 text-[#e7b45b]" size={19} /><div><strong className="block text-white">Доставка по Саратову</strong><span>Минимальная сумма зависит от расстояния до точки.</span></div></div>
              <div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-[#e7b45b]" size={19} /><div><strong className="block text-white">Подтверждение администратором</strong><span>Финальные условия заказа уточняются по телефону.</span></div></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
