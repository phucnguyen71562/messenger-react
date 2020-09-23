import axiosClient from './axiosClient'

const userApi = {
  fetchUsers: (params) => {
    const url = '/users'
    return axiosClient.get(url, { params })
  },

  fetchUser: (params) => {
    const url = `/users/${params}`
    return axiosClient.get(url)
  },

  uploadAvatar: (params) => {
    const url = `/users/avatar`
    return axiosClient.post(url, params)
  },
}

export default userApi
