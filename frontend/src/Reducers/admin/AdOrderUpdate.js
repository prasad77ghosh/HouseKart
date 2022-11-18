import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const AdOrderUpdateReducer = createReducer(initialState, {
  updateOrderRequest: (state) => {
    state.loading = true;
  },

  updateOrderSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
  },

  updateOrderFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updateOrderReset: (state) => {
    state.success = false;
    state.loading = false;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default AdOrderUpdateReducer;
