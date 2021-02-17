import { clientAxios } from 'services/httpService';

const chatApi = {
  fetchChats: () => {
    const url = '/chats';
    return clientAxios.get(url);
  },

  fetchMessages: ({ id, ...params }) => {
    const url = `/chats/${id}`;
    return clientAxios.get(url, { params });
  },

  deleteChat: (params) => {
    const url = `/chats/${params}`;
    return clientAxios.delete(url);
  },
};

export default chatApi;
