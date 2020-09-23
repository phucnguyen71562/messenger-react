import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, List, Space } from 'antd'
import React from 'react'
import { AVATAR_DEFAULT } from '../../app/config'
import './FriendRequest.scss'

function FriendRequest({
  friendRequests,
  acceptRequests,
  refuseRequests,
  handleAddFriend,
  handleDeleteFriendRequest,
}) {
  const isAccepted = (id) => acceptRequests.includes(id)
  const isRefused = (id) => refuseRequests.includes(id)

  const renderDescription = (id) => {
    if (isAccepted(id)) {
      return <span>Các bạn hiện đã là bạn bè</span>
    } else if (isRefused(id)) {
      return <span>Đã từ chối lời mời</span>
    } else {
      return (
        <Space>
          <Button
            type="primary"
            size="small"
            shape="round"
            icon={<UserAddOutlined />}
            onClick={() => handleAddFriend(id)}
          >
            Chấp nhận
          </Button>
          <Button
            type="default"
            size="small"
            shape="round"
            icon={<UserDeleteOutlined />}
            onClick={() => handleDeleteFriendRequest(id)}
          >
            Từ chối
          </Button>
        </Space>
      )
    }
  }

  return (
    <div className="friends__request">
      <h5 className="ant-typography">
        <Badge dot count={friendRequests.length}>
          Lời mời kết bạn
        </Badge>
      </h5>
      <List
        itemLayout="horizontal"
        dataSource={friendRequests}
        split={false}
        loading={!friendRequests}
        locale={{ emptyText: 'Không có lời mời mới' }}
        renderItem={(friend) => (
          <List.Item key={friend._id}>
            <List.Item.Meta
              style={{ alignItems: 'center' }}
              avatar={<Avatar icon={AVATAR_DEFAULT} src={friend.photoUrl} />}
              title={<span className="text-capitalize">{friend.username}</span>}
              description={renderDescription(friend._id)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default FriendRequest
