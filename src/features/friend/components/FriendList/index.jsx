import { EllipsisOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, List, Menu, Modal, Typography } from 'antd';
import { selectIsDesktopMode } from 'app/commonSlice';
import { AVATAR_DEFAULT } from 'configs/common';
import { selectFriends } from 'features/friend/friendSlice';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './FriendList.scss';

const { Text } = Typography;
const { confirm } = Modal;

function FriendList({ deleteFriends, handleDeleteFriend }) {
  const friends = useSelector(selectFriends);
  const isDesktopMode = useSelector(selectIsDesktopMode);

  const isDeleted = (id) => deleteFriends.includes(id);

  const showDeleteConfirm = useCallback(
    (id, username) => {
      confirm({
        title: (
          <span>
            Hủy kết bạn với <span className="text-capitalize">{username}</span>
          </span>
        ),
        icon: null,
        content: (
          <span>
            Bạn có chắc chắn muốn xóa{' '}
            <span className="text-capitalize">{username}</span> khỏi danh sách
            bạn bè không?
          </span>
        ),
        centered: isDesktopMode,
        width: 500,
        okText: 'Xóa',
        okType: 'primary',
        cancelText: 'Hủy',
        cancelButtonProps: { type: 'link' },
        onOk() {
          handleDeleteFriend(id);
        },
        onCancel() {},
      });
    },
    [handleDeleteFriend, isDesktopMode]
  );

  return (
    <>
      {friends.length !== 0 && <Text strong>{friends.length} bạn bè</Text>}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
        }}
        itemLayout="horizontal"
        dataSource={friends}
        loading={!friends}
        style={{ marginTop: 10 }}
        renderItem={(friend) => (
          <List.Item
            key={friend.id}
            style={{ display: 'flex' }}
            actions={
              !isDeleted(friend.id) && [
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="0"
                        onClick={() =>
                          showDeleteConfirm(friend.id, friend.username)
                        }
                      >
                        <UserDeleteOutlined style={{ color: '#ff4d4f' }} />
                        <span>
                          Hủy kêt bạn với{' '}
                          <span className="text-capitalize">
                            {friend.username}
                          </span>
                        </span>
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
              ]
            }
          >
            <List.Item.Meta
              style={{ alignItems: 'center' }}
              avatar={<Avatar icon={AVATAR_DEFAULT} src={friend.photoUrl} />}
              title={
                <Link to={`/messages/${friend.id}`} className="text-capitalize">
                  {friend.username}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}

FriendList.propTypes = {
  deleteFriends: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDeleteFriend: PropTypes.func.isRequired,
};

export default FriendList;
