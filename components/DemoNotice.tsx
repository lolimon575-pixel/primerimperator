import { ArrowUpRight } from "lucide-react";

export default function DemoNotice() {
  return (
    <aside aria-label="Презентационный режим" className="border-b border-[#e5dfd4] bg-[#f1ede5] text-[#665849]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 text-[11px] leading-4 sm:px-6 sm:text-xs">
        <p className="flex min-w-0 items-center gap-2.5"><span className="rounded-md border border-[#d5c9ba] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">Демо</span><span>Концепт для презентации<span className="hidden sm:inline"> · заявки только тестовые</span></span></p>
        <a href="https://imperator164.ru/" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 font-semibold hover:text-[#2e2720]">Сайт ресторана<ArrowUpRight size={13}/></a>
      </div>
    </aside>
  );
}
