import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: {},
  },
  reducers: {
    fetchUsers: (state, action) => {
      state.users = action.payload;
    },

    fetchUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {},
});

const { reducer, actions } = userSlice;

export const { fetchUsers, fetchUser } = actions;

export const selectUsers = (state) => state.user.users;

export const selectUser = (state) => state.user.user;

export default reducer;
