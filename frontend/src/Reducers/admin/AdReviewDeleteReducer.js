import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const AdDeleteReviewReducer = createReducer(initialState, {
  deleteReviewRequest: (state) => {
    state.loading = true;
  },
  deleteReviewSuccess: (state, action) => {
    state.loading = true;
    state.success = action.payload;
  },

  deleteReviewFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteReviewReset: (state) => {
    state.loading = false;
    state.success = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default AdDeleteReviewReducer;
