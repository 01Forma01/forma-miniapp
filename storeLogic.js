const tg = window.Telegram?.WebApp;
const tgUser = tg?.initDataUnsafe?.user || { id: "guest", username: "guest" };

const CART_KEY = `forma_cart_${tgUser.id}`;
const DROP_SUBS_KEY = `forma_drop_subs_${tgUser.id}`;

// Временная прямая отправка с фронтенда для теста (после проверки лучше вынести в конструктор ботов и сменить токен)
const BOT_TOKEN = "9018078921:AAFtr3AOF9jIcRCLsJyBXjTdlXU1I8rjtSk";
const TARGET_CHAT_ID = "-1004351317145";

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
  return { cart, dropSubs };
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
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

export function checkoutOrder(cart, comment = "") {
  if (!cart.length) return { ok: false, error: "Корзина пуста" };

  const { totalPrice } = getCartSummary(cart);
  const payload = {
    action: "create_order",
    user: {
      tg_id: tgUser.id,
      username: tgUser.username || null
    },
    items: cart,
    total: totalPrice,
    comment
  };

  if (tg?.sendData) {
    tg.sendData(JSON.stringify(payload));
  }

  const usernameLabel = tgUser.username ? `@${tgUser.username}` : "без username";
  const itemsLines = cart.map(
    (item) =>
      `• ${item.title} (${item.size || "-"}, ${item.color || "-"}) × ${item.qty} — ${item.price * item.qty} ₽`
  );

  const orderMessage = [
    "🛒 Новый заказ — FORMA",
    `Покупатель: ${usernameLabel} (ID: ${tgUser.id})`,
    "",
    ...itemsLines,
    "",
    `Итого: ${totalPrice} ₽`,
    comment ? `Комментарий: ${comment}` : "Комментарий: —"
  ].join("\n");

  sendTelegramNotification(orderMessage);

  localStorage.removeItem(CART_KEY);
  return { ok: true, payload };
}
