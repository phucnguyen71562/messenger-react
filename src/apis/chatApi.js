import axiosClient from './axiosClient';

const chatApi = {
  fetchChats: () => {
    const url = '/chats';
    return axiosClient.get(url);
  },

  fetchMessages: ({ id, ...params }) => {
    const url = `/chats/${id}`;
    return axiosClient.get(url, { params });
  },

  deleteChat: (params) => {
    const url = `/chats/${params}`;
    return axiosClient.delete(url);
  },
};

export default chatApi;
