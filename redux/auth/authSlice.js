import { createSlice } from '@reduxjs/toolkit';
import { login, logOut, register } from './authOperations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { userId: null, userMail: null },
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [register.pending](state) {
      state.isLoading = true;
    },
    [register.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.user.userId = payload.user.uid;
      state.user.userMail = payload.user.email;
    },
    [register.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    [login.pending](state) {
      state.isLoading = true;
    },
    [login.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.user.userId = payload.user.uid;
      state.user.userMail = payload.user.email;
      console.log(payload.user);
    },
    [login.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    [logOut.pending](state) {
      state.isLoading = true;
    },
    [logOut.fulfilled](state) {
      state.isLoading = false;
      state.user.userId = null;
    },
    [logOut.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});
