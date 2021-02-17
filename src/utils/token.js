import store from 'app/store';

export const getCurrentLogin = () => {
  const {
    auth: { current },
  } = store.getState();

  return current;
};

export const getToken = () => {
  const {
    auth: {
      current: { access_token },
    },
  } = store.getState();

  return access_token;
};
