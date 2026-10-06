"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, MapPin, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [hash, setHash] = useState("");
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);
  const contactsActive = pathname === "/" && hash === "#contacts" && !cartOpen;
  const homeActive = pathname === "/" && !cartOpen && !contactsActive;
  const menuActive = pathname.startsWith("/menu") && !cartOpen;
  const badge = cartCount > 99 ? "99+" : String(cartCount);

  const routeTabClass = (active: boolean) =>
    "relative flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-semibold leading-4 transition " +
    (active
      ? "bg-[#1f1f1f] text-white shadow-sm"
      : "text-[#777] hover:bg-[#f5f5f3] hover:text-[#333]");

  const cartClass =
    "relative flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-semibold leading-4 transition " +
    (cartOpen
      ? "bg-[#fff0ec] text-[#d83e26] ring-1 ring-[#d83e26]/15"
      : "text-[#555] hover:bg-[#f5f5f3]");

  return (
    <nav
      aria-label="Основная навигация"
      className="mobile-nav-safe fixed left-3 right-3 z-50 grid grid-cols-4 gap-0.5 rounded-2xl border border-black/[0.06] bg-white/95 p-1 shadow-[0_4px_20px_rgba(0,0,0,.12)] backdrop-blur-xl md:hidden"
    >
      <Link href="/" onClick={() => setHash("")} className={routeTabClass(homeActive)} aria-current={homeActive ? "page" : undefined}>
        <Home size={18} />
        <span>Главная</span>
      </Link>

      <Link href="/menu" onClick={() => setHash("")} className={routeTabClass(menuActive)} aria-current={menuActive ? "page" : undefined}>
        <Menu size={18} />
        <span>Меню</span>
      </Link>

      <button type="button" onClick={onCartClick} className={cartClass} aria-pressed={cartOpen} aria-label={cartCount > 0 ? "Открыть корзину, товаров: " + cartCount : "Открыть корзину"}>
        <span className="relative">
          <ShoppingBag size={18} strokeWidth={2.25} />
          {cartCount > 0 && <span className="absolute -right-3 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#d83e26] px-1 text-[8px] font-bold leading-none text-white ring-2 ring-white">{badge}</span>}
        </span>
        <span>Корзина</span>
      </button>

      <Link href="/#contacts" onClick={() => setHash("#contacts")} className={routeTabClass(contactsActive)} aria-current={contactsActive ? "location" : undefined}>
        <MapPin size={18} />
        <span>Контакты</span>
      </Link>
    </nav>
  );
}
