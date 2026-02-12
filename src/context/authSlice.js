import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: Number(localStorage.getItem("userId")) || null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
            localStorage.setItem("userId", action.payload);
        },
    },
});

export const { setUserId } = authSlice.actions;
export default authSlice.reducer;