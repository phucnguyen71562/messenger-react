import { Avatar, List } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AVATAR_DEFAULT } from '../../app/config'
import './FriendOnline.scss'

function FriendOnline() {
  const friends = useSelector((state) => state.friend.friends)
  const onlineFriends = useSelector((state) => state.friend.onlineFriends)
  const data = friends.filter((friend) => onlineFriends.includes(friend))

  return (
    <div className="friends__online">
      <h5 className="ant-typography">Người liên hệ</h5>
      <List
        className="friends__onlineWrapper"
        itemLayout="horizontal"
        dataSource={data}
        split={false}
        loading={!data}
        locale={{ emptyText: 'Không có bạn bè đang hoạt động' }}
        renderItem={(friend) => (
          <List.Item key={friend._id}>
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
              description={
                <div>
                  <span className="friends__onlineStatus"></span>
                  Đang hoạt động
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default FriendOnline
