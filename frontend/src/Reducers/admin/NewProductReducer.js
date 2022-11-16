import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const createNewProduct = createReducer(initialState, {
  newProductRequest: (state) => {
    state.loading = true;
  },
  newProductSuccess: (state, action) => {
    state.loading = true;
    state.success = action.payload;
  },

  newProductFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  newProductReset: (state, action) => {
    state.loading = false;
    state.success = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default createNewProduct;
