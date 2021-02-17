import chatApi from 'apis/chatApi';
import { deleteChat } from 'features/chat/chatSlice';
import useMediaQuery from 'hooks/useMediaQuery';
import React from 'react';
import { useDispatch } from 'react-redux';
import ChatFriendOnline from '../ChatFriendOnline';
import ChatSidebarHeader from '../ChatSidebarHeader';
import ChatSidebarList from '../ChatSidebarList';
import ChatSidebarSearch from '../ChatSidebarSearch';
import './ChatSidebar.scss';

function ChatSidebar() {
  const isDesktopMode = useMediaQuery('(min-width: 62em)');
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

export default ChatSidebar;
