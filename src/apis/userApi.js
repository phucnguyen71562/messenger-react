import axiosClient from './axiosClient'

const userApi = {
  fetchUsers: () => {
    const url = '/users'
    return axiosClient.get(url)
  },

  fetchUser: (params) => {
    const url = `/users/${params}`
    return axiosClient.get(url)
  },
}

export default userApi
