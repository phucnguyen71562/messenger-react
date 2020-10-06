import axiosClient from './axiosClient';

const friendApi = {
  fetchFriends: () => {
    const url = `/friends`;
    return axiosClient.get(url);
  },

  fetchFriendRequests: () => {
    const url = `/friends/requests`;
    return axiosClient.get(url);
  },

  addFriend: (params) => {
    const url = `/friends`;
    return axiosClient.post(url, { params });
  },

  deleteFriend: (params) => {
    const url = `/friends/${params}`;
    return axiosClient.delete(url);
  },

  deleteFriendRequest: (params) => {
    const url = `/friends/requests/${params}`;
    return axiosClient.delete(url);
  },
};

export default friendApi;
