import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
    receiver: {},
    colorTheme: {
      name: 'blue',
      value: {
        backgroundColor: 'rgb(0, 132, 255)',
      },
    },
  },
  reducers: {
    fetchChats: (state, action) => {
      state.chats = action.payload
    },

    fetchMessages: (state, action) => {
      state.messages = action.payload
    },

    receiveMessage: (state, action) => {
      state.messages.push(action.payload)
    },

    setReceiver: (state, action) => {
      state.receiver = action.payload
    },

    setColorTheme: (state, action) => {
      state.colorTheme = action.payload
    },
  },
  extraReducers: {},
})

const { reducer, actions } = chatSlice

export const {
  fetchChats,
  fetchMessages,
  receiveMessage,
  setReceiver,
  setColorTheme,
} = actions
export default reducer
