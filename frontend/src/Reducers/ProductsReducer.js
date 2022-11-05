import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const ProductsReducer = createReducer(initialState, {
  // get all products
  getAllProductsReqest: (state) => {
    state.loading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  getAllProductsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default ProductsReducer;
