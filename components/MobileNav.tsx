"use client";

import Link from "next/link";
import { Home, Menu, Phone, ShoppingBag } from "lucide-react";

export default function MobileNav({ cartCount = 0, onCartClick }: { cartCount?: number; onCartClick?: () => void }) {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-4 rounded-[20px] border border-black/[0.06] bg-white/95 p-1.5 shadow-[0_12px_38px_rgba(0,0,0,.16)] backdrop-blur-xl md:hidden">
      <Link href="/#home" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium text-[#777]">
        <Home size={18} /><span>Главная</span>
      </Link>
      <Link href="/menu" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium text-[#777]">
        <Menu size={18} /><span>Меню</span>
      </Link>
      <button onClick={onCartClick} className="relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl bg-[#ef4b2f] text-[10px] font-semibold text-white">
        <ShoppingBag size={18} /><span>Корзина</span>
        {cartCount > 0 && <span className="absolute right-2 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[9px] font-bold text-[#ef4b2f]">{cartCount}</span>}
      </button>
      <a href="tel:+79272253863" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium text-[#777]">
        <Phone size={18} /><span>Позвонить</span>
      </a>
    </nav>
  );
}
