import axiosClient from './axiosClient'

const chatApi = {
  fetchChats: () => {
    const url = '/chats'
    return axiosClient.get(url)
  },

  fetchMessages: (params) => {
    const url = `/chats/${params}`
    return axiosClient.get(url)
  },

  deleteChat: (params) => {
    const url = `/chats/${params}`
    return axiosClient.delete(url)
  },
}

export default chatApi
