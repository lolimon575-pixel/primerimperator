"use client";

import Link from "next/link";
import { Home, Menu, Phone, ShoppingBag } from "lucide-react";

export default function MobileNav({ cartCount = 0, onCartClick }: { cartCount?: number; onCartClick?: () => void }) {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-4 rounded-[22px] border border-white/10 bg-[#11110f]/95 p-1.5 shadow-2xl backdrop-blur-xl md:hidden">
      <Link href="/#home" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] text-white/55"><Home size={18} /><span>Главная</span></Link>
      <Link href="/menu" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] text-white/55"><Menu size={18} /><span>Меню</span></Link>
      <button onClick={onCartClick} className="relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl bg-[#e7b45b] text-[11px] font-semibold text-[#111]">
        <ShoppingBag size={18} /><span>Корзина</span>
        {cartCount > 0 && <span className="absolute right-2 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#19130a] px-1 text-[10px] text-white">{cartCount}</span>}
      </button>
      <a href="tel:+79272253863" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] text-white/55"><Phone size={18} /><span>Позвонить</span></a>
    </nav>
  );
}
