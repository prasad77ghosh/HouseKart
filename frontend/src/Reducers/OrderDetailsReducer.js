import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  order: {},
  error: null,
};
const OrderDetailsReducer = createReducer(initialState, {
  orderDetailsRequest: (state) => {
    state.loading = true;
  },

  orderDetailsSuccess: (state, action) => {
    state.loading = false;
    state.order = action.payload;
  },

  orderDetailsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default OrderDetailsReducer;
