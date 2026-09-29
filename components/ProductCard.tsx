type Product = {
  name: string;
  description: string;
  price: number;
  category?: string;
  weight?: string;
  badge?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-2 hover:border-red-500/40">
      <div className="relative mb-5 flex h-48 items-center justify-center rounded-[28px] bg-gradient-to-br from-red-950 via-neutral-900 to-black text-7xl">
        🍣
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
            {product.badge}
          </span>
        )}
      </div>

      {product.category && <span className="text-xs text-red-400">{product.category}</span>}
      <h3 className="mt-2 text-xl font-black">{product.name}</h3>
      <p className="mt-2 min-h-10 text-sm text-neutral-400">{product.description}</p>
      {product.weight && <p className="mt-2 text-xs text-neutral-500">{product.weight}</p>}

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xl font-black">{product.price} ₽</span>
        <button className="rounded-full bg-red-600 px-5 py-3 text-sm font-bold hover:bg-red-500">
          + Добавить
        </button>
      </div>
    </article>
  );
}
