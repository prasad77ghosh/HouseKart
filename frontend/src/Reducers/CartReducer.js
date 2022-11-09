import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  CartItems: localStorage.getItem("Cart_Items")
    ? JSON.parse(localStorage.getItem("Cart_Items"))
    : [],
};

const CartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.CartItems.find((i) => i.product === item.product);
    if (isItemExist) {
      state.CartItems = state.CartItems.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      state.CartItems.push(item);
    }
  },

  removeFromCart: (state, action) => {
    state.CartItems = state.CartItems.filter(
      (i) => i.product !== action.payload
    );
  },
});
export default CartReducer;
