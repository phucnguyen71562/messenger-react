import axiosClient from './axiosClient'

const userApi = {
  login: (params) => {
    const url = '/auth/login'
    return axiosClient.post(url, { params })
  },

  signup: (params) => {
    const url = '/auth/signup'
    return axiosClient.post(url, { params })
  },

  validateUsernameAvailability: (params) => {
    const url = '/auth/signup/validateusernameavailability'
    return axiosClient.post(url, { params })
  },

  logout: (params) => {
    const url = '/auth/logout'
    return axiosClient.delete(url, { params })
  },

  refreshToken: (params) => {
    const url = '/auth/renewtoken'
    return axiosClient.post(url, { params })
  },
}

export default userApi
