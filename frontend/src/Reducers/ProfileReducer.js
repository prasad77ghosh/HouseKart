import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isUpdated: null,
  error: null,
};

const ProfileReducer = createReducer(initialState, {
  //profile update2
  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = action.payload;
  },
  updateProfileFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updateProfileReset: (state) => {
    state.isUpdated = null;
  },

  //password update
  updatePasswordRequest: (state) => {
    state.loading = true;
  },
  updatePassswordSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = action.payload;
  },
  updatePasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updatePasswordReset: (state) => {
    state.isUpdated = null;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default ProfileReducer;
