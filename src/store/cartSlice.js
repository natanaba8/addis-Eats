import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price, 0);
