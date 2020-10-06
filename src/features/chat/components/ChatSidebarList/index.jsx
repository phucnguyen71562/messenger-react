import { List } from 'antd';
import { selectChats } from 'features/chat/chatSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsSearchFriend,
  selectSearchFriendResults,
} from 'slices/searchSlice';
import ChatSidebarItem from '../ChatSidebarItem';
import './ChatSidebarList.scss';

function ChatSidebarList({ handleDeleteChat }) {
  const chats = useSelector(selectChats);
  const isSearchFriend = useSelector(selectIsSearchFriend);
  const searchFriendResults = useSelector(selectSearchFriendResults);

  return (
    <List
      className="sidebar__chats"
      itemLayout="horizontal"
      dataSource={!isSearchFriend ? chats : searchFriendResults}
      renderItem={(item) => (
        <ChatSidebarItem item={item} handleDeleteChat={handleDeleteChat} />
      )}
    />
  );
}

ChatSidebarList.propTypes = {
  handleDeleteChat: PropTypes.func.isRequired,
};

export default ChatSidebarList;
