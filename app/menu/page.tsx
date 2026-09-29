"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
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
  const { count, total, add, increase, decrease, remove, quantityOf } = useCart();

  const categories = ["Все", ...menu.map((section) => section.category)];
  const products = useMemo(() => menu.flatMap((section) => section.items).filter((product) => {
    const byCategory = active === "Все" || product.category === active;
    const q = query.trim().toLowerCase();
    return byCategory && (!q || product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q));
  }), [active, query]);

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
            <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ef4b2f]">Император64</p><h1 className="mt-1 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">Меню</h1><p className="mt-2 text-sm text-[#888]">Роллы, сеты, горячие роллы и пицца.</p></div>
            <label className="flex h-12 w-full items-center gap-3 rounded-full bg-[#f5f5f3] px-4 md:w-80"><Search size={17} className="text-[#999]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Найти блюдо" className="w-full bg-transparent text-sm outline-none placeholder:text-[#aaa]" /></label>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 mt-4 border-y border-black/[0.05] bg-[#f6f6f4]/95 backdrop-blur-xl">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {categories.map((category) => <button type="button" key={category} onClick={() => setActive(category)} className={"whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold " + (active === category ? "bg-[#1f1f1f] text-white" : "bg-white text-[#666] shadow-sm")}>{category}</button>)}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold tracking-[-0.03em]">{active === "Все" ? "Все позиции" : active}</h2><span className="text-xs text-[#999]">{products.length} позиций</span></div>
        <div className="grid auto-rows-fr grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} onAdd={() => add(product)} quantity={quantityOf(product.id)} />)}
        </div>
        {products.length === 0 && <div className="rounded-[24px] bg-white p-10 text-center text-sm text-[#888]">Ничего не найдено. Попробуйте другой запрос.</div>}
      </section>

      {cartOpen && <CartDrawer items={items} onClose={() => setCartOpen(false)} onIncrease={increase} onDecrease={decrease} onRemove={remove} />}
      <MobileNav cartCount={count} cartOpen={cartOpen} onCartClick={() => setCartOpen(true)} />
    </main>
  );
}
