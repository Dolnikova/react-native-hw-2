import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, user } from '../../firebase/config';

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: '',
      }).catch(e => console.error(e));
      return { user: createdUser, name };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const loggedUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return loggedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth).catch(e => console.error(e.message));
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
