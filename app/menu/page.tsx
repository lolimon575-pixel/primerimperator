import ProductCard from '@/components/ProductCard';
import { menu } from '@/data/menu';

export default function MenuPage() {
  const sections = menu;

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <h1 className="text-5xl font-black">Меню</h1>
      <p className="mt-3 text-neutral-400">Все блюда Император64 в одном месте</p>

      {sections.map((section) => (
        <section key={section.category} className="mt-10">
          <h2 className="mb-5 text-3xl font-bold">{section.category}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {section.items.map((item) => (
              <ProductCard key={item.name} product={item} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
