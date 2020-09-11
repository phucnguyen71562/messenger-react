import { Avatar, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import friendApi from '../../apis/friendApi'
import './FriendPage.scss'

function FriendPage() {
  const [friends, setFriends] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendApi.getFriends(id)
        setFriends(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchFriends()
  }, [id])

  return (
    <div className="friends">
      <div className="friends-container">
        <List
          itemLayout="horizontal"
          dataSource={friends}
          renderItem={(item) => (
            <List.Item key={item}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Link to={`/message/${item}`}>{item}</Link>}
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
