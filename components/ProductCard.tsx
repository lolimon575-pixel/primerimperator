import { Minus, Plus } from "lucide-react";
import type { Product } from "@/data/menu";

export default function ProductCard({
  product,
  onAdd,
  onDecrease,
  quantity = 0,
}: {
  product: Product;
  onAdd?: () => void;
  onDecrease?: () => void;
  quantity?: number;
}) {
  return (
    <article className="group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[22px] bg-white soft-shadow transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(20,20,20,.10)]">
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#efefec]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 max-w-[calc(100%_-_20px)] truncate rounded-full bg-[#ef4b2f] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm sm:left-3 sm:top-3">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex min-h-[176px] flex-1 flex-col p-3.5 sm:min-h-[210px] sm:p-4">
        <div className="min-h-[50px] sm:min-h-[52px]">
          <h3 className="clamp-2 text-[15px] font-semibold leading-[1.28] tracking-[-0.015em] text-[#1f1f1f] sm:text-[17px]">
            {product.name}
          </h3>
          <div className="mt-1.5 h-4 truncate text-[11px] leading-4 text-[#929292] sm:text-xs">{product.weight}</div>
        </div>

        <p className="clamp-2 mt-2 hidden h-10 text-[13px] leading-5 text-[#777] sm:block">
          {product.description}
        </p>

        <div className="mt-auto pt-3">
          <strong className="block whitespace-nowrap text-[17px] tracking-[-0.02em] sm:text-[20px]">
            {product.price.toLocaleString("ru-RU")} ₽
          </strong>

          {onAdd && quantity > 0 && onDecrease ? (
            <div className="mt-2 flex h-9 w-full items-center justify-between rounded-full bg-[#fff0ec] p-1 text-[#ef4b2f] sm:h-10">
              <button
                type="button"
                onClick={onDecrease}
                aria-label={"Уменьшить количество " + product.name}
                className="grid h-7 w-8 place-items-center rounded-full transition hover:bg-white active:scale-90 sm:h-8 sm:w-9"
              >
                <Minus size={13} strokeWidth={2.5} />
              </button>
              <span className="min-w-7 text-center text-xs font-bold" aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={onAdd}
                aria-label={"Добавить ещё " + product.name}
                className="grid h-7 w-8 place-items-center rounded-full transition hover:bg-white active:scale-90 sm:h-8 sm:w-9"
              >
                <Plus size={13} strokeWidth={2.5} />
              </button>
            </div>
          ) : onAdd ? (
            <button
              type="button"
              onClick={onAdd}
              aria-label={"Добавить " + product.name}
              className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-[#ef4b2f] px-3 text-[12px] font-semibold text-white transition hover:bg-[#d83e26] active:scale-[.98] sm:h-10"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Добавить</span>
            </button>
          ) : (
            <span className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-full bg-[#f2f2ef] px-3 text-xs font-medium text-[#666]">В меню</span>
          )}
        </div>
      </div>
    </article>
  );
}
