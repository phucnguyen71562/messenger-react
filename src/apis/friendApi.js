import { clientAxios } from 'services/httpService';

const friendApi = {
  fetchFriends: () => {
    const url = `/friends`;
    return clientAxios.get(url);
  },

  fetchFriendRequests: () => {
    const url = `/friends/requests`;
    return clientAxios.get(url);
  },

  addFriend: (params) => {
    const url = `/friends`;
    return clientAxios.post(url, { params });
  },

  deleteFriend: (params) => {
    const url = `/friends/${params}`;
    return clientAxios.delete(url);
  },

  deleteFriendRequest: (params) => {
    const url = `/friends/requests/${params}`;
    return clientAxios.delete(url);
  },
};

export default friendApi;
