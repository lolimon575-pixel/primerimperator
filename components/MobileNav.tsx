"use client";

import Link from "next/link";
import { Home, Menu, Phone, ShoppingBag } from "lucide-react";

export default function MobileNav({ cartCount = 0, onCartClick }: { cartCount?: number; onCartClick?: () => void }) {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-4 overflow-hidden rounded-[20px] border border-black/10 bg-[#171411]/96 p-1.5 shadow-2xl backdrop-blur-xl md:hidden">
      <Link href="/#home" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium text-white/55">
        <Home size={17} /><span>Главная</span>
      </Link>
      <Link href="/menu" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium text-white/55">
        <Menu size={17} /><span>Меню</span>
      </Link>
      <button onClick={onCartClick} className="relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl bg-[#efe8d9] text-[10px] font-semibold text-[#171411]">
        <ShoppingBag size={17} /><span>Корзина</span>
        {cartCount > 0 && <span className="absolute right-2 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#b5352d] px-1 text-[9px] text-white">{cartCount}</span>}
      </button>
      <a href="tel:+79272253863" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium text-white/55">
        <Phone size={17} /><span>Позвонить</span>
      </a>
    </nav>
  );
}
