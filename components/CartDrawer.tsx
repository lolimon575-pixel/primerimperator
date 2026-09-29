type Item = {
  name: string;
  price: number;
  quantity: number;
};

export default function CartDrawer({items = []}: {items?: Item[]}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-neutral-950 p-6 shadow-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ваш заказ</h2>
        <button className="text-neutral-400">✕</button>
      </div>

      <div className="mt-8 space-y-4">
        {items.length === 0 ? (
          <p className="text-neutral-400">Корзина пока пустая</p>
        ) : (
          items.map((item) => (
            <div key={item.name} className="rounded-2xl bg-white/5 p-4">
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.quantity} шт.</span>
              </div>
              <p className="mt-2 font-bold">{item.price * item.quantity} ₽</p>
            </div>
          ))
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="mb-4 flex justify-between text-xl font-bold">
          <span>Итого</span>
          <span>{total} ₽</span>
        </div>
        <button className="w-full rounded-full bg-red-600 py-4 font-bold">Оформить заказ</button>
      </div>
    </aside>
  );
}
