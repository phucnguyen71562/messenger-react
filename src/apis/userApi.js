import axiosClient from './axiosClient';

const userApi = {
  fetchUsers: (params) => {
    const url = '/users';
    return axiosClient.get(url, { params });
  },

  fetchUser: (params) => {
    const url = `/users/${params}`;
    return axiosClient.get(url);
  },
};

export default userApi;
