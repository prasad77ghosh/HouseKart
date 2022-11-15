import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const ReviewReducer = createReducer(initialState, {
  reviewSubmitRequest: (state) => {
    state.loading = true;
  },
  reviewSubmitSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
  },
  reviewSubmitFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  reviewSubmitReset: (state, action) => {
    state.success = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default ReviewReducer;
