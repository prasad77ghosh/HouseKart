import { configureStore } from "@reduxjs/toolkit";
import allProductsReducer from "./Slices/getAllProductSlice";
import ProductDetailsReducer from "./Slices/ProductDetailSlice";

const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
    product_details: ProductDetailsReducer,
  },
});

export default store;
