import ProductCard from '@/components/ProductCard';
import { menu } from '@/data/menu';

export default function Home() {
  const products = menu.flatMap((section) => section.items);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-neutral-950/80 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <b className="text-2xl">ИМПЕРАТОР64</b>
          <button className="rounded-full bg-red-600 px-5 py-2">Корзина</button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <span className="text-red-500 font-bold">САРАТОВ • ДОСТАВКА СУШИ</span>
        <h1 className="mt-5 text-5xl font-black md:text-7xl">Роллы, которые хочется заказать снова</h1>
        <p className="mt-6 max-w-2xl text-xl text-neutral-400">Свежие суши и роллы с быстрой доставкой. Новый удобный формат заказа.</p>
        <button className="mt-8 rounded-full bg-red-600 px-8 py-4 font-bold">Смотреть меню</button>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-8 text-3xl font-bold">Популярное меню</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => <ProductCard key={product.name} product={product} />)}
        </div>
      </section>
    </main>
  );
}
