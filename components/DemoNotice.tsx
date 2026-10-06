import { ArrowUpRight } from "lucide-react";

export default function DemoNotice() {
  return (
    <aside aria-label="Презентационный режим" className="border-b border-[#e5dfd4] bg-[#f1ede5] text-[#665849]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-[10px] leading-4 sm:gap-3 sm:px-6 sm:py-2 sm:text-xs">
        <p className="flex min-w-0 items-center gap-2"><span className="font-bold uppercase tracking-wider">Демо</span><span className="sm:hidden">Тестовые заявки</span><span className="hidden sm:inline">Концепт для презентации · заявки только тестовые</span></p>
        <a href="https://imperator164.ru/" target="_blank" rel="noopener noreferrer" aria-label="Официальный сайт ресторана" className="inline-flex shrink-0 items-center gap-1 font-semibold hover:text-[#2e2720]"><span className="sm:hidden">Ресторан</span><span className="hidden sm:inline">Сайт ресторана</span><ArrowUpRight size={12}/></a>
      </div>
    </aside>
  );
}
