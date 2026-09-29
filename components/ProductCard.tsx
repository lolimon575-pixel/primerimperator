import { Plus } from "lucide-react";
import type { Product } from "@/data/menu";

export default function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white soft-shadow transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(20,20,20,.10)]">
      <div className="relative aspect-square overflow-hidden bg-[#efefec]">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#ef4b2f] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm sm:left-3 sm:top-3">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-[1.25] tracking-[-0.015em] text-[#1f1f1f] sm:text-[17px]">{product.name}</h3>
          <span className="shrink-0 text-[11px] text-[#929292] sm:text-xs">{product.weight}</span>
        </div>

        <p className="mt-2 hidden min-h-[40px] text-[13px] leading-5 text-[#777] sm:block">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <strong className="text-[18px] tracking-[-0.02em] sm:text-[20px]">{product.price.toLocaleString("ru-RU")} ₽</strong>
          {onAdd ? (
            <button onClick={onAdd} aria-label={"Добавить " + product.name} className="inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full bg-[#ef4b2f] px-3 text-[12px] font-semibold text-white transition hover:bg-[#d83e26] active:scale-95 sm:px-4">
              <Plus size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">Добавить</span>
            </button>
          ) : (
            <span className="rounded-full bg-[#f2f2ef] px-3 py-2 text-xs font-medium text-[#666]">В меню</span>
          )}
        </div>
      </div>
    </article>
  );
}
