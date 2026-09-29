type Item = {
  name: string;
  price: number;
  quantity: number;
};

export default function CartDrawer({items = []}: {items?: Item[]}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-neutral-950/95 p-6 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Ваш заказ</h2>
        <button className="rounded-full bg-white/5 px-3 py-2 text-neutral-300">✕</button>
      </div>

      <div className="mt-8 max-h-[65vh] space-y-4 overflow-y-auto pr-2">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-neutral-400">
            Корзина пока пустая
          </div>
        ) : (
          items.map((item) => (
            <div key={item.name} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between font-semibold">
                <span>{item.name}</span>
                <span>{item.quantity} шт.</span>
              </div>
              <p className="mt-2 text-red-400 font-bold">{item.price * item.quantity} ₽</p>
            </div>
          ))
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="mb-4 flex justify-between text-xl font-bold">
          <span>Итого</span>
          <span>{total} ₽</span>
        </div>
        <button className="w-full rounded-full bg-red-600 py-4 font-bold transition hover:bg-red-500">
          Оформить заказ
        </button>
      </div>
    </aside>
  );
}
