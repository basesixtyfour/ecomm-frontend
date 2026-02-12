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

export const fetchUsers = () =>
  safe(async () => ok(await delay(Users)), {
    toastId: "users:fetch",
    errorMessage: "Failed to fetch users",
  });

const encodeCursor = (product, sortByPrice = false) => {
  const cursorData = sortByPrice
    ? { id: product.id, price: product.price }
    : { id: product.id };
  return btoa(JSON.stringify(cursorData));
};

const decodeCursor = (cursor) => {
  try {
    return JSON.parse(atob(cursor));
  } catch {
    return null;
  }
};

export const fetchProducts = ({
  categoryIds = [],
  sortByPrice = false,
  sortByPriceAsc = false,
  cursor = null,
  limit = 10,
  search = "",
} = {}) => {
  // return a demo error for testing
  // return fail("Demo error for testing", "products:fetch:demo");
  return safe(
    async () => {
      const categoryNameById = new Map(Categories.map((c) => [c.id, c.name]));

      const categoryIdFilter = new Set(
        (Array.isArray(categoryIds) ? categoryIds : [])
          .map((id) => Number(id))
          .filter((id) => Number.isFinite(id))
      );
      const shouldFilterByCategory = categoryIdFilter.size > 0;
      const searchQuery = search.trim().toLowerCase();

      const productCategoryIdsByProductId = new Map();
      for (const pc of ProductCategories) {
        const list = productCategoryIdsByProductId.get(pc.productId);
        if (list) list.push(pc.categoryId);
        else productCategoryIdsByProductId.set(pc.productId, [pc.categoryId]);
      }

      let productsWithCategories = [];
      for (const product of Products) {
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery)) {
          continue;
        }

        const productCategoryIds = productCategoryIdsByProductId.get(product.id) || [];

        if (shouldFilterByCategory) {
          let matches = false;
          for (const catId of productCategoryIds) {
            if (categoryIdFilter.has(catId)) {
              matches = true;
              break;
            }
          }
          if (!matches) continue;
        }

        const categories = [];
        for (const catId of productCategoryIds) {
          const name = categoryNameById.get(catId);
          if (name) categories.push(name);
        }

        productsWithCategories.push({ ...product, categories });
      }

      if (sortByPrice) {
        productsWithCategories.sort((a, b) => {
          const priceCompare = sortByPriceAsc ? a.price - b.price : b.price - a.price;
          return priceCompare !== 0 ? priceCompare : a.id - b.id;
        });
      } else {
        productsWithCategories.sort((a, b) => a.id - b.id);
      }

      const totalCount = productsWithCategories.length;

      if (cursor) {
        const cursorData = decodeCursor(cursor);
        if (cursorData) {
          const cursorIndex = productsWithCategories.findIndex((product) => {
            if (sortByPrice && cursorData.price !== undefined) {
              const priceCompare = sortByPriceAsc
                ? product.price > cursorData.price || (product.price === cursorData.price && product.id > cursorData.id)
                : product.price < cursorData.price || (product.price === cursorData.price && product.id > cursorData.id);
              return priceCompare;
            }
            return product.id > cursorData.id;
          });

          if (cursorIndex !== -1) {
            productsWithCategories = productsWithCategories.slice(cursorIndex);
          } else {
            productsWithCategories = [];
          }
        }
      }

      const pageData = productsWithCategories.slice(0, limit);
      const hasMore = productsWithCategories.length > limit;
      const nextCursor = hasMore ? encodeCursor(pageData[pageData.length - 1], sortByPrice) : null;

      return ok(
        await delay({
          data: pageData,
          nextCursor,
          hasMore,
          totalCount,
        })
      );
    },
    {
      toastId: "products:fetch",
      errorMessage: "Failed to fetch products",
    }
  );
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

export const loginUser = (email, password) => {
  return safe(
    async () => {
      const user = Users.find((u) => u.email === email && u.password === password);
      if (!user) {
        return fail("Invalid email or password", "auth:login:invalid");
      }
      return ok(await delay({ id: user.id }));
    },
    { toastId: "auth:login", errorMessage: "Login failed" }
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

export const registerUser = (email, password) => {
  return safe(
    async () => {
      const newUser = { id: nextId(Users), email, password };
      Users.push(newUser);
      return ok(await delay(newUser));
    },
    { toastId: "users:register", errorMessage: "Failed to register user" }
  );
};
