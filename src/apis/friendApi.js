import axiosClient from './axiosClient'

const friendApi = {
  getFriends: (id) => {
    const url = `/friends/${id}`
    return axiosClient.get(url)
  },
}

export default friendApi
