"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import Benefits from "@/components/Benefits";
import PromoBanner from "@/components/PromoBanner";
import { menu } from "@/data/menu";

const categories = ["Все", "Хиты", "Роллы", "Сеты", "Запеченные", "WOK", "Пицца"];

export default function Home() {
 const products = menu.flatMap((section)=>section.items);
 const [cartOpen,setCartOpen]=useState(false);
 const [items,setItems]=useState<any[]>([]);
 const addToCart=(product:any)=>setItems(c=>{const f=c.find(x=>x.name===product.name);return f?c.map(x=>x.name===product.name?{...x,quantity:x.quantity+1}:x):[...c,{...product,quantity:1}]});
 return <main className="min-h-screen bg-[#070707] text-white pb-24">
 <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl justify-between"><div><b className="text-xl tracking-[0.3em]">ИМПЕРАТОР64</b><p className="text-xs text-neutral-400">Премиальная доставка суши • Саратов</p></div><button onClick={()=>setCartOpen(true)} className="rounded-full bg-red-600 px-6 py-3 font-bold">🛒 {items.reduce((a,b)=>a+b.quantity,0)}</button></div></header>
 <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2"><div><span className="text-red-500 font-bold tracking-widest">САРАТОВ • ДОСТАВКА ОТ 30 МИНУТ</span><h1 className="mt-5 text-5xl font-black md:text-7xl">Японская кухня нового уровня</h1><p className="mt-6 text-lg text-neutral-400">Фирменные роллы, большие сеты и горячие блюда с доставкой домой.</p><button className="mt-8 rounded-full bg-red-600 px-10 py-4 font-bold">Заказать сейчас</button></div><div className="rounded-[48px] bg-gradient-to-br from-red-900 to-black flex items-center justify-center text-9xl">🍣</div></section>
 <Benefits/>
 <section className="mx-auto max-w-7xl px-6 py-10"><div className="flex gap-3 overflow-x-auto">{categories.map(x=><button key={x} className="whitespace-nowrap rounded-full border border-white/10 px-6 py-3">{x}</button>)}</div></section>
 <PromoBanner/>
 <section className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">{products.map(p=><ProductCard key={p.name} product={p} onAdd={()=>addToCart(p)}/>)}</section>
 {cartOpen&&<CartDrawer items={items}/>}
 </main>;
}