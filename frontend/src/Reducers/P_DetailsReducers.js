import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const ProductDetailsReducer = createReducer(initialState, {
  // get all products
  getProductDetailsReqest: (state) => {
    state.loading = true;
  },
  getProductDetailsSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  getProductDetailsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default ProductDetailsReducer;
