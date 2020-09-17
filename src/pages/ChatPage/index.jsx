import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import chatApi from '../../apis/chatApi'
import Chat from '../../components/Chat'
import Sidebar from '../../components/Sidebar'
import { useSocket } from '../../contexts/SocketProvider'
import {
  fetchChats,
  fetchMessages,
  receiveMessage,
  setReceiver,
} from '../../slices/chatSlice'
import './ChatPage.scss'

function ChatPage() {
  const friends = useSelector((state) => state.user.friends)
  const { id } = useParams()
  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    const receiver = friends.find((friend) => friend._id === id)
    dispatch(setReceiver(receiver))
  }, [dispatch, friends, id])

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await chatApi.fetchChats()
        dispatch(fetchChats(data))
      } catch (e) {
        console.log(e)
      }
    }

    getChats()
  }, [dispatch])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await chatApi.receiveMessage(id)
        dispatch(fetchMessages(data))
      } catch (e) {
        console.log(e)
      }
    }

    getMessages()
  }, [dispatch, id])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', (message) => {
      dispatch(receiveMessage(message))
    })

    return () => socket.off('receive-message')
  }, [dispatch, socket])

  useEffect(() => {
    if (socket == null) return

    socket.emit('create-chat', id)
  }, [dispatch, id, socket])

  return (
    <div className="container">
      <Sidebar />
      <Chat />
    </div>
  )
}

export default ChatPage
