"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartDrawer, { type CartItem } from "@/components/CartDrawer";
import { menu, type Product } from "@/data/menu";

export default function MenuPage() {
  const [active, setActive] = useState("Все");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const categories = ["Все", ...menu.map((section) => section.category)];
  const products = useMemo(() => menu.flatMap((section) => section.items).filter((product) => {
    const categoryMatch = active === "Все" || product.category === active;
    const queryMatch = product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [active, query]);

  const add = (product: Product) => setItems((current) => {
    const found = current.find((item) => item.id === product.id);
    return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
  });
  const change = (id: string, delta: number) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));

  return (
    <main className="min-h-screen bg-[#080807] pb-28 text-white">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#080807]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"><ArrowLeft size={17} />Главная</Link>
          <button onClick={() => setCartOpen(true)} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#e7b45b] px-4 text-sm font-semibold text-[#111]"><ShoppingBag size={17} />{items.reduce((sum, item) => sum + item.quantity, 0)}</button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e7b45b]">Каталог</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div><h1 className="text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">Меню</h1><p className="mt-4 max-w-xl text-white/45">Актуальные позиции из меню «Император». Поиск работает по названию и составу.</p></div>
          <label className="flex h-13 w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 lg:w-80"><Search size={17} className="text-white/35" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти блюдо" className="w-full bg-transparent text-sm outline-none placeholder:text-white/25" /></label>
        </div>
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => <button key={category} onClick={() => setActive(category)} className={"whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition " + (active === category ? "bg-white text-black" : "border border-white/10 bg-white/[0.03] text-white/55 hover:text-white")}>{category}</button>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between"><h2 className="text-2xl font-semibold">{active === "Все" ? "Все позиции" : active}</h2><span className="text-sm text-white/30">{products.length} позиций</span></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={() => add(product)} />)}</div>
        {products.length === 0 && <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-10 text-center text-white/45">Ничего не найдено. Попробуйте другой запрос.</div>}
      </section>

      {cartOpen && <CartDrawer items={items} onClose={() => setCartOpen(false)} onIncrease={(id) => change(id, 1)} onDecrease={(id) => change(id, -1)} onRemove={(id) => setItems((current) => current.filter((item) => item.id !== id))} />}
    </main>
  );
}
