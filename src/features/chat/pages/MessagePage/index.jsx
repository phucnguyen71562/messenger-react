import { unwrapResult } from '@reduxjs/toolkit';
import chatApi from 'apis/chatApi';
import userApi from 'apis/userApi';
import { selectCurrent } from 'app/authSlice';
import { useSocket } from 'contexts/SocketProvider';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addMessages,
  fetchMessages,
  receiveMessage,
  setChatTheme,
  setReceiver,
} from '../../chatSlice';
import ChatHeader from '../../components/ChatHeader';
import ChatMessages from '../../components/ChatMessages';
import ChatSender from '../../components/ChatSender';
import ChatSettings from '../../components/ChatSettings';
import './MessagePage.scss';

function MessagePage() {
  const user = useSelector(selectCurrent);
  const socket = useSocket();
  const { id } = useParams();

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await userApi.fetchUser(id);
        dispatch(setReceiver(data));
      } catch (e) {
        console.error(e);
      }
    };

    getUser();
  }, [dispatch, id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const limit = 20;
        const params = {
          id,
          page: 1,
          limit,
        };
        const action = await dispatch(fetchMessages(params));
        unwrapResult(action);
      } catch (e) {
        console.error(e);
      }
    };

    getMessages();
  }, [dispatch, id]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', ({ message, senderId, receiverId }) => {
      if (senderId === id || receiverId === id) {
        dispatch(receiveMessage(message));
      }
    });

    return () => socket.off('receive-message');
  }, [dispatch, id, socket]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('change-chat-theme-response', ({ data, receiverId }) => {
      if (receiverId === user.id) {
        dispatch(setChatTheme(data));
      }
    });

    return () => socket.off('change-chat-theme-response');
  }, [dispatch, id, socket, user.id]);

  const handleLoadMoreMessages = async () => {
    const limit = 20;
    const params = {
      id,
      page,
      limit,
    };

    setLoading(true);
    const { data } = await chatApi.fetchMessages(params);
    if (data.messages.length === 0 || data.messages.length < limit) {
      setHasMore(false);
      setLoading(false);
    }
    dispatch(addMessages(data.messages));
    setPage((prePage) => prePage + 1);
    setLoading(false);
  };

  const handleSendMessage = (message) => {
    if (socket == null) return;

    socket.emit('send-message', {
      message,
      receiverId: id,
    });
  };

  const handleChangeTheme = (theme) => {
    if (socket == null) return;

    dispatch(setChatTheme(theme));
    socket.emit('change-chat-theme', {
      theme,
      receiverId: id,
    });
  };

  return (
    <div className="message">
      <ChatHeader setVisible={setVisible} />
      <ChatMessages
        handleLoadMoreMessages={handleLoadMoreMessages}
        loading={loading}
        hasMore={hasMore}
      />
      <ChatSender handleSendMessage={handleSendMessage} />
      <ChatSettings
        visible={visible}
        setVisible={setVisible}
        handleChangeTheme={handleChangeTheme}
      />
    </div>
  );
}

export default MessagePage;
