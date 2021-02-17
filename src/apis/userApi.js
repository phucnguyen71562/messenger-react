import { clientAxios } from 'services/httpService';

const userApi = {
  fetchUsers: (params) => {
    const url = '/users';
    return clientAxios.get(url, { params });
  },

  fetchUser: (params) => {
    const url = `/users/${params}`;
    return clientAxios.get(url);
  },
};

export default userApi;
