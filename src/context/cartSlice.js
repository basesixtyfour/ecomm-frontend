import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart, addCartItem, updateCartItem, deleteCartItem, clearCartApi } from "../services/api";
import { logoutUser } from "./authSlice";
import { toast } from "react-toastify";
import { getLocalCart, saveLocalCart, clearLocalCart, calcTotal } from "../utils/localCart";

const initialState = {
  cartId: null,
  items: [],
  totalPrice: 0,
  status: "idle",
  error: null,
};

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCart();
    } catch (err) {
      const msg = err?.message || "Failed to fetch cart";
      toast.error(msg, { toastId: "cart:fetch:error" });
      return rejectWithValue(msg);
    }
  }
);

export const addCartItemAsync = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      return await addCartItem(productId, quantity);
    } catch (err) {
      const msg = err?.message || "Failed to add item to cart";
      toast.error(msg, { toastId: "cart:add:error" });
      return rejectWithValue(msg);
    }
  }
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      return await updateCartItem(itemId, quantity);
    } catch (err) {
      const msg = err?.message || "Failed to update cart item";
      toast.error(msg, { toastId: "cart:update:error" });
      return rejectWithValue(msg);
    }
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteItem",
  async (itemId, { rejectWithValue }) => {
    try {
      return await deleteCartItem(itemId);
    } catch (err) {
      const msg = err?.message || "Failed to remove cart item";
      toast.error(msg, { toastId: "cart:delete:error" });
      return rejectWithValue(msg);
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      return await clearCartApi();
    } catch (err) {
      const msg = err?.message || "Failed to clear cart";
      toast.error(msg, { toastId: "cart:clear:error" });
      return rejectWithValue(msg);
    }
  }
);

export const mergeCartAsync = createAsyncThunk(
  "cart/merge",
  async (_, { rejectWithValue }) => {
    try {
      const localItems = getLocalCart();
      for (const item of localItems) {
        await addCartItem(item.product.id, item.quantity);
      }
      clearLocalCart();
      return await fetchCart();
    } catch (err) {
      const msg = err?.message || "Failed to merge cart";
      toast.error(msg, { toastId: "cart:merge:error" });
      return rejectWithValue(msg);
    }
  }
);

const applyCart = (state, action) => {
  const { id, items, total_price } = action.payload;
  state.cartId = id;
  state.items = items;
  state.totalPrice = total_price;
  state.status = "ready";
  state.error = null;
};

const setLoading = (state) => {
  state.status = "loading";
  state.error = null;
};

const setError = (state, action) => {
  state.status = "error";
  state.error = action.payload;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => initialState,
    loadLocalCart: (state) => {
      const items = getLocalCart();
      state.cartId = "local";
      state.items = items;
      state.totalPrice = calcTotal(items);
      state.status = "ready";
      state.error = null;
    },
    addLocalItem: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id: `local_${product.id}`,
          quantity,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
          },
        });
      }
      state.totalPrice = calcTotal(state.items);
      state.cartId = "local";
      state.status = "ready";
      saveLocalCart(state.items);
    },
    updateLocalItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.product.id === productId);
      if (item) item.quantity = quantity;
      state.totalPrice = calcTotal(state.items);
      saveLocalCart(state.items);
    },
    removeLocalItem: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter((i) => i.product.id !== productId);
      state.totalPrice = calcTotal(state.items);
      saveLocalCart(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.pending, setLoading)
      .addCase(fetchCartAsync.fulfilled, applyCart)
      .addCase(fetchCartAsync.rejected, setError)

      .addCase(addCartItemAsync.pending, setLoading)
      .addCase(addCartItemAsync.fulfilled, applyCart)
      .addCase(addCartItemAsync.rejected, setError)

      .addCase(updateCartItemAsync.pending, setLoading)
      .addCase(updateCartItemAsync.fulfilled, applyCart)
      .addCase(updateCartItemAsync.rejected, setError)

      .addCase(deleteCartItemAsync.pending, setLoading)
      .addCase(deleteCartItemAsync.fulfilled, applyCart)
      .addCase(deleteCartItemAsync.rejected, setError)

      .addCase(clearCartAsync.pending, setLoading)
      .addCase(clearCartAsync.fulfilled, applyCart)
      .addCase(clearCartAsync.rejected, setError)

      .addCase(mergeCartAsync.pending, setLoading)
      .addCase(mergeCartAsync.fulfilled, applyCart)
      .addCase(mergeCartAsync.rejected, setError)

      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

export const { clearCart, loadLocalCart, addLocalItem, updateLocalItem, removeLocalItem } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
