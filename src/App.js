import { selectCurrent } from 'app/authSlice';
import { SocketProvider } from 'contexts/SocketProvider';
import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './features/auth/pages/Login';
import HomePage from './features/home';

function App() {
  const { access_token, refresh_token } = useSelector(selectCurrent);

  return !access_token ? (
    <LoginPage />
  ) : (
    <SocketProvider token={access_token} rftk={refresh_token}>
      <HomePage />
    </SocketProvider>
  );
}

export default App;
