import { Plus } from "lucide-react";
import type { Product } from "@/data/menu";

export default function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#11100f] transition duration-300 hover:-translate-y-1 hover:border-[#e8b55c]/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#191715]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black">{product.weight}</span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e8b55c]">{product.category}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{product.name}</h3>
        <p className="mt-2 min-h-[44px] text-sm leading-6 text-white/50">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="text-2xl font-semibold tracking-tight">{product.price.toLocaleString("ru-RU")} ₽</div>
          {onAdd ? (
            <button onClick={onAdd} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#e7b45b] px-4 text-sm font-semibold text-[#111] transition hover:bg-[#f2c570] active:scale-95">
              <Plus size={16} strokeWidth={2.4} />
              Добавить
            </button>
          ) : (
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/50">В меню</span>
          )}
        </div>
      </div>
    </article>
  );
}
