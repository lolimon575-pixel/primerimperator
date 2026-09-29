"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Phone,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartDrawer, { type CartItem } from "@/components/CartDrawer";
import MobileNav from "@/components/MobileNav";
import { menu, type Product } from "@/data/menu";

const heroImage = "https://images.unsplash.com/photo-1643146001923-d37e3d0b07fb?auto=format&fit=crop&q=88&w=1800";

const deliveryZones = [
  ["до 6 км", "от 600 ₽"],
  ["7–9 км", "от 1 200 ₽"],
  ["10–13 км", "от 1 500 ₽"],
  ["13–16 км", "от 2 000 ₽"],
];

const locations = [
  { address: "ул. Огородная, 140", phone: "+7 (927) 225-38-63", href: "tel:+79272253863" },
  { address: "ул. Оржевского, 5", phone: "+7 (937) 225-60-61", href: "tel:+79372256061" },
  { address: "ул. Слонова, 1", phone: "+7 (909) 333-93-38", href: "tel:+79093339338" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const allProducts = useMemo(() => menu.flatMap((section) => section.items), []);
  const visibleProducts = activeCategory === "Все"
    ? allProducts.slice(0, 8)
    : allProducts.filter((product) => product.category === activeCategory).slice(0, 8);

  const addToCart = (product: Product) => {
    setItems((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id: string, delta: number) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main id="home" className="min-h-screen overflow-hidden bg-[#080807] pb-28 text-white md:pb-0">
      <div className="border-b border-white/[0.07] bg-[#0d0c0b]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-xs text-white/45 sm:px-6">
          <div className="flex items-center gap-2"><Clock3 size={14} className="text-[#e7b45b]" /><span>Ежедневно 10:30—22:30</span></div>
          <div className="hidden items-center gap-2 sm:flex"><MapPin size={14} className="text-[#e7b45b]" /><span>Доставка по Саратову</span></div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080807]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#e7b45b]/40 bg-[#e7b45b]/10 font-serif text-lg text-[#e7b45b]">И</span>
            <span>
              <strong className="block text-sm tracking-[0.22em]">ИМПЕРАТОР</strong>
              <span className="block text-[10px] uppercase tracking-[0.24em] text-white/35">Saratov · 64</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/50 lg:flex">
            <a href="#menu" className="transition hover:text-white">Меню</a>
            <a href="#offers" className="transition hover:text-white">Акции</a>
            <a href="#delivery" className="transition hover:text-white">Доставка</a>
            <a href="#contacts" className="transition hover:text-white">Контакты</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="tel:+79272253863" className="hidden h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/65 transition hover:bg-white/[0.05] sm:inline-flex">
              <Phone size={16} />Позвонить
            </a>
            <button onClick={() => setCartOpen(true)} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#e7b45b] px-4 text-sm font-semibold text-[#111] transition hover:bg-[#f2c570]">
              <ShoppingBag size={17} />
              <span className="hidden sm:inline">Корзина</span>
              <span>{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-24 lg:pt-20">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e7b45b]/25 bg-[#e7b45b]/8 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e7b45b]">
              <Sparkles size={14} /> Японская и итальянская кухня
            </div>
            <h1 className="mt-6 max-w-3xl text-[clamp(3.4rem,8vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              Вечер начинается <span className="font-serif italic text-[#e7b45b]">вкусно.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/48 sm:text-lg">
              Роллы, сеты, пицца и горячие блюда от «Императора». Актуальное меню, понятная доставка и быстрый заказ без лишних шагов.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#f4eee3]">
                Выбрать блюда <ArrowRight size={17} />
              </a>
              <Link href="/menu" className="inline-flex h-13 items-center rounded-full border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-white/70 transition hover:bg-white/[0.07] hover:text-white">
                Открыть всё меню
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/[0.08] pt-6">
              <div><div className="text-2xl font-semibold">3</div><div className="mt-1 text-xs leading-5 text-white/35">точки в Саратове</div></div>
              <div><div className="text-2xl font-semibold">17+</div><div className="mt-1 text-xs leading-5 text-white/35">разделов меню</div></div>
              <div><div className="text-2xl font-semibold">7/7</div><div className="mt-1 text-xs leading-5 text-white/35">работаем ежедневно</div></div>
            </div>
          </div>

          <div className="relative min-h-[420px] sm:min-h-[560px]">
            <div className="absolute -inset-10 rounded-full bg-[#8d2d1f]/20 blur-3xl" />
            <div className="absolute inset-0 overflow-hidden rounded-[36px] border border-white/10 bg-[#111] shadow-2xl sm:rounded-[48px]">
              <img src={heroImage} alt="Ассорти суши и роллов" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/10" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/10 bg-black/55 p-5 backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e7b45b]">Выбор вечера</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div><h2 className="text-2xl font-semibold sm:text-3xl">Сет Премиум</h2><p className="mt-1 text-sm text-white/45">1150 г · четыре ролла</p></div>
                  <div className="text-right text-2xl font-semibold">1 285 ₽</div>
                </div>
              </div>
            </div>
            <div className="absolute -left-2 top-7 rounded-2xl border border-white/10 bg-[#11110f]/92 px-4 py-3 shadow-xl backdrop-blur sm:-left-6 sm:top-10">
              <div className="flex items-center gap-2 text-xs text-white/50"><Store size={15} className="text-[#e7b45b]" />Самовывоз из 3 точек</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#0d0c0b]">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/[0.07] px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-0">
          {[
            { icon: Truck, title: "Доставка по городу", text: "Минимальная сумма зависит от расстояния до точки." },
            { icon: Store, title: "Три точки самовывоза", text: "Огородная, Оржевского и Слонова." },
            { icon: Sparkles, title: "Акции от 1 300 ₽", text: "Подарки к заказам по действующим условиям." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 py-6 md:px-8 md:py-8">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e7b45b]/10 text-[#e7b45b]"><Icon size={19} /></div>
              <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-white/38">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e7b45b]">Меню</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Хиты и любимые позиции</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/38">Цены и состав взяты из актуального меню «Император64». Внешний вид блюд может отличаться.</p>
        </div>

        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {["Все", ...menu.map((section) => section.category)].map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} className={"whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition " + (activeCategory === category ? "bg-white text-black" : "border border-white/10 bg-white/[0.03] text-white/50 hover:text-white")}>
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={() => addToCart(product)} />)}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/menu" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/12 px-6 text-sm font-semibold text-white/70 transition hover:bg-white/[0.05] hover:text-white">Смотреть всё меню <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-[#e7b45b]/20 bg-[#19130c] p-7 sm:p-10">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#e7b45b]/10 blur-3xl" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e7b45b]">Акция</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Подарок к заказу от 1 300 ₽</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/45">При заказе роллов от 1 300 ₽ можно получить ролл или фри в подарок. Действуют условия текущих акций.</p>
            <a href="#menu" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#e7b45b] px-5 text-sm font-semibold text-[#111]">Собрать заказ <ArrowRight size={16} /></a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"><div className="text-3xl font-semibold">1 600 ₽</div><p className="mt-2 text-sm leading-6 text-white/40">Подарок: ролл или пицца по условиям акции.</p></div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"><div className="text-3xl font-semibold">2 500 ₽</div><p className="mt-2 text-sm leading-6 text-white/40">Два ролла или ролл и пицца в подарок.</p></div>
          </div>
        </div>
      </section>

      <section id="delivery" className="border-y border-white/[0.07] bg-[#0d0c0b]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e7b45b]">Доставка</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Понятные условия по расстоянию</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/42">Минимальная сумма заказа зависит от расстояния. Точные условия администратор подтверждает после получения адреса.</p>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#090908]">
            {deliveryZones.map(([distance, minimum], index) => (
              <div key={distance} className={"flex items-center justify-between px-5 py-5 sm:px-7 " + (index !== deliveryZones.length - 1 ? "border-b border-white/[0.07]" : "")}>
                <span className="text-white/45">{distance}</span><strong className="text-lg">{minimum}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e7b45b]">Контакты</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Три точки в Саратове</h2></div>
          <p className="text-sm text-white/35">Пн—Вс · 10:30—22:30</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {locations.map((location, index) => (
            <article key={location.address} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e7b45b]/10 text-[#e7b45b]"><MapPin size={18} /></span><span className="text-xs text-white/25">0{index + 1}</span></div>
              <h3 className="mt-7 text-xl font-semibold">{location.address}</h3>
              <a href={location.href} className="mt-3 inline-block text-sm text-white/45 transition hover:text-[#e7b45b]">{location.phone}</a>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-white/30 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div><strong className="tracking-[0.2em] text-white/70">ИМПЕРАТОР64</strong><p className="mt-2">Концепт нового сайта доставки в Саратове.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2"><a href="#menu" className="hover:text-white">Меню</a><a href="#delivery" className="hover:text-white">Доставка</a><a href="#contacts" className="hover:text-white">Контакты</a></div>
        </div>
      </footer>

      {cartOpen && (
        <CartDrawer
          items={items}
          onClose={() => setCartOpen(false)}
          onIncrease={(id) => changeQuantity(id, 1)}
          onDecrease={(id) => changeQuantity(id, -1)}
          onRemove={(id) => setItems((current) => current.filter((item) => item.id !== id))}
        />
      )}
      <MobileNav cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
    </main>
  );
}
