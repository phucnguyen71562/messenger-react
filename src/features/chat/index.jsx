import { unwrapResult } from '@reduxjs/toolkit';
import { selectCurrent } from 'app/authSlice';
import useMediaQuery from 'hooks/useMediaQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import userApi from '../../apis/userApi';
import { useSocket } from '../../contexts/SocketProvider';
import './Chat.scss';
import { createChat, fetchChats } from './chatSlice';
import ChatSidebar from './components/ChatSidebar';
import MessagePage from './pages/MessagePage';
import NewChatPage from './pages/NewChatPage';

function Chat() {
  const isDesktopMode = useMediaQuery('(min-width: 62em)');
  const user = useSelector(selectCurrent);
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    const getChats = async () => {
      try {
        const action = await dispatch(fetchChats());
        unwrapResult(action);
      } catch (e) {
        console.log(e);
      }
    };

    getChats();
  }, [dispatch]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('create-chat', async ({ message, senderId, receiverId }) => {
      let id;
      if (senderId === user.id) {
        id = receiverId;
      }

      if (receiverId === user.id) {
        id = senderId;
      }

      const { data } = await userApi.fetchUser(id);

      dispatch(createChat({ data, message, id }));
    });

    return () => socket.off('create-chat');
  }, [dispatch, user.id, socket]);

  return (
    <div className="chat">
      {isDesktopMode && <ChatSidebar />}

      <Switch>
        {!isDesktopMode && (
          <Route path={match.url} exact>
            <ChatSidebar />
          </Route>
        )}

        <Route path={`${match.url}/new`}>
          <NewChatPage />
        </Route>

        <Route path={`${match.url}/:id`}>
          <MessagePage />
        </Route>
      </Switch>
    </div>
  );
}

export default Chat;
