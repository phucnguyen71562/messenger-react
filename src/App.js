import { selectCurrent } from 'app/authSlice';
import { SocketProvider } from 'contexts/SocketProvider';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { setIsDesktopMode } from './app/commonSlice';
import LoginPage from './features/auth/pages/Login';
import HomePage from './features/home';
import useMediaQuery from './hooks/useMediaQuery';

function App() {
  const { access_token, refresh_token } = useSelector(selectCurrent);
  const dispatch = useDispatch();

  const isDesktopMode = useMediaQuery('(min-width: 991px)');

  useEffect(() => {
    dispatch(setIsDesktopMode(isDesktopMode));
  }, [dispatch, isDesktopMode]);

  return !access_token ? (
    <LoginPage />
  ) : (
    <SocketProvider token={access_token} rftk={refresh_token}>
      <HomePage />
    </SocketProvider>
  );
}

export default App;
