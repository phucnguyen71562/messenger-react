import jwt from 'jsonwebtoken'
import userApi from '../apis/userApi'
import {
  retrieveObjectInLocalStorage,
  storeObjectInLocalStorage,
} from './helpers'

const rememberedAccounts = retrieveObjectInLocalStorage('rememberedAccounts')
const accessToken = rememberedAccounts?.access_token
const refreshToken = rememberedAccounts?.refresh_token
const userId = rememberedAccounts?.id
let refreshTokenRequest = null

const isTokenExpired =
  accessToken && jwt.decode(accessToken).exp < Date.now() / 1000

const refreshTokenApi = () => {
  return new Promise((resolve) => {
    const newToken = userApi.refreshToken({
      token: refreshToken,
      id: userId,
    })
    resolve(newToken)
  })
}

const requestWrapper = async (api) => {
  if (isTokenExpired) {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : refreshTokenApi()

    const { access_token: newToken } = await refreshTokenRequest
    refreshTokenRequest = null

    storeObjectInLocalStorage('rememberedAccounts', {
      ...rememberedAccounts,
      access_token: newToken,
    })

    return api
  }

  return api
}

export default requestWrapper
