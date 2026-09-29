export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8">
      <section className="mx-auto max-w-6xl py-20">
        <p className="text-red-500 font-semibold">САРАТОВ • ДОСТАВКА СУШИ</p>
        <h1 className="mt-4 text-6xl font-bold">Император64</h1>
        <p className="mt-6 max-w-xl text-xl text-neutral-300">
          Свежие роллы и суши с доставкой по Саратову. Новый быстрый сайт с удобным заказом.
        </p>
        <button className="mt-8 rounded-full bg-red-600 px-8 py-4 font-bold">
          Заказать сейчас
        </button>
      </section>
    </main>
  );
}
