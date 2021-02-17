import authApi from 'apis/authApi';
import { renewAccessToken } from 'app/authSlice';
import store from 'app/store';
import axios from 'axios';
import queryString from 'query-string';
import { getCurrentLogin, getToken } from 'utils/token';

let isRefreshedAccessToken = false;
let subscribers = [];

function onRefreshed(token) {
  subscribers.map((callback) => callback(token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

const createAxiosInstance = (autoRefreshToken) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });

  instance.interceptors.request.use((config) => {
    const access_token = getToken();

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }

      return response;
    },
    (error) => {
      if (autoRefreshToken) {
        if (error.config && error.response && error.response.status) {
          const statusFailed = [401, 403];
          const {
            config,
            response: { status },
          } = error;
          const originalRequest = config;

          if (statusFailed.includes(status)) {
            if (!isRefreshedAccessToken) {
              isRefreshedAccessToken = true;

              const { id, refresh_token } = getCurrentLogin();

              authApi
                .renewToken({
                  token: refresh_token,
                  id,
                })
                .then(({ access_token }) => {
                  isRefreshedAccessToken = false;
                  onRefreshed(access_token);
                  store.dispatch(renewAccessToken(access_token));
                  subscribers = [];
                });
            }

            const retryOriginalRequest = new Promise((resolve) => {
              addSubscriber((access_token) => {
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                resolve(instance(originalRequest));
              });
            });

            return retryOriginalRequest;
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const authAxios = createAxiosInstance(false);

export const clientAxios = createAxiosInstance(true);
