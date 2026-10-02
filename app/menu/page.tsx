"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import MobileNav from "@/components/MobileNav";
import HeaderCartButton from "@/components/HeaderCartButton";
import { useCart } from "@/components/CartProvider";
import { menu } from "@/data/menu";

export default function MenuPage() {
  const [active, setActive] = useState("Все");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const { items, count, total, add, increase, decrease, remove, clear, quantityOf } = useCart();

  const categories = ["Все", ...menu.map((section) => section.category)];
  const products = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru-RU");

    return menu.flatMap((section) => section.items).filter((product) => {
      const byCategory = active === "Все" || product.category === active;
      const haystack = (product.name + " " + product.description + " " + product.category).toLocaleLowerCase("ru-RU");
      return byCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [active, query]);

  const resetFilters = () => {
    setActive("Все");
    setQuery("");
  };

  return (
    <main className="min-h-screen bg-[#f6f6f4] pb-24 text-[#1f1f1f]">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#555]"><ArrowLeft size={16} />Главная</Link>
          <strong className="text-sm">Меню</strong>
          <HeaderCartButton count={count} total={total} onClick={() => setCartOpen(true)} />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="rounded-[26px] bg-white p-5 soft-shadow sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ef4b2f]">Император64</p>
              <h1 className="mt-1 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">Меню</h1>
              <p className="mt-2 text-sm text-[#888]">Роллы, сеты, жареные роллы, пицца и вок.</p>
              <p className="mt-1 text-[11px] text-[#aaa]">Фото в этом презентационном макете иллюстративные.</p>
            </div>

            <label className="flex h-12 w-full items-center gap-3 rounded-full bg-[#f5f5f3] px-4 md:w-80">
              <Search size={17} className="shrink-0 text-[#999]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Найти блюдо"
                aria-label="Поиск по меню"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#aaa]"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Очистить поиск" className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#888] hover:bg-white">
                  <X size={14} />
                </button>
              )}
            </label>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 mt-4 border-y border-black/[0.05] bg-[#f6f6f4]/95 backdrop-blur-xl">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActive(category)}
              className={"whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition " + (active === category ? "bg-[#1f1f1f] text-white" : "bg-white text-[#666] shadow-sm hover:text-[#1f1f1f]")}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <section id="catalog" className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.03em]">{active === "Все" ? "Все позиции" : active}</h2>
            {query && <p className="mt-1 text-xs text-[#999]">По запросу «{query.trim()}»</p>}
          </div>
          <span className="shrink-0 text-xs text-[#999]">{products.length} позиций</span>
        </div>

        {products.length > 0 ? (
          <div className="grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => add(product)}
                onDecrease={() => decrease(product.id)}
                quantity={quantityOf(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] bg-white p-8 text-center sm:p-10">
            <h3 className="text-lg font-semibold">Ничего не найдено</h3>
            <p className="mt-2 text-sm text-[#888]">Попробуйте другой запрос или сбросьте фильтры.</p>
            <button type="button" onClick={resetFilters} className="mt-5 rounded-full bg-[#1f1f1f] px-5 py-3 text-sm font-semibold text-white">Показать всё меню</button>
          </div>
        )}
      </section>

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
