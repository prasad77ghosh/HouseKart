import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const AdOrderDeleteReducer = createReducer(initialState, {
  deleteOrderRequest: (state) => {
    state.loading = true;
  },

  deleteOrderSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
  },

  deleteOrderFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deleteOrderReset: (state) => {
    state.success = false;
    state.loading = false;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default AdOrderDeleteReducer;
