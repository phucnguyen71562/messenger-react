import { Avatar, List } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './FriendPage.scss'

function FriendPage() {
  const friends = useSelector((state) => state.user.friends)

  return (
    <div className="friends">
      <div className="friends-container">
        <List
          itemLayout="horizontal"
          dataSource={friends}
          renderItem={(friend) => (
            <List.Item key={friend._id}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <Link
                    to={`/messages/${friend._id}`}
                    className="friends__title"
                  >
                    {friend.username}
                  </Link>
                }
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default FriendPage
