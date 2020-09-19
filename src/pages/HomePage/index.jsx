import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from '../../components/NotFound'
import { useSocket } from '../../contexts/SocketProvider'
import {
  addOnlineFriends,
  fetchFriends,
  removeOnlineFriends,
} from '../../slices/friendSlice'
import ChatPage from '../ChatPage'
import FriendPage from '../FriendPage'

function HomePage() {
  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    const getFriends = async () => {
      try {
        await dispatch(fetchFriends())
      } catch (e) {
        console.log(e)
      }
    }

    getFriends()
  }, [dispatch])

  useEffect(() => {
    if (socket == null) return

    socket.on('is-online', (id) => {
      dispatch(addOnlineFriends(id))
    })
  }, [dispatch, socket])

  useEffect(() => {
    if (socket == null) return

    socket.on('is-offline', (id) => {
      dispatch(removeOnlineFriends(id))
    })
  }, [dispatch, socket])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/messages">
          <ChatPage />
        </Route>

        <Route path="/" exact>
          <FriendPage />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default HomePage
