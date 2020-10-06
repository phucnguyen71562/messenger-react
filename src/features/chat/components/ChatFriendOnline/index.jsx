import { Avatar, Typography } from 'antd';
import { AVATAR_DEFAULT } from 'configs/common';
import {
  selectFriends,
  selectOnlineFriends,
} from 'features/friend/friendSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ChatFriendOnline.scss';

const { Text } = Typography;

function ChatFriendOnline() {
  const friends = useSelector(selectFriends);
  const onlineFriends = useSelector(selectOnlineFriends);

  const data = friends.filter((friend) => onlineFriends.includes(friend.id));

  return (
    <div className="chat-friendOnline">
      {data.map((friend) => (
        <Link to={`/messages/${friend.id}`} className="chat-friendOnline__item">
          <div className="chat-friendOnline__avatar">
            <Avatar size="large" icon={AVATAR_DEFAULT} src={friend.photoUrl} />
            <span className="chat-friendOnline__online" />
          </div>
          <Text className="text-capitalize text-center chat-friendOnline__name">
            {friend.username}
          </Text>
        </Link>
      ))}
    </div>
  );
}

export default ChatFriendOnline;
