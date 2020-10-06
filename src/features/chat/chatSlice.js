import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chatApi from '../../apis/chatApi';
import chatThemeConfig from '../../configs/chatTheme';

export const fetchChats = createAsyncThunk('chat/fetchChats', async () => {
  const { data } = await chatApi.fetchChats();
  return data;
});

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (params) => {
    const { data } = await chatApi.fetchMessages(params);
    return data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
    receiver: {},
    theme: chatThemeConfig[0],
  },
  reducers: {
    createChat: (state, action) => {
      const { data, message, id } = action.payload;

      const chatIndex = state.chats.findIndex(
        (chat) => chat.receiver.id === id
      );

      if (chatIndex > -1) {
        state.chats = state.chats.filter((chat) => chat.receiver.id !== id);
      }

      state.chats = [
        {
          receiver: data,
          lastMessage: message,
        },
        ...state.chats,
      ];
    },

    deleteChat: (state, action) => {
      state.chats = state.chats.filter(
        (chat) => chat.receiver.id !== action.payload
      );
    },

    addMessages: (state, action) => {
      state.messages = action.payload.concat(state.messages);
    },

    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },

    setChatTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: {
    [fetchChats.pending]: (state) => {
      state.chats = [];
    },

    [fetchChats.fulfilled]: (state, action) => {
      state.chats = action.payload;
    },

    [fetchMessages.pending]: (state) => {
      state.messages = [];
    },

    [fetchMessages.fulfilled]: (state, action) => {
      const { messages, theme } = action.payload;
      state.messages = messages;
      state.theme = theme;
    },

    [fetchMessages.rejected]: (state) => {
      state.messages = [];
      [state.theme] = chatThemeConfig;
    },
  },
});

const { reducer, actions } = chatSlice;

export const {
  createChat,
  deleteChat,
  addMessages,
  receiveMessage,
  setReceiver,
  setChatTheme,
} = actions;

export const selectChats = (state) => state.chat.chats;

export const selectMessages = (state) => state.chat.messages;

export const selectReceiver = (state) => state.chat.receiver;

export const selectTheme = (state) => state.chat.theme;

export default reducer;
