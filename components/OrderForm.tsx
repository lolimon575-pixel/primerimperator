export default function OrderForm() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">Оформление заказа</h2>
      <div className="mt-5 grid gap-3">
        <input className="rounded-xl bg-neutral-900 p-4" placeholder="Имя" />
        <input className="rounded-xl bg-neutral-900 p-4" placeholder="Телефон" />
        <input className="rounded-xl bg-neutral-900 p-4" placeholder="Адрес доставки" />
        <textarea className="rounded-xl bg-neutral-900 p-4" placeholder="Комментарий к заказу" />
        <button className="rounded-full bg-red-600 px-6 py-4 font-bold">Заказать</button>
      </div>
    </section>
  );
}
