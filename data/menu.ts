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

const images = {
  salmon: "https://images.unsplash.com/photo-1617196034943-e2c9989c9d1f?auto=format&fit=crop&q=82&w=1200",
  platter: "https://images.unsplash.com/photo-1643146001923-d37e3d0b07fb?auto=format&fit=crop&q=82&w=1200",
  dark: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=82&w=1200",
  premium: "https://images.unsplash.com/photo-1631655376078-b6319604bd17?auto=format&fit=crop&q=82&w=1200",
};

export const menu: { category: string; items: Product[] }[] = [
  {
    category: "Роллы",
    items: [
      { id: "philadelphia-classic", name: "Филадельфия классическая", description: "Сёмга, сливочный сыр.", price: 525, weight: "250 г", category: "Роллы", badge: "Хит", image: images.salmon },
      { id: "philadelphia-shrimp", name: "Филадельфия с креветкой", description: "Сёмга, креветка, сыр, огурец.", price: 500, weight: "270 г", category: "Роллы", image: images.dark },
      { id: "canadian", name: "Канадский", description: "Лосось, угорь, сыр, огурец, кунжут, унаги соус.", price: 450, weight: "260 г", category: "Роллы", badge: "NEW", image: images.premium },
      { id: "imperator", name: "Император", description: "Сёмга, омлет, огурец, красная масаго, сыр.", price: 525, weight: "Фирменный", category: "Роллы", badge: "Фирменный", image: images.platter },
      { id: "california-salmon", name: "Калифорния с лососем", description: "Сёмга, огурец, сыр, тобико.", price: 350, weight: "240 г", category: "Роллы", image: images.dark },
      { id: "rainbow", name: "Радуга", description: "Лосось, тунец, сыр, огурец.", price: 450, weight: "250 г", category: "Роллы", badge: "NEW", image: images.salmon },
    ],
  },
  {
    category: "Сеты",
    items: [
      { id: "set-premium", name: "Сет Премиум", description: "Тейшоку с копчёным лососем, Тотиги, Японский, Муракай.", price: 1285, weight: "1150 г", category: "Сеты", badge: "Для компании", image: images.platter },
      { id: "set-friends", name: "Сет Для Друзей", description: "Большой сет из восьми популярных роллов.", price: 2855, weight: "2000 г", category: "Сеты", image: images.premium },
      { id: "mega-set", name: "Мега Сет", description: "Филадельфия, Канадский лайт, Тай чиз и другие хиты.", price: 2610, weight: "1750 г", category: "Сеты", badge: "Большой", image: images.platter },
      { id: "set-soul", name: "Сет для души", description: "Тейшоку, Вкусняшка, Калифорния с креветкой, Македония.", price: 1300, weight: "1000 г", category: "Сеты", image: images.dark },
    ],
  },
  {
    category: "Жареные роллы",
    items: [
      { id: "ebi-tempura", name: "Эби темпура", description: "Креветка, сыр, огурец, тобико, спайси соус.", price: 370, weight: "330 г", category: "Жареные роллы", badge: "NEW", image: images.premium },
      { id: "bangkok", name: "Банкок", description: "Копчёный лосось, креветка, сыр, огурец, айсберг, унаги.", price: 420, weight: "330 г", category: "Жареные роллы", image: images.dark },
      { id: "tiyoda", name: "Тиёда", description: "Сёмга, сыр, соус унаги.", price: 415, weight: "310 г", category: "Жареные роллы", image: images.platter },
      { id: "tori-tempura", name: "Тори Темпура", description: "Куриное филе, сыр, корнишон, тобико, спайси соус.", price: 350, weight: "310 г", category: "Жареные роллы", badge: "Острое", image: images.premium },
    ],
  },
  {
    category: "Пицца",
    items: [
      { id: "brazilian", name: "Бразильская", description: "Соус цезарь, моцарелла, сёмга, креветки, помидор, маслины.", price: 645, weight: "550 г", category: "Пицца", badge: "Морская", image: images.premium },
      { id: "sicilia", name: "Сицилия", description: "Томатный соус, моцарелла, курица, болгарский перец, шампиньоны.", price: 595, weight: "550 г", category: "Пицца", image: images.dark },
      { id: "empire-pizza", name: "Империя", description: "Чесночный и томатный соусы, моцарелла, чеддер, бекон, ветчина.", price: 595, weight: "600 г", category: "Пицца", badge: "Сытная", image: images.platter },
    ],
  },
];
