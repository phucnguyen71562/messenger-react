import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import messageApi from '../../apis/messageApi'
import { fetchMessages } from '../../app/messageSlice'
import Chat from '../../components/Chat'
import Sidebar from '../../components/Sidebar'
import './ChatPage.scss'

function ChatPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await messageApi.receiveMessage()
        dispatch(fetchMessages(data))
      } catch (e) {
        console.log(e)
      }
    }

    getMessages()
  }, [dispatch])

  return (
    <div className="container">
      <Sidebar />
      <Chat />
    </div>
  )
}

export default ChatPage
