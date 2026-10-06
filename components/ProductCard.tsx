import { Minus, Plus } from "lucide-react";
import type { Product } from "@/data/menu";

export default function ProductCard({
  product,
  onAdd,
  onDecrease,
  quantity = 0,
  className = "",
}: {
  product: Product;
  onAdd?: () => void;
  onDecrease?: () => void;
  quantity?: number;
  className?: string;
}) {
  return (
    <article className={"group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl bg-white soft-shadow transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(20,20,20,.10)] sm:rounded-[22px] " + className}>
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#efefec] sm:aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 max-w-[calc(100%_-_20px)] truncate rounded-full bg-[#d83e26] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm sm:left-3 sm:top-3">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex min-h-[154px] flex-1 flex-col p-3 sm:min-h-[210px] sm:p-4">
        <div className="min-h-[50px] sm:min-h-[52px]">
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-[1.35] tracking-[-0.015em] text-[#1f1f1f] sm:text-[17px]">
            {product.name}
          </h3>
          <div className="mt-1.5 h-4 truncate text-[11px] leading-4 text-[#929292] sm:text-xs">{product.weight}</div>
        </div>

        <p className="mt-2 hidden h-10 text-[13px] leading-5 text-[#777] sm:line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-3">
          <strong className="block whitespace-nowrap text-[17px] tracking-[-0.02em] sm:text-[20px]">
            {product.price.toLocaleString("ru-RU")} ₽
          </strong>

          {onAdd && quantity > 0 && onDecrease ? (
            <div className="mt-2 flex h-11 w-full items-center justify-between rounded-full bg-[#fff0ec] p-0.5 text-[#d83e26] sm:h-12 sm:p-1">
              <button
                type="button"
                onClick={onDecrease}
                aria-label={"Уменьшить количество " + product.name}
                className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white active:scale-90"
              >
                <Minus size={13} strokeWidth={2.5} />
              </button>
              <span className="min-w-7 text-center text-xs font-bold" aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={onAdd}
                aria-label={"Добавить ещё " + product.name}
                className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white active:scale-90"
              >
                <Plus size={13} strokeWidth={2.5} />
              </button>
            </div>
          ) : onAdd ? (
            <button
              type="button"
              onClick={onAdd}
              aria-label={"Добавить " + product.name}
              className="mt-2 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-[#d83e26] px-3 text-xs font-semibold text-white transition hover:bg-[#be311c] active:scale-[.98] sm:h-12 sm:text-[13px]"
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
