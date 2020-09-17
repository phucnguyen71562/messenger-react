import { Tooltip } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getTime } from '../../../services/helpers'
import './Messages.scss'

function Messages() {
  const { username } = useSelector((state) => state.auth.current)
  const messages = useSelector((state) => state.chat.messages)
  const colorTheme = useSelector((state) => state.chat.colorTheme)
  const messageRef = useRef()

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight
    }
  }

  useEffect(() => scrollToBottom(), [messages])

  return (
    <div className="chat__messages" ref={messageRef}>
      {messages.map((message) => {
        return (
          <Tooltip
            key={message?._id}
            title={getTime(message?.timestamp)}
            placement="right"
          >
            <div
              className={`chat__message ${
                username === message?.username
                  ? 'chat__message-sender'
                  : 'chat__message-receiver'
              }`}
              style={
                username === message?.username
                  ? { backgroundAttachment: 'fixed', ...colorTheme.value }
                  : {}
              }
            >
              <div className="chat__messageText">
                <span>{message?.message}</span>
              </div>
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}

export default Messages
