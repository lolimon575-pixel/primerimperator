type Product = {
  name: string;
  description: string;
  price: number;
  category?: string;
  weight?: string;
  badge?: string;
};

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd?: () => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-4 shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-red-500/50">
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[30px] bg-gradient-to-br from-red-950 via-neutral-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,.25),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="relative text-8xl transition duration-500 group-hover:scale-110">🍣</span>
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-1 text-xs font-black uppercase tracking-wider shadow-lg">
            {product.badge}
          </span>
        )}
      </div>

      <div className="px-1 pt-5">
        {product.category && (
          <span className="text-xs font-bold uppercase tracking-widest text-red-400">
            {product.category}
          </span>
        )}

        <h3 className="mt-2 text-2xl font-black tracking-tight">{product.name}</h3>
        <p className="mt-3 min-h-12 text-sm leading-relaxed text-neutral-400">
          {product.description}
        </p>

        {product.weight && (
          <div className="mt-3 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-400">
            {product.weight}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-2xl font-black">{product.price} ₽</span>
          <button
            onClick={onAdd}
            className="rounded-full bg-red-600 px-5 py-3 text-sm font-black transition hover:scale-105 hover:bg-red-500 active:scale-95"
          >
            Добавить
          </button>
        </div>
      </div>
    </article>
  );
}
