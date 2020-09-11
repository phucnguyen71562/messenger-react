import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './messageSlice'
import userReducer from './userSlice'

const rootReducer = {
  user: userReducer,
  message: messageReducer,
}

const store = configureStore({
  reducer: rootReducer,
})

export default store
