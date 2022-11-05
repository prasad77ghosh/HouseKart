import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./Reducers/ProductsReducer";
import ProductDetailsReducer from "./Reducers/P_DetailsReducers";

const store = configureStore({
  reducer: {
    ProductsReducer,
    ProductDetailsReducer,
  },
});

export default store;
