import { createSlice } from '@reduxjs/toolkit';

const userLoginData = JSON.parse(window.localStorage.getItem("userLoginData"));

const initialState = {
  isLoggedIn: userLoginData !== null,
};

export const AuthUser = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = AuthUser.actions;

export default AuthUser.reducer;
