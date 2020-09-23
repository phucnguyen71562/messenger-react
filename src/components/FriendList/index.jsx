import { EllipsisOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, List, Menu, Modal, Typography } from 'antd'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AVATAR_DEFAULT } from '../../app/config'
import './FriendList.scss'

const { Text } = Typography
const { confirm } = Modal

function FriendList({ deleteFriends, handleDeleteFriend }) {
  const friends = useSelector((state) => state.friend.friends)
  const isDesktopMode = useSelector((state) => state.common.isDesktopMode)

  const isDeleted = (id) => deleteFriends.includes(id)

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
          handleDeleteFriend(id)
        },
        onCancel() {},
      })
    },
    [handleDeleteFriend, isDesktopMode]
  )

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
            key={friend._id}
            style={{ display: 'flex' }}
            actions={
              !isDeleted(friend._id) && [
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="0"
                        onClick={() =>
                          showDeleteConfirm(friend._id, friend.username)
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
                  ></Button>
                </Dropdown>,
              ]
            }
          >
            <List.Item.Meta
              style={{ alignItems: 'center' }}
              avatar={<Avatar icon={AVATAR_DEFAULT} src={friend.photoUrl} />}
              title={
                <Link
                  to={`/messages/${friend._id}`}
                  className="text-capitalize"
                >
                  {friend.username}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default FriendList
