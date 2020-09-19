import axiosClient from './axiosClient'

const friendApi = {
  fetchFriends: () => {
    const url = `/friends`
    return axiosClient.get(url)
  },

  addFriend: (params) => {
    const url = `/friends`
    return axiosClient.post(url, { params })
  },

  deleteFriend: (params) => {
    const url = `/friends/${params}`
    return axiosClient.delete(url)
  },
}

export default friendApi
