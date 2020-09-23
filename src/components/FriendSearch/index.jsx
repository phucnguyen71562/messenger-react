import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, List } from 'antd'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AVATAR_DEFAULT } from '../../app/config'
import './FriendSearch.scss'

function FriendSearch({
  searchData,
  handleSearch,
  createRequests,
  handleCreateFriendRequest,
}) {
  const friends = useSelector((state) => state.friend.friends)
  const [search, setSearch] = useState('')
  const waitTimeoutRef = useRef(null)

  const isRequested = (id) => createRequests.includes(id)

  const isFriend = (value) => {
    return friends.find((friend) => friend._id === value)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setSearch(value)

    if (waitTimeoutRef.current) {
      clearTimeout(waitTimeoutRef.current)
    }

    waitTimeoutRef.current = setTimeout(async () => {
      const params = {
        username: value,
      }

      handleSearch(params)
    }, 300)
  }

  const renderDescription = (id) => {
    if (isFriend(id)) {
      return (
        <Button type="default" shape="round">
          Bạn bè
        </Button>
      )
    } else {
      if (isRequested(id)) {
        return <span>Đã gửi yêu cầu kết bạn</span>
      } else {
        return (
          <Button
            type="primary"
            shape="round"
            onClick={() => handleCreateFriendRequest(id)}
          >
            Thêm bạn bè
          </Button>
        )
      }
    }
  }

  return (
    <div className="friends__search">
      <Input
        value={search}
        onChange={handleChange}
        placeholder="Tìm kiếm..."
        className="friends__searchInput"
        prefix={<SearchOutlined />}
        autoFocus
        autoComplete="off"
      />
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
        dataSource={searchData}
        split={false}
        loading={!searchData}
        className="friends__searchList"
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
              description={renderDescription(friend._id)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default FriendSearch
