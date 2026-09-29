"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight?: string;
};

type Props = {
  items: CartItem[];
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function CartDrawer({ items, onClose, onIncrease, onDecrease, onRemove }: Props) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" onMouseDown={onClose}>
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col border-l border-white/10 bg-[#0b0b0a] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e8b55c]">Ваш заказ</p>
            <h2 className="mt-1 text-3xl font-semibold">Корзина</h2>
          </div>
          <button onClick={onClose} aria-label="Закрыть корзину" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#e8b55c]"><ShoppingBag size={30} /></div>
              <h3 className="mt-5 text-xl font-semibold">Корзина пока пустая</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/45">Добавьте роллы или сет — выбранные позиции появятся здесь.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3">
                  <img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="truncate font-semibold">{item.name}</h4>
                        <p className="mt-1 text-xs text-white/40">{item.weight}</p>
                      </div>
                      <button onClick={() => onRemove(item.id)} aria-label="Удалить" className="text-white/35 hover:text-white"><Trash2 size={17} /></button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1">
                        <button onClick={() => onDecrease(item.id)} className="grid h-7 w-7 place-items-center rounded-full text-white/60 hover:bg-white/10"><Minus size={14} /></button>
                        <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => onIncrease(item.id)} className="grid h-7 w-7 place-items-center rounded-full text-white/60 hover:bg-white/10"><Plus size={14} /></button>
                      </div>
                      <span className="font-semibold">{(item.price * item.quantity).toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 bg-black/25 p-6">
          <div className="flex items-center justify-between text-lg"><span className="text-white/50">Итого</span><strong className="text-2xl">{total.toLocaleString("ru-RU")} ₽</strong></div>
          <p className="mt-2 text-xs leading-5 text-white/35">Минимальная сумма доставки зависит от расстояния. Условия подтвердит администратор.</p>
          <Link href="/checkout" className={"mt-5 flex h-13 items-center justify-center rounded-full font-semibold transition " + (items.length ? "bg-[#e7b45b] text-[#111] hover:bg-[#f2c570]" : "pointer-events-none bg-white/5 text-white/25")}>
            Перейти к оформлению
          </Link>
        </div>
      </aside>
    </div>
  );
}
