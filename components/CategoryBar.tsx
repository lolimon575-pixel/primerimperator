const categories = ["Все", "Роллы", "Сеты", "Запеченные", "WOK", "Пицца"];

export default function CategoryBar() {
  return (
    <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
      {categories.map((item) => (
        <button key={item} className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm transition hover:border-red-500">
          {item}
        </button>
      ))}
    </div>
  );
}
