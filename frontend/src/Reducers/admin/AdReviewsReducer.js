import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  reviews: [],
  error: null,
};

const AdReviewsReducer = createReducer(initialState, {
  getAllReviewsRequest: (state) => {
    state.loading = true;
  },

  getAllReviewsSuccess: (state, action) => {
    state.loading = false;
    state.reviews = action.payload;
  },

  getAllReviewsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default AdReviewsReducer;
