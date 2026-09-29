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
    const q = query.trim().toLowerCase();
    return categoryMatch && (!q || product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q));
  }), [active, query]);

  const add = (product: Product) => setItems((current) => {
    const found = current.find((item) => item.id === product.id);
    return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
  });

  const change = (id: string, delta: number) => setItems((current) =>
    current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
  );

  return (
    <main className="min-h-screen bg-[#efe8d9] pb-20 text-[#171411]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#efe8d9]/94 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1480px] items-center justify-between px-4 sm:px-7 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]"><ArrowLeft size={16} />Главная</Link>
          <div className="text-[11px] font-semibold uppercase tracking-[0.26em]">Император64 · меню</div>
          <button onClick={() => setCartOpen(true)} className="inline-flex h-10 items-center gap-2 bg-[#171411] px-4 text-xs font-semibold text-white"><ShoppingBag size={15} />{items.reduce((sum, item) => sum + item.quantity, 0)}</button>
        </div>
      </header>

      <section className="mx-auto max-w-[1480px] px-4 pb-12 pt-14 sm:px-7 sm:pt-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b5352d]">полный каталог</div>
            <h1 className="serif mt-3 text-6xl italic tracking-[-0.05em] sm:text-8xl">Меню.</h1>
          </div>
          <div className="lg:pb-2">
            <label className="flex h-14 items-center gap-3 border-b border-black/25">
              <Search size={18} className="text-black/35" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название или ингредиент" className="w-full bg-transparent text-base outline-none placeholder:text-black/30" />
            </label>
            <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button key={category} onClick={() => setActive(category)} className={"whitespace-nowrap border px-4 py-2 text-xs font-medium " + (active === category ? "border-[#171411] bg-[#171411] text-white" : "border-black/15 text-[#746d62]")}>{category}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-4 sm:px-7 lg:px-10">
        <div className="flex items-center justify-between border-b border-black/15 pb-4">
          <h2 className="text-xl font-semibold">{active === "Все" ? "Все позиции" : active}</h2>
          <span className="text-xs text-[#8f877b]">{products.length} позиций</span>
        </div>

        <div className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} onAdd={() => add(product)} />)}
        </div>

        {products.length === 0 && (
          <div className="my-16 border-y border-black/15 py-12 text-center text-[#746d62]">Ничего не найдено. Попробуйте другой запрос.</div>
        )}
      </section>

      {cartOpen && <CartDrawer items={items} onClose={() => setCartOpen(false)} onIncrease={(id) => change(id, 1)} onDecrease={(id) => change(id, -1)} onRemove={(id) => setItems((current) => current.filter((item) => item.id !== id))} />}
    </main>
  );
}
