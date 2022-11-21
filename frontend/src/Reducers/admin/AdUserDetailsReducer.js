import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
  error: null,
};

const AdUserDetailsReducer = createReducer(initialState, {
  getUserDetailsRequest: (state) => {
    state.loading = true;
  },

  getUserDetailsSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },

  getUserDetailsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default AdUserDetailsReducer;
