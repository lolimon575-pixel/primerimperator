type Product = {
  name: string;
  description: string;
  price: number;
  category?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-red-500/40">
      <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-red-950 to-neutral-900 text-6xl">
        🍣
      </div>
      {product.category && <span className="text-xs text-red-400">{product.category}</span>}
      <h3 className="mt-2 text-xl font-bold">{product.name}</h3>
      <p className="mt-2 text-sm text-neutral-400">{product.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-bold">{product.price} ₽</span>
        <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold transition hover:bg-red-500">
          Добавить
        </button>
      </div>
    </article>
  );
}
