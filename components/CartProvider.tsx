"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/menu";

export type CartItem = Product & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  hydrated: boolean;
  add: (product: Product) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  quantityOf: (id: string) => number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "imperator64-cart-v1";

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    Number.isFinite(item.price) &&
    typeof item.quantity === "number" &&
    Number.isFinite(item.quantity) &&
    item.quantity > 0 &&
    typeof item.image === "string"
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed.filter(isCartItem).map((item) => ({ ...item, quantity: Math.max(1, Math.floor(item.quantity)) })));
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    hydrated,
    add: (product) => setItems((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    }),
    increase: (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    decrease: (id) => setItems((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0)),
    remove: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    clear: () => setItems([]),
    quantityOf: (id) => items.find((item) => item.id === id)?.quantity ?? 0,
  }), [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
