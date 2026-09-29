"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import MobileNav from "@/components/MobileNav";
import { menu } from "@/data/menu";

const categories = ["Роллы", "Сеты", "Запеченные", "WOK", "Пицца", "Напитки"];

export default function Home() {
  const products = menu.flatMap((section) => section.items).slice(0, 6);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setItems((current) => {
      const exists = current.find((item) => item.name === product.name);
      return exists
        ? current.map((item) => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
  };

  return <main className="min-h-screen bg-[#050505] text-white pb-32">
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 px-6 py-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl justify-between items-center">
        <div><b className="text-xl tracking-[0.35em]">ИМПЕРАТОР64</b><p className="text-xs text-neutral-400">Суши и роллы • Саратов</p></div>
        <button onClick={() => setCartOpen(true)} className="rounded-full bg-red-600 px-6 py-3 font-bold">🛒 {items.reduce((a,b)=>a+b.quantity,0)}</button>
      </div>
    </header>

    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">Доставка по Саратову</p>
        <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">Роллы, которые хочется заказать снова</h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-400">Свежие ингредиенты, авторские сеты и быстрая доставка прямо домой.</p>
        <button className="mt-8 rounded-full bg-red-600 px-10 py-4 font-bold">Смотреть меню</button>
      </div>
      <div className="flex min-h-[420px] items-center justify-center rounded-[50px] border border-white/10 bg-gradient-to-br from-red-950 via-neutral-900 to-black text-[140px]">🍱</div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3">
      {[['🍣','Свежая рыба','Ингредиенты каждый день'],['⚡','Доставка','Быстро и аккуратно'],['⭐','Хиты','Любимые рецепты']].map(([i,t,d])=><div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-6"><div className="text-3xl">{i}</div><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="text-neutral-400">{d}</p></div>)}
    </section>

    <section className="mx-auto max-w-7xl px-6 py-12 flex gap-3 overflow-x-auto">{categories.map(c=><button key={c} className="whitespace-nowrap rounded-full border border-white/10 px-6 py-3">{c}</button>)}</section>

    <section className="mx-auto max-w-7xl px-6"><h2 className="mb-8 text-4xl font-black">Популярное</h2><div className="grid gap-6 md:grid-cols-3">{products.map(p=><ProductCard key={p.name} product={p} onAdd={()=>addToCart(p)}/>)}</div></section>

    {cartOpen && <CartDrawer items={items}/>}
    <MobileNav/>
  </main>;
}
