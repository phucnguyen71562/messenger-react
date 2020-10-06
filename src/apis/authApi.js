import axios from 'axios';
import queryString from 'query-string';
import store from '../app/store';

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
    throw error;
  }
);

const authApi = {
  fetchCurrent: () => {
    const url = '/auth';
    return axiosClient.get(url);
  },

  login: (params) => {
    const url = '/auth/login';
    return axiosClient.post(url, { params });
  },

  signup: (params) => {
    const url = '/auth/signup';
    return axiosClient.post(url, { params });
  },

  logout: (params) => {
    const url = '/auth/logout';
    return axiosClient.delete(url, { params });
  },

  renewToken: (params) => {
    const url = '/auth/renewtoken';
    return axiosClient.post(url, { params });
  },

  validateUsernameAvailability: (params) => {
    const url = '/auth/signup/validateusernameavailability';
    return axiosClient.post(url, { params });
  },
};

export default authApi;
