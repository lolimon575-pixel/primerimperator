"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Clock3, MapPin, Menu as MenuIcon, Phone, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartDrawer, { type CartItem } from "@/components/CartDrawer";
import MobileNav from "@/components/MobileNav";
import { menu, type Product } from "@/data/menu";

const heroImage = "https://images.unsplash.com/photo-1781478990255-f4f61976a1dc?auto=format&fit=crop&q=84&w=1800";
const detailImage = "https://images.unsplash.com/photo-1637074930269-089fde202b57?auto=format&fit=crop&q=84&w=1600";
const cleanImage = "https://images.unsplash.com/photo-1760903124403-9d0d36867720?auto=format&fit=crop&q=84&w=1600";

const deliveryZones = [
  ["до 6 км", "от 600 ₽"],
  ["7–9 км", "от 1 200 ₽"],
  ["10–13 км", "от 1 500 ₽"],
  ["13–16 км", "от 2 000 ₽"],
];

const locations = [
  ["Огородная, 140", "+7 (927) 225-38-63", "tel:+79272253863"],
  ["Оржевского, 5", "+7 (937) 225-60-61", "tel:+79372256061"],
  ["Слонова, 1", "+7 (909) 333-93-38", "tel:+79093339338"],
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const products = useMemo(() => menu.flatMap((section) => section.items), []);
  const shown = activeCategory === "Все"
    ? products.slice(0, 8)
    : products.filter((product) => product.category === activeCategory).slice(0, 8);

  const add = (product: Product) => setItems((current) => {
    const found = current.find((item) => item.id === product.id);
    return found
      ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { ...product, quantity: 1 }];
  });

  const change = (id: string, delta: number) => setItems((current) =>
    current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
  );

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main id="home" className="min-h-screen bg-[#efe8d9] pb-24 text-[#171411] md:pb-0">
      <div className="overflow-hidden bg-[#b5352d] py-2.5 text-white">
        <div className="ticker-track flex items-center gap-8 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.24em]">
          {Array.from({ length: 2 }).map((_, group) => (
            <div className="flex items-center gap-8" key={group}>
              <span>Суши</span><span>•</span><span>Роллы</span><span>•</span><span>Пицца</span><span>•</span><span>Саратов</span><span>•</span><span>Доставка ежедневно</span><span>•</span>
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#efe8d9]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1480px] items-center justify-between px-4 sm:px-7 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-[#171411] font-serif text-xl text-[#efe8d9]">И</span>
            <span className="leading-none">
              <strong className="block text-[13px] tracking-[0.24em]">ИМПЕРАТОР</strong>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.27em] text-black/45">Sushi · Saratov 64</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[12px] font-medium lg:flex">
            <a href="#menu" className="hover:text-[#b5352d]">Меню</a>
            <a href="#story" className="hover:text-[#b5352d]">О нас</a>
            <a href="#delivery" className="hover:text-[#b5352d]">Доставка</a>
            <a href="#contacts" className="hover:text-[#b5352d]">Контакты</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="tel:+79272253863" className="hidden h-10 items-center gap-2 border border-black/15 px-4 text-[12px] sm:inline-flex"><Phone size={14} />Позвонить</a>
            <button onClick={() => setCartOpen(true)} className="inline-flex h-10 items-center gap-2 bg-[#171411] px-4 text-[12px] font-semibold text-white">
              <ShoppingBag size={15} /> <span className="hidden sm:inline">Корзина</span> <span>{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-black/10">
        <div className="paper-line mx-auto grid min-h-[calc(100svh-108px)] max-w-[1480px] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative flex flex-col justify-between px-4 py-10 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
            <div className="flex items-start justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#746d62]">Саратов<br />ежедневно<br />10:30—22:30</div>
              <div className="hidden h-28 w-12 bg-[#b5352d] text-center text-white lg:flex lg:items-center lg:justify-center">
                <span className="vertical-writing text-[10px] font-semibold uppercase tracking-[0.26em]">доставка · 64</span>
              </div>
            </div>

            <div className="mt-16 lg:mt-10">
              <div className="serif text-[clamp(4rem,9vw,9.3rem)] italic leading-[0.75] tracking-[-0.075em] text-[#b5352d]">Император</div>
              <h1 className="mt-5 max-w-2xl text-[clamp(2.5rem,5vw,5.7rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
                Японская кухня без лишнего шума.
              </h1>
              <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#746d62] sm:text-base">
                Роллы, сеты и горячие блюда для тех случаев, когда хочется просто открыть меню, выбрать любимое и получить хороший ужин.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#menu" className="inline-flex h-13 items-center gap-3 bg-[#171411] px-6 text-sm font-semibold text-white transition hover:bg-[#b5352d]">
                  Выбрать блюда <ArrowDownRight size={17} />
                </a>
                <Link href="/menu" className="inline-flex h-13 items-center border border-black/20 px-6 text-sm font-semibold transition hover:bg-black/[0.04]">
                  Всё меню
                </Link>
              </div>
            </div>

            <div className="mt-14 flex items-end justify-between border-t border-black/15 pt-5 text-xs text-[#746d62]">
              <span>01 — главная</span>
              <span className="serif text-lg italic text-[#171411]">taste first</span>
            </div>
          </div>

          <div className="relative min-h-[470px] border-t border-black/10 lg:min-h-0 lg:border-l lg:border-t-0">
            <img src={heroImage} alt="Суши Император64" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 border-t border-white/45 pt-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">из меню</p>
                <div className="mt-1 text-2xl font-medium">Сет Премиум</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold">1 285 ₽</div>
                <div className="text-xs text-white/65">1150 г</div>
              </div>
            </div>
            <div className="float-slow absolute right-5 top-5 grid h-24 w-24 place-items-center rounded-full bg-[#efe8d9] text-center shadow-xl sm:right-8 sm:top-8 sm:h-28 sm:w-28">
              <div><div className="serif text-3xl italic text-[#b5352d]">64</div><div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em]">Saratov</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-[1480px] divide-y divide-black/10 px-4 sm:px-7 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
          {[
            ["01", "Готовим каждый день", "Работаем ежедневно с 10:30 до 22:30."],
            ["02", "Три точки в городе", "Огородная, Оржевского и Слонова."],
            ["03", "Доставка по расстоянию", "Минимальная сумма зависит от зоны."],
          ].map(([num,title,text]) => (
            <div key={num} className="py-7 md:px-7 md:first:pl-0 md:last:pr-0">
              <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#b5352d]">{num}</div>
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#746d62]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-[1480px] px-4 py-20 sm:px-7 sm:py-28 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b5352d]">02 — меню</div>
            <h2 className="serif mt-3 text-5xl italic tracking-[-0.04em] sm:text-7xl">Выберите настроение.</h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-2xl text-sm leading-7 text-[#746d62]">
              Вместо бесконечной стены карточек — короткая подборка. Нужна конкретная позиция — откройте полный каталог и воспользуйтесь поиском.
            </p>
            <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
              {["Все", ...menu.map((section) => section.category)].map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)} className={"whitespace-nowrap border px-4 py-2 text-xs font-medium transition " + (activeCategory === category ? "border-[#171411] bg-[#171411] text-white" : "border-black/15 text-[#746d62] hover:border-black/35 hover:text-[#171411]")}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((product) => <ProductCard key={product.id} product={product} onAdd={() => add(product)} />)}
        </div>

        <div className="mt-14 flex justify-end">
          <Link href="/menu" className="inline-flex items-center gap-3 border-b border-[#171411] pb-1 text-sm font-semibold">
            Смотреть весь каталог <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section id="story" className="bg-[#171411] text-[#efe8d9]">
        <div className="mx-auto grid max-w-[1480px] lg:grid-cols-2">
          <div className="grid min-h-[620px] grid-cols-2 grid-rows-2">
            <img src={detailImage} alt="" className="col-span-2 h-full w-full object-cover sm:col-span-1 sm:row-span-2" />
            <div className="hidden border-l border-white/10 bg-[#b5352d] p-8 sm:flex sm:flex-col sm:justify-between">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/70">Император64</span>
              <span className="serif text-7xl italic">味</span>
            </div>
            <img src={cleanImage} alt="" className="hidden h-full w-full object-cover sm:block" />
          </div>
          <div className="flex flex-col justify-between border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d8b37a]">03 — подход</div>
              <h2 className="serif mt-4 max-w-xl text-5xl italic leading-[0.95] sm:text-7xl">Еда должна быть главным визуалом.</h2>
              <p className="mt-7 max-w-lg text-sm leading-7 text-white/48">
                Поэтому новый сайт не прячет блюда за интерфейсом: крупные фотографии, спокойная типографика и минимум декоративного шума.
              </p>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-6 text-sm">
              <div><div className="text-3xl font-semibold">17+</div><div className="mt-1 text-white/38">разделов в исходном меню</div></div>
              <div><div className="text-3xl font-semibold">3</div><div className="mt-1 text-white/38">точки самовывоза</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#b5352d] text-white">
        <div className="mx-auto grid max-w-[1480px] gap-8 px-4 py-16 sm:px-7 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65">04 — акция</div>
            <h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl">Подарок к заказу от 1 300 ₽</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">Действуют условия текущих акций. Финальный подарок и доступность подтверждает администратор.</p>
          </div>
          <a href="#menu" className="inline-flex h-13 w-fit items-center gap-3 bg-[#efe8d9] px-6 text-sm font-semibold text-[#171411]">Собрать заказ <ArrowRight size={16} /></a>
        </div>
      </section>

      <section id="delivery" className="mx-auto max-w-[1480px] px-4 py-20 sm:px-7 sm:py-28 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b5352d]">05 — доставка</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Без мелкого шрифта.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#746d62]">Сумма заказа зависит от расстояния до точки. Эти пороги можно быстро понять ещё до оформления.</p>
          </div>
          <div className="border-t border-black/20">
            {deliveryZones.map(([distance, minimum], index) => (
              <div key={distance} className="grid grid-cols-[52px_1fr_auto] items-center border-b border-black/15 py-5 sm:py-6">
                <span className="text-[10px] text-[#a19a8f]">0{index + 1}</span>
                <span className="text-lg font-medium">{distance}</span>
                <strong className="text-lg sm:text-xl">{minimum}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="border-t border-black/10">
        <div className="mx-auto max-w-[1480px] px-4 py-20 sm:px-7 sm:py-24 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b5352d]">06 — контакты</div>
              <h2 className="serif mt-3 text-5xl italic sm:text-7xl">Где нас найти.</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#746d62]"><Clock3 size={15} /> ежедневно 10:30—22:30</div>
          </div>

          <div className="mt-10 grid border-t border-black/20 md:grid-cols-3">
            {locations.map(([address, phone, href], index) => (
              <article key={address} className="border-b border-black/15 py-7 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <div className="flex items-center justify-between">
                  <MapPin size={17} className="text-[#b5352d]" />
                  <span className="text-[10px] text-[#a39a8d]">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{address}</h3>
                <a href={href} className="mt-3 inline-block text-sm text-[#746d62] hover:text-[#b5352d]">{phone}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#171411] text-[#efe8d9]">
        <div className="mx-auto grid max-w-[1480px] gap-10 px-4 py-10 sm:px-7 md:grid-cols-[1fr_auto] md:items-end lg:px-10">
          <div>
            <div className="serif text-5xl italic text-[#d8b37a]">Император64</div>
            <p className="mt-3 max-w-md text-xs leading-6 text-white/35">Концепт нового сайта доставки суши и роллов в Саратове.</p>
          </div>
          <div className="flex gap-6 text-xs text-white/45"><a href="#menu">Меню</a><a href="#delivery">Доставка</a><a href="#contacts">Контакты</a></div>
        </div>
      </footer>

      {cartOpen && (
        <CartDrawer
          items={items}
          onClose={() => setCartOpen(false)}
          onIncrease={(id) => change(id, 1)}
          onDecrease={(id) => change(id, -1)}
          onRemove={(id) => setItems((current) => current.filter((item) => item.id !== id))}
        />
      )}
      <MobileNav cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
    </main>
  );
}
