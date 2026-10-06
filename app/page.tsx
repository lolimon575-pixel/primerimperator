"use client";

import Link from "next/link";
import { ChevronRight, Clock3, Gift, MapPin, Percent, Phone, Search, Sparkles, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import MobileNav from "@/components/MobileNav";
import HeaderCartButton from "@/components/HeaderCartButton";
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
  {
    address: "ул. Огородная, 140",
    phones: [
      ["+7 (927) 225-38-63", "tel:+79272253863"],
      ["+7 (937) 224-38-63", "tel:+79372243863"],
    ],
  },
  {
    address: "ул. Оржевского, 5",
    phones: [["+7 (937) 225-60-61", "tel:+79372256061"]],
  },
  {
    address: "ул. Слонова, 1",
    phones: [["+7 (909) 333-93-38", "tel:+79093339338"]],
  },
];

const promotions = [
  {
    eyebrow: "Самовывоз",
    title: "Подарок от 1 300 ₽",
    text: "При заказе на самовывоз от 1 300 ₽ — ролл в подарок. Точный подарок подтверждает администратор.",
    icon: Gift,
  },
  {
    eyebrow: "Пн—Чт · 10:30—15:00",
    title: "Счастливые часы −10%",
    text: "Скидка 10% при заказе от 1 300 ₽ и оплате наличными. Не распространяется на сеты, напитки, специи и соусы.",
    icon: Percent,
  },
  {
    eyebrow: "День рождения",
    title: "Скидка 15%",
    text: "Один раз в день рождения или в течение 6 дней после — при подтверждении даты оригиналом документа. На сеты, напитки, специи и соусы скидка не действует.",
    icon: Gift,
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cartOpen, setCartOpen] = useState(false);
  const { items, count, total, add, increase, decrease, remove, clear, quantityOf } = useCart();

  const products = useMemo(() => menu.flatMap((section) => section.items), []);
  const popular = useMemo(() => products.filter((product) => product.featured).slice(0, 8), [products]);
  const filtered = activeCategory === "Все" ? products : products.filter((product) => product.category === activeCategory);
  const catalogPreview = activeCategory === "Все"
    ? products.filter((product) => !product.featured).slice(0, 8)
    : filtered.slice(0, 8);
  const premium = products.find((product) => product.id === "set-premium");

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    requestAnimationFrame(() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main id="home" className="min-h-screen bg-[#f6f6f4] pb-[calc(76px+env(safe-area-inset-bottom))] text-[#1f1f1f] md:pb-0">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#d83e26] text-base font-black text-white sm:h-10 sm:w-10 sm:rounded-[13px] sm:text-lg">И</span>
              <span className="min-w-0">
                <strong className="block truncate text-[13px] tracking-[-0.01em] sm:text-[15px]">Император64</strong>
                <span className="block truncate text-[10px] text-[#727272] sm:text-[11px]">суши · роллы · пицца</span>
              </span>
            </Link>
            <a href="#contacts" className="hidden items-center gap-2 rounded-full bg-[#f3f3f1] px-4 py-2 text-xs font-medium text-[#555] md:inline-flex">
              <MapPin size={15} className="text-[#d83e26]" /> Саратов
            </a>
          </div>

          <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#555] lg:flex">
            <a href="#menu" className="transition hover:text-[#d83e26]">Меню</a>
            <a href="#promotions" className="transition hover:text-[#d83e26]">Акции</a>
            <a href="#delivery" className="transition hover:text-[#d83e26]">Доставка</a>
            <a href="#contacts" className="transition hover:text-[#d83e26]">Контакты</a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 text-xs text-[#777] md:flex"><span className="live-dot h-2 w-2 rounded-full bg-[#2eb872]" />10:30—22:30</div>
            <a href="https://imperator164.ru/" target="_blank" rel="noopener noreferrer" className="hidden h-10 items-center gap-2 rounded-full bg-[#f3f3f1] px-4 text-xs font-medium md:inline-flex">Сайт ресторана ↗</a>
            <HeaderCartButton count={count} total={total} onClick={() => setCartOpen(true)} />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 sm:pt-6">
        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-[1.65fr_.75fr]">
          <div className="relative min-h-[240px] overflow-hidden rounded-[22px] bg-[#d83e26] sm:min-h-[360px] sm:rounded-[28px] lg:min-h-[470px]">
            <img src={heroImage} srcSet={`${heroImage.replace('w=1600', 'w=600')} 600w, ${heroImage.replace('w=1600', 'w=1000')} 1000w, ${heroImage} 1600w`} sizes="(min-width: 1024px) 42vw, 65vw" fetchPriority="high" decoding="async" alt="Суши и роллы" className="absolute inset-y-0 right-0 h-full w-[65%] object-cover object-center sm:w-[58%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#d83e26] via-[#d83e26]/95 to-transparent sm:via-[#d83e26]/75" />
            <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between gap-3 p-5 text-white sm:min-h-[360px] sm:max-w-[58%] sm:p-9 lg:min-h-[470px] lg:max-w-[52%]">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold backdrop-blur sm:gap-2 sm:px-3 sm:py-2 sm:text-[11px]"><Sparkles size={12} /> Хит меню</div>
              <div>
                <h1 className="max-w-[76%] text-[32px] font-bold leading-none tracking-[-0.055em] sm:max-w-none sm:text-[54px] lg:text-[64px]">{premium?.name ?? "Сет Премиум"}</h1>
                <p className="mt-2 line-clamp-2 max-w-[76%] text-xs leading-[18px] text-white sm:mt-4 sm:line-clamp-none sm:max-w-md sm:text-base sm:leading-6">{premium?.description ?? "Большой сет для вечера дома или компании."}</p>
                <div className="mt-1 text-[11px] font-medium text-white sm:mt-2 sm:text-xs">{premium?.weight}</div>
                <div className="mt-3 flex items-center justify-between gap-3 sm:mt-6 sm:flex-wrap sm:justify-start sm:gap-4">
                  <strong className="shrink-0 text-[26px] tracking-[-0.04em] sm:text-4xl">{(premium?.price ?? 1245).toLocaleString("ru-RU")} ₽</strong>
                  {premium && (
                    quantityOf(premium.id) > 0 ? (
                      <div className="flex h-11 shrink-0 items-center rounded-full bg-white p-0.5 text-[#d83e26] sm:h-12 sm:p-1">
                        <button type="button" onClick={() => decrease(premium.id)} aria-label="Уменьшить количество" className="grid h-10 w-10 place-items-center rounded-full text-lg font-semibold hover:bg-[#fff4f1]">−</button>
                        <span className="w-7 text-center text-sm font-bold">{quantityOf(premium.id)}</span>
                        <button type="button" onClick={() => add(premium)} aria-label="Добавить ещё" className="grid h-10 w-10 place-items-center rounded-full text-lg font-semibold hover:bg-[#fff4f1]">+</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => add(premium)} className="h-11 shrink-0 rounded-full bg-white px-5 text-xs font-semibold text-[#d83e26] transition active:scale-95 sm:h-12 sm:text-sm">
                        Добавить
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1">
            <button type="button" onClick={() => scrollTo("promotions")} className="relative min-h-[64px] min-w-0 overflow-hidden rounded-2xl bg-[#262626] p-3 text-left text-white sm:min-h-[160px] sm:rounded-[26px] sm:p-5 lg:min-h-[190px]">
              <img src={promoImage} loading="lazy" alt="" className="absolute bottom-0 right-0 h-[75%] w-[58%] object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#262626] via-[#262626]/90 to-transparent" />
              <div className="relative z-10 sm:max-w-[58%]">
                <span className="hidden text-[9px] font-semibold text-white/80 sm:inline sm:rounded-full sm:bg-white/10 sm:px-2.5 sm:py-1 sm:text-[10px]">АКЦИЯ</span>
                <h2 className="mt-0 text-base font-semibold leading-[1.15] tracking-[-0.025em] sm:mt-4 sm:text-2xl">Подарок<br/><span className="whitespace-nowrap">от 1 300 ₽</span></h2>
                <p className="mt-2 hidden text-xs leading-5 text-white/75 sm:block">Актуальные акции и условия.</p>
              </div>
            </button>

            <button type="button" onClick={() => chooseCategory("Пицца")} className="relative min-h-[64px] min-w-0 overflow-hidden rounded-2xl bg-[#ffb547] p-3 text-left sm:min-h-[160px] sm:rounded-[26px] sm:p-5 lg:min-h-[190px]">
              <img src={pizzaImage} loading="lazy" alt="" className="absolute bottom-[-20px] right-[-24px] h-[110px] w-[110px] rounded-full object-cover shadow-[0_12px_35px_rgba(80,40,0,.18)] sm:bottom-[-30px] sm:right-[-28px] sm:h-[205px] sm:w-[205px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffb547] via-[#ffb547]/90 to-transparent" />
              <div className="relative z-10 sm:max-w-[52%]">
                <span className="hidden text-[9px] font-semibold sm:inline sm:rounded-full sm:bg-white/55 sm:px-2.5 sm:py-1 sm:text-[10px]">ПИЦЦА</span>
                <h2 className="mt-0 text-base font-semibold leading-[1.15] tracking-[-0.025em] sm:mt-4 sm:text-2xl">Много<br/>начинки</h2>
                <p className="mt-2 hidden text-xs leading-5 text-black/65 sm:block">Открыть раздел пиццы.</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      <div className="sticky top-14 z-30 mt-3 border-y border-black/[0.05] bg-[#f6f6f4]/95 backdrop-blur-xl sm:top-16 sm:mt-4">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-1.5 sm:gap-2 sm:px-6 sm:py-3">
          {["Все", ...menu.map((section) => section.category)].map((category) => (
            <button type="button" key={category} onClick={() => chooseCategory(category)} aria-pressed={activeCategory === category} className={"min-h-10 whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] font-semibold transition sm:px-4 sm:py-2.5 sm:text-xs " + (activeCategory === category ? "bg-[#1f1f1f] text-white" : "bg-white text-[#666] shadow-sm hover:text-[#1f1f1f]")}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {activeCategory === "Все" && (
        <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-10">
          <div className="flex items-end justify-between">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d83e26] sm:text-xs">Чаще выбирают</p><h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] sm:text-4xl">Популярное</h2></div>
            <Link href="/menu" className="inline-flex min-h-10 items-center gap-1 text-xs font-medium text-[#555] sm:text-sm">Всё меню <ChevronRight size={15} /></Link>
          </div>
          <div className="mt-4 grid auto-rows-fr grid-cols-2 items-stretch gap-2.5 sm:mt-6 sm:gap-4 lg:grid-cols-4">
            {popular.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                className={index > 3 ? "hidden sm:flex" : ""}
                onAdd={() => add(product)}
                onDecrease={() => decrease(product.id)}
                quantity={quantityOf(product.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section id="menu" className="scroll-mt-28 mx-auto max-w-7xl px-4 pb-7 sm:scroll-mt-32 sm:px-6 sm:pb-14">
        <div className="rounded-[22px] bg-white p-4 sm:rounded-[28px] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-[-0.03em] sm:text-3xl">{activeCategory === "Все" ? "Ещё из меню" : activeCategory}</h2>
              <p className="mt-1 text-xs text-[#727272] sm:text-sm">{activeCategory === "Все" ? "Роллы и сеты на каждый день." : "Выберите блюдо и добавьте в корзину."}</p>
            </div>
            <Link href="/menu" className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#f3f3f1] px-4 text-xs font-semibold text-[#555]"><Search size={15} />Поиск по меню</Link>
          </div>
          <div className="mt-4 grid auto-rows-fr grid-cols-2 items-stretch gap-2.5 sm:mt-6 sm:gap-4 lg:grid-cols-4">
            {catalogPreview.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                className={activeCategory === "Все" && index > 3 ? "hidden sm:flex" : ""}
                onAdd={() => add(product)}
                onDecrease={() => decrease(product.id)}
                quantity={quantityOf(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="promotions" className="scroll-mt-28 mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#d83e26]">Акции</p>
          <h2 className="mt-1 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Повод заказать сегодня</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {promotions.map(({ eyebrow, title, text, icon: Icon }, index) => (
            <article key={title} className={"rounded-[24px] p-5 sm:p-6 " + (index === 0 ? "bg-[#d83e26] text-white" : "bg-white")}>
              <div className={"grid h-11 w-11 place-items-center rounded-2xl " + (index === 0 ? "bg-white/15 text-white" : "bg-[#fff0ec] text-[#d83e26]")}><Icon size={20} /></div>
              <p className={"mt-5 text-[11px] font-semibold uppercase tracking-[0.1em] " + (index === 0 ? "text-white/60" : "text-[#999]")}>{eyebrow}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
              <p className={"mt-2 text-sm leading-6 " + (index === 0 ? "text-white/75" : "text-[#777]")}>{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-5 text-[#999]">Скидки и акции не суммируются. Финальные условия и доступность подарков подтверждает администратор.</p>
      </section>

      <section id="delivery" className="scroll-mt-24 mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[28px] bg-[#1f1f1f] p-6 text-white sm:p-8">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-[#ffb547]"><Truck size={21} /></div>
            <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em]">Доставка по Саратову</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/55">Приготовление начинается после подтверждения заказа. Доставка вместе с приготовлением обычно занимает от 60 минут.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs text-white/70"><Clock3 size={14} />10:30—22:30</span>
              <span className="rounded-full bg-white/10 px-3 py-2 text-xs text-white/70">Условия подтверждает администратор</span>
            </div>
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
          <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#d83e26]">Самовывоз</p><h2 className="mt-1 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Три точки в городе</h2></div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {locations.map((location) => (
            <article key={location.address} className="rounded-[22px] bg-white p-5 soft-shadow">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fff1ed] text-[#d83e26]"><MapPin size={19} /></div>
              <h3 className="mt-5 text-lg font-semibold">{location.address}</h3>
              <div className="mt-2 flex flex-col items-start gap-1">
                {location.phones.map(([phone, href]) => (
                  <a key={phone} href={href} className="text-sm text-[#777] transition hover:text-[#d83e26]">{phone}</a>
                ))}
              </div>
              <div className="mt-4 text-xs text-[#aaa]">Ежедневно · 10:30—22:30</div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-xs text-[#888] sm:px-6 md:flex-row md:items-center md:justify-between">
          <div><strong className="text-sm text-[#333]">Концепт для Император64</strong><p className="mt-1">Независимая демонстрация. Сотрудничество с рестораном не подтверждено.</p><p className="mt-1">Заявки тестовые; фото иллюстративные.</p></div>
          <div className="flex flex-wrap gap-5"><a href="#menu">Меню</a><a href="#promotions">Акции</a><a href="#delivery">Доставка</a><a href="#contacts">Контакты</a><a href="/admin">Демо-кабинет</a></div>
        </div>
      </footer>

      {cartOpen && (
        <CartDrawer
          items={items}
          onClose={() => setCartOpen(false)}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={remove}
          onClear={clear}
        />
      )}
      <MobileNav cartCount={count} cartOpen={cartOpen} onCartClick={() => setCartOpen(true)} />
    </main>
  );
}
