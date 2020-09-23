const { createSlice } = require('@reduxjs/toolkit')

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isDesktopMode: true,
  },
  reducers: {
    setIsDesktopMode: (state, action) => {
      state.isDesktopMode = action.payload
    },
  },
  extraReducers: {},
})

const { reducer, actions } = commonSlice

export const { setIsDesktopMode } = actions
export default reducer
