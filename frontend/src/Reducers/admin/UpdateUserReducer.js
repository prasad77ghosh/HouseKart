import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const UpdateUserReducer = createReducer(initialState, {
  updateUserRequest: (state) => {
    state.loading = true;
  },
  updateUserSuccess: (state, action) => {
    state.loading = true;
    state.success = action.payload;
  },

  updateUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateUserReset: (state) => {
    state.loading = false;
    state.success = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default UpdateUserReducer;
