export default function EmptyCart() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="text-5xl">🛒</div>
      <h3 className="mt-4 text-xl font-bold">Корзина пустая</h3>
      <p className="mt-2 text-neutral-400">Добавьте любимые роллы и сеты</p>
    </div>
  );
}
