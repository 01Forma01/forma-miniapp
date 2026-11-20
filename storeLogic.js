const tg = window.Telegram?.WebApp;
const tgUser = tg?.initDataUnsafe?.user || { id: "guest", username: "guest" };

const CART_KEY = `forma_cart_${tgUser.id}`;
const DROP_SUBS_KEY = `forma_drop_subs_${tgUser.id}`;

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

  if (tg?.sendData) {
    tg.sendData(
      JSON.stringify({
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
      })
    );
  }

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

  localStorage.removeItem(CART_KEY);
  return { ok: true, payload };
}
