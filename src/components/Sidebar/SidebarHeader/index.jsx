import {
  FormOutlined,
  LogoutOutlined,
  SettingFilled,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Space, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { removeUser } from '../../../app/userSlice'
import './SidebarHeader.scss'

const { Title } = Typography

function SidebarHeader() {
  const user = useSelector((state) => state.user.current)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(removeUser())

    history.push('/')
  }

  return (
    <div className="sidebar__header">
      <Space>
        <Avatar
          size="large"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <Title level={2} style={{ marginBottom: 0 }}>
          Chat
        </Title>
      </Space>

      <div className="sidebar__headerActions">
        <Link to={`/friend/${user.id}`}>
          <Button
            shape="circle"
            icon={<UserOutlined />}
            title="Bạn bè"
          ></Button>
        </Link>

        <Button
          shape="circle"
          icon={<SettingFilled />}
          title="Cài đặt"
        ></Button>

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
      </div>
    </div>
  )
}

export default SidebarHeader
