import Link from "next/link";
import { ArrowLeft, Clock3, MapPin, Phone } from "lucide-react";
import OrderForm from "@/components/OrderForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#efe8d9] text-[#171411]">
      <header className="border-b border-black/10">
        <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]"><ArrowLeft size={16} />Назад</Link>
          <div className="text-[11px] font-semibold uppercase tracking-[0.26em]">Император64</div>
          <a href="tel:+79272253863" className="inline-flex items-center gap-2 text-xs"><Phone size={15} /><span className="hidden sm:inline">Позвонить</span></a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b5352d]">оформление</div>
            <h1 className="serif mt-3 text-5xl italic sm:text-7xl">Почти готово.</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#746d62]">Оставьте контактные данные. Администратор свяжется с вами для подтверждения заказа и финальных условий доставки.</p>
            <div className="mt-8"><OrderForm /></div>
          </section>

          <aside className="border-t border-black/20 lg:mt-24">
            <div className="border-b border-black/15 py-6">
              <Clock3 size={18} className="text-[#b5352d]" />
              <h2 className="mt-4 font-semibold">Ежедневно 10:30—22:30</h2>
              <p className="mt-2 text-sm leading-6 text-[#746d62]">Поздние заказы могут потребовать дополнительного подтверждения.</p>
            </div>
            <div className="border-b border-black/15 py-6">
              <MapPin size={18} className="text-[#b5352d]" />
              <h2 className="mt-4 font-semibold">Доставка по Саратову</h2>
              <p className="mt-2 text-sm leading-6 text-[#746d62]">Минимальная сумма зависит от расстояния до ближайшей точки.</p>
            </div>
            <div className="py-6">
              <div className="text-xs uppercase tracking-[0.18em] text-[#8f877b]">Основной телефон</div>
              <a href="tel:+79272253863" className="serif mt-2 inline-block text-3xl italic hover:text-[#b5352d]">+7 927 225-38-63</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
