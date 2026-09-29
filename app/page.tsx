"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import { menu } from "@/data/menu";

const categories = ["Все", "Роллы", "Сеты", "Запеченные", "WOK", "Пицца"];

export default function Home() {
  const products = menu.flatMap((section) => section.items);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const addToCart = (product:any) => setItems((c)=>{const f=c.find((x)=>x.name===product.name); return f?c.map((x)=>x.name===product.name?{...x,quantity:x.quantity+1}:x):[...c,{...product,quantity:1}]});
  return <main className="min-h-screen bg-[#090909] text-white pb-24">
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 px-5 py-4 backdrop-blur"><div className="mx-auto flex max-w-7xl justify-between"><div><b className="text-xl tracking-[0.25em]">ИМПЕРАТОР64</b><p className="text-xs text-neutral-400">Доставка суши • Саратов</p></div><button onClick={()=>setCartOpen(true)} className="rounded-full bg-red-600 px-6 py-3 font-bold">🛒 {items.reduce((a,b)=>a+b.quantity,0)}</button></div></header>
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2"><div><p className="text-red-500 font-bold">САРАТОВ • ДОСТАВКА ОТ 30 МИНУТ</p><h1 className="mt-5 text-5xl font-black md:text-7xl">Роллы, которые хочется заказать снова</h1><p className="mt-6 text-lg text-neutral-400">Свежие ингредиенты, большие порции и удобный заказ.</p></div><div className="rounded-[40px] bg-gradient-to-br from-red-900 to-black p-12 text-center text-8xl">🍣</div></section>
    <section className="mx-auto max-w-7xl px-6"><div className="flex gap-3 overflow-x-auto">{categories.map(x=><button key={x} className="rounded-full border border-white/10 px-6 py-3">{x}</button>)}</div></section>
    <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">{products.map((p)=><ProductCard key={p.name} product={p} onAdd={()=>addToCart(p)}/>)}</section>
    {cartOpen&&<CartDrawer items={items}/>}
  </main>;
}
