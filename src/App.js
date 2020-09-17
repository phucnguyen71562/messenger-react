import React from 'react'
import { useSelector } from 'react-redux'
import './App.scss'
import { SocketProvider } from './contexts/SocketProvider'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  const { access_token, refresh_token } = useSelector(
    (state) => state.auth.current
  )

  return !access_token ? (
    <LoginPage />
  ) : (
    <SocketProvider token={access_token} rftk={refresh_token}>
      <HomePage />
    </SocketProvider>
  )
}

export default App
