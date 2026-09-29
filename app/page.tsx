"use client";

import Link from "next/link";
import { ChevronRight, Clock3, MapPin, Phone, Search, ShoppingBag, Sparkles, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import MobileNav from "@/components/MobileNav";
import { useCart } from "@/components/CartProvider";
import { menu } from "@/data/menu";
import { useMemo, useState } from "react";

const heroImage = "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=86";
const promoImage = "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=84";
const pizzaImage = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=84";

const deliveryZones = [
  ["до 6 км", "от 600 ₽"],
  ["7–9 км", "от 1 200 ₽"],
  ["10–13 км", "от 1 500 ₽"],
  ["13–16 км", "от 2 000 ₽"],
];

const locations = [
  ["ул. Огородная, 140", "+7 (927) 225-38-63", "tel:+79272253863"],
  ["ул. Оржевского, 5", "+7 (937) 225-60-61", "tel:+79372256061"],
  ["ул. Слонова, 1", "+7 (909) 333-93-38", "tel:+79093339338"],
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cartOpen, setCartOpen] = useState(false);
  const { items, count, add, increase, decrease, remove, quantityOf } = useCart();

  const products = useMemo(() => menu.flatMap((section) => section.items), []);
  const popular = products.slice(0, 8);
  const filtered = activeCategory === "Все" ? products : products.filter((p) => p.category === activeCategory);
  const premium = products.find((p) => p.id === "set-premium");

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    requestAnimationFrame(() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main id="home" className="min-h-screen bg-[#f6f6f4] pb-24 text-[#1f1f1f] md:pb-0">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#ef4b2f] text-lg font-black text-white">И</span>
              <span className="hidden sm:block">
                <strong className="block text-[15px] tracking-[-0.01em]">Император64</strong>
                <span className="block text-[11px] text-[#8a8a8a]">суши · роллы · пицца</span>
              </span>
            </Link>
            <a href="#contacts" className="hidden items-center gap-2 rounded-full bg-[#f3f3f1] px-4 py-2 text-xs font-medium text-[#555] md:inline-flex">
              <MapPin size={15} className="text-[#ef4b2f]" /> Саратов
            </a>
          </div>

          <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#555] lg:flex">
            <a href="#menu" className="transition hover:text-[#ef4b2f]">Меню</a>
            <a href="#promo" className="transition hover:text-[#ef4b2f]">Акции</a>
            <a href="#delivery" className="transition hover:text-[#ef4b2f]">Доставка</a>
            <a href="#contacts" className="transition hover:text-[#ef4b2f]">Контакты</a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 text-xs text-[#777] md:flex"><span className="live-dot h-2 w-2 rounded-full bg-[#2eb872]" />10:30—22:30</div>
            <a href="tel:+79272253863" className="hidden h-10 items-center gap-2 rounded-full bg-[#f3f3f1] px-4 text-xs font-medium md:inline-flex"><Phone size={15} />Позвонить</a>
            <button type="button" onClick={() => setCartOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1f1f1f] px-4 text-xs font-semibold text-white">
              <ShoppingBag size={16} /><span className="hidden sm:inline">Корзина</span><span className="rounded-full bg-white/15 px-1.5 py-0.5">{count}</span>
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="grid gap-3 lg:grid-cols-[1.65fr_.75fr]">
          <div className="relative min-h-[410px] overflow-hidden rounded-[28px] bg-[#ef4b2f] sm:min-h-[470px]">
            <img src={heroImage} alt="Суши и роллы" className="absolute inset-y-0 right-0 h-full w-[62%] object-cover object-center sm:w-[58%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#ef4b2f] via-[#ef4b2f]/95 to-transparent sm:via-[#ef4b2f]/75" />
            <div className="relative z-10 flex h-full min-h-[410px] max-w-[68%] flex-col justify-between p-6 text-white sm:min-h-[470px] sm:max-w-[52%] sm:p-9">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-[11px] font-semibold backdrop-blur"><Sparkles size={14} /> Хит недели</div>
              <div>
                <h1 className="text-[42px] font-bold leading-[.96] tracking-[-0.055em] sm:text-[64px]">Сет Премиум</h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/85 sm:text-base">4 ролла · 1150 г. Большой сет для вечера дома или компании.</p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <strong className="text-3xl tracking-[-0.04em] sm:text-4xl">1 245 ₽</strong>
                  {premium && (
                    <button type="button" onClick={() => add(premium)} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#ef4b2f] transition active:scale-95">
                      {quantityOf(premium.id) ? "В корзине · " + quantityOf(premium.id) : "Добавить"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div id="promo" className="no-scrollbar flex gap-3 overflow-x-auto lg:grid lg:overflow-visible">
            <button type="button" onClick={() => chooseCategory("Сеты")} className="relative min-h-[190px] min-w-[82%] overflow-hidden rounded-[26px] bg-[#262626] p-5 text-left text-white sm:min-w-[46%] lg:min-w-0">
              <img src={promoImage} alt="" className="absolute bottom-0 right-0 h-[75%] w-[58%] object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#262626] via-[#262626]/90 to-transparent" />
              <div className="relative z-10 max-w-[58%]">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold">АКЦИЯ</span>
                <h2 className="mt-4 text-2xl font-semibold leading-tight">Подарок от 1 300 ₽</h2>
                <p className="mt-2 text-xs leading-5 text-white/60">Нажмите, чтобы открыть сеты.</p>
              </div>
            </button>

            <button type="button" onClick={() => chooseCategory("Пицца")} className="relative min-h-[190px] min-w-[82%] overflow-hidden rounded-[26px] bg-[#ffb547] p-5 text-left sm:min-w-[46%] lg:min-w-0">
              <img src={pizzaImage} alt="" className="absolute bottom-[-14px] right-[-20px] h-[84%] w-[58%] rotate-[-5deg] object-cover" />
              <div className="relative z-10 max-w-[58%]">
                <span className="rounded-full bg-white/55 px-2.5 py-1 text-[10px] font-semibold">ПИЦЦА</span>
                <h2 className="mt-4 text-2xl font-semibold leading-tight">Много начинки</h2>
                <p className="mt-2 text-xs leading-5 text-black/55">Нажмите, чтобы посмотреть пиццу.</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 mt-4 border-y border-black/[0.05] bg-[#f6f6f4]/95 backdrop-blur-xl">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {["Все", ...menu.map((section) => section.category)].map((category) => (
            <button type="button" key={category} onClick={() => setActiveCategory(category)} className={"whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition " + (activeCategory === category ? "bg-[#1f1f1f] text-white" : "bg-white text-[#666] shadow-sm hover:text-[#1f1f1f]")}>
              {category}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex items-end justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ef4b2f]">Чаще выбирают</p><h2 className="mt-1 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Популярное</h2></div>
          <Link href="/menu" className="hidden items-center gap-1 text-sm font-medium text-[#666] sm:inline-flex">Всё меню <ChevronRight size={17} /></Link>
        </div>
        <div className="mt-6 grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4">
          {popular.map((product) => <ProductCard key={product.id} product={product} onAdd={() => add(product)} quantity={quantityOf(product.id)} />)}
        </div>
      </section>

      <section id="menu" className="scroll-mt-32 mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="rounded-[28px] bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{activeCategory === "Все" ? "Всё, что хочется сегодня" : activeCategory}</h2><p className="mt-1 text-sm text-[#888]">Выберите блюдо и добавьте в корзину в один клик.</p></div>
            <Link href="/menu" className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#f3f3f1] px-4 text-xs font-semibold text-[#555]"><Search size={15} />Поиск по меню</Link>
          </div>
          <div className="mt-6 grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4">
            {filtered.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} onAdd={() => add(product)} quantity={quantityOf(product.id)} />)}
          </div>
        </div>
      </section>

      <section id="delivery" className="scroll-mt-24 mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[28px] bg-[#1f1f1f] p-6 text-white sm:p-8">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-[#ffb547]"><Truck size={21} /></div>
            <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em]">Доставка по Саратову</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/55">Минимальная сумма зависит от расстояния до точки. Условия подтверждает администратор.</p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/50"><Clock3 size={15} />Ежедневно 10:30—22:30</div>
          </div>
          <div className="overflow-hidden rounded-[28px] bg-white">
            {deliveryZones.map(([distance, price], index) => (
              <div key={distance} className={"flex items-center justify-between px-5 py-5 sm:px-7 " + (index < deliveryZones.length - 1 ? "border-b border-black/[0.06]" : "")}>
                <span className="text-sm text-[#777]">{distance}</span><strong className="text-lg">{price}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="scroll-mt-24 mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="flex items-end justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ef4b2f]">Самовывоз</p><h2 className="mt-1 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Три точки в городе</h2></div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {locations.map(([address, phone, href]) => (
            <article key={address} className="rounded-[22px] bg-white p-5 soft-shadow">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fff1ed] text-[#ef4b2f]"><MapPin size={19} /></div>
              <h3 className="mt-5 text-lg font-semibold">{address}</h3>
              <a href={href} className="mt-2 inline-block text-sm text-[#777] hover:text-[#ef4b2f]">{phone}</a>
              <div className="mt-4 text-xs text-[#aaa]">Ежедневно · 10:30—22:30</div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-xs text-[#888] sm:px-6 md:flex-row md:items-center md:justify-between">
          <div><strong className="text-sm text-[#333]">Император64</strong><p className="mt-1">Концепт нового сайта доставки в Саратове.</p></div>
          <div className="flex flex-wrap gap-5"><a href="#menu">Меню</a><a href="#delivery">Доставка</a><a href="#contacts">Контакты</a></div>
        </div>
      </footer>

      {cartOpen && <CartDrawer items={items} onClose={() => setCartOpen(false)} onIncrease={increase} onDecrease={decrease} onRemove={remove} />}
      <MobileNav cartCount={count} onCartClick={() => setCartOpen(true)} />
    </main>
  );
}
