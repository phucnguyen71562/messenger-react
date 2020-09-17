import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import friendApi from '../../apis/friendApi'
import NotFound from '../../components/NotFound'
import { useSocket } from '../../contexts/SocketProvider'
import { fetchFriends, fetchOnlineFriends } from '../../slices/userSlice'
import ChatPage from '../ChatPage'
import FriendPage from '../FriendPage'

function HomePage() {
  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    const getFriends = async () => {
      try {
        const data = await friendApi.getFriends()
        const onlineFriends = data
          .filter((friend) => friend.isOnline === true)
          .map((friend) => friend._id)
        dispatch(fetchFriends(data))
        dispatch(fetchOnlineFriends(onlineFriends))
      } catch (e) {
        console.log(e)
      }
    }

    getFriends()
  }, [dispatch])

  useEffect(() => {
    if (socket == null) return

    socket.on('is-online', (online) => {
      dispatch(fetchOnlineFriends(online))
    })
  }, [dispatch, socket])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/messages/:id">
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
