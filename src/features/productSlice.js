import { createSlice } from "@reduxjs/toolkit";

const savedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

const initialState = {
  products: [],
  selectedProduct: savedProduct || null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      // localStorage.setItem("selectedProduct", JSON.stringify(action.payload));
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      // localStorage.removeItem("selectedProduct");
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (p) => p._id === action.payload._id,
      );
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
  },
});

export const {
  setProduct,
  setSelectedProduct,
  clearSelectedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
