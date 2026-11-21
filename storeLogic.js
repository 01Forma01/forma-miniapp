const tg = window.Telegram?.WebApp;
const tgUser = tg?.initDataUnsafe?.user || { id: "guest", username: "guest", first_name: "Гость" };

const CART_KEY = `forma_cart_${tgUser.id}`;
const DROP_SUBS_KEY = `forma_drop_subs_${tgUser.id}`;
const ORDERS_KEY = `forma_orders_${tgUser.id}`;

// Временная прямая отправка с фронтенда для теста (после проверки лучше вынести в бота и сменить токен)
const BOT_TOKEN = "9018078921:AAFtr3AOF9jIcRCLsJyBXjTdlXU1I8rjtSk";
const TARGET_CHAT_ID = "-1004351317145";

export const DELIVERY_METHODS = [
  {
    id: "cdek",
    label: "СДЭК",
    shortLabel: "СДЭК (ПВЗ)",
    hint: "Нажми на метку ПВЗ на мини-карте или выбери точку ниже (можно дописать свой адрес вручную)"
  },
  {
    id: "yandex",
    label: "Яндекс Маркет",
    shortLabel: "Яндекс Маркет (ПВЗ)",
    hint: "Нажми на метку ПВЗ Яндекс Маркета на карте или выбери точку из списка"
  },
  {
    id: "pochta",
    label: "Почта России",
    shortLabel: "Почта России",
    hint: "Выбери отделение на карте или впиши индекс, город, улицу, дом и квартиру"
  },
  {
    id: "pickup",
    label: "Самовывоз",
    shortLabel: "Самовывоз",
    hint: "Выбери удобную точку самовывоза — сообщим о готовности"
  }
];

export const PICKUP_LOCATIONS_BY_METHOD = {
  cdek: [
    {
      city: "Санкт-Петербург",
      label: "СДЭК · Невский пр., 108",
      lat: 59.9311,
      lng: 30.3609
    },
    {
      city: "Санкт-Петербург",
      label: "СДЭК · Московский пр., 189",
      lat: 59.8696,
      lng: 30.3212
    },
    {
      city: "Москва",
      label: "СДЭК · Тверская ул., 22",
      lat: 55.7647,
      lng: 37.6054
    },
    {
      city: "Калуга",
      label: "СДЭК · ул. Кирова, 31",
      lat: 54.5138,
      lng: 36.2612
    }
  ],
  yandex: [
    {
      city: "Санкт-Петербург",
      label: "Яндекс Маркет · ул. Восстания, 24",
      lat: 59.9355,
      lng: 30.3587
    },
    {
      city: "Санкт-Петербург",
      label: "Яндекс Маркет · Большой пр. П.С., 74",
      lat: 59.9635,
      lng: 30.2962
    },
    {
      city: "Москва",
      label: "Яндекс Маркет · ул. Покровка, 18",
      lat: 55.7596,
      lng: 37.6512
    },
    {
      city: "Калуга",
      label: "Яндекс Маркет · пл. Победы, 4",
      lat: 54.5105,
      lng: 36.2564
    }
  ],
  pochta: [
    {
      city: "Санкт-Петербург",
      label: "Почта России · 191025, Невский пр., 84",
      lat: 59.9333,
      lng: 30.3526
    },
    {
      city: "Москва",
      label: "Почта России · 101000, Мясницкая ул., 26",
      lat: 55.7629,
      lng: 37.6382
    },
    {
      city: "Калуга",
      label: "Почта России · 248000, ул. Ленина, 87",
      lat: 54.5091,
      lng: 36.2535
    }
  ]
};

export const PICKUP_POINTS = [
  {
    id: "spb-center",
    title: "Точка самовывоза · Санкт-Петербург (центр)",
    address: "По согласованию после подтверждения заказа",
    schedule: "По договорённости"
  },
  {
    id: "msk-point",
    title: "Точка самовывоза · Москва",
    address: "По согласованию после подтверждения заказа",
    schedule: "По договорённости"
  },
  {
    id: "other-point",
    title: "Другая точка по договорённости",
    address: "Укажи удобный город/ориентир в комментарии",
    schedule: "Уточняется менеджером"
  }
];

export const TRACKING_STAGES = [
  { key: "created", label: "Принят в обработку", desc: "Заказ оформлен и передан на сборку" },
  { key: "packed", label: "Упакован и передан", desc: "Товар проверен, упакован и готов к отправке" },
  { key: "in_transit", label: "В пути", desc: "Заказ движется между сортировочными узлами" },
  { key: "ready_pickup", label: "Прибыл в точку выдачи", desc: "Ожидает получения в выбранном ПВЗ / точке" },
  { key: "delivered", label: "Получен", desc: "Заказ успешно выдан покупателю" }
];

