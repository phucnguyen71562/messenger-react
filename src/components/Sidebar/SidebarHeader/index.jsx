import { FormOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Button, Space, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logoutUser } from '../../../app/authSlice'
import './SidebarHeader.scss'

const { Title } = Typography

function SidebarHeader() {
  const { id, refresh_token } = useSelector((state) => state.auth.current)
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
          <Avatar
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </Link>
        <Title level={2} style={{ marginBottom: 0 }}>
          Chat
        </Title>
      </Space>

      <Space className="sidebar__headerActions">
        <Button
          shape="circle"
          icon={<FormOutlined />}
          title="Tin nhắn mới"
        ></Button>

        <Button
          shape="circle"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          title="Đăng xuất"
        ></Button>
      </Space>
    </div>
  )
}

export default SidebarHeader
