import axiosClient from './axiosClient';

const uploadApi = {
  uploadAvatar: (params) => {
    const url = `/storages/avatars`;
    return axiosClient.post(url, params);
  },
};

export default uploadApi;
