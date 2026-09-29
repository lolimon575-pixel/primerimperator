type Product = {
  name: string;
  description: string;
  price: number;
  category?: string;
  weight?: string;
  badge?: string;
};

export default function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  return (
    <article className="group rounded-[38px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-red-500/40">
      <div className="relative h-64 overflow-hidden rounded-[32px] bg-gradient-to-br from-red-950 via-neutral-900 to-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="relative text-8xl transition-transform duration-500 group-hover:scale-110">🍣</span>
        {product.badge && <span className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-xs font-black">{product.badge}</span>}
      </div>
      <div className="pt-5">
        <p className="text-xs uppercase tracking-widest text-red-400">{product.category || 'Суши'}</p>
        <h3 className="mt-2 text-2xl font-black">{product.name}</h3>
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{product.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <div><b className="text-2xl">{product.price} ₽</b>{product.weight && <p className="text-xs text-neutral-500">{product.weight}</p>}</div>
          <button onClick={onAdd} className="rounded-full bg-red-600 px-6 py-3 font-black transition hover:bg-red-500">+ В корзину</button>
        </div>
      </div>
    </article>
  );
}
