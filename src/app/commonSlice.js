import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isDesktopMode: true,
  },
  reducers: {
    setIsDesktopMode: (state, action) => {
      state.isDesktopMode = action.payload;
    },
  },
  extraReducers: {},
});

const { reducer, actions } = commonSlice;

export const { setIsDesktopMode } = actions;

export const selectIsDesktopMode = (state) => state.common.isDesktopMode;

export default reducer;
