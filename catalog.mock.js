export const MOCK_CATALOG = [
  {
    id: "forma-tee-01",
    title: "Oversized Tee FORMA",
    category: "Футболки",
    status: "available", // 'available' | 'coming_soon'
    isMock: true,
    dropLabel: null,
    description: "Пробная карточка оверсайз-футболки. Замените текст, фото, цены и остатки на реальные перед релизом.",
    images: [
      "https://placehold.co/600x750/141414/FFFFFF?text=FORMA+TEE"
    ],
    variants: [
      { id: "v-tee-s-blk", size: "S", color: "Black", price: 3900, stock: 5 },
      { id: "v-tee-m-blk", size: "M", color: "Black", price: 3900, stock: 8 },
      { id: "v-tee-l-blk", size: "L", color: "Black", price: 3900, stock: 3 },
      { id: "v-tee-xl-blk", size: "XL", color: "Black", price: 3900, stock: 0 }
    ]
  },
  {
    id: "forma-hoodie-02",
    title: "Cropped Hoodie FORMA",
    category: "Худи",
    status: "coming_soon",
    isMock: true,
    dropLabel: "Скоро дроп",
    description: "Укороченный худи с плотной посадкой. Цена и старт продаж появятся в день дропа.",
    images: [
      "https://placehold.co/600x750/181818/FFFFFF?text=FORMA+HOODIE"
    ],
    variants: [
      { id: "v-hood-m-blk", size: "M", color: "Black", price: null, stock: 0 },
      { id: "v-hood-l-blk", size: "L", color: "Black", price: null, stock: 0 }
    ]
  },
  {
    id: "forma-bag-03",
    title: "Daily Bag FORMA",
    category: "Сумки",
    status: "coming_soon",
    isMock: true,
    dropLabel: "Скоро дроп",
    description: "Повседневная модель в глубоком бордовом и чёрном исполнении с фирменной вышивкой.",
    images: [
      "https://placehold.co/600x750/241116/FFFFFF?text=FORMA+BAG"
    ],
    variants: [
      { id: "v-bag-one-brg", size: "OneSize", color: "Burgundy / Black", price: null, stock: 0 }
    ]
  }
];
