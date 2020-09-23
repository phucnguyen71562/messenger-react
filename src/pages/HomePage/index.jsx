import { unwrapResult } from '@reduxjs/toolkit'
import { Spin } from 'antd'
import React, { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import authApi from '../../apis/authApi'
import userApi from '../../apis/userApi'
import { fetchCurrent } from '../../app/authSlice'
import { setIsDesktopMode } from '../../app/commonSlice'
import NotFound from '../../components/NotFound'
import { useSocket } from '../../contexts/SocketProvider'
import useMediaQuery from '../../hooks/useMediaQuery'
import {
  addOnlineFriends,
  fetchFriends,
  removeOnlineFriends,
} from '../../slices/friendSlice'
import { fetchUsers } from '../../slices/userSlice'
import FriendPage from '../FriendPage'
import './HomePage.scss'

const ChatPage = lazy(() => import('../ChatPage'))

function HomePage() {
  const dispatch = useDispatch()
  const socket = useSocket()

  const isDesktopMode = useMediaQuery('(min-width: 991px)')

  useEffect(() => {
    dispatch(setIsDesktopMode(isDesktopMode))
  }, [dispatch, isDesktopMode])

  useEffect(() => {
    const getCurrent = async () => {
      try {
        const data = await authApi.fetchCurrent()
        dispatch(fetchCurrent(data))
      } catch (e) {
        console.log(e)
      }
    }

    getCurrent()
  }, [dispatch])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await userApi.fetchUsers()
        dispatch(fetchUsers(data))
      } catch (e) {
        console.log(e)
      }
    }

    getUsers()
  }, [dispatch])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const data = await dispatch(fetchFriends())
        unwrapResult(data)
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
    <Suspense
      fallback={
        <div className="loading">
          <Spin tip="Đang tải..." size="large" />
        </div>
      }
    >
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
    </Suspense>
  )
}

export default HomePage
