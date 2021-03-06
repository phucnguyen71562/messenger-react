import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    isSearchFriend: false,
    searchFriendResults: [],
  },
  reducers: {
    toggleSearchFriends: (state, action) => {
      state.isSearchFriend = action.payload;
    },

    fetchSearchFriendResults: (state, action) => {
      state.searchFriendResults = action.payload;
    },
  },
  extraReducers: {},
});

const { reducer, actions } = searchSlice;

export const { toggleSearchFriends, fetchSearchFriendResults } = actions;

export const selectIsSearchFriend = (state) => state.search.isSearchFriend;

export const selectSearchFriendResults = (state) =>
  state.search.searchFriendResults;

export default reducer;
