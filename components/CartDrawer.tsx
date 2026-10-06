"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { CartItem } from "@/components/CartProvider";

type Props = {
  items: CartItem[];
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export default function CartDrawer({ items, onClose, onIncrease, onDecrease, onRemove, onClear }: Props) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>("[aria-label='Закрыть корзину']")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key === "Tab") {
        const controls = [...(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])") ?? [])].filter(node => node.getClientRects().length > 0 && getComputedStyle(node).pointerEvents !== "none");
        const first = controls[0]; const last = controls[controls.length - 1];
        if (first && (!dialogRef.current?.contains(document.activeElement) || (!event.shiftKey && document.activeElement === last))) { event.preventDefault(); first.focus(); }
        else if (last && event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px]" onMouseDown={onClose}>
      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-[460px] flex-col bg-[#f7f7f5] shadow-2xl sm:rounded-l-[26px]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/[0.07] bg-white p-4 sm:rounded-tl-[26px] sm:p-6">
          <div>
            <p className="text-xs font-medium text-[#8a8a8a]">Император64 · {count} шт.</p>
            <h2 className="mt-1 text-xl font-semibold sm:text-2xl tracking-[-0.03em]">Корзина</h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button type="button" onClick={onClear} className="hidden rounded-full px-3 py-2 text-xs font-medium text-[#999] transition hover:bg-[#fff0ec] hover:text-[#d83e26] sm:block">
                Очистить
              </button>
            )}
            <button type="button" onClick={onClose} aria-label="Закрыть корзину" className="grid h-10 w-10 place-items-center rounded-full bg-[#f3f3f1] text-[#555] transition hover:bg-[#ececea] active:scale-95">
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
          {items.length === 0 ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center px-6 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-[24px] bg-white text-[#d83e26] shadow-sm"><ShoppingBag size={30} /></div>
              <h3 className="mt-5 text-xl font-semibold">Корзина пустая</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#777]">Добавьте любимые блюда — они появятся здесь.</p>
              <button type="button" onClick={onClose} className="mt-5 rounded-full bg-[#1f1f1f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#333]">Вернуться к меню</button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-[18px] bg-white p-3 shadow-sm">
                  <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20 sm:rounded-[14px]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="line-clamp-2 text-[13px] font-semibold sm:text-sm">{item.name}</h4>
                        <p className="mt-1 text-xs text-[#999]">{item.weight} · {item.price.toLocaleString("ru-RU")} ₽</p>
                      </div>
                      <button type="button" onClick={() => onRemove(item.id)} aria-label={"Удалить " + item.name} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#888] transition hover:bg-[#fff0ec] hover:text-[#d83e26]"><Trash2 size={16} /></button>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center sm:mt-3 justify-between gap-x-3 gap-y-2">
                      <div className="flex shrink-0 items-center rounded-full bg-[#f3f3f1] p-0.5 sm:p-1">
                        <button type="button" onClick={() => onDecrease(item.id)} aria-label={"Уменьшить количество " + item.name} className="grid h-10 w-10 place-items-center rounded-full text-[#666] transition hover:bg-white active:scale-90"><Minus size={13} /></button>
                        <span className="w-7 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span>
                        <button type="button" onClick={() => onIncrease(item.id)} aria-label={"Увеличить количество " + item.name} className="grid h-10 w-10 place-items-center rounded-full text-[#666] transition hover:bg-white active:scale-90"><Plus size={13} /></button>
                      </div>
                      <strong className="whitespace-nowrap text-sm">{(item.price * item.quantity).toLocaleString("ru-RU")} ₽</strong>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={onClear} className="w-full rounded-[16px] py-3 text-xs font-medium text-[#999] transition hover:bg-white hover:text-[#d83e26] sm:hidden">
                Очистить корзину
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-black/[0.07] bg-white p-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:rounded-bl-[26px] sm:p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#777]">Итого</span>
            <strong className="text-2xl tracking-[-0.03em]">{total.toLocaleString("ru-RU")} ₽</strong>
          </div>
          <p className="mt-2 text-[11px] leading-4 text-[#777] sm:text-xs sm:leading-5">Тестовая заявка с вымышленными контактами. Оплата и доставка в демонстрации не выполняются.</p>
          <Link onClick={onClose} href="/checkout" className={"mt-3 flex h-12 items-center justify-center rounded-full text-sm font-semibold transition " + (items.length ? "bg-[#d83e26] text-white hover:bg-[#d83e26] active:scale-[.99]" : "pointer-events-none bg-[#eee] text-[#aaa]")}>
            Оформить заказ
          </Link>
        </div>
      </aside>
    </div>
  );
}
