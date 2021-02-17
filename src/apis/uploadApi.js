import { clientAxios } from 'services/httpService';

const uploadApi = {
  uploadAvatar: (params) => {
    const url = `/storages/avatars`;
    return clientAxios.post(url, params);
  },
};

export default uploadApi;
