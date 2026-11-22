export const MOCK_CATALOG = [
  {
    id: "forma-rubl-bag-hoodie-black",
    title: "FORMA — «Rubl Bag» Hoodie",
    category: "Худи",
    status: "available",
    isMock: true,
    dropLabel: null,
    description: "Оверсайз-худи в чёрном цвете из 100% хлопка с вышивкой на груди, плотными манжетами и регулируемым низом. Ткань дышит и хорошо сохраняет форму.",
    images: [
      "https://i.postimg.cc/zBTrRJBb/920BD774-3686-4AD8-B014-7776AE155DE6.png",
      "https://i.postimg.cc/XJrZMBsp/IMG-6629.jpg",
      "https://i.postimg.cc/59qJ4NDt/IMG-6628.jpg"
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
      { id: "v-hoodie-sm-blk", size: "S / M", color: "Black", price: 4500, stock: 5 },
      { id: "v-hoodie-lxl-blk", size: "L / XL", color: "Black", price: 4500, stock: 5 }
    ]
  }
];
