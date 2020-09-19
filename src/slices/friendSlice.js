import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import friendApi from '../apis/friendApi'

export const fetchFriends = createAsyncThunk(
  'friend/fetchFriends',
  async () => {
    const friends = await friendApi.fetchFriends()
    return friends
  }
)

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    friends: [],
    onlineFriends: [],
  },
  reducers: {
    addOnlineFriends: (state, action) => {
      if (!state.onlineFriends.includes(action.payload)) {
        state.onlineFriends.push(action.payload)
      }
    },

    removeOnlineFriends: (state, action) => {
      if (state.onlineFriends.includes(action.payload)) {
        const index = state.onlineFriends.indexOf(action.payload)
        if (index > -1) {
          state.onlineFriends.splice(index, 1)
        }
      }
    },
  },
  extraReducers: {
    [fetchFriends.fulfilled]: (state, action) => {
      state.friends = action.payload
      state.onlineFriends = action.payload
        .filter((friend) => friend.isOnline === true)
        .map((friend) => friend._id)
    },

    [fetchFriends.rejected]: (state, action) => {
      state.friends = []
      state.onlineFriends = []
    },
  },
})

const { reducer, actions } = friendSlice

export const { addOnlineFriends, removeOnlineFriends } = actions
export default reducer
