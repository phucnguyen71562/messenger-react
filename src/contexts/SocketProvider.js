import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ token, rftk, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL, {
      query: { token, rftk },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [token, rftk]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  token: PropTypes.string,
  rftk: PropTypes.string,
  children: PropTypes.element,
};

SocketProvider.defaultProps = {
  token: '',
  rftk: '',
  children: null,
};
