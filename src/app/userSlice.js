import { createSlice } from '@reduxjs/toolkit'
import userApi from '../apis/userApi'
import {
  retrieveObjectInLocalStorage,
  storeObjectInLocalStorage,
} from '../services/helpers'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: retrieveObjectInLocalStorage('rememberedAccounts'),
  },
  reducers: {
    setUser: (state, action) => {
      state.current = action.payload

      storeObjectInLocalStorage('rememberedAccounts', action.payload)
    },

    removeUser: (state, action) => {
      const { id, refresh_token } = state.current
      userApi.logout({
        id,
        token: refresh_token,
      })
      state.current = null

      localStorage.removeItem('rememberedAccounts')
    },
  },
  extraReducers: {},
})

const { reducer, actions } = userSlice

export const { setUser, removeUser } = actions
export default reducer
