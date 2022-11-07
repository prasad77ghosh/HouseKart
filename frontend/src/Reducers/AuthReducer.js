import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: null,
};

const AuthReducer = createReducer(initialState, {
  //login user
  loginUserRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loginUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loginUserFailure: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  registerUserRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  registerUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  registerUserFailure: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  loadUserRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loadUserFailure: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default AuthReducer;
