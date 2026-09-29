export default function Benefits(){
 const items=[['🍣','Свежие продукты','Готовим только после заказа'],['🚀','Быстрая доставка','По Саратову от 30 минут'],['⭐','Любимые рецепты','Фирменные роллы Император64']];
 return <section className="mx-auto grid max-w-7xl gap-4 px-6 py-10 md:grid-cols-3">{items.map(i=><div key={i[1]} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"><div className="text-3xl">{i[0]}</div><h3 className="mt-4 text-xl font-bold">{i[1]}</h3><p className="mt-2 text-neutral-400">{i[2]}</p></div>)}</section>
}