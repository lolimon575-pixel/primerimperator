export type CartItem = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export const cartStore = {
  items: [] as CartItem[],

  add(item: Omit<CartItem, 'quantity'>) {
    const existing = this.items.find((product) => product.name === item.name);

    if (existing) {
      existing.quantity += 1;
      return;
    }

    this.items.push({ ...item, quantity: 1 });
  },

  increase(name: string) {
    const item = this.items.find((product) => product.name === name);
    if (item) item.quantity += 1;
  },

  decrease(name: string) {
    const item = this.items.find((product) => product.name === name);
    if (item && item.quantity > 1) item.quantity -= 1;
  },

  remove(name: string) {
    this.items = this.items.filter((product) => product.name !== name);
  },

  total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
};
