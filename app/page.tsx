"use client";

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import { menu } from '@/data/menu';

const categories = ['Все', 'Роллы', 'Сеты', 'Запеченные', 'WOK', 'Пицца'];

export default function Home() {
  const products = menu.flatMap((section) => section.items);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setItems((current) => {
      const found = current.find((item) => item.name === product.name);
      if (found) {
        return current.map((item) => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white pb-20">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/80 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div><b className="text-xl tracking-widest">ИМПЕРАТОР64</b><p className="text-xs text-neutral-400">Доставка суши • Саратов</p></div>
          <button onClick={() => setCartOpen(true)} className="rounded-full bg-red-600 px-5 py-2 font-semibold">🛒 {items.length}</button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <span className="font-bold text-red-500">СВЕЖИЕ РОЛЛЫ КАЖДЫЙ ДЕНЬ</span>
        <h1 className="mt-5 text-5xl font-black md:text-7xl">Японский вкус с доставкой до двери</h1>
        <p className="mt-6 text-lg text-neutral-400">Большие сеты, фирменные роллы и горячие блюда.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6"><div className="flex gap-3 overflow-x-auto">{categories.map((item)=><button key={item} className="rounded-full border border-white/10 px-5 py-3">{item}</button>)}</div></section>

      <section className="mx-auto max-w-6xl px-6 py-10 grid gap-6 md:grid-cols-3">
        {products.map((product)=><ProductCard key={product.name} product={product} onAdd={()=>addToCart(product)} />)}
      </section>

      {cartOpen && <CartDrawer items={items} />}
    </main>
  );
}
