import React, { useState } from 'react'
import './Chat.scss'
import ChatHeader from './ChatHeader'
import ChatSender from './ChatSender'
import Detail from './Detail'
import Messages from './Messages'

function Chat() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="chat">
      <ChatHeader setVisible={setVisible} />
      <Messages />
      <ChatSender />
      <Detail visible={visible} setVisible={setVisible} />
    </div>
  )
}

export default Chat
