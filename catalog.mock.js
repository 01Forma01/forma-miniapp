export const MOCK_CATALOG = [
  {
    id: "forma-tee-01",
    title: "Oversized Tee FORMA",
    category: "Футболки",
    status: "available", // 'available' | 'coming_soon'
    isMock: true,
    dropLabel: null,
    description: "Плотный оверсайз-крой, матовая вышивка и продуманная посадка. Замените текст, фото, цены и остатки на реальные перед релизом.",
    images: [
      "https://placehold.co/600x750/141414/FFFFFF?text=FORMA+TEE+1",
      "https://placehold.co/600x750/1f1f1f/FFFFFF?text=FORMA+TEE+2",
      "https://placehold.co/600x750/2a2a2a/FFFFFF?text=FORMA+TEE+DETAIL"
    ],
    sizeChart: {
      headers: ["Размер", "Длина (см)", "Грудь (см)", "Рукав (см)"],
      rows: [
        ["S", "70", "58", "22"],
        ["M", "73", "61", "23"],
        ["L", "76", "64", "24"],
        ["XL", "79", "67", "25"]
      ],
      note: "Свободный оверсайз-силуэт. Для посадки ближе к телу бери на размер меньше."
    },
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
      "https://placehold.co/600x750/181818/FFFFFF?text=FORMA+HOODIE+1",
      "https://placehold.co/600x750/242424/FFFFFF?text=FORMA+HOODIE+2"
    ],
    sizeChart: {
      headers: ["Размер", "Длина (см)", "Грудь (см)", "Рукав (см)"],
      rows: [
        ["M", "65", "65", "58"],
        ["L", "68", "68", "60"]
      ],
      note: "Кроп-посадка до пояса с объёмным рукавом."
    },
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
      "https://placehold.co/600x750/241116/FFFFFF?text=FORMA+BAG+1",
      "https://placehold.co/600x750/361820/FFFFFF?text=FORMA+BAG+2"
    ],
    sizeChart: {
      headers: ["Модель", "Высота (см)", "Ширина (см)", "Глубина (см)"],
      rows: [
        ["OneSize", "28", "38", "12"]
      ],
      note: "Замеры по внешним габаритам изделия в сантиметрах."
    },
    variants: [
      { id: "v-bag-one-brg", size: "OneSize", color: "Burgundy / Black", price: null, stock: 0 }
    ]
  }
];
