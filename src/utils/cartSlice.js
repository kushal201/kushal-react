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
      state.items = state.items.filter(item => item.card.info.id !== action.payload.id)
    },

    // for clearing the cart
    clearCart: (state) => {
      state.items = []; // array becomes empty
      console.log("Clicked")
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
