export const MOCK_CATALOG = [
  {
    id: "forma-tee-01",
    title: "Oversized Tee FORMA",
    category: "Футболки",
    status: "available", // 'available' | 'coming_soon'
    isMock: true,
    dropLabel: null,
    description:
      "Плотный оверсайз-крой, матовая вышивка и продуманная посадка. Замените текст, фото, цены и остатки на реальные перед релизом.",
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
    id: "forma-rubl-bag-hoodie-black",
    title: "FORMA — «Rubl Bag» Hoodie",
    category: "Худи",
    status: "available", // 'available' | 'coming_soon'
    isMock: true,
    dropLabel: null,
    description:
      "Оверсайз-худи в чёрном цвете из 100% хлопка с вышивкой на груди, плотными манжетами и регулируемым низом. Ткань дышит и хорошо сохраняет форму.",
    images: [
      "920BD774-3686-4AD8-B014-7776AE155DE6.png",
      "IMG_6629.jpeg",
      "IMG_6628.jpeg"
    ],
    sizeChart: {
      headers: ["Размер", "Длина (см)", "Грудь (см)", "Рукав (см)"],
      rows: [
        ["S / M", "66", "62", "77"],
        ["L / XL", "70", "66", "80"]
      ],
      note: "Oversize-крой, 100% хлопок, плотные манжеты, регулируемый низ."
    },
    variants: [
      { id: "v-hoodie-sm-blk", size: "S / M", color: "Black", price: 6900, stock: 5 },
      { id: "v-hoodie-lxl-blk", size: "L / XL", color: "Black", price: 6900, stock: 5 }
    ]
  }
];
