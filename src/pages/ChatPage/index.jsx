import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import chatApi from '../../apis/chatApi'
import NewChat from '../../components/NewChat'
import Sidebar from '../../components/Sidebar'
import { fetchChats } from '../../slices/chatSlice'
import MessagePage from '../MessagePage'
import './ChatPage.scss'

function ChatPage() {
  const isDesktopMode = useSelector((state) => state.common.isDesktopMode)
  const match = useRouteMatch()
  const dispatch = useDispatch()

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

  return (
    <div className="container">
      {isDesktopMode && <Sidebar />}

      <Switch>
        {!isDesktopMode && (
          <Route path={`${match.url}`} exact>
            <Sidebar />
          </Route>
        )}

        <Route path={`${match.url}/new`}>
          <NewChat />
        </Route>

        <Route path={`${match.url}/:id`}>
          <MessagePage />
        </Route>
      </Switch>
    </div>
  )
}

export default ChatPage
