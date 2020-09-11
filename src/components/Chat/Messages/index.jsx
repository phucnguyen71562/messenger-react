import { Tooltip } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScrollToBottom from 'react-scroll-to-bottom'
import io from 'socket.io-client'
import { receiveMessage } from '../../../app/messageSlice'
import ChatSender from '../ChatSender'
import './Messages.scss'

const socket = io(process.env.REACT_APP_API_URL)

function Messages() {
  const user = useSelector((state) => state.user.current)
  const messages = useSelector((state) => state.message.messages)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('receive message', (message) => {
      dispatch(receiveMessage(message))
    })
  }, [dispatch])

  return (
    <>
      <ScrollToBottom className="chat__messages">
        {messages.map((message) => {
          return (
            <Tooltip
              title={new Date(message.timestamp).toUTCString()}
              placement="right"
            >
              <div
                key={message.timestamp}
                className={`chat__message ${
                  user.username === message.username
                    ? 'chat__message-sender'
                    : 'chat__message-receiver'
                }`}
              >
                <span className="chat__messageText">{message.message}</span>
              </div>
            </Tooltip>
          )
        })}
      </ScrollToBottom>

      <ChatSender socket={socket} />
    </>
  )
}

export default Messages
