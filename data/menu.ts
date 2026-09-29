export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  category: string;
  badge?: string;
  image: string;
};

const img = {
  phil: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=82",
  salmon: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=82",
  roll: "https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=900&q=82",
  dark: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=82",
  set: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1100&q=82",
  set2: "https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=1100&q=82",
  hot: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=82",
  pizza1: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=82",
  pizza2: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=82",
  pizza3: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=82",
};

export const menu: { category: string; items: Product[] }[] = [
  {
    category: "Роллы",
    items: [
      { id: "philadelphia-classic", name: "Филадельфия классическая", description: "Сёмга, сливочный сыр.", price: 525, weight: "250 г", category: "Роллы", badge: "Хит", image: img.phil },
      { id: "philadelphia-shrimp", name: "Филадельфия с креветкой", description: "Сёмга, креветка, сыр, огурец.", price: 500, weight: "270 г", category: "Роллы", image: img.salmon },
      { id: "canadian", name: "Канадский", description: "Лосось, угорь, сыр, огурец, кунжут, унаги соус.", price: 450, weight: "260 г", category: "Роллы", badge: "NEW", image: img.roll },
      { id: "imperator", name: "Император", description: "Сёмга, омлет, огурец, красная масаго, сыр.", price: 525, weight: "Фирменный", category: "Роллы", badge: "Фирменный", image: img.dark },
      { id: "california-salmon", name: "Калифорния с лососем", description: "Сёмга, огурец, сыр, тобико.", price: 350, weight: "240 г", category: "Роллы", image: img.salmon },
      { id: "rainbow", name: "Радуга", description: "Лосось, тунец, сыр, огурец.", price: 450, weight: "250 г", category: "Роллы", badge: "NEW", image: img.roll },
    ],
  },
  {
    category: "Сеты",
    items: [
      { id: "set-premium", name: "Сет Премиум", description: "Тейшоку с маринованным лососем, Тотиги, Японский, Муракай.", price: 1245, weight: "1150 г", category: "Сеты", badge: "Хит", image: img.set },
      { id: "set-friends", name: "Сет Для Друзей", description: "Калифорния, Блэк ролл, Бангкок, Филадельфия лайт и другие.", price: 2775, weight: "2000 г", category: "Сеты", badge: "Для компании", image: img.set2 },
      { id: "mega-set", name: "Мега Сет", description: "Филадельфия, Канадский лайт, Тай чиз, Калифорния и горячие роллы.", price: 2540, weight: "1750 г", category: "Сеты", image: img.set },
      { id: "set-soul", name: "Сет для души", description: "Тейшоку, Вкусняшка, Калифорния с креветкой, Македония.", price: 1260, weight: "1000 г", category: "Сеты", image: img.set2 },
    ],
  },
  {
    category: "Жареные роллы",
    items: [
      { id: "ebi-tempura", name: "Эби темпура", description: "Креветка, сыр, огурец, тобико, спайси соус.", price: 370, weight: "330 г", category: "Жареные роллы", badge: "NEW", image: img.hot },
      { id: "bangkok", name: "Банкок", description: "Копчёный лосось, креветка, сыр, огурец, айсберг, унаги.", price: 420, weight: "330 г", category: "Жареные роллы", image: img.dark },
      { id: "tiyoda", name: "Тиёда", description: "Сёмга, сыр, соус унаги.", price: 415, weight: "310 г", category: "Жареные роллы", image: img.hot },
      { id: "tori-tempura", name: "Тори Темпура", description: "Куриное филе, сыр, корнишон, тобико, спайси соус.", price: 350, weight: "310 г", category: "Жареные роллы", badge: "Острое", image: img.roll },
    ],
  },
  {
    category: "Пицца",
    items: [
      { id: "brazilian", name: "Бразильская", description: "Соус цезарь, моцарелла, сёмга, креветки, помидор, маслины.", price: 645, weight: "550 г", category: "Пицца", badge: "Морская", image: img.pizza1 },
      { id: "sicilia", name: "Сицилия", description: "Томатный соус, моцарелла, курица, болгарский перец, шампиньоны.", price: 595, weight: "550 г", category: "Пицца", image: img.pizza2 },
      { id: "empire-pizza", name: "Империя", description: "Чесночный и томатный соусы, моцарелла, чеддер, бекон, ветчина.", price: 595, weight: "600 г", category: "Пицца", badge: "Сытная", image: img.pizza3 },
    ],
  },
];
