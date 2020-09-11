import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.scss'
import ChatPage from './pages/ChatPage'
import FriendPage from './pages/FriendPage'
import LoginPage from './pages/LoginPage'

function PrivateRoute({ children, ...rest }) {
  const user = useSelector((state) => state.user.current)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.access_token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/message">
          <ChatPage />
        </PrivateRoute>

        <PrivateRoute path="/friend/:id">
          <FriendPage />
        </PrivateRoute>

        <Route path="/" exact>
          <LoginPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
