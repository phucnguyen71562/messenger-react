import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import friendApi from '../../apis/friendApi';

export const fetchFriends = createAsyncThunk(
  'friend/fetchFriends',
  async () => {
    const { data } = await friendApi.fetchFriends();
    return data;
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    friends: [],
    onlineFriends: [],
  },
  reducers: {
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },

    addOnlineFriends: (state, action) => {
      if (!state.onlineFriends.includes(action.payload)) {
        state.onlineFriends.push(action.payload);
      }
    },

    removeOnlineFriends: (state, action) => {
      if (state.onlineFriends.includes(action.payload)) {
        const index = state.onlineFriends.indexOf(action.payload);
        if (index > -1) {
          state.onlineFriends.splice(index, 1);
        }
      }
    },
  },
  extraReducers: {
    [fetchFriends.pending]: (state) => {
      state.friends = [];
      state.onlineFriends = [];
    },

    [fetchFriends.fulfilled]: (state, action) => {
      state.friends = action.payload;
      state.onlineFriends = action.payload
        .filter((friend) => friend.isOnline === true)
        .map((friend) => friend.id);
    },

    [fetchFriends.rejected]: (state) => {
      state.friends = [];
      state.onlineFriends = [];
    },
  },
});

const { reducer, actions } = friendSlice;

export const { addFriend, addOnlineFriends, removeOnlineFriends } = actions;

export const selectFriends = (state) => state.friend.friends;

export const selectOnlineFriends = (state) => state.friend.onlineFriends;

export default reducer;
