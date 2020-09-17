import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: {},
    friends: [],
    onlineFriends: [],
  },
  reducers: {
    fetchUsers: (state, action) => {
      state.users = action.payload
    },

    fetchUser: (state, action) => {
      state.user = action.payload
    },

    fetchFriends: (state, action) => {
      state.friends = action.payload
    },

    fetchOnlineFriends: (state, action) => {
      state.onlineFriends = action.payload
    },
  },
  extraReducers: {},
})

const { reducer, actions } = userSlice

export const {
  fetchUsers,
  fetchUser,
  fetchFriends,
  fetchOnlineFriends,
} = actions
export default reducer
