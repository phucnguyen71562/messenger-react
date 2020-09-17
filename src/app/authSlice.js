import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from '../apis/authApi'

export const loginUser = createAsyncThunk('user/login', async (params) => {
  const user = await authApi.login(params)
  return user
})

export const logoutUser = createAsyncThunk('user/logout', async (params) => {
  await authApi.logout(params)
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
  },
  reducers: {
    renewAccessToken: (state, action) => {
      state.current.access_token = action.payload
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.current = action.payload
    },

    [logoutUser.fulfilled]: (state, action) => {
      state.current = {}
    },
  },
})

const { reducer, actions } = authSlice

export const { renewAccessToken } = actions
export default reducer
