import { FormOutlined } from '@ant-design/icons'
import { Avatar, Button, Space, Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AVATAR_DEFAULT } from '../../../app/config'
import LogoutButton from '../../LogoutButton'
import './SidebarHeader.scss'

const { Title } = Typography

function SidebarHeader() {
  const { photoUrl } = useSelector((state) => state.auth.current)

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

        <LogoutButton />
      </Space>
    </div>
  )
}

export default SidebarHeader
