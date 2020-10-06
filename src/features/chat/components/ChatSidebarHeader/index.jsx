import { FormOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Typography } from 'antd';
import { selectCurrent } from 'app/authSlice';
import LogoutButton from 'components/LogoutButton';
import { AVATAR_DEFAULT } from 'configs/common';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ChatSidebarHeader.scss';

const { Title } = Typography;

function ChatSidebarHeader() {
  const { photoUrl } = useSelector(selectCurrent);

  return (
    <div className="sidebar__header">
      <Space>
        <Link to="/">
          <Avatar size="large" icon={AVATAR_DEFAULT} src={photoUrl} />
        </Link>
        <Title level={2} style={{ marginBottom: 0 }}>
          Chat
        </Title>
      </Space>

      <Space className="sidebar__headerActions">
        <Link to="/messages/new">
          <Button shape="circle" icon={<FormOutlined />} title="Tin nhắn mới" />
        </Link>

        <LogoutButton />
      </Space>
    </div>
  );
}

export default ChatSidebarHeader;
