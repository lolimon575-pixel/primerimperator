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
    <div className="fixed inset-0 z-[70] bg-[#171411]/45 backdrop-blur-sm" onMouseDown={onClose}>
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-[470px] flex-col bg-[#f3eddf] text-[#171411] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b5352d]">Император64</p>
            <h2 className="serif mt-1 text-4xl italic">Ваш заказ</h2>
          </div>
          <button onClick={onClose} aria-label="Закрыть корзину" className="grid h-11 w-11 place-items-center rounded-full border border-black/10 hover:bg-black/[0.04]"><X size={19} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {items.length === 0 ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full border border-black/10 bg-black/[0.025] text-[#b5352d]"><ShoppingBag size={29} /></div>
              <h3 className="mt-5 text-xl font-semibold">Пока ничего не выбрано</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#746d62]">Добавьте роллы, сет или пиццу — мы аккуратно соберём заказ здесь.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[84px_1fr] gap-4 border-b border-black/10 pb-5">
                  <img src={item.image} alt="" className="h-21 w-21 object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div><h4 className="truncate font-semibold">{item.name}</h4><p className="mt-1 text-xs text-[#8a8175]">{item.weight}</p></div>
                      <button onClick={() => onRemove(item.id)} aria-label="Удалить" className="text-black/30 hover:text-[#b5352d]"><Trash2 size={16} /></button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 border border-black/10">
                        <button onClick={() => onDecrease(item.id)} className="grid h-8 w-8 place-items-center hover:bg-black/[0.04]"><Minus size={13} /></button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => onIncrease(item.id)} className="grid h-8 w-8 place-items-center hover:bg-black/[0.04]"><Plus size={13} /></button>
                      </div>
                      <span className="font-semibold">{(item.price * item.quantity).toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-black/10 bg-[#ebe2d2] p-5 sm:p-6">
          <div className="flex items-end justify-between">
            <span className="text-sm text-[#746d62]">Итого</span>
            <strong className="text-3xl">{total.toLocaleString("ru-RU")} ₽</strong>
          </div>
          <Link
            href="/checkout"
            className={"mt-5 flex h-14 items-center justify-center rounded-full text-sm font-semibold transition " + (items.length ? "bg-[#171411] text-white hover:bg-[#b5352d]" : "pointer-events-none bg-black/5 text-black/25")}
          >
            Перейти к оформлению
          </Link>
        </div>
      </aside>
    </div>
  );
}
