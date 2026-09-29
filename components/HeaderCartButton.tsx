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
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={count > 0 ? "Открыть корзину, товаров: " + count : "Открыть корзину"}
      className="group inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.06] bg-[#f3f3f1] p-1.5 pr-2.5 text-left transition hover:bg-[#ececea] active:scale-[.98]"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#ef4b2f] shadow-sm transition group-hover:scale-[1.03]">
        <ShoppingBag size={16} strokeWidth={2.2} />
      </span>

      <span className="hidden min-w-[56px] sm:block">
        <span className="block text-[10px] leading-none text-[#8a8a8a]">Корзина</span>
        <strong className="mt-1 block whitespace-nowrap text-[12px] leading-none text-[#333]">
          {count > 0 ? total.toLocaleString("ru-RU") + " ₽" : "Пусто"}
        </strong>
      </span>

      {count > 0 && (
        <span className="grid h-6 min-w-6 shrink-0 place-items-center rounded-full bg-[#ef4b2f] px-1.5 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
