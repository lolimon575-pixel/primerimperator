"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { menu, type Product } from "@/data/menu";

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

type SavedCartItem = {
  id: string;
  quantity: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "imperator64-cart-v1";
const MAX_ITEM_QUANTITY = 99;
const productsById = new Map(menu.flatMap((section) => section.items).map((product) => [product.id, product]));

function normalizeSavedCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  const merged = new Map<string, number>();

  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Partial<SavedCartItem>;
    if (typeof item.id !== "string" || typeof item.quantity !== "number" || !Number.isFinite(item.quantity)) continue;
    if (!productsById.has(item.id)) continue;

    const quantity = Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.floor(item.quantity)));
    merged.set(item.id, Math.min(MAX_ITEM_QUANTITY, (merged.get(item.id) ?? 0) + quantity));
  }

  return Array.from(merged.entries()).flatMap(([id, quantity]) => {
    const product = productsById.get(id);
    return product ? [{ ...product, quantity }] : [];
  });
}

function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    return normalizeSavedCart(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let restored: CartItem[] = [];

    try {
      restored = parseStoredCart(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }

    setItems(restored);
    setHydrated(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      setItems(parseStoredCart(event.newValue));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(({ id, quantity }) => ({ id, quantity }))));
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
        ? current.map((item) => item.id === product.id ? { ...item, quantity: Math.min(MAX_ITEM_QUANTITY, item.quantity + 1) } : item)
        : [...current, { ...product, quantity: 1 }];
    }),
    increase: (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.min(MAX_ITEM_QUANTITY, item.quantity + 1) } : item)),
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
