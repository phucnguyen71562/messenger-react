import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import chatApi from '../apis/chatApi'
import { colorThemeConfig } from '../app/config'

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (params) => {
    const data = await chatApi.fetchMessages(params)
    return data
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
    receiver: {},
    colorTheme: {},
  },
  reducers: {
    fetchChats: (state, action) => {
      state.chats = action.payload
    },

    createChat: (state, action) => {
      const isExistChat = state.chats.find(
        (chat) => chat.receiver._id === state.receiver._id
      )

      if (!isExistChat) {
        state.chats = [
          { receiver: state.receiver, chat: action.payload },
          ...state.chats,
        ]
      }
    },

    updateChat: (state, action) => {
      const isExistChat = state.chats.find(
        (chat) => chat.receiver._id === state.receiver._id
      )

      if (isExistChat) {
        isExistChat.chat = action.payload
      }
    },

    deleteChat: (state, action) => {
      state.chats = state.chats.filter(
        (chat) => chat.receiver._id !== action.payload
      )
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
  extraReducers: {
    [fetchMessages.pending]: (state, action) => {
      state.messages = []
    },

    [fetchMessages.fulfilled]: (state, action) => {
      const { messages, colorTheme } = action.payload
      state.messages = messages
      state.colorTheme = colorTheme
    },

    [fetchMessages.rejected]: (state, action) => {
      state.messages = []
      state.colorTheme = colorThemeConfig[0]
    },
  },
})

const { reducer, actions } = chatSlice

export const {
  fetchChats,
  createChat,
  updateChat,
  deleteChat,
  receiveMessage,
  setReceiver,
  setColorTheme,
} = actions
export default reducer
