import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import chatApi from '../../apis/chatApi';
import userApi from '../../apis/userApi';
import { useSocket } from '../../contexts/SocketProvider';
import './Chat.scss';
import { createChat, deleteChat, fetchChats } from './chatSlice';
import ChatFriendOnline from './components/ChatFriendOnline';
import ChatSidebarHeader from './components/ChatSidebarHeader';
import ChatSidebarList from './components/ChatSidebarList';
import ChatSidebarSearch from './components/ChatSidebarSearch';
import MessagePage from './pages/MessagePage';
import NewChatPage from './pages/NewChatPage';

function ChatSidebar() {
  const isDesktopMode = useSelector((state) => state.common.isDesktopMode);
  const dispatch = useDispatch();

  const handleDeleteChat = (value) => {
    chatApi.deleteChat(value);
    dispatch(deleteChat(value));
  };

  return (
    <div className="chat__sidebar">
      <ChatSidebarHeader />
      <ChatSidebarSearch />
      {!isDesktopMode && <ChatFriendOnline />}
      <ChatSidebarList handleDeleteChat={handleDeleteChat} />
    </div>
  );
}

function Chat() {
  const isDesktopMode = useSelector((state) => state.common.isDesktopMode);
  const user = useSelector((state) => state.auth.current);
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
