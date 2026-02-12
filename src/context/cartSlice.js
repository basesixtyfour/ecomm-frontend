import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart } from "../services/api";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
  status: "idle",
  error: null,
};

export const fetchCartAction = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchCart();
    if (!res.success) {
      return rejectWithValue(res.message || "Failed to fetch cart");
    }
    return res.data;
  } catch (err) {
    const msg = err?.message || "Failed to fetch cart";
    toast.error(msg, { toastId: "cart:fetch:exception" });
    return rejectWithValue(msg);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAction.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchCartAction.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "ready";
    })
    .addCase(fetchCartAction.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;