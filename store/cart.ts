export type CartItem = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export const initialCart: CartItem[] = [];