function createTrackingTimeline(stageIndex = 0, note = "") {
  const now = new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  return TRACKING_STAGES.map((stage, idx) => ({
    key: stage.key,
    label: stage.label,
    desc: idx === stageIndex && note ? note : stage.desc,
    done: idx <= stageIndex,
    current: idx === stageIndex,
    updatedAt: idx <= stageIndex ? now : null
  }));
}

function generateOrderId() {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `FRM-${randomPart}`;
}

function getDeliveryMethodMeta(methodId) {
  return DELIVERY_METHODS.find((m) => m.id === methodId) || DELIVERY_METHODS[0];
}

async function sendTelegramNotification(text) {
  if (!BOT_TOKEN || BOT_TOKEN === "ВСТАВЬ_ТОКЕН_БОТА") {
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: TARGET_CHAT_ID,
        text
      })
    });
  } catch (err) {
    console.error("Ошибка отправки уведомления в Telegram:", err);
  }
}

export function loadState() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  const dropSubs = JSON.parse(localStorage.getItem(DROP_SUBS_KEY) || "[]");
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  return { cart, dropSubs, orders };
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addToCart(cart, product, variant) {
  if (product.status !== "available" || !variant || variant.stock <= 0) {
    return { cart, error: "Товар недоступен для покупки" };
  }

  const nextCart = [...cart];
  const idx = nextCart.findIndex((item) => item.variantId === variant.id);

  if (idx >= 0) {
    if (nextCart[idx].qty >= variant.stock) {
      return { cart: nextCart, error: "Достигнут максимальный остаток" };
    }
    nextCart[idx] = { ...nextCart[idx], qty: nextCart[idx].qty + 1 };
  } else {
    nextCart.push({
      productId: product.id,
      variantId: variant.id,
      title: product.title,
      image: product.images?.[0] || "",
      size: variant.size,
      color: variant.color,
      price: variant.price,
      qty: 1,
      maxStock: variant.stock
    });
  }

  saveCart(nextCart);
  return { cart: nextCart, error: null };
}

export function updateCartItemQty(cart, variantId, delta) {
  const nextCart = cart
    .map((item) => {
      if (item.variantId !== variantId) return item;
      const nextQty = item.qty + delta;
      if (nextQty <= 0) return null;
      if (item.maxStock && nextQty > item.maxStock) return item;
      return { ...item, qty: nextQty };
    })
    .filter(Boolean);

  saveCart(nextCart);
  return nextCart;
}

export function getCartSummary(cart) {
  const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  return { itemsCount, totalPrice };
}

export function subscribeToDrop(dropSubs, product) {
  if (dropSubs.includes(product.id)) {
    return { dropSubs, alreadySubscribed: true };
  }

  const nextSubs = [...dropSubs, product.id];
  localStorage.setItem(DROP_SUBS_KEY, JSON.stringify(nextSubs));

  const payload = {
    action: "drop_subscribe",
    user: {
      tg_id: tgUser.id,
      username: tgUser.username || null
    },
    product: {
      id: product.id,
      title: product.title,
      category: product.category
    }
  };

  if (tg?.sendData) {
    tg.sendData(JSON.stringify(payload));
  }

  const usernameLabel = tgUser.username ? `@${tgUser.username}` : "без username";
  const dropMessage = [
    "🔔 Подписка на дроп — FORMA",
    `Товар: ${product.title} (${product.category || "без категории"})`,
    `Покупатель: ${usernameLabel} (ID: ${tgUser.id})`
  ].join("\n");

  sendTelegramNotification(dropMessage);

  return { dropSubs: nextSubs, alreadySubscribed: false };
}

export function validateDeliveryDetails(delivery = {}) {
  const method = delivery.method || "cdek";
  const recipientName = (delivery.recipientName || "").trim();
  const phone = (delivery.phone || "").trim();
  const city = (delivery.city || "").trim();
  const destination = (delivery.destination || "").trim();
  const pickupPointId = delivery.pickupPointId || "";

  if (!recipientName || recipientName.length < 2) {
    return { valid: false, error: "Укажи имя или ФИО получателя" };
  }

  const cleanPhone = phone.replace(/[^\d+]/g, "");
  if (cleanPhone.length < 10) {
    return { valid: false, error: "Укажи корректный номер телефона" };
  }

  if (method === "pickup") {
    if (!pickupPointId) {
      return { valid: false, error: "Выбери точку самовывоза" };
    }
    return { valid: true, error: null };
  }

  if (!city) {
    return { valid: false, error: "Укажи город доставки" };
  }

  if (!destination || destination.length < 4) {
    return {
      valid: false,
      error:
        method === "pochta"
          ? "Укажи адрес или индекс и отделение Почты России"
          : "Укажи адрес или номер выбранного ПВЗ"
    };
  }

  return { valid: true, error: null };
}

