type Product = {
  name: string;
  description: string;
  price: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-1">
      <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-neutral-900 text-6xl">
        🍣
      </div>
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p className="mt-2 text-sm text-neutral-400">{product.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-bold">{product.price} ₽</span>
        <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold">
          Добавить
        </button>
      </div>
    </article>
  );
}
