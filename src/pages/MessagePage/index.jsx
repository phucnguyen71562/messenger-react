import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import userApi from '../../apis/userApi'
import Chat from '../../components/Chat'
import { useSocket } from '../../contexts/SocketProvider'
import {
  createChat,
  fetchMessages,
  receiveMessage,
  setColorTheme,
  setReceiver,
  updateChat,
} from '../../slices/chatSlice'

function MessagePage() {
  const user = useSelector((state) => state.auth.current)
  const { id } = useParams()
  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await userApi.fetchUser(id)
        dispatch(setReceiver(data))
      } catch (e) {
        console.log(e)
      }
    }

    getUser()
  }, [dispatch, id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        await dispatch(fetchMessages(id))
      } catch (e) {
        console.log(e)
      }
    }

    getMessages()
  }, [dispatch, id])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', ({ message, senderId, receiverId }) => {
      if (senderId === id || receiverId === id) {
        dispatch(receiveMessage(message))
        dispatch(updateChat(message))
      }
    })

    return () => socket.off('receive-message')
  }, [dispatch, id, socket])

  useEffect(() => {
    if (socket == null) return

    socket.on('change-color-success', ({ data, receiverId }) => {
      if (receiverId === user.id) {
        dispatch(setColorTheme(data))
      }
    })
  }, [dispatch, id, socket, user.id])

  useEffect(() => {
    if (socket == null) return

    socket.on('create-chat', ({ senderId, message }) => {
      if (senderId === user.id) {
        dispatch(createChat(message))
      }
    })
  }, [dispatch, socket, user.id])

  return <Chat />
}

export default MessagePage
