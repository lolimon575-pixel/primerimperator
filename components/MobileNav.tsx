export default function MobileNav() {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 flex justify-around rounded-3xl border border-white/10 bg-neutral-900/90 p-4 backdrop-blur md:hidden">
      <button>🏠<span className="block text-xs">Главная</span></button>
      <button>🍣<span className="block text-xs">Меню</span></button>
      <button>🛒<span className="block text-xs">Корзина</span></button>
      <button>☎️<span className="block text-xs">Связь</span></button>
    </nav>
  );
}
