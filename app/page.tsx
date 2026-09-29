import ProductCard from '@/components/ProductCard';
import { menu } from '@/data/menu';

const categories = ['Все', 'Роллы', 'Сеты', 'Запеченные', 'WOK', 'Пицца'];

export default function Home() {
  const products = menu.flatMap((section) => section.items);

  return (
    <main className="min-h-screen bg-neutral-950 text-white pb-20">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/80 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <b className="text-xl tracking-widest">ИМПЕРАТОР64</b>
            <p className="text-xs text-neutral-400">Доставка суши • Саратов</p>
          </div>
          <button className="rounded-full bg-red-600 px-5 py-2 font-semibold">🛒 0</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="font-bold text-red-500">СВЕЖИЕ РОЛЛЫ КАЖДЫЙ ДЕНЬ</span>
          <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">Японский вкус с доставкой до двери</h1>
          <p className="mt-6 text-lg text-neutral-400">Большие сеты, фирменные роллы и горячие блюда. Заказывайте быстро и удобно.</p>
          <button className="mt-8 rounded-full bg-red-600 px-8 py-4 font-bold">Открыть меню</button>
        </div>
        <div className="flex min-h-80 items-center justify-center rounded-[40px] border border-white/10 bg-gradient-to-br from-red-950 to-neutral-900 text-9xl">🍣</div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="flex gap-3 overflow-x-auto pb-5">
          {categories.map((item) => <button key={item} className="whitespace-nowrap rounded-full border border-white/10 px-5 py-3">{item}</button>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-3xl font-bold">Хиты продаж</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => <ProductCard key={product.name} product={product} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
        {['🚚 Быстрая доставка', '🍱 Свежие продукты', '⭐ Любимые рецепты'].map((item) => (
          <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">{item}</div>
        ))}
      </section>
    </main>
  );
}
