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
