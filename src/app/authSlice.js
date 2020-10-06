import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
  },
  reducers: {
    loginUser: (state, action) => {
      state.current = action.payload;
    },

    renewAccessToken: (state, action) => {
      state.current.access_token = action.payload;
    },

    fetchCurrent: (state, action) => {
      state.current = { ...state.current, ...action.payload };
    },

    updatePhotoUrl: (state, action) => {
      state.current.photoUrl = action.payload;
    },

    logoutUser: (state) => {
      state.current = {};
    },
  },
  extraReducers: {},
});

const { reducer, actions } = authSlice;

export const {
  loginUser,
  renewAccessToken,
  fetchCurrent,
  updatePhotoUrl,
  logoutUser,
} = actions;

export const selectCurrent = (state) => state.auth.current;

export default reducer;
