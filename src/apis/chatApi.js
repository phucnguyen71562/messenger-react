import axiosClient from './axiosClient'

const chatApi = {
  fetchChats: () => {
    const url = '/chats'
    return axiosClient.get(url)
  },

  receiveMessage: (params) => {
    const url = `/chats/${params}`
    return axiosClient.get(url)
  },
}

export default chatApi
