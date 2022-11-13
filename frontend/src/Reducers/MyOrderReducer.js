import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const MyOrderReducer = createReducer(initialState, {
  myOrderRequest: (state) => {
    state.loading = true;
  },

  myOrderSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  },

  myOrderFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default MyOrderReducer;
