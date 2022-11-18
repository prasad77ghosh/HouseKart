import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const AdOrderReducer = createReducer(initialState, {
  getAllOrderRequest: (state) => {
    state.loading = true;
  },

  getAllOrderSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },

  getAllOrderFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default AdOrderReducer;
