import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./Reducers/ProductsReducer";
import ProductDetailsReducer from "./Reducers/P_DetailsReducers";
import RawProductsReducer from "./Reducers/RewProducts";
import AuthReducer from "./Reducers/AuthReducer";
import ProfileReducer from "./Reducers/ProfileReducer";
import PasswordReducer from "./Reducers/PasswordReducer";
import CartReducer from "./Reducers/CartReducer";
import OrderReducer from "./Reducers/OrderReducer";
import MyOrderReducer from "./Reducers/MyOrderReducer";
import OrderDetailsReducer from "./Reducers/OrderDetailsReducer";

const store = configureStore({
  reducer: {
    ProductsReducer,
    ProductDetailsReducer,
    RawProductsReducer,
    AuthReducer,
    ProfileReducer,
    PasswordReducer,
    Cart: CartReducer,
    OrderReducer,
    MyOrderReducer,
    OrderDetailsReducer,
  },
});

export default store;
