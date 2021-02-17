import { authAxios } from 'services/httpService';

const authApi = {
  fetchCurrent: () => {
    const url = '/auth';
    return authAxios.get(url);
  },

  login: (params) => {
    const url = '/auth/login';
    return authAxios.post(url, params);
  },

  signup: (params) => {
    const url = '/auth/signup';
    return authAxios.post(url, params);
  },

  logout: (params) => {
    const url = '/auth/logout';
    return authAxios.delete(url, { data: params });
  },

  renewToken: (params) => {
    const url = '/auth/renewtoken';
    return authAxios.post(url, params);
  },

  validateUsernameAvailability: (params) => {
    const url = '/auth/signup/validateusernameavailability';
    return authAxios.post(url, params);
  },
};

export default authApi;
