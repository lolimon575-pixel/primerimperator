"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, Phone, ShoppingBag } from "lucide-react";

export default function MobileNav({
  cartCount = 0,
  cartOpen = false,
  onCartClick,
}: {
  cartCount?: number;
  cartOpen?: boolean;
  onCartClick?: () => void;
}) {
  const pathname = usePathname();
  const homeActive = pathname === "/" && !cartOpen;
  const menuActive = pathname.startsWith("/menu") && !cartOpen;

  const routeTabClass = (active: boolean) =>
    "relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-semibold transition " +
    (active
      ? "bg-[#1f1f1f] text-white shadow-sm"
      : "text-[#777] hover:bg-[#f5f5f3] hover:text-[#333]");

  const cartClass =
    "relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-semibold transition " +
    (cartOpen
      ? "bg-[#fff0ec] text-[#ef4b2f] ring-1 ring-[#ef4b2f]/15"
      : "text-[#777] hover:bg-[#f5f5f3] hover:text-[#333]");

  return (
    <nav className="mobile-nav-safe fixed left-3 right-3 z-50 grid grid-cols-4 rounded-[20px] border border-black/[0.06] bg-white/95 p-1.5 shadow-[0_12px_38px_rgba(0,0,0,.16)] backdrop-blur-xl md:hidden">
      <Link href="/" className={routeTabClass(homeActive)} aria-current={homeActive ? "page" : undefined}>
        <Home size={18} />
        <span>Главная</span>
      </Link>

      <Link href="/menu" className={routeTabClass(menuActive)} aria-current={menuActive ? "page" : undefined}>
        <Menu size={18} />
        <span>Меню</span>
      </Link>

      <button type="button" onClick={onCartClick} className={cartClass} aria-pressed={cartOpen}>
        <ShoppingBag size={18} className={!cartOpen && cartCount > 0 ? "text-[#ef4b2f]" : ""} />
        <span>Корзина</span>
        {cartCount > 0 && (
          <span className="absolute right-2 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef4b2f] px-1 text-[9px] font-bold text-white ring-2 ring-white">
            {cartCount}
          </span>
        )}
      </button>

      <a href="tel:+79272253863" className={routeTabClass(false)}>
        <Phone size={18} />
        <span>Позвонить</span>
      </a>
    </nav>
  );
}
