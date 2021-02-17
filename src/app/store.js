import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatReducer from '../features/chat/chatSlice';
import friendReducer from '../features/friend/friendSlice';
import searchReducer from '../slices/searchSlice';
import userReducer from '../slices/userSlice';
import authReducer from './authSlice';

const authConfig = {
  key: 'rememberedAccounts',
  storage,
};

const rootReducer = {
  chat: chatReducer,
  friend: friendReducer,
  search: searchReducer,
  user: userReducer,
  auth: persistReducer(authConfig, authReducer),
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
