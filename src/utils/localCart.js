const CART_KEY = "guest_cart";

export const getLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveLocalCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const clearLocalCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const calcTotal = (items) =>
  items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);