export function advanceOrderTracking(orders, orderId, nextStageIndex, trackingCode = "", note = "") {
  const safeIndex = Math.max(0, Math.min(TRACKING_STAGES.length - 1, Number(nextStageIndex) || 0));
  const stageMeta = TRACKING_STAGES[safeIndex];

  const updatedOrders = orders.map((order) => {
    if (order.id !== orderId) return order;
    return {
      ...order,
      stageIndex: safeIndex,
      statusLabel: stageMeta.label,
      trackingCode: trackingCode.trim() || order.trackingCode || "",
      timeline: createTrackingTimeline(safeIndex, note)
    };
  });

  saveOrders(updatedOrders);
  return updatedOrders;
}

export function checkoutOrder(cart, delivery = {}, comment = "", existingOrders = []) {
  if (!cart.length) return { ok: false, error: "Корзина пуста" };

  const validation = validateDeliveryDetails(delivery);
  if (!validation.valid) {
    return { ok: false, error: validation.error };
  }

  const { totalPrice } = getCartSummary(cart);
  const orderId = generateOrderId();
  const methodMeta = getDeliveryMethodMeta(delivery.method);
  const pickupPoint = PICKUP_POINTS.find((p) => p.id === delivery.pickupPointId);

  const normalizedDelivery = {
    method: methodMeta.id,
    methodLabel: methodMeta.label,
    recipientName: (delivery.recipientName || "").trim(),
    phone: (delivery.phone || "").trim(),
    city: methodMeta.id === "pickup" ? (pickupPoint?.title || "Самовывоз") : (delivery.city || "").trim(),
    destination:
      methodMeta.id === "pickup"
        ? `${pickupPoint?.title || "Самовывоз"} — ${pickupPoint?.address || ""}`
        : (delivery.destination || "").trim(),
    pickupPointId: delivery.pickupPointId || null
  };

  const orderRecord = {
    id: orderId,
    createdAt: new Date().toISOString(),
    createdLabel: new Date().toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    user: {
      tg_id: tgUser.id,
      username: tgUser.username || null
    },
    items: cart,
    total: totalPrice,
    delivery: normalizedDelivery,
    comment: (comment || "").trim(),
    stageIndex: 0,
    statusLabel: TRACKING_STAGES[0].label,
    trackingCode: "",
    timeline: createTrackingTimeline(0)
  };

  const payload = {
    action: "create_order",
    order: orderRecord
  };

  if (tg?.sendData) {
    tg.sendData(JSON.stringify(payload));
  }

  const usernameLabel = tgUser.username ? `@${tgUser.username}` : "без username";
  const itemsLines = cart.map(
    (item) =>
      `• ${item.title} (${item.size || "-"}, ${item.color || "-"}) × ${item.qty} — ${item.price * item.qty} ₽`
  );

  const deliveryLines =
    normalizedDelivery.method === "pickup"
      ? [
          `Способ: ${normalizedDelivery.methodLabel}`,
          `Точка: ${normalizedDelivery.destination}`,
          `Получатель: ${normalizedDelivery.recipientName}`,
          `Телефон: ${normalizedDelivery.phone}`
        ]
      : [
          `Способ: ${normalizedDelivery.methodLabel}`,
          `Город: ${normalizedDelivery.city}`,
          `ПВЗ / адрес: ${normalizedDelivery.destination}`,
          `Получатель: ${normalizedDelivery.recipientName}`,
          `Телефон: ${normalizedDelivery.phone}`
        ];

  const orderMessage = [
    `🛒 Новый заказ ${orderId} — FORMA`,
    `Покупатель: ${usernameLabel} (ID: ${tgUser.id})`,
    "",
    ...deliveryLines,
    "",
    "Товары:",
    ...itemsLines,
    "",
    `Итого: ${totalPrice} ₽`,
    `Статус: ${orderRecord.statusLabel}`,
    normalizedDelivery.comment || orderRecord.comment
      ? `Комментарий: ${orderRecord.comment}`
      : "Комментарий: —"
  ].join("\n");

  sendTelegramNotification(orderMessage);

  const nextOrders = [orderRecord, ...existingOrders];
  saveOrders(nextOrders);
  localStorage.removeItem(CART_KEY);

  return { ok: true, order: orderRecord, orders: nextOrders, payload };
}
