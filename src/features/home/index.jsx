import { unwrapResult } from '@reduxjs/toolkit';
import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import authApi from '../../apis/authApi';
import { fetchCurrent } from '../../app/authSlice';
import NotFound from '../../components/NotFound';
import { useSocket } from '../../contexts/SocketProvider';
import FriendPage from '../friend';
import {
  addOnlineFriends,
  fetchFriends,
  removeOnlineFriends,
} from '../friend/friendSlice';

const ChatPage = lazy(() => import('../chat'));

function Home() {
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrent = async () => {
      try {
        const { data } = await authApi.fetchCurrent();
        dispatch(fetchCurrent(data));
      } catch (e) {
        console.error(e);
      }
    };

    getCurrent();
  }, [dispatch]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const action = await dispatch(fetchFriends());
        unwrapResult(action);
      } catch (e) {
        console.error(e);
      }
    };

    getFriends();
  }, [dispatch]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('is-online', (id) => {
      dispatch(addOnlineFriends(id));
    });

    return () => socket.off('is-online');
  }, [dispatch, socket]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('is-offline', (id) => {
      dispatch(removeOnlineFriends(id));
    });

    return () => socket.off('is-offline');
  }, [dispatch, socket]);

  return (
    <Suspense
      fallback={
        <div className="loading">
          <Spin tip="Đang tải..." size="medium" />
        </div>
      }
    >
      <BrowserRouter>
        <Switch>
          <Route path="/messages">
            <ChatPage />
          </Route>

          <Route path="/" exact>
            <FriendPage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default Home;
