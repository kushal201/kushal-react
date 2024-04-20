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

    // to remove a specific item from the cart
    removeItem: (state, action) => {
      const indexToRemove = action.payload;
      state.items.splice(indexToRemove, 1)
    },

    // for clearing the cart
    clearCart: (state) => {
      state.items = []; // array becomes empty
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
