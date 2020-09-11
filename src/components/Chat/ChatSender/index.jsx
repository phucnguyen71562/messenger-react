import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import messageApi from '../../../apis/messageApi'
import './ChatSender.scss'

function ChatSender({ socket }) {
  const user = useSelector((state) => state.user.current)
  const [message, setMessage] = useState('')

  const changeMessage = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault()

    const params = {
      username: user.username,
      message: message,
    }

    messageApi.sendMessage(params)

    socket.emit('send message', params)

    setMessage('')
  }

  return (
    <div className="chat__sender">
      <form className="chat__input" onSubmit={sendMessage}>
        <Input
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={changeMessage}
          className="chat-form__input"
        />
        <Button
          htmlType="submit"
          shape="circle"
          icon={<SendOutlined />}
          className="chat-form__button"
        />
      </form>
    </div>
  )
}

export default ChatSender
