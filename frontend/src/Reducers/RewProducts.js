import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const RawProductsReducer = createReducer(initialState, {
  // get all products
  getAllRawProductsReqest: (state) => {
    state.loading = true;
  },
  getAllRawProductsSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  getAllRawProductsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default RawProductsReducer;
