import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart, addCartItem, updateCartItem, deleteCartItem, clearCartApi } from "../services/api";
import { logoutUser } from "./authSlice";
import { toast } from "react-toastify";

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

      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

export const { clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
