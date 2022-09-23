import { configureStore } from "@reduxjs/toolkit";
import allProductReducer from "./Slice/Product/productSlice";
import ProductDetailsReducer from "./Slice/Product/ProductDetails";
const store = configureStore({
  reducer: {
    allProduct: allProductReducer,
    ProductDetails: ProductDetailsReducer,
  },
});

export default store;
