import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const createNewProduct = createReducer(initialState, {
  deleteProductRequest: (state) => {
    state.loading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.loading = true;
    state.success = action.payload;
  },

  deleteProductFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteProductReset: (state) => {
    state.loading = false;
    state.success = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default createNewProduct;
