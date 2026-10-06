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
      className="group relative inline-flex h-10 shrink-0 items-center rounded-xl bg-[#1f1f1f] p-1 text-white shadow-[0_4px_12px_rgba(0,0,0,.10)] transition hover:bg-[#2a2a2a] active:scale-[.98] sm:h-11 sm:rounded-[14px] sm:p-1.5 sm:pr-3"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#d83e26] text-white transition group-hover:scale-[1.03]">
        <ShoppingBag size={16} strokeWidth={2.25} />
      </span>

      <span className="px-2 text-left sm:min-w-[72px]">
        <span className="hidden text-[10px] leading-none text-white/70 sm:block">Корзина</span>
        <strong className="block whitespace-nowrap text-[11px] leading-none text-white sm:mt-1 sm:text-xs">
          {count > 0 ? total.toLocaleString("ru-RU") + " ₽" : "Корзина"}
        </strong>
      </span>

      {count > 0 && (
        <span className="mr-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#d83e26] px-1 text-[9px] font-bold text-white sm:mr-0 sm:h-7 sm:min-w-7 sm:px-1.5 sm:text-[10px]">
          {badge}
        </span>
      )}
    </button>
  );
}
