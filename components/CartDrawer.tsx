type Item = {
  name: string;
  price: number;
  quantity: number;
};

export default function CartDrawer({items = []}: {items?: Item[]}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-[#090909] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-500">Император64</p>
            <h2 className="mt-2 text-3xl font-black">Корзина</h2>
          </div>
          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-3">✕</button>
        </div>

        <div className="mt-8 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-neutral-400">
              <div className="text-5xl">🍣</div>
              <p className="mt-4">Выберите любимые роллы</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.name} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex justify-between gap-4">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-neutral-400">×{item.quantity}</span>
                </div>
                <p className="mt-3 text-xl font-black text-red-400">{item.price * item.quantity} ₽</p>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/80 p-5 backdrop-blur">
          <div className="flex justify-between text-xl font-black">
            <span>Итого</span>
            <span>{total} ₽</span>
          </div>
          <button className="mt-5 w-full rounded-full bg-red-600 py-4 font-black hover:bg-red-500">
            Перейти к оформлению
          </button>
        </div>
      </aside>
    </div>
  );
}
