"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import MobileNav from "@/components/MobileNav";
import { menu } from "@/data/menu";

const categories = ["Роллы", "Сеты", "Запеченные", "WOK", "Пицца", "Напитки"];

const reviews = [
  ["Анна", "Очень вкусные роллы, доставка приехала быстро"],
  ["Илья", "Берём сеты всей компанией, качество радует"],
  ["Мария", "Красивое оформление и отличный вкус"],
];

export default function Home() {
  const products = menu.flatMap((section) => section.items).slice(0, 6);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const addToCart = (product:any) => setItems((current)=>{
    const found=current.find((item)=>item.name===product.name);
    return found ? current.map((item)=>item.name===product.name?{...item,quantity:item.quantity+1}:item) : [...current,{...product,quantity:1}];
  });

  return <main className="min-h-screen bg-[#060606] text-white pb-32">
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-6 py-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div><b className="text-xl tracking-[0.35em]">ИМПЕРАТОР64</b><p className="text-xs text-neutral-400">Премиальная доставка суши • Саратов</p></div>
        <button onClick={()=>setCartOpen(true)} className="rounded-full bg-red-600 px-7 py-3 font-bold shadow-lg shadow-red-600/30">Корзина {items.reduce((a,b)=>a+b.quantity,0)}</button>
      </div>
    </header>

    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="text-sm font-bold tracking-[0.35em] text-red-500">САРАТОВ • ДОСТАВКА ОТ 30 МИНУТ</p>
        <h1 className="mt-6 text-5xl font-black leading-[1.05] md:text-7xl">Суши нового уровня для вашего вечера</h1>
        <p className="mt-6 max-w-xl text-xl text-neutral-400">Авторские роллы, большие сеты и свежие ингредиенты. Заказ в пару кликов.</p>
        <button className="mt-8 rounded-full bg-red-600 px-10 py-4 font-bold">Открыть меню</button>
      </div>
      <div className="min-h-[430px] rounded-[55px] border border-white/10 bg-gradient-to-br from-red-950 via-black to-neutral-900 p-10 text-8xl flex items-center justify-center shadow-2xl">🍣</div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3">{[["⚡","30 минут","Быстрая доставка"],["🍣","Свежесть","Готовим после заказа"],["⭐","Хиты","Любимые блюда" ]].map(x=><div key={x[1]} className="rounded-3xl border border-white/10 bg-white/5 p-7"><div className="text-3xl">{x[0]}</div><h3 className="mt-4 text-xl font-bold">{x[1]}</h3><p className="text-neutral-400">{x[2]}</p></div>)}</section>

    <section className="mx-auto max-w-7xl px-6 py-12 flex gap-3 overflow-x-auto">{categories.map(c=><button key={c} className="rounded-full border border-white/10 px-7 py-3 whitespace-nowrap hover:bg-red-600">{c}</button>)}</section>

    <section className="mx-auto max-w-7xl px-6"><h2 className="text-4xl font-black mb-8">Хиты продаж</h2><div className="grid gap-6 md:grid-cols-3">{products.map(p=><ProductCard key={p.name} product={p} onAdd={()=>addToCart(p)}/>)}</div></section>

    <section className="mx-auto max-w-7xl px-6 py-20"><div className="rounded-[45px] bg-red-600 p-10"><h2 className="text-4xl font-black">Акции каждый день</h2><p className="mt-3 text-white/80">Следите за новыми сетами и специальными предложениями.</p></div></section>

    <section className="mx-auto max-w-7xl px-6 pb-20"><h2 className="text-4xl font-black mb-8">Отзывы гостей</h2><div className="grid gap-5 md:grid-cols-3">{reviews.map(r=><div key={r[0]} className="rounded-3xl border border-white/10 bg-white/5 p-6"><b>{r[0]}</b><p className="mt-3 text-neutral-300">{r[1]}</p></div>)}</div></section>

    {cartOpen && <CartDrawer items={items}/>}
    <MobileNav/>
  </main>;
}
