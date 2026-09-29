export default function OrderForm() {
  const field = "w-full border-b border-black/15 bg-transparent px-0 py-3 text-sm text-[#171411] outline-none transition placeholder:text-black/30 focus:border-[#b5352d]";
  return (
    <form className="bg-[#f4eee2] p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#756e64]">Имя<input required className={field + " mt-2"} placeholder="Как к вам обращаться" /></label>
        <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#756e64]">Телефон<input required inputMode="tel" className={field + " mt-2"} placeholder="+7 (___) ___-__-__" /></label>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#756e64]">Получение</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="cursor-pointer border border-[#b5352d] bg-[#b5352d]/5 p-4 text-sm"><input type="radio" name="delivery" defaultChecked className="mr-2 accent-[#b5352d]" />Доставка</label>
          <label className="cursor-pointer border border-black/10 p-4 text-sm"><input type="radio" name="delivery" className="mr-2 accent-[#b5352d]" />Самовывоз</label>
        </div>
      </div>

      <label className="mt-7 block text-xs font-semibold uppercase tracking-[0.15em] text-[#756e64]">Адрес<input className={field + " mt-2"} placeholder="Улица, дом, квартира" /></label>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#756e64]">Оплата<select className={field + " mt-2 appearance-none"} defaultValue="cash"><option value="cash">Наличными при получении</option><option value="card">Картой курьеру</option></select></label>
        <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#756e64]">Время<select className={field + " mt-2 appearance-none"} defaultValue="soon"><option value="soon">Как можно скорее</option><option value="time">К определённому времени</option></select></label>
      </div>

      <label className="mt-7 block text-xs font-semibold uppercase tracking-[0.15em] text-[#756e64]">Комментарий<textarea rows={4} className={field + " mt-2 resize-none"} placeholder="Домофон, подъезд, пожелания" /></label>

      <button type="submit" className="mt-8 h-14 w-full rounded-full bg-[#171411] font-semibold text-white transition hover:bg-[#b5352d]">Отправить заказ</button>
    </form>
  );
}
