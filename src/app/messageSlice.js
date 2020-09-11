const { createSlice } = require('@reduxjs/toolkit')

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
  },
  reducers: {
    fetchMessages: (state, action) => {
      state.messages = action.payload
    },

    receiveMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: {},
})

const { reducer, actions } = messageSlice

export const { fetchMessages, receiveMessage } = actions
export default reducer
