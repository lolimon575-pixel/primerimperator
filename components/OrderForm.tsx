export default function OrderForm() {
  const field = "w-full rounded-2xl border border-black/[0.08] bg-[#f8f8f6] px-4 py-3.5 text-sm text-[#222] outline-none transition placeholder:text-[#aaa] focus:border-[#ef4b2f] focus:bg-white";
  return (
    <form className="rounded-[24px] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold tracking-[-0.02em]">Контактные данные</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#777]">Имя<input required className={field + " mt-2"} placeholder="Как к вам обращаться" /></label>
        <label className="text-xs font-medium text-[#777]">Телефон<input required inputMode="tel" className={field + " mt-2"} placeholder="+7 (___) ___-__-__" /></label>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-[#777]">Получение заказа</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="cursor-pointer rounded-2xl border border-[#ef4b2f] bg-[#fff3ef] p-3.5 text-sm font-medium"><input type="radio" name="delivery" defaultChecked className="mr-2 accent-[#ef4b2f]" />Доставка</label>
          <label className="cursor-pointer rounded-2xl border border-black/[0.08] bg-[#f8f8f6] p-3.5 text-sm font-medium"><input type="radio" name="delivery" className="mr-2 accent-[#ef4b2f]" />Самовывоз</label>
        </div>
      </div>

      <label className="mt-5 block text-xs font-medium text-[#777]">Адрес<input className={field + " mt-2"} placeholder="Улица, дом, квартира" /></label>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#777]">Способ оплаты<select className={field + " mt-2 appearance-none"} defaultValue="cash"><option value="cash">Наличными при получении</option><option value="card">Картой курьеру</option></select></label>
        <label className="text-xs font-medium text-[#777]">Время<select className={field + " mt-2 appearance-none"} defaultValue="soon"><option value="soon">Как можно скорее</option><option value="time">К определённому времени</option></select></label>
      </div>

      <label className="mt-5 block text-xs font-medium text-[#777]">Комментарий<textarea rows={4} className={field + " mt-2 resize-none"} placeholder="Домофон, подъезд, пожелания к заказу" /></label>

      <button type="submit" className="mt-6 h-13 w-full rounded-full bg-[#ef4b2f] text-sm font-semibold text-white transition hover:bg-[#d83e26]">Отправить заказ</button>
      <p className="mt-3 text-center text-xs leading-5 text-[#aaa]">После отправки администратор подтвердит заказ и условия доставки.</p>
    </form>
  );
}
