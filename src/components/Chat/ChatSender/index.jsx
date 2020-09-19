import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSocket } from '../../../contexts/SocketProvider'
import './ChatSender.scss'

function ChatSender() {
  const receiver = useSelector((state) => state.chat.receiver)
  const [message, setMessage] = useState('')
  const socket = useSocket()
  const inputRef = useRef()

  const changeMessage = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = async (e) => {
    e.preventDefault()

    socket.emit('send-message', {
      message,
      receiverId: receiver._id,
    })

    setMessage('')
    inputRef.current.focus()
  }

  return (
    <div className="chat__sender">
      <form className="chat-form" onSubmit={sendMessage}>
        <Input
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={changeMessage}
          className="chat-form__input"
          ref={inputRef}
          autoFocus
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
