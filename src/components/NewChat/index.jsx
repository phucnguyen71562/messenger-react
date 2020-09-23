import { ArrowLeftOutlined } from '@ant-design/icons'
import { AutoComplete, Avatar, Button } from 'antd'
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
  const isDesktopMode = useSelector((state) => state.common.isDesktopMode)
  const history = useHistory()

  const handleSearch = (search) => {
    if (search !== '') {
      const data = friends.filter(
        (user) => user.username.toLowerCase().indexOf(search.toLowerCase()) > -1
      )
      setValue(renderItem(data))
    } else {
      setValue([])
    }
  }

  const handleSelect = (value) => {
    history.push(`/messages/${value}`)
  }

  const handleBack = () => {
    history.push('/messages')
  }

  return (
    <div className="newChat">
      <div className="newChat__header">
        {!isDesktopMode && (
          <Button type="link" className="newChat__back" onClick={handleBack}>
            <ArrowLeftOutlined />
          </Button>
        )}

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
