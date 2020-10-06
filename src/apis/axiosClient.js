import axios from 'axios';
import queryString from 'query-string';
import { renewAccessToken } from '../app/authSlice';
import store from '../app/store';
import authApi from './authApi';

let isRefreshedAccessToken = false;
let subscribers = [];

function onRefreshed(token) {
  subscribers.map((callback) => callback(token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
  const {
    auth: {
      current: { access_token },
    },
  } = store.getState();

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
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

          const {
            auth: {
              current: { id, refresh_token },
            },
          } = store.getState();

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
            resolve(axiosClient(originalRequest));
          });
        });

        return retryOriginalRequest;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
