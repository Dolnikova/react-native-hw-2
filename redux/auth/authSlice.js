import { createSlice } from '@reduxjs/toolkit';
import { login, logOut, register } from './authOperations';

const pendingState = state => {
  state.isLoading = true;
};
const fulfilledState = (state, payload) => {
  state.isLoading = false;
  state.user.userId = payload.user.uid;
  state.user.userMail = payload.user.email;
};
const rejectedState = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { userId: null, userMail: null, name: null },
    isLoading: false,
    error: null,
  },
  reducers: {
    updateUserProfile(state, { payload }) {
      state.user.name = payload.displayName;
      state.user.userId = payload.uid;
      state.user.userMail = payload.email;
    },
  },
  extraReducers: {
    [register.pending]: pendingState,
    [register.fulfilled](state, { payload }) {
      fulfilledState(state, payload);
      state.user.name = payload.name;
    },
    [register.rejected]: rejectedState,
    [login.pending]: pendingState,
    [login.fulfilled](state, { payload }) {
      fulfilledState(state, payload);
      console.log(payload.user.displayName, 'PAYLOAD <<<<<<<<<<<<<<<<<<<<<');
      state.user.name = payload.user.displayName;
    },
    [login.rejected]: rejectedState,
    [logOut.pending]: pendingState,
    [logOut.fulfilled](state) {
      state.isLoading = false;
      state.user.userId = null;
      state.user.userMail = null;
      state.user.name = null;
    },
    [logOut.rejected]: rejectedState,
  },
});

export const { updateUserProfile } = authSlice.actions;
