import { Check, Plus } from "lucide-react";
import type { Product } from "@/data/menu";

export default function ProductCard({
  product,
  onAdd,
  quantity = 0,
}: {
  product: Product;
  onAdd?: () => void;
  quantity?: number;
}) {
  return (
    <article className="group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-[22px] bg-white soft-shadow transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(20,20,20,.10)]">
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#efefec]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#ef4b2f] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm sm:left-3 sm:top-3">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex min-h-[154px] flex-1 flex-col p-3.5 sm:min-h-[190px] sm:p-4">
        <div className="min-h-[50px] sm:min-h-[52px]">
          <h3 className="clamp-2 text-[15px] font-semibold leading-[1.28] tracking-[-0.015em] text-[#1f1f1f] sm:text-[17px]">
            {product.name}
          </h3>
          <div className="mt-1.5 h-4 text-[11px] leading-4 text-[#929292] sm:text-xs">{product.weight}</div>
        </div>

        <p className="clamp-2 mt-2 hidden h-10 text-[13px] leading-5 text-[#777] sm:block">
          {product.description}
        </p>

        <div className="mt-auto flex min-h-10 items-center justify-between gap-2 pt-4">
          <strong className="whitespace-nowrap text-[16px] tracking-[-0.02em] sm:text-[20px]">
            {product.price.toLocaleString("ru-RU")} ₽
          </strong>

          {onAdd ? (
            <button
              type="button"
              onClick={onAdd}
              aria-label={"Добавить " + product.name}
              className={"inline-flex h-9 min-w-9 shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold transition active:scale-95 sm:h-10 sm:min-w-[108px] sm:px-4 " + (quantity > 0 ? "bg-[#fff0ec] text-[#ef4b2f]" : "bg-[#ef4b2f] text-white hover:bg-[#d83e26]")}
            >
              {quantity > 0 ? <Check size={15} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
              <span className="hidden sm:inline">{quantity > 0 ? "В корзине" : "Добавить"}</span>
              {quantity > 0 && <span className="font-bold">{quantity}</span>}
            </button>
          ) : (
            <span className="inline-flex h-10 items-center rounded-full bg-[#f2f2ef] px-3 text-xs font-medium text-[#666]">В меню</span>
          )}
        </div>
      </div>
    </article>
  );
}
