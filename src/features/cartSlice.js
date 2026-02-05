import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  items: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i?._id === item?._id);
      if (existingItem) {
        existingItem.quantity == +1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i?._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        if (type === "increment") item.quantity += 1;
        if (type === "decrement" && item.quantity > 1) item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
