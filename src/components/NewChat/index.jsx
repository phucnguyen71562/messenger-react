import { AutoComplete, Avatar } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { AVATAR_DEFAULT } from '../../app/config'
import './NewChat.scss'

const renderItem = (data) => {
  return data.map((item) => {
    return {
      value: item._id,
      label: (
        <Link to={item._id} className="newChat__link">
          <Avatar size="large" icon={AVATAR_DEFAULT} src={item.photoUrl} />
          <span>{item.username}</span>
        </Link>
      ),
    }
  })
}

function NewChat() {
  const friends = useSelector((state) => state.friend.friends)
  const [value, setValue] = useState([])
  const history = useHistory()

  const handleSearch = (search) => {
    if (search !== '') {
      const data = friends.filter((friend) => friend.username.includes(search))
      setValue(renderItem(data))
    } else {
      setValue([])
    }
  }

  const handleSelect = (value) => {
    history.push(`/messages/${value}`)
  }

  return (
    <div className="newChat">
      <div className="newChat__header">
        <span>Đến:</span>
        <AutoComplete
          placeholder="Nhập tên..."
          onSearch={handleSearch}
          onSelect={handleSelect}
          options={value}
          autoFocus
          className="newChat__input"
        />
      </div>
      <div className="newChat__body"></div>
    </div>
  )
}

export default NewChat
