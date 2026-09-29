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
    <div className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px]" onMouseDown={onClose}>
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-[#f7f7f5] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-black/[0.07] bg-white p-5 sm:p-6">
          <div>
            <p className="text-xs font-medium text-[#8a8a8a]">Император64</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">Корзина</h2>
          </div>
          <button onClick={onClose} aria-label="Закрыть корзину" className="grid h-10 w-10 place-items-center rounded-full bg-[#f3f3f1] text-[#555] hover:bg-[#ececea]"><X size={19} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {items.length === 0 ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center px-6 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-[#ef4b2f] shadow-sm"><ShoppingBag size={30} /></div>
              <h3 className="mt-5 text-xl font-semibold">Корзина пустая</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#777]">Добавьте любимые блюда — они появятся здесь.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-[18px] bg-white p-3 shadow-sm">
                  <img src={item.image} alt="" className="h-20 w-20 rounded-[14px] object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div><h4 className="truncate text-sm font-semibold">{item.name}</h4><p className="mt-1 text-xs text-[#999]">{item.weight}</p></div>
                      <button onClick={() => onRemove(item.id)} aria-label="Удалить" className="text-[#aaa] hover:text-[#ef4b2f]"><Trash2 size={16} /></button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full bg-[#f3f3f1] p-1">
                        <button onClick={() => onDecrease(item.id)} className="grid h-7 w-7 place-items-center rounded-full text-[#666] hover:bg-white"><Minus size={13} /></button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => onIncrease(item.id)} className="grid h-7 w-7 place-items-center rounded-full text-[#666] hover:bg-white"><Plus size={13} /></button>
                      </div>
                      <strong className="text-sm">{(item.price * item.quantity).toLocaleString("ru-RU")} ₽</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-black/[0.07] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#777]">Итого</span>
            <strong className="text-2xl tracking-[-0.03em]">{total.toLocaleString("ru-RU")} ₽</strong>
          </div>
          <p className="mt-2 text-xs leading-5 text-[#999]">Минимальная сумма доставки зависит от расстояния.</p>
          <Link href="/checkout" className={"mt-4 flex h-13 items-center justify-center rounded-full text-sm font-semibold transition " + (items.length ? "bg-[#ef4b2f] text-white hover:bg-[#d83e26]" : "pointer-events-none bg-[#eee] text-[#aaa]")}>
            Оформить заказ
          </Link>
        </div>
      </aside>
    </div>
  );
}
