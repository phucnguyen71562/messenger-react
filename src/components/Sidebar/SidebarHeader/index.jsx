import { FormOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Button, Space, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logoutUser } from '../../../app/authSlice'
import { AVATAR_DEFAULT } from '../../../app/config'
import './SidebarHeader.scss'

const { Title } = Typography

function SidebarHeader() {
  const { id, refresh_token, photoUrl } = useSelector(
    (state) => state.auth.current
  )
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await dispatch(
      logoutUser({
        id,
        token: refresh_token,
      })
    )

    history.push('/')
  }

  return (
    <div className="sidebar__header">
      <Space>
        <Link to="/">
          <Avatar size="large" icon={AVATAR_DEFAULT} src={photoUrl} />
        </Link>
        <Title level={2} style={{ marginBottom: 0 }}>
          Chat
        </Title>
      </Space>

      <Space className="sidebar__headerActions">
        <Link to="/messages/new">
          <Button
            shape="circle"
            icon={<FormOutlined />}
            title="Tin nhắn mới"
          ></Button>
        </Link>

        <Button
          shape="circle"
          icon={<LogoutOutlined />}
          title="Đăng xuất"
          onClick={handleLogout}
        ></Button>
      </Space>
    </div>
  )
}

export default SidebarHeader
