import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const AdDeleteUserReducer = createReducer(initialState, {
  deleteUserRequest: (state) => {
    state.loading = true;
  },
  deleteUserSuccess: (state, action) => {
    state.loading = true;
    state.success = action.payload;
  },

  deleteUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteUserReset: (state) => {
    state.loading = false;
    state.success = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default AdDeleteUserReducer;
