import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // inital state of cart is empty
  },
  reducers: {
    // to add item in the cart
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    // to remove an item from the cart
    removeItem: (state) => {
      state.items.pop();
    },

    // for clearing the cart
    clearCart: (state) => {
      return { items: [] }; // array becomes empty
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
