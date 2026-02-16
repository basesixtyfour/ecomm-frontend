import { Users, Products, Categories, nextId, Carts, CartProducts, ProductCategories } from "./db";
import { toast } from "react-toastify";

const delay = (value, ms = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const ok = (data) => ({ success: true, data, message: null });
const fail = (message, toastId) => {
  toast.error(message, { toastId });
  return { success: false, data: null, message };
};

const safe = async (fn, { toastId, errorMessage }) => {
  try {
    return await fn();
  } catch (error) {
    const msg = error?.message || errorMessage || "Something went wrong";
    toast.error(msg, { toastId });
    return { success: false, data: null, message: msg };
  }
};

export const fetchUsers = async () => {
  const data = await fetch('http://localhost:8000/api/users/')
  return await data.json()
}

export const fetchProducts = async ({
  categories = [],
  sort = "",
  page = null,
  search = "",
  signal,
} = {}) => {
  const params = new URLSearchParams();

  if (sort) params.set("sort", sort);
  if (categories.length > 0) params.set("categories", categories.join(","));
  if (page) params.set("page", String(page));
  if (search) params.set("search", search);

  const qs = params.toString();
  const url = `http://localhost:8000/api/products/${qs ? `?${qs}` : ""}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
};

export const fetchCategories = () =>
  safe(async () => ok(await delay(Categories)), {
    toastId: "categories:fetch",
    errorMessage: "Failed to fetch categories",
  });

export const createUser = (userName) => {
  return safe(
    async () => {
      const newUser = { id: nextId(Users), name: userName };
      return ok(await delay(newUser));
    },
    { toastId: "users:create", errorMessage: "Failed to create user" }
  );
};

export const createProduct = (productName, description = "") => {
  return safe(
    async () => {
      const newProduct = { id: nextId(Products), name: productName, description };
      return ok(await delay(newProduct));
    },
    { toastId: "products:create", errorMessage: "Failed to create product" }
  );
};

export const fetchProduct = (productId) => {
  return safe(
    async () => {
      const id = Number(productId);
      const product = Products.find((p) => p.id === id);
      if (!product) {
        return fail("Product not found", "product:notFound");
      }

      const categoryIds = ProductCategories.filter((pc) => pc.productId === id).map(
        (pc) => pc.categoryId
      );
      const categories = categoryIds
        .map((catId) => {
          const category = Categories.find((c) => c.id === catId);
          return category ? category.name : null;
        })
        .filter(Boolean);

      return ok(await delay({ ...product, categories }));
    },
    { toastId: "product:fetch", errorMessage: "Failed to fetch product" }
  );
};

export const fetchCart = () => {
  return safe(
    async () => {
      const userId = Number(localStorage.getItem("userId"));

      if (!Number.isFinite(userId) || userId <= 0) {
        return ok(await delay([]));
      }

      const cart = Carts.find((c) => c.userId === userId);
      if (!cart) return ok(await delay([]));

      const cartProducts = CartProducts.filter((cp) => cp.cartId === cart.id).map(
        (cp) => {
          const product = Products.find((p) => p.id === cp.productId);
          return { ...cp, product: product || null };
        }
      );

      return ok(await delay(cartProducts));
    },
    { toastId: "cart:fetch", errorMessage: "Failed to fetch cart" }
  );
};

export const updateCart = (productId, quantity) => {
  return safe(
    async () => {
      const userId = Number(localStorage.getItem("userId"));

      if (!Number.isFinite(userId) || userId <= 0) {
        return fail("Please login to update cart", "cart:update:login");
      }

      const cart = Carts.find((c) => c.userId === userId);
      if (!cart) {
        return fail("Cart not found", "cart:update:notFound");
      }

      const existing = CartProducts.find(
        (cp) => cp.cartId === cart.id && cp.productId === Number(productId)
      );

      if (quantity <= 0) {
        if (existing) {
          const index = CartProducts.findIndex((cp) => cp.id === existing.id);
          if (index !== -1) {
            CartProducts.splice(index, 1);
          }
        }
        return ok(await delay(null));
      }

      if (existing) {
        existing.quantity = quantity;
        return ok(await delay(existing));
      }

      const newItem = {
        id: nextId(CartProducts),
        productId: Number(productId),
        quantity,
        cartId: cart.id,
      };

      CartProducts.push(newItem);
      return ok(await delay(newItem));
    },
    { toastId: "cart:update", errorMessage: "Failed to update cart" }
  );
};

export const searchProducts = (query) => {
  return safe(
    async () => {
      const term = (query || "").trim().toLowerCase();
      if (!term) return ok(await delay([]));

      const products = Products.filter((p) => p.name.toLowerCase().includes(term))
        .slice(0, 10)
        .map((p) => ({
          id: p.id,
          name: p.name,
        }));
      return ok(await delay(products));
    },
    { toastId: "products:search", errorMessage: "Search failed" }
  );
};

export const registerUser = async (username, email, password) => {
  const response = await fetch('http://localhost:8000/api/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok)
    throw new Error("Failed to register user");
  
  return await response.json();
};
