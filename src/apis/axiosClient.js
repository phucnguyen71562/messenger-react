import axios from 'axios'
import queryString from 'query-string'
import { retrieveObjectInLocalStorage } from '../services/helpers'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use((config) => {
  const rememberedAccounts = retrieveObjectInLocalStorage('rememberedAccounts')

  if (rememberedAccounts) {
    const token = rememberedAccounts.access_token

    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    throw error
  }
)

export default axiosClient
