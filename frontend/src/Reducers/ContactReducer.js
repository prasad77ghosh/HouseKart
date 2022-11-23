import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const ContactReducer = createReducer(initialState, {
  sendMessageRequest: (state) => {
    state.loading = true;
  },

  sendMessageSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
  },

  sendMessageFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  sendMessageReset: (state, action) => {
    state.loading = false;
    state.success = false;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default ContactReducer;
