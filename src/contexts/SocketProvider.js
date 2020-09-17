import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ token, rftk, crid, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL, {
      query: { token, rftk, crid },
    })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [token, rftk, crid])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
