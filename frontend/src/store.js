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
import AdOrderReducer from "./Reducers/admin/AdOrderReducer";
import AdOrderDeleteReducer from "./Reducers/admin/AdOrderDeleteReducer";
import AdOrderUpdateReducer from "./Reducers/admin/AdOrderUpdate";
import AdUserReducer from "./Reducers/admin/AdUserReducer";
import AdDeleteUserReducer from "./Reducers/admin/AdDeleteUserReducer";
import UpdateUserReducer from "./Reducers/admin/UpdateUserReducer";
import AdUserDetailsReducer from "./Reducers/admin/AdUserDetailsReducer";
import AdReviewsReducer from "./Reducers/admin/AdReviewsReducer";
import AdDeleteReviewReducer from "./Reducers/admin/AdReviewDeleteReducer";

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
    AdOrderReducer,
    AdOrderDeleteReducer,
    AdOrderUpdateReducer,
    AdUserReducer,
    AdDeleteUserReducer,
    UpdateUserReducer,
    AdUserDetailsReducer,
    AdReviewsReducer,
    AdDeleteReviewReducer,
  },
});

export default store;
