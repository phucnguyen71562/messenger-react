import { CloseCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, List, Menu, Modal, Typography } from 'antd';
import { selectCurrent } from 'app/authSlice';
import { AVATAR_DEFAULT } from 'configs/common';
import { selectReceiver } from 'features/chat/chatSlice';
import useMediaQuery from 'hooks/useMediaQuery';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectIsSearchFriend } from 'slices/searchSlice';
import './ChatSidebarItem.scss';

const { Paragraph } = Typography;
const { confirm } = Modal;

function ChatSidebarItem({ item, handleDeleteChat }) {
  const isDesktopMode = useMediaQuery('(min-width: 62em)');
  const user = useSelector(selectCurrent);
  const chatReceiver = useSelector(selectReceiver);
  const isSearchFriend = useSelector(selectIsSearchFriend);

  const history = useHistory();

  const showDeleteConfirm = useCallback(
    (value) => {
      confirm({
        title: 'Xóa cuộc trò chuyện này?',
        icon: <CloseCircleOutlined style={{ color: 'var(--danger)' }} />,
        content: 'Hành động này sẽ xóa vĩnh viễn cuộc trò chuyện',
        centered: isDesktopMode,
        okText: 'Xóa',
        okType: 'link',
        cancelText: 'Hủy',
        okButtonProps: { danger: true },
        cancelButtonProps: { type: 'link', style: { color: '#333' } },
        onOk() {
          handleDeleteChat(value);
          if (chatReceiver.id === value) {
            history.push('/messages');
          }
        },
        onCancel() {},
      });
    },
    [chatReceiver.id, handleDeleteChat, history, isDesktopMode]
  );

  if (!isSearchFriend) {
    const { receiver, lastMessage, id } = item;

    return (
      <List.Item
        key={id}
        className="sidebar__chat"
        actions={[
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="0"
                  onClick={() => showDeleteConfirm(receiver.id)}
                >
                  Xóa
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            arrow
            placement="bottomCenter"
          >
            <Button
              type="link"
              icon={<EllipsisOutlined style={{ color: '#333' }} />}
            />
          </Dropdown>,
        ]}
      >
        <Link to={`/messages/${receiver.id}`} style={{ flex: 1 }}>
          <List.Item.Meta
            avatar={
              <Avatar
                size="large"
                icon={AVATAR_DEFAULT}
                src={receiver.photoUrl}
              />
            }
            title={`${receiver.first_name} ${receiver.last_name}`}
            description={
              <Paragraph ellipsis>
                {lastMessage?.username === user.username && 'Bạn: '}
                {lastMessage?.message}
              </Paragraph>
            }
          />
        </Link>
      </List.Item>
    );
  }

  return (
    <Link to={`/messages/${item.id}`}>
      <List.Item className="sidebar__chat">
        <List.Item.Meta
          avatar={
            <Avatar size="large" icon={AVATAR_DEFAULT} src={item.photoUrl} />
          }
          title={`${item.first_name} ${item.last_name}`}
        />
      </List.Item>
    </Link>
  );
}

ChatSidebarItem.propTypes = {
  item: PropTypes.shape({
    receiver: PropTypes.object,
    lastMessage: PropTypes.object,
    id: PropTypes.string,
    photoUrl: PropTypes.string,
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  handleDeleteChat: PropTypes.func.isRequired,
};

export default ChatSidebarItem;
