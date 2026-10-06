"use client";

import { ShoppingBag } from "lucide-react";

export default function HeaderCartButton({
  count,
  total,
  onClick,
}: {
  count: number;
  total: number;
  onClick: () => void;
}) {
  const badge = count > 99 ? "99+" : String(count);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={count > 0 ? "Открыть корзину, товаров: " + count : "Открыть корзину"}
      aria-haspopup="dialog"
      className="group relative inline-flex h-11 items-center rounded-[14px] bg-[#1f1f1f] p-1.5 text-white shadow-[0_6px_18px_rgba(0,0,0,.12)] transition hover:bg-[#2a2a2a] active:scale-[.98] sm:pr-3"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#d83e26] text-white transition group-hover:scale-[1.03]">
        <ShoppingBag size={16} strokeWidth={2.25} />
      </span>

      <span className="hidden min-w-[72px] px-2 text-left sm:block">
        <span className="block text-[10px] leading-none text-white/55">Корзина</span>
        <strong className="mt-1 block whitespace-nowrap text-[12px] leading-none text-white">
          {count > 0 ? total.toLocaleString("ru-RU") + " ₽" : "Пусто"}
        </strong>
      </span>

      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[9px] font-black text-[#d83e26] shadow-sm ring-2 ring-[#1f1f1f] sm:static sm:h-7 sm:min-w-7 sm:bg-[#d83e26] sm:px-1.5 sm:text-[10px] sm:text-white sm:ring-0">
          {badge}
        </span>
      )}
    </button>
  );
}
