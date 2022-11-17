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
import ReviewReducer from "./Reducers/ReviewReducer";
import createNewProduct from "./Reducers/admin/NewProductReducer";
import DeleteProductReducer from "./Reducers/admin/DeleteProductReducer";
import UpdateProductReducer from "./Reducers/admin/UpdateProductReducer";

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
    ReviewReducer,
    createNewProduct,
    DeleteProductReducer,
    UpdateProductReducer,
  },
});

export default store;
