import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const updateProduct = createReducer(initialState, {
  updateProductRequest: (state) => {
    state.loading = true;
  },
  updateProductSuccess: (state, action) => {
    state.loading = true;
    state.success = action.payload;
  },

  updateProductFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateProductReset: (state, action) => {
    state.loading = false;
    state.success = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default updateProduct;
