import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./Reducers/ProductsReducer";
import ProductDetailsReducer from "./Reducers/P_DetailsReducers";
import RawProductsReducer from "./Reducers/RewProducts";
import AuthReducer from "./Reducers/AuthReducer";
import ProfileReducer from "./Reducers/ProfileReducer";
const store = configureStore({
  reducer: {
    ProductsReducer,
    ProductDetailsReducer,
    RawProductsReducer,
    AuthReducer,
    ProfileReducer,
  },
});

export default store;
