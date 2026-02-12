import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./context/cartSlice";
import authReducer from "./context/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});