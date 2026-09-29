export default function OrderForm() {
  const field = "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#e7b45b]/60 focus:bg-white/[0.055]";
  return (
    <form className="rounded-[28px] border border-white/10 bg-[#11110f] p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-white/55">Имя<input required className={field + " mt-2"} placeholder="Как к вам обращаться" /></label>
        <label className="text-sm text-white/55">Телефон<input required inputMode="tel" className={field + " mt-2"} placeholder="+7 (___) ___-__-__" /></label>
      </div>

      <div className="mt-6">
        <p className="text-sm text-white/55">Получение заказа</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="cursor-pointer rounded-2xl border border-[#e7b45b]/50 bg-[#e7b45b]/10 p-4 text-sm"><input type="radio" name="delivery" defaultChecked className="mr-2 accent-[#e7b45b]" />Доставка</label>
          <label className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm"><input type="radio" name="delivery" className="mr-2 accent-[#e7b45b]" />Самовывоз</label>
        </div>
      </div>

      <label className="mt-5 block text-sm text-white/55">Адрес<input className={field + " mt-2"} placeholder="Улица, дом, квартира" /></label>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-white/55">Способ оплаты<select className={field + " mt-2 appearance-none"} defaultValue="cash"><option value="cash" className="bg-[#111]">Наличными при получении</option><option value="card" className="bg-[#111]">Картой курьеру</option></select></label>
        <label className="text-sm text-white/55">Когда доставить<select className={field + " mt-2 appearance-none"} defaultValue="soon"><option value="soon" className="bg-[#111]">Как можно скорее</option><option value="time" className="bg-[#111]">К определённому времени</option></select></label>
      </div>

      <label className="mt-5 block text-sm text-white/55">Комментарий<textarea rows={4} className={field + " mt-2 resize-none"} placeholder="Домофон, подъезд, пожелания к заказу" /></label>

      <button type="submit" className="mt-6 h-14 w-full rounded-full bg-[#e7b45b] font-semibold text-[#111] transition hover:bg-[#f2c570]">Оформить заказ</button>
      <p className="mt-4 text-center text-xs leading-5 text-white/30">После отправки администратор подтверждает стоимость и условия доставки.</p>
    </form>
  );
}
