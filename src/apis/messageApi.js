import requestWrapper from '../services/requestWrapper'
import axiosClient from './axiosClient'

const messageApi = {
  receiveMessage: () => {
    const url = '/messages'
    return requestWrapper(axiosClient.get(url))
  },

  sendMessage: (params) => {
    const url = '/messages/new'
    return requestWrapper(axiosClient.post(url, { params }))
  },
}

export default messageApi
