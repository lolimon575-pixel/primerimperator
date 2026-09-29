import { Plus } from "lucide-react";
import type { Product } from "@/data/menu";

export default function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  return (
    <article className="group border-t border-[#2b2723]/18 pt-4">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#d8cdbd]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.badge && (
            <span className="rounded-full bg-[#b5352d] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
              {product.badge}
            </span>
          )}
          <span className="rounded-full bg-[#f5efe4]/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#171411]">
            {product.weight}
          </span>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a8764c]">{product.category}</p>
            <h3 className="mt-1.5 text-[22px] font-semibold leading-tight tracking-[-0.025em] text-[#171411]">{product.name}</h3>
          </div>
          <div className="whitespace-nowrap text-[22px] font-semibold text-[#171411]">{product.price.toLocaleString("ru-RU")} ₽</div>
        </div>
        <p className="mt-3 min-h-[44px] max-w-[92%] text-sm leading-6 text-[#746d62]">{product.description}</p>

        {onAdd ? (
          <button
            onClick={onAdd}
            className="mt-4 inline-flex h-11 items-center gap-2 border-b border-[#171411] text-sm font-semibold text-[#171411] transition hover:border-[#b5352d] hover:text-[#b5352d] active:translate-y-px"
          >
            <Plus size={16} strokeWidth={2.2} />
            Добавить в заказ
          </button>
        ) : (
          <span className="mt-4 inline-flex h-11 items-center border-b border-[#171411]/25 text-sm text-[#746d62]">Подробнее</span>
        )}
      </div>
    </article>
  );
}
