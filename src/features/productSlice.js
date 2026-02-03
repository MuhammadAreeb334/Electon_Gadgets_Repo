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
  },
});

export const { setProduct, setSelectedProduct, clearSelectedProduct } =
  productSlice.actions;

export default productSlice.reducer;
