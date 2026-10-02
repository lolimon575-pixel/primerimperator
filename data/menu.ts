export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  category: string;
  badge?: string;
  featured?: boolean;
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
  wok1: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=82",
  wok2: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=82",
};

export const menu: { category: string; items: Product[] }[] = [
  {
    category: "Роллы",
    items: [
      { id: "philadelphia-classic", name: "Филадельфия классическая", description: "Сёмга, сливочный сыр.", price: 525, weight: "250 г", category: "Роллы", badge: "Хит", featured: true, image: img.phil },
      { id: "philadelphia-shrimp", name: "Филадельфия с креветкой", description: "Сёмга, креветка, сыр, огурец.", price: 500, weight: "270 г", category: "Роллы", featured: true, image: img.salmon },
      { id: "philadelphia-eel", name: "Филадельфия с угрём", description: "Сёмга, угорь, сыр, огурец.", price: 500, weight: "270 г", category: "Роллы", image: img.dark },
      { id: "philadelphia-light", name: "Филадельфия лайт", description: "Сёмга, огурец, сыр.", price: 450, weight: "280 г", category: "Роллы", image: img.phil },
      { id: "philadelphia-lux", name: "Филадельфия люкс", description: "Сёмга, красная икра, сыр, огурец.", price: 500, weight: "280 г", category: "Роллы", badge: "Премиум", image: img.salmon },
      { id: "syake-tori", name: "Сяке Тори", description: "Рис, сыр, авокадо, курица, сёмга, икра лососевая.", price: 450, weight: "300 г", category: "Роллы", image: img.roll },
      { id: "tai-cheese", name: "Тай Чиз", description: "Окунь, креветка, сыр.", price: 425, weight: "270 г", category: "Роллы", image: img.roll },
      { id: "imperator", name: "Император", description: "Сёмга, омлет, огурец, красная масаго, сыр.", price: 525, weight: "фирменный ролл", category: "Роллы", badge: "Фирменный", featured: true, image: img.dark },
      { id: "spicy-chicken-roll", name: "Спайси Чикен Ролл", description: "Копчёная куриная грудка, тобико, спайси соус.", price: 195, weight: "110 г", category: "Роллы", badge: "NEW", image: img.roll },
      { id: "murugai-maki", name: "Муругай маки", description: "Мидии, спайси соус.", price: 195, weight: "110 г", category: "Роллы", image: img.dark },
    ],
  },
  {
    category: "Сеты",
    items: [
      { id: "set-premium", name: "Сет Премиум", description: "Тейшоку с маринованным лососем, Тотиги, Японский, Муракай.", price: 1245, weight: "1150 г", category: "Сеты", badge: "Хит", featured: true, image: img.set },
      { id: "set-friends", name: "Сет Для Друзей", description: "Калифорния, Блэк ролл, Бангкок, Филадельфия лайт и другие.", price: 2775, weight: "2000 г", category: "Сеты", badge: "Для компании", featured: true, image: img.set2 },
      { id: "set-baked", name: "Сет Запечённый", description: "Данго, Бруклин, Запечённый Муракай.", price: 1105, weight: "850 г", category: "Сеты", image: img.set },
      { id: "set-classic", name: "Сет Классический", description: "Сяке Маки, Текка маки, Тай маки, Авокадо маки, Каппа маки, Чука маки.", price: 1050, weight: "600 г", category: "Сеты", image: img.set2 },
      { id: "set-fried", name: "Сет Жареный", description: "Мидори сяке, Сяке темпура, Темпура маки, Эби темпура.", price: 1460, weight: "1200 г", category: "Сеты", image: img.set },
      { id: "mega-set", name: "Мега Сет", description: "Филадельфия классическая, Канадский лайт, Тай чиз, Калифорния и горячие роллы.", price: 2540, weight: "1750 г", category: "Сеты", image: img.set2 },
      { id: "set-soul", name: "Сет для души", description: "Тейшоку, Вкусняшка, Калифорния с креветкой, Македония.", price: 1260, weight: "1000 г", category: "Сеты", image: img.set },
    ],
  },
  {
    category: "Жареные роллы",
    items: [
      { id: "ebi-tempura", name: "Эби темпура", description: "Креветка, сыр, огурец, тобико, спайси соус.", price: 370, weight: "330 г", category: "Жареные роллы", badge: "NEW", featured: true, image: img.hot },
      { id: "bangkok", name: "Банкок", description: "Копчёный лосось, креветка, сыр, огурец, айсберг, унаги соус.", price: 420, weight: "330 г", category: "Жареные роллы", image: img.dark },
      { id: "saitana", name: "Сайтана", description: "Угорь, огурец, омлет, унаги соус.", price: 375, weight: "300 г", category: "Жареные роллы", image: img.hot },
      { id: "europe", name: "Европа", description: "Лосось, сыр, огурец, масаго, унаги соус.", price: 385, weight: "330 г", category: "Жареные роллы", image: img.hot },
      { id: "africa", name: "Африка", description: "Угорь, креветка, сыр, огурец, масаго, унаги соус.", price: 420, weight: "350 г", category: "Жареные роллы", image: img.dark },
      { id: "american", name: "Американский", description: "Угорь, лосось, сыр, огурец, масаго, унаги соус.", price: 425, weight: "330 г", category: "Жареные роллы", image: img.hot },
      { id: "tiyoda", name: "Тиёда", description: "Сёмга, сыр, соус унаги.", price: 415, weight: "310 г", category: "Жареные роллы", image: img.hot },
      { id: "tori-tempura", name: "Тори Темпура", description: "Куриное филе, сыр, корнишон, тобико, спайси соус.", price: 350, weight: "310 г", category: "Жареные роллы", badge: "Острое", image: img.roll },
    ],
  },
  {
    category: "Пицца",
    items: [
      { id: "brazilian", name: "Бразильская", description: "Соус цезарь, моцарелла, сёмга, креветки, помидор, маслины.", price: 645, weight: "550 г", category: "Пицца", badge: "Морская", featured: true, image: img.pizza1 },
      { id: "four-cheese", name: "Четыре сыра", description: "Креметто, моцарелла, чеддер, пармезан, маслины.", price: 585, weight: "550 г", category: "Пицца", featured: true, image: img.pizza2 },
      { id: "sicilia", name: "Сицилия", description: "Томатный соус, моцарелла, курица, болгарский перец, шампиньоны, зелень.", price: 595, weight: "550 г", category: "Пицца", image: img.pizza2 },
      { id: "empire-pizza", name: "Империя", description: "Чесночный и томатный соусы, моцарелла, чеддер, бекон, ветчина, шампиньоны, укроп.", price: 595, weight: "600 г", category: "Пицца", badge: "Сытная", image: img.pizza3 },
      { id: "pepperoni", name: "Пепперони", description: "Томатный соус, моцарелла, пепперони.", price: 600, weight: "550 г", category: "Пицца", badge: "Острое", image: img.pizza3 },
      { id: "hawaiian", name: "Гавайская", description: "Чесночный соус, моцарелла, куриное филе, ананас.", price: 570, weight: "550 г", category: "Пицца", image: img.pizza1 },
      { id: "meat-assorti", name: "Мясное ассорти", description: "Чесночный соус, моцарелла, сервелат, бекон, ветчина, охотничьи колбаски, овощи.", price: 695, weight: "600 г", category: "Пицца", image: img.pizza3 },
      { id: "margherita", name: "Маргарита", description: "Томатный соус, моцарелла, помидор, прованские травы.", price: 550, weight: "550 г", category: "Пицца", image: img.pizza2 },
      { id: "caesar-pizza", name: "Цезарь пицца", description: "Соус цезарь, моцарелла, куриное филе, помидор, пекинская капуста.", price: 555, weight: "550 г", category: "Пицца", image: img.pizza1 },
      { id: "grinch-pizza", name: "Гринч", description: "Соус тартар, моцарелла, пепперони, курица, помидор.", price: 540, weight: "550 г", category: "Пицца", image: img.pizza3 },
    ],
  },
  {
    category: "WOK",
    items: [
      { id: "wok-fettuccine-chicken", name: "Фетучини с курицей и грибами", description: "Горячая лапша WOK с курицей и грибами.", price: 300, weight: "порция", category: "WOK", image: img.wok1 },
      { id: "wok-fettuccine-bacon", name: "Фетучини с беконом", description: "Горячая лапша WOK с беконом.", price: 300, weight: "порция", category: "WOK", image: img.wok2 },
      { id: "wok-fettuccine-salmon", name: "Фетучини с сёмгой", description: "Горячая лапша WOK с сёмгой.", price: 335, weight: "порция", category: "WOK", image: img.wok1 },
      { id: "wok-funchoza-chicken", name: "Фунчоза с курицей", description: "Фунчоза WOK с курицей.", price: 300, weight: "порция", category: "WOK", image: img.wok2 },
      { id: "wok-funchoza-seafood", name: "Фунчоза с морепродуктами", description: "Фунчоза WOK с морепродуктами.", price: 335, weight: "порция", category: "WOK", image: img.wok1 },
      { id: "wok-soba-chicken", name: "Соба с курицей", description: "Гречневая лапша WOK с курицей.", price: 300, weight: "порция", category: "WOK", image: img.wok2 },
      { id: "wok-soba-seafood", name: "Соба с морепродуктами", description: "Гречневая лапша WOK с морепродуктами.", price: 335, weight: "порция", category: "WOK", image: img.wok1 },
    ],
  },
];
