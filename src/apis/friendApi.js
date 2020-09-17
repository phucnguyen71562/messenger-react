import axiosClient from './axiosClient'

const friendApi = {
  getFriends: () => {
    const url = `/friends`
    return axiosClient.get(url)
  },
}

export default friendApi
