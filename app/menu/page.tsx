import ProductCard from '@/components/ProductCard';
import { menu } from '@/data/menu';

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white pb-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-500">Император64</p>
        <h1 className="mt-4 text-5xl font-black md:text-7xl">Меню</h1>
        <p className="mt-4 max-w-xl text-lg text-neutral-400">Роллы, сеты и горячие блюда с доставкой по Саратову.</p>

        <div className="mt-12 space-y-16">
          {menu.map((section) => (
            <section key={section.category}>
              <div className="mb-6 flex items-end justify-between">
                <h2 className="text-3xl font-black">{section.category}</h2>
                <span className="text-sm text-neutral-500">{section.items.length} позиций</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <ProductCard key={item.name} product={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
