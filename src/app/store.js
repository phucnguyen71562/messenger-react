import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import chatReducer from '../slices/chatSlice'
import friendReducer from '../slices/friendSlice'
import searchReducer from '../slices/searchSlice'
import userReducer from '../slices/userSlice'
import authReducer from './authSlice'

const authConfig = {
  key: 'rememberedAccounts',
  storage,
}

const rootReducer = {
  chat: chatReducer,
  friend: friendReducer,
  search: searchReducer,
  user: userReducer,
  auth: persistReducer(authConfig, authReducer),
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export default store
