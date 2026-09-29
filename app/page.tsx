"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import { menu } from "@/data/menu";

const categories = ["Все", "Хиты", "Роллы", "Сеты", "Запеченные", "WOK", "Пицца"];

const features = [
  ["🍣", "Свежие продукты", "Готовим только после заказа"],
  ["⚡", "Доставка быстро", "По Саратову от 30 минут"],
  ["⭐", "Любимые рецепты", "Проверенные вкусы"],
];

export default function Home() {
  const products = menu.flatMap((section) => section.items);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const addToCart = (product:any) => setItems((current)=>{
    const found=current.find((item)=>item.name===product.name);
    return found ? current.map((item)=>item.name===product.name?{...item,quantity:item.quantity+1}:item) : [...current,{...product,quantity:1}];
  });

  return (
    <main className="min-h-screen bg-[#070707] text-white pb-24">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <b className="text-xl tracking-[0.3em]">ИМПЕРАТОР64</b>
            <p className="text-xs text-neutral-400">Премиальная доставка суши • Саратов</p>
          </div>
          <button onClick={()=>setCartOpen(true)} className="rounded-full bg-red-600 px-6 py-3 font-bold shadow-lg shadow-red-600/30">🛒 {items.reduce((a,b)=>a+b.quantity,0)}</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold tracking-widest text-red-500">САРАТОВ • ДОСТАВКА ОТ 30 МИНУТ</span>
          <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">Настоящий вкус японской кухни у вас дома</h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-400">Большие сеты, фирменные роллы и горячие блюда. Закажите любимые блюда в пару кликов.</p>
          <button className="mt-8 w-fit rounded-full bg-red-600 px-10 py-4 font-bold">Смотреть меню</button>
        </div>
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[48px] bg-gradient-to-br from-red-950 via-neutral-900 to-black text-9xl shadow-2xl">🍣</div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3">
        {features.map((f)=><div key={f[1]} className="rounded-3xl border border-white/10 bg-white/5 p-6"><div className="text-3xl">{f[0]}</div><h3 className="mt-3 font-bold">{f[1]}</h3><p className="text-sm text-neutral-400">{f[2]}</p></div>)}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12"><div className="flex gap-3 overflow-x-auto">{categories.map((x)=><button key={x} className="whitespace-nowrap rounded-full border border-white/10 px-6 py-3 hover:bg-red-600">{x}</button>)}</div></section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">{products.map((p)=><ProductCard key={p.name} product={p} onAdd={()=>addToCart(p)}/>)}</section>

      <section className="mx-auto max-w-7xl px-6 py-20"><div className="rounded-[40px] bg-red-600 p-10"><h2 className="text-3xl font-black">Акции и специальные предложения</h2><p className="mt-3 text-white/80">Следите за новыми сетами и подарками.</p></div></section>

      {cartOpen&&<CartDrawer items={items}/>}
    </main>
  );
}
