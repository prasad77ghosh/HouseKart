import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: null,
};

const AdUserReducer = createReducer(initialState, {
  getAllUserRequest: (state) => {
    state.loading = true;
  },

  getAllUserSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },

  getAllUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default AdUserReducer;
