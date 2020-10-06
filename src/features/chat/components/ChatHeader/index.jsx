import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Typography } from 'antd';
import { selectIsDesktopMode } from 'app/commonSlice';
import { selectReceiver } from 'features/chat/chatSlice';
import { selectOnlineFriends } from 'features/friend/friendSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AVATAR_DEFAULT } from '../../../../configs/common';
import { getRelativeTime } from '../../../../services/helpers';
import './ChatHeader.scss';

const { Title, Text } = Typography;

function ChatHeader({ setVisible }) {
  const onlineFriends = useSelector(selectOnlineFriends);
  const receiver = useSelector(selectReceiver);
  const isDesktopMode = useSelector(selectIsDesktopMode);
  const history = useHistory();

  const isOnline = onlineFriends.includes(receiver?.id);

  const handleBack = () => {
    history.push('/messages');
  };

  return (
    <div className="chat__header">
      {!isDesktopMode && (
        <Button type="link" className="chat__headerBack" onClick={handleBack}>
          <ArrowLeftOutlined />
        </Button>
      )}
      <Avatar size="large" icon={AVATAR_DEFAULT} src={receiver.photoUrl} />
      <div className="chat__headerInfo">
        <Title level={4} style={{ marginBottom: 0 }}>
          {receiver?.username}
        </Title>
        <Text type="secondary">
          {isOnline ? 'Đang hoạt động' : getRelativeTime(receiver?.lastLogin)}
        </Text>
      </div>
      <div className="chat__headerActions">
        <Button
          shape="circle"
          icon={<InfoCircleOutlined />}
          onClick={() => setVisible(true)}
        />
      </div>
    </div>
  );
}

ChatHeader.propTypes = {
  setVisible: PropTypes.func.isRequired,
};

export default ChatHeader;
